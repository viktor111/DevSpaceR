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
        var counter = 0;
        let promise = dbContext.where("email", "==", email).limit(1).get()
        .then((user) => {
            
            user.forEach(() => {                
                counter++;
            })
        })
        .catch(() => {
            
        })
        .finally(() => {
            console.log(counter);

            if(counter !== 0){
                console.log("True")
            }
            else{
                console.log("False")
            }
        });

        return counter;

    }
}

module.exports = Auth;