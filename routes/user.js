const express = require("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();

router.get("/Main/:user", UserController.GetMain)

router.post("/Profile/Create/:user", UserController.PostCreateUserProfile)
router.get("/Profile/Create/:user", UserController.GetCreateUserProfile)



module.exports = router