const express = require('express');
const HomeController = require("../Controllers/HomeController")
const router = express.Router();

/* GET home page. */
router.get('/', HomeController.Index);

module.exports = router;
