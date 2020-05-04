const express = require('express');
const AuthController = require("../Controllers/AuthController")
const router = express.Router();

router.get('/Register', AuthController.GetRegister);
router.get('/Login', AuthController.GetLogin);

router.post('/Register', AuthController.PostRegister);
router.post('/Login', AuthController.PostLogin);
router.post('/Logout', AuthController.Logout);

module.exports = router;