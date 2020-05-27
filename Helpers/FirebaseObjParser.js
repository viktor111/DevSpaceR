class FirebaseObjParser{
    
    ToArray(firebaseObj){
        console.log(firebaseObj)

        let newArr = []

        for (let index = 0; index < firebaseObj.length; index++) {

            const element = firebaseObj[index]["stringValue"];

            newArr.push(element)
        }

        return newArr
    }
}

module.exports = FirebaseObjParser