const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field =  field;
    this.y = 0;
    this.x = 0;
  }

  print() {
    return this.field.map(row => row.join('')).join('\n');
  }

  ask() {
    let move = prompt('Which direction to move (l to move left, r to move right, u to move up, d to move down)');

  }

  static generateField(height, width, percentageOfHole) {

    const fieldOrHole = () => {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0 ) {
            return hole;
        } 
        return fieldCharacter;
    }

    const plainField = () => {
        let resultArr =[];
        for (let j = 0; j < height; j++) {
            let widthArr = [];
            for (let i = 0; i < width; i++) {
                widthArr.push(fieldOrHole());
            }
            resultArr.push(widthArr);
        }
        resultArr[0][0] = pathCharacter;
        return resultArr;
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
    
    let blankField = plainField();
    let actualHolePercent = 0;
    while (actualHolePercent < percentageOfHole) {
        blankField = plainField();
        actualHolePercent = Math.floor((checkPercentage(blankField) * 100 / (width * height)));
    }

    return blankField;
  }
  
}


const myField = new Field(Field.generateField(10,10,30));
console.log(myField.print());