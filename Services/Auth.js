const DbContext = require('../Config/dbContext')
const jwt = require("jsonwebtoken")
const Encrypter = require('../Helpers/Encrypter')
const bcrypt = require('bcrypt');


class Auth {

    SaveUser(User) {

        let dbContext = new DbContext().Initialize("users");

        let salt = bcrypt.genSaltSync(12);
        let hash = bcrypt.hashSync(User.password, salt)

        if (err) console.log(err);

        dbContext.add({
            username: User.username,
            email: User.email,
            password: hash,
            created: User.created,
            isAdmin: true
        })


    }

    JWTAuthenticate(credentials, expirySec, jwtKey) {

        const token = jwt.sign(credentials, jwtKey, {

            algorithm: "HS256",
            expiresIn: expirySec
        })

        return token;
    }
}

module.exports = Auth;