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
        let dbContext = new DbContext().Initialize("projects")
        let projects = []

        let projectsQuerry = dbContext.orderBy("title").get().then((snapshot) => {
            snapshot.forEach((project) => {
                let title = project["_fieldsProto"]["title"]["stringValue"]
                let description = project["_fieldsProto"]["description"]["stringValue"]
                let date = project["_fieldsProto"]["created"]["stringValue"]
                let owner = project["_fieldsProto"]["creator"]["stringValue"]
                let language = project["_fieldsProto"]["language"]["stringValue"]


                let tempObj = {
                    title: title,
                    description: description,
                    date: date,
                    owner: owner,
                    language: language
                }
                projects.push(tempObj)
            })

            console.log(projects)


        })
            .finally(() => {
                res.render("Project/Main", {projects: projects, title: "Create Project", logged: true, username: payload.username, admin: payload.admin });
                res.end()
            });


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

const ListProjects = (req, res) => {

}

module.exports = {
    GetProjects,
    CreateProject,
    PostProject
}