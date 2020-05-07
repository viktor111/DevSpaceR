const DbContext = require('../Config/dbContext');
const Mailer = require("../Helpers/Mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


class Auth {

    SaveUser(User) {

        let mailer = new Mailer();
        mailer.SendEmail(User.email, "test", "subject test");
        
        let dbContext = new DbContext().Initialize("users");
        
        bcrypt.hash(User.password, 12, (err, hash) => {

            if (err) return console.log(err);

            return dbContext.add({
                username: User.username,
                email: User.email,
                password: hash.toString(),
                created: User.created,
                isAdmin: true
            })
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