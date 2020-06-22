const express = require("express");
const router = express.Router();

const Manager = require("../Controllers/ManageController")

router.get("/Main", Manager.GetMain)

router.get("/Queue/:id", Manager.GetQueue)
router.get("/Eddit/:id", Manager.GetEdditProject)

router.post("/Decline/:user/:id", Manager.DeclineUser)
router.post("/Accept/:user/:id", Manager.AcceptUser)
router.post("/Eddit/:id", Manager.PostEdditProject)
module.exports = router