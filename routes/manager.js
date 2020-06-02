const express = require("express");
const router = express.Router();

const Manager = require("../Controllers/ManageController")

router.get("/Main", Manager.GetMain)

router.get("/Queue/:id", Manager.GetQueue)
router.post("/Accept/:user/:id", Manager.AcceptUser)
router.post("/Decline/:user/id", Manager.DeclineUser)
module.exports = router