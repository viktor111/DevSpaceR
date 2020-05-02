const jwt = require('jsonwebtoken')

const Index = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).end()
    }
    let payload = jwt.verify(token, 'auth')
    res.render('index', { title: payload.username, admin: payload.admin});
}

module.exports = {
    Index
}