const jwt = require('jsonwebtoken')

const Index = (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        res.render('index', {logged: false});
    }
    else {       
        let payload = jwt.verify(token, 'auth')
        res.render('index', { username: payload.username, admin: payload.admin, logged: true});
    }
}

module.exports = {
    Index
}