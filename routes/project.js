const express = require("express");
const ProjectController = require("../Controllers/ProjectController");
const router = express.Router();

router.get('/List', ProjectController.GetProjects)
router.get('/Create', ProjectController.CreateProject)

router.post("/Create", ProjectController.PostProject)
module.exports = router