const AuthService = require('../Services/Auth')
const User = require('../Models/User')

const GetRegister = (req, res) => {
    res.render("Auth/Register");
}

const GetLogin = (req, res) => {
    res.render("Auth/Login");
}

const PostRegister = (req, res) => {
    let {Username, Email, Password} = req.body;
    console.log(`${Username} , ${Email} , ${Password}`);
    
    let service = new AuthService();
    let user = new User(Username, Email, Password, new Date());
    service.SaveUser(user);
    res.redirect("/");
}

module.exports = {
    GetRegister,
    GetLogin,
    PostRegister
}