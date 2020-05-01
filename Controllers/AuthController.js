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

    
    let authService = new AuthService();

    let { Username, Email, Password } = req.body;
    

    //let counter = await authService.EmailExist(Email);

    let dbContext = new DbContext().Initialize("users");

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

module.exports = {
    GetRegister,
    GetLogin,
    PostRegister
}