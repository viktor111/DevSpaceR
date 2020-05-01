const AuthService = require('../Services/Auth')
const User = require('../Models/User')
const DbContext = require('../Config/dbContext')


const GetRegister = (req, res) => {
    res.render("Auth/Register");
}

const GetLogin = (req, res) => {
    res.render("Auth/Login");
}

const PostRegister = async (req, res) => {
    let dbContext = new DbContext().Initialize("users");

    
    let authService = new AuthService();

    let { Username, Email, Password } = req.body;

        let toReturn =false;
        var counter = 0;

        let promise = dbContext.where("email", "==", Email).limit(1).get()
        .then((user) => {
            
            user.forEach(() => {                
                counter++;
            })

            if(counter !== 0){
                console.log(`${Username} , ${Email} , ${Password}`);
                res.render("Auth/Register", {error: "Email already exists!"})
                res.end();
            }

        })
        .catch(() => {
            
        })
        .finally(() => {
            console.log(counter);
            if (Password.length < 4) {
                res.render("Auth/Register", { error: "Password too small!" })
                res.end()
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


    let {Username, Password} = req.body;

    let counter = 0;

    let querry = dbContext.where('username', '==', Username).limit(1);

    let username;
    let admin;
    let password;

    querry.get()
    .then((document) => {
        console.log("Username" + " " + Username)
        document.forEach((user) => {

            username = user['_fieldsProto']['username']['stringValue'];
            admin = user['_fieldsProto']['isAdmin']['booleanValue'];
            password = user['_fieldsProto']['password']['stringValue'];
            counter++;
        })
        console.log("Counter" + " "+counter)
        if (password !== Password) {
            res.render("Auth/Login", {error: 'Wrong password!'});
            res.end();
        }
        if(counter === 0) {
            res.render("Auth/Register", {error: 'User does not exist!'});
            res.end();
        }
    })
    .finally((document) => {

        if(admin){
            req.session.isAdmin = true;
            console.log('Logged in as admin');
        }

        req.session.isLoggedin = true;
         //req.session.usernmae = username;

        req.session.save((err) => {
             console.log(err);
             res.redirect('/')
         })

        res.redirect('/')
    })
}

module.exports = {
    GetRegister,
    GetLogin,
    PostRegister,
    PostLogin
}