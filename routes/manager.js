const express = require("express");
const router = express.Router();

const Manager = require("../Controllers/ManageController")

router.get("/Main", Manager.GetMain)

router.get("/Queue/:id", Manager.GetQueue)
module.exports = router