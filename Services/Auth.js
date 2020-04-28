const DbContext = require('../Config/dbContext')

class Auth{
    SaveUser(User){
        let dbContext = new DbContext().Initialize("users");

        dbContext.add({
            username: User.username,
            email: User.email,
            password: User.password,
            created: User.created
        })        
    }
}

module.exports = Auth;