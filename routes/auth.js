const express = require('express');
const AuthController = require("../Controllers/AuthController")
const router = express.Router();

router.get('/Register', AuthController.GetRegister);
router.get('/Login', AuthController.GetLogin);

router.post('/Register', AuthController.PostRegister);

module.exports = router;