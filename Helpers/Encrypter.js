const bcript = require('bcrypt');

class Encrypter{

    Encrypt(password){
        let hasedPassword;
        bcript.hash(password, 12, (err, hash) => {
            console.log(hash);

            hasedPassword = hash;
        })
        return hasedPassword;
    }

    Decrypt(password ,hashedPassword){
        let booleanValue;
        bcript.compare(password, hashedPassword, (err, response) => {
            booleanValue = response;
        })
        return booleanValue;
    }
}

module.exports = Encrypter;