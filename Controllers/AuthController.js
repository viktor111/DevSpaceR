const AuthService = require('../Services/Auth')
const User = require('../Models/User')
const DbContext = require('../Config/dbContext')

const GetRegister = (req, res) => {
    res.render("Auth/Register");
}

const GetLogin = (req, res) => {
    res.render("Auth/Login");
}

const  PostRegister = async (req, res) => {

    let authService = new AuthService();

    let { Username, Email, Password } = req.body;
    console.log(`${Username} , ${Email} , ${Password}`);
    await authService.EmailExist(Email, res);

    // if(authService.EmailExist(Email)){
    //     res.render("Auth/Register", { error: "Email already exists!" }) 
    // }
    if (Password.length < 4) {
        res.render("Auth/Register", { error: "Password too small!" })
    }

    else {

        let user = new User(Username, Email, Password, new Date());
        authService.SaveUser(user);
        res.redirect("/");
    }
}

module.exports = {
    GetRegister,
    GetLogin,
    PostRegister
}