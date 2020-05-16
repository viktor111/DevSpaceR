const AuthService = require('../Services/Auth')
const User = require('../Models/User')
const Mailer = require("../Helpers/Mailer");
const DbContext = require('../Config/dbContext')
const KeyGenerate = require("../Helpers/RandomNum")
const bcript = require('bcrypt');


const jwtKey = "auth";


const GetRegister = (req, res) => {
    res.render("Auth/Register", { title: "Register" });
}

const GetResetPassword = (req, res) => {
    res.render("Auth/ResetPass", { title: "Reset Password" })
}

const GetLogin = (req, res) => {
    res.render("Auth/Login", { title: "Login" });
}


const PostRegister = async (req, res) => {
    let dbContext = new DbContext().Initialize("users");


    let authService = new AuthService();

    let { Username, Email, Password } = req.body;

    let toReturn = false;
    var counter = 0;

    let promise = dbContext.where("email", "==", Email).limit(1).get()
        .then((user) => {

            user.forEach(() => {
                counter++;
            })
        })
        .catch(() => {

        })
        .finally(() => {
            console.log(counter);

            if (counter !== 0) {
                console.log(`${Username} , ${Email} , ${Password}`);
                res.render("Auth/Register", { error: "Email already exists!" })
                return res.end();
            }

            else if (Password.length < 4) {
                res.render("Auth/Register", { error: "Password too small!" })
                return res.end();
            }

            else {

                let user = new User(Username, Email, Password, new Date());
                authService.SaveUser(user);
                res.redirect("/");
                res.end()
            }
        });
}

const PostLogin = (req, res) => {
    let dbContext = new DbContext().Initialize("users");
    let authService = new AuthService();

    let { Username, Password } = req.body;

    let counter = 0;

    let querry = dbContext.where('username', '==', Username).limit(1);

    let username;
    let admin;
    let password;

    querry.get()
        .then((document) => {
            document.forEach((user) => {

                username = user['_fieldsProto']['username']['stringValue'];
                admin = user['_fieldsProto']['isAdmin']['booleanValue'];
                password = user['_fieldsProto']['password']['stringValue'];
                counter++;
            })


            if (counter === 0) {
                res.render("Auth/Register", { error: 'User does not exist!' });
                res.end();
            }

        })
        .finally((document) => {

            bcript.compare(Password, password, (err, response) => {



                if (!response) {
                    res.render("Auth/Login", { error: 'Wrong password!' });
                    res.end();
                }
                else {
                    const expirySec = 30000;

                    console.log(response)
                    console.log(Password)

                    let token = authService.JWTAuthenticate({ username, admin }, expirySec, jwtKey);

                    res.cookie("token", token, {
                        maxAge: expirySec * 1000000
                    })
                    res.redirect("/")
                    res.end();
                }
            });

        })

}

const Logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/Auth/Login')
    res.end();
}

const SendResetEmail = (req, res) => {
    let dbContext = new DbContext().Initialize("users");

    let { Email } = req.body;
    let querry = dbContext.where('email', '==', Email);

    querry.get()
        .then((document) => {
            if (!document) {
                res.render("Auth/ResetPass", { error: "Email dosent exist!" });
                res.end();
            }
            else {
                let mailer = new Mailer();
                let code;

                document.forEach((user) => {
                    code = user['_fieldsProto']['key']['stringValue'];
                })
                mailer.SendEmail(Email, code, "DevSpaceR password reset code");
                res.render("Auth/ResetPass", { error: "Email sent!" });
                res.end();
            }
        })


}

const PostResetPassword = (req, res) => {
    let { Code, NewPassword, Email } = req.body;
    let dbContext = new DbContext().Initialize("users");
    let dbCode;
    let querry = dbContext.where('email', '==', Email);
    bcript.hash(NewPassword, 12, (err, hash) => {
        querry.get()
            .then((document) => {
                if (!document) {
                    res.render("Auth/ResetPass", { error: "Email dosent exist!" });
                    res.end();
                }
                else {
                    document.forEach((user) => {
                        const id = user.id;
                        dbCode = user['_fieldsProto']['key']['stringValue'];
                        if (dbCode !== Code) {
                            console.log(dbCode)
                            res.render("Auth/ResetPass", { error: "Wrong key!" })
                            res.end()
                        }
                        else if (NewPassword.length < 4) {
                            res.render("Auth/ResetPass", { error: "Password too small!" })
                            return res.end();
                        }
                        else {
                            let newKey = KeyGenerate(9, 0)
                            dbContext.doc(id).update({ password: hash });
                            dbContext.doc(id).update({ key: newKey });
                            res.render("Auth/ResetPass", { error: "Password changed!" })
                            res.end()
                        }
                    })
                }
            })
    })

}

module.exports = {
    GetRegister,
    GetLogin,
    GetResetPassword,
    PostRegister,
    PostLogin,
    PostResetPassword,
    Logout,
    SendResetEmail
}