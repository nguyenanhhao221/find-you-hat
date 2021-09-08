const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const isStillPlaying = true;

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
        let randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber <= percentageOfHole ) {
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
        for (let item of arr) {
            for (let index = 0; index < item.length; index++) {
              if (item[index] ==  hole) {
                countOfHole+=1;
              }
            }
        }
        return Math.floor((countOfHole*100) / (width * height));
    };
    
    let blankField = plainField();
    let actualHolePercent = checkPercentage(blankField);
    while (actualHolePercent > percentageOfHole) {
        blankField = plainField();
        actualHolePercent = checkPercentage(blankField);
    }
    return blankField;
  }
  
}

const testHole = arr => {
  let countOfHole = 0;
  for (const item of arr) {
    for (let i = 0; i < item.length; i++) {
      if (item[i] == hole) {
        countOfHole+=1;
      }
    }
    
  }
  console.log(countOfHole);
}
const myField = new Field(Field.generateField(10,10,20));
testHole(myField.field);
console.log(myField.print());

