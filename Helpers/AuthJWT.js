const jwt = require('jsonwebtoken')

class Auth {

    IsLoggedIn(req) {

        const token = req.cookies.token;

        if (!token) {

            return false
        }
        else{
            return true
        }
    }

    GetUserData(){

        let payload = jwt.verify(token, 'auth')

        let data = {
            username: payload.username, 
            admin: payload.admin, 
            logged: true
        }

        return data
    }
}

module.exports = Auth