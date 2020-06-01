const AuthJWT = require("../Helpers/AuthJWT")
const DbContext = require("../Config/dbContext")
const FirebaseParser = require("../Helpers/FirebaseObjParser")


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

    const Parser = new FirebaseParser()

    const projectId = req.params.id

    const dbContext = new DbContext().Initialize('projects');

    let toDisplay = []

    let logged = Auth.IsLoggedIn(req)
    
    let data = Auth.GetUserData(req)

    if(logged){

        let querryQueue = dbContext.doc(projectId).get()

        .then((data) => {

           let oldArrayFirebaseObj = data["_fieldsProto"]["usersQueue"]["arrayValue"]["values"]      
            
           toDisplay = Parser.ToArray(oldArrayFirebaseObj)

           console.log(toDisplay)
           
        })
        .catch(err => {

            console.log(err)
        })
        .finally(() =>{

            data["users"] = toDisplay

            res.render("Manager/Queue", data)
        })
        
    }
    else{
        
        res.render("Auth/Login", {error: "You need an account to access queue!"})
    }
}

const ConfirmUser = (req, res) => {
    
}

module.exports = {
    GetMain,
    GetQueue,
    ConfirmUser
}