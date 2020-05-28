const Random = (min, max) => {
    
    let randomNums = [];

    let newString;

    for (let i = 0; i < 5; i++) {

        randomNums.push(Math.floor(Math.random() * (0 - 9 + 1)) + 9);
    }

    newString = randomNums.toString();

    let str = newString.replace(/,/g, "");

    return str;
}

module.exports = Random;