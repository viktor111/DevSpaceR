const AuthJWT = require("../Helpers/AuthJWT")

const GetMain = (req, res) => {

    let Auth = new AuthJWT()

    let logged = Auth.IsLoggedIn(req)

    if (logged) {
        let data =  Auth.GetUserData(req)
        console.log(data)
        res.render("Manager/Main",data)
        res.end()
    }
    else {
        res.render("/Auth/Login", {error: "You need an account to access manager!"})
    }

}


module.exports = {
    GetMain
}