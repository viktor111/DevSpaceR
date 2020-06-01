const DbContext = require('../Config/dbContext');
const Mailer = require("../Helpers/Mailer");
const KeyGenerate = require("../Helpers/RandomNum")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


class Auth {

    SaveUser(User) {

        let mailer = new Mailer();

        const thankMessge = "Thank you for registering to DevSpaceR!"
        
        mailer.SendEmail(User.email, thankMessge, thankMessge);

        let randomKey = KeyGenerate(9, 0);

        let dbContext = new DbContext().Initialize("users");
        
        bcrypt.hash(User.password, 12, (err, hash) => {

            if (err) return console.log(err);

            return dbContext.add({

                username: User.username,
                email: User.email,
                password: hash.toString(),
                created: User.created,
                isAdmin: true,
                key: randomKey,
                projectsSigned: [],
                projectsCreated: [],
                projectsDeclined: 0
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

    ResetPassword(){
        
    }
}

module.exports = Auth;