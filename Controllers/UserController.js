const AuthJWT = require("../Helpers/AuthJWT")
const DbContext = require("../Config/dbContext")
const FirebaseParser = require("../Helpers/FirebaseObjParser")
const Mailer = require("../Helpers/Mailer")

const GetMain = (req, res) => {

    const userContext = new DbContext().Initialize("users")
    const Auth = new AuthJWT()
    const Parser = new FirebaseParser()

    let logged = Auth.IsLoggedIn(req)
    
    let data = Auth.GetUserData(req)

    let username = req.params.user

    let profileCreated;

    userContext
    .where("username", "==", username)
    .get()
    .then((snapshopt) => {
        snapshopt.forEach((user) => {
            profileCreated = user["_fieldsProto"]["profileCreated"]["booleanValue"]
        })

        if(logged){

            if(!profileCreated){
                res.redirect(`/User/Profile/Create/${username}`)
            }   
            else{
                userContext
                .where("username", "==" , username)
                .get()
                .then((snapshopt) => {
                    snapshopt.forEach((user) => {
                        let profileUpdatedFirebase = user["_fieldsProto"]["profileCreated"]["booleanValue"]
                        let name = user["_fieldsProto"]["name"]["stringValue"]
                        let description = user["_fieldsProto"]["description"]["stringValue"]
                        let specialty = user["_fieldsProto"]["specialty"]["stringValue"]
                        let website = user["_fieldsProto"]["sebsite"]["stringValue"]
                        let projectsCreated = user["_fieldsProto"]["projectsCreated"]["arrayValue"]["values"]
                        let projectsSignedup = user["_fieldsProto"]["projectsSigned"]["arrayValue"]["values"]
                        let projectsDeclined = user["_fieldsProto"]["projectsDeclined"]["integerValue"]
                        console.log(projectsDeclined)

                        let arraySigned = Parser.ToArray(projectsSignedup)
                        let arrayCreated = Parser.ToArray(projectsCreated)

                        let lenCreated = arrayCreated.length;
                        let lenSigned = arraySigned.length;


                       
                        data["lenCreated"] = lenCreated;
                        data["lenSigned"] = lenSigned;
                        data["name"] = name;
                        data["description"] = description;
                        data["specialty"] = specialty;
                        data["website"] = website;
                        data["declined"] = projectsDeclined


                        res.render('User/Main', data)
                        res.end()
                    })
                })
                .catch(err => {
                    console.log(err)
                })
               
            }
           
        }
        else{
            res.render("Auth/Login", { error: "You need an account to access user page!" })
            res.end()
        }
    })
   
}

const GetCreateUserProfile = (req, res) => {
    const userContext = new DbContext().Initialize("users")
    const Auth = new AuthJWT()
    const Parser = new FirebaseParser()

    let logged = Auth.IsLoggedIn(req)
    let data = Auth.GetUserData(req)

    let username = req.params.user

    if(logged){
        res.render("User/ProfileCreate", data)
    }
    else{
        data["error"] = "You need to register an account before creating a profile for that account"
        res.render("Auth/Regiset", data)
    }
}

PostCreateUserProfile = (req, res) => {

    const {Name, Description, Github, Website, Selectpicker} = req.body;

    const userContext = new DbContext().Initialize("users")
    const Auth = new AuthJWT()
    const Parser = new FirebaseParser()

    let logged = Auth.IsLoggedIn(req)
    let data = Auth.GetUserData(req)

    let username = req.params.user
    let userId;

    if(logged){

        userContext
        .where("username", "==", username)
        .get()
        .then((snapshopt) => {
            snapshopt.forEach((user) => {
                userId = user.id
            })
            
            userContext.doc(userId).set({
                name: Name,
                description: Description,
                github: Github,
                sebsite: Website,
                specialty: Selectpicker
            }, {merge: true})
            

            userContext.doc(userId).update({
                profileCreated: true
            })
        })
        .catch(err => {
            console.log(err)
        })

        res.render("User/ProfileCreate", data)
    }
    else{
        data["error"] = "You need to register an account before creating a profile for that account"
        res.render("Auth/Regiset", data)
    }
}

module.exports = {
    GetMain,
    GetCreateUserProfile,
    PostCreateUserProfile
}