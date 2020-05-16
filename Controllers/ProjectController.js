const jwt = require("jsonwebtoken")
const DbContext = require("../Config/dbContext")
const Project = require("../Models/Project")
const Mailer = require("../Helpers/Mailer")
const ProjectService = require("../Services/Project")

const GetProjects = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.render("Project/Main", { logged: false })
        res.end()

    }
    else {
        let payload = jwt.verify(token, "auth")
        res.render("Project/Main", { title: "Create Project", logged: true, username: payload.username, admin: payload.admin });
        res.end()
    }
}

const CreateProject = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.render("Auth/Register", { error: "You need to have an account!" })
        res.end()

    }
    else {
        let payload = jwt.verify(token, "auth")
        res.render("Project/Create", { title: "Create Project", logged: true, username: payload.username, admin: payload.admin });
        res.end()
    }
}

const PostProject = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        res.render("Auth/Register", { error: "You need to have account!" })
        res.end()
    }
    else {
        let payload = jwt.verify(token, "auth")

        const { Title, Description, Github, Selectpicker } = req.body;
        let dbContext = new DbContext().Initialize("projects")

        let project = new Project(Title, Description, Selectpicker, payload.username, Github, new Date())

        let projectService = new ProjectService();
        projectService.SaveProject(project)
        res.redirect("/")
        res.end()
    }
}

module.exports = {
    GetProjects,
    CreateProject,
    PostProject
}