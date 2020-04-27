const express = require('express');
const AuthController = require("../Controllers/AuthController")
const router = express.Router();

router.get('/Register', AuthController.GetRegister);

module.exports = router;