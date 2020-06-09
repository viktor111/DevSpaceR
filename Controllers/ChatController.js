const AuthJWT = require("../Helpers/AuthJWT")
const DbContext = require("../Config/dbContext")
const FirebaseParser = require("../Helpers/FirebaseObjParser")
const Mailer = require("../Helpers/Mailer")

const GetMain = (req, res) => {
    const userContext = new DbContext().Initialize("users")
    const Auth = new AuthJWT()
    const Parser = new FirebaseParser()

    let logged = Auth.IsLoggedIn(req)
    
    let data = Auth.GetUserData(req)

    if(logged){
        res.render("Chat/Main", data)
    }
    else{
        res.render("Auth/Regiser", {error: "You need and account to access the chat!"})
    }
}

module.exports = {
    GetMain
}