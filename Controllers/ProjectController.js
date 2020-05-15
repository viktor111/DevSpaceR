const jwt = require("jsonwebtoken")

const GetProjects = (req, res) => {
    const token = req.cookies.token;
    if (!token){
        res.render("Project/Main", { logged: false})
        res.end()

    }
    else {
        let payload = jwt.verify(token, "auth")
        res.render("Project/Main", {title: "Create Project", logged: true, username: payload.username, admin: payload.admin});
        res.end()
    }
}

const CreateProject = (req, res) => {
    const token = req.cookies.token;
    if (!token){
        res.render("Auth/Register", { error: "You need to have an account!" })
        res.end()

    }
    else {
        let payload = jwt.verify(token, "auth")
        res.render("Project/Create", {title: "Create Project", logged: true, username: payload.username, admin: payload.admin});
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
       const {Title, Description, Github, Selectpicker} = req.body 
       console.log(Title)
       console.log(Description)
       console.log(Github)
       console.log(Selectpicker)
        
       res.redirect("/")
       res.end()
    }
}

module.exports = {
    GetProjects,
    CreateProject,
    PostProject
}