const Project = require("../Models/Project")
const DbContext = require("../Config/dbContext")
const Mailer = require("../Helpers/Mailer")

class ProjectService{

    SaveProject(Project){

        let dbContext = new DbContext().Initialize("projects")
        
        return dbContext.add({
            
            title: Project.title,
            description: Project.description,
            language: Project.language,
            github: Project.github,
            created: Project.created,
            creator: Project.creator,
            usersQueue: [],
            usersSigned: []
        })
    }   
    
}

module.exports = ProjectService