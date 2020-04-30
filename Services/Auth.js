const DbContext = require('../Config/dbContext')

class Auth {
    SaveUser(User) {
        let dbContext = new DbContext().Initialize("users");

        dbContext.add({
            username: User.username,
            email: User.email,
            password: User.password,
            created: User.created
        })
    }

       async EmailExist(email) {

        let dbContext = new DbContext().Initialize("users");

        let toReturn =false;
        let counter = 0;
        let promise = dbContext.where("email", "==", email).limit(1).get()
        .then((user) => {
            user.forEach(() => {
                counter++;
            })
        })
        .finally(() => {
            console.log(counter);

            if(counter !== 0){
                return promise =true;
            }
            else{
                return promise =false;
            }
        });

    }
}

module.exports = Auth;