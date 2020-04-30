const admin = require("firebase-admin");

class DbContext{
    Initialize(db){
        let constring = "devspacer-85c37/";
        let dbRefferal = admin.firestore().collection(db);

        return dbRefferal;
    }
}

module.exports = DbContext;