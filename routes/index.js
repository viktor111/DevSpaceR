const express = require('express');
const HomeController = require("../Controllers/HomeController")
const router = express.Router();

router.get('/', HomeController.Index);

module.exports = router;
