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

    GetUserData(req){

        const token = req.cookies.token;
        let payload = jwt.verify(token, 'auth')

        let data = {
            username: payload.username, 
            admin: payload.admin, 
            logged: true
        }

        console.log(data)

        return data
    }

}

module.exports = Auth