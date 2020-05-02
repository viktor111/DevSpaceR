const DbContext = require('../Config/dbContext')
const jwt = require("jsonwebtoken")


class Auth {

    SaveUser(User) {

        let dbContext = new DbContext().Initialize("users");

        dbContext.add({
            username: User.username,
            email: User.email,
            password: User.password,
            created: User.created,
            isAdmin: true
        })
    }  
    
    JWTAuthenticate(credentials, expirySec, jwtKey){
        const token = jwt.sign(credentials, jwtKey, {
            algorithm: "HS256",
            expiresIn: expirySec
        })

        return token;
    }
}

module.exports = Auth;