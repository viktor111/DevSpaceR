const express = require("express");
const ProjectController = require("../Controllers/ProjectController");
const router = express.Router();

router.get('/List', ProjectController.GetProjects)
router.get('/Create', ProjectController.CreateProject)

router.post("/Create", ProjectController.PostProject)

router.get('/:title', ProjectController.ProjectDetails)
module.exports = router