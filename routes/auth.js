const express = require('express');
const AuthController = require("../Controllers/AuthController")
const router = express.Router();

router.get('/Register', AuthController.GetRegister);
router.get('/Login', AuthController.GetLogin);
router.get('/ResetPassword', AuthController.GetResetPassword)

router.post('/Register', AuthController.PostRegister);
router.post('/Login', AuthController.PostLogin);
router.post('/Logout', AuthController.Logout);
router.post('/SendResetEmail', AuthController.SendResetEmail)
router.post('/ResetPassword' ,AuthController.PostResetPassword)

module.exports = router;