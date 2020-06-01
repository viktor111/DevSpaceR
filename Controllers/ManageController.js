const AuthJWT = require("../Helpers/AuthJWT")
const DbContext = require("../Config/dbContext")

const GetMain = (req, res) => {

    const Auth = new AuthJWT()

    const dbContext = new DbContext().Initialize('projects');

    let logged = Auth.IsLoggedIn(req)
    
    let data = Auth.GetUserData(req)

    if (logged) {
        
        let projects = []

        let querryProjectsByUser = dbContext.where("creator", "==", data.username);

        querryProjectsByUser

            .get()

            .then((snapshot) => {

                snapshot.forEach((project) => {

                    let title = project["_fieldsProto"]["title"]["stringValue"]
                    let description = project["_fieldsProto"]["description"]["stringValue"]
                    let date = project["_fieldsProto"]["created"]["timestampValue"]
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
            .catch(e => console.log(e))

            .finally(() => {

                data["projects"] = projects
                console.log(data)

                res.render("Manager/Main", data)
            })

        
    }
    else {

        res.render("Auth/Login", { error: "You need an account to access manager!" })
    }

}

const GetQueue = (req, res) => {
    const Auth = new AuthJWT()

    const dbContext = new DbContext().Initialize('projects');

    let logged = Auth.IsLoggedIn(req)
    
    let data = Auth.GetUserData(req)

    if(logged){
        res.render("Manager/Queue", data)
    }
    else{
        res.render("Auth/Login", {error: "You need an account to access queue!"})
    }
}

module.exports = {
    GetMain,
    GetQueue
}