const jwt = require("jsonwebtoken")
const DbContext = require("../Config/dbContext")
const Project = require("../Models/Project")
const Mailer = require("../Helpers/Mailer")
const ProjectService = require("../Services/Project")
const FirebaseParser = require("../Helpers/FirebaseObjParser")

const SignUpForProject = (req, res) => {

    let dbContext = new DbContext().Initialize("projects");

    let Parser = new FirebaseParser();

    const token = req.cookies.token;

    let username;
    let newArr;

    if (!token) {

        return res.render("Auth/Login", { error: "You need to be logged in to sing up!" })
    }
    else {

        let payload = jwt.verify(token, 'auth')

        username = payload.username
    }

    let projectId = req.params.id

    let promise = dbContext.doc(projectId).get().then(snapshot => {

        let oldArrayFirebaseObj = snapshot["_fieldsProto"]["usersQueue"]["arrayValue"]["values"]

        newArr = Parser.ToArray(oldArrayFirebaseObj)

        let userExists = newArr.includes(username)

        if (userExists) {

            return res.redirect("/")
        }
        else {

            newArr.push(username)
            
            console.log(newArr)

            dbContext.doc(projectId).update({ usersQueue: newArr })

            console.log(newArr)

            res.redirect(`/Project/${projectId}`)
            res.end()
        }

    }).catch(
        err => console.log(err)
    )

}

const GetProjects = (req, res) => {

    const token = req.cookies.token;

    let dbContext = new DbContext().Initialize("projects")

    let projects = []

    let projectsQuerry = dbContext.orderBy("title").get().then((snapshot) => {

        snapshot.forEach((project) => {

            let title = project["_fieldsProto"]["title"]["stringValue"]
            let description = project["_fieldsProto"]["description"]["stringValue"]
            let date = project["_fieldsProto"]["created"]["stringValue"]
            let owner = project["_fieldsProto"]["creator"]["stringValue"]
            let language = project["_fieldsProto"]["language"]["stringValue"]
            let id = project.id

            let tempObj = {

                title: title,
                description: description,
                date: date,
                owner: owner,
                language: language,
                id: id
            }
            projects.push(tempObj)
        })

    })
        .finally(() => {

            if (!token) {

                res.render("Project/Main", { projects: projects, title: "Create Project", logged: false });
                res.end()
            }
            else {

                let payload = jwt.verify(token, "auth")

                res.render("Project/Main", { projects: projects, title: "Create Project", logged: true, username: payload.username, admin: payload.admin });
                res.end()
            }
        });
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

        const {
            Title, Description, Github, Selectpicker
        } = req.body;

        let dbContext = new DbContext().Initialize("projects")

        let project = new Project(Title, Description, Selectpicker, payload.username, Github, new Date())

        let projectService = new ProjectService();
        projectService.SaveProject(project)

        res.redirect("/")
        res.end()
    }
}

const ProjectDetails = (req, res) => {

    let dbContext = new DbContext().Initialize("projects")

    const token = req.cookies.token

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    let projectId = req.params.id;
    let projectObj = {}

    console.log(projectId)

    let data = dbContext.doc(projectId).get().then((project) => {

        if (!project) {

            res.redirect('/')
        }
        else {

            let title = project["_fieldsProto"]["title"]["stringValue"]
            let description = project["_fieldsProto"]["description"]["stringValue"]
            let date = project["_fieldsProto"]["created"]["stringValue"]
            let owner = project["_fieldsProto"]["creator"]["stringValue"]
            let language = project["_fieldsProto"]["language"]["stringValue"]


            let projectObjtemp = {

                title: title,
                description: description,
                date: date,
                owner: owner,
                language: language,
                projectId: projectId
            }

            projectObj = projectObjtemp

        if (!token) {

            res.render("Project/ProjectDetails", { projectObj: projectObj, logged: false })
            res.end()

        }
        else {

            let payload = jwt.verify(token, "auth")

            let oldArrayFirebaseObj = project["_fieldsProto"]["usersQueue"]["arrayValue"]["values"]

            const Parser = new FirebaseParser()

            let newArr = Parser.ToArray(oldArrayFirebaseObj)

            let username =  payload.username

            let userExists = newArr.includes(username)

            if (userExists) {

                res.render("Project/ProjectDetails", { projectObj: projectObj, logged: true, username: payload.username, admin: payload.admin, userExists: true })
                return res.end()
            }
            else {

                res.render("Project/ProjectDetails", { projectObj: projectObj, logged: true, username: payload.username, admin: payload.admin, userExists: false })
                return res.end()
            }
        }
        }
    })
    .catch(err => {

        console.log(err)
    })
}

module.exports = {

    GetProjects,
    CreateProject,
    PostProject,
    ProjectDetails,
    SignUpForProject
}