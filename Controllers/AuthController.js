const GetRegister = (req, res) => {
    res.render("Auth/Register");
}

const GetLogin = (req, res) => {
    res.render("Auth/Login");
}



module.exports = {
    GetRegister,
    GetLogin
}