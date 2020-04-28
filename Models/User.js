class User{
    constructor(username, email, password, created){
        this.username = username;
        this.email = email;
        this.password = password;
        this.created = created;
    }
}

module.exports = User