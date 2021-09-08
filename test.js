const hole = 'O';
const fieldCharacter = '░';



const fieldOrHole = () => {
    let randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0 ) {
        return hole;
    } 
    return fieldCharacter;
    // if (percentageOfHole >= 0 && percentageOfHole <= 100) {
    //     if (randomNumber < percentageOfHole) {
    //         return hole;
    //     } else if (randomNumber >= percentageOfHole) {
    //         return fieldCharacter;
    //     }
    // }
}
const checkPercentage = (arr) => {
    let countOfHole = 0;
    for (let i of arr) {
        i.forEach(item => {
            if (item === hole) {
                countOfHole++;
            }
        })
    }
    return countOfHole;
};

const generateTest = (width,height) => {
    let resultArr = [];
    for (let i = 0; i < height; i++) {
        let widthArr = [];
        for (let j = 0; j < width; j++) {
            widthArr.push(fieldOrHole());
        }
        resultArr.push(widthArr);
    } 

    return resultArr;
}

const finalFunc = (width, height, percentage) => {
    let finalArr = generateTest(width,height);

    
    let actualPercentage;
    // while (actualPercentage !== percentage) {
    //     finalArr = generateTest(width,height);
    //     actualPercentage = Math.floor(checkPercentage(finalArr) * 100 / width * height);
    // }

    console.log(finalArr);
    let actualHolePercent = Math.floor((checkPercentage(finalArr) * 100 / (width * height)));
    console.log(actualHolePercent);
}

console.log(finalFunc(3,4,50));
// const generateField =  (width,height,percentageOfHole) => {
    
//     const plainFieldGenerate = () => {
//         let resultArr =[];
//         for (let j = 0; j < height; j++) {
//         let widthArr = [];
//         for (let i = 0; i < width; i++) {
//             widthArr.push(fieldOrHole());
//         }
//         return resultArr.push(widthArr);    
//     }
//     }

//     let actualHolePercent = Math.floor((checkPercentage(plainFieldGenerate) * 100 / width * height));
//     while (actualHolePercent !== percentageOfHole) {
//         plainFieldGenerate();
//     }
    
//     // do {
        
//     // } while (checkPercentage(resultArr) * 100 / width * height  > percentageOfHole) 
//     return resultArr;
// }
// console.log(generateField(4,3,50));


