const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let stillPlaying = true;

class Field {
  constructor(field) {
    this.field =  field;
    this.y = 0;
    this.x = 0;
  }

  print() {
    return this.field.map(row => row.join('')).join('\n');
  }

  askUser() {
    let move = prompt('Which direction to move (l to move left, r to move right, u to move up, d to move down)');

    switch (move.toLowerCase()) {
      case 'r':
        console.log('Move Right')
        this.x += 1;
        break;

      case 'l':
        console.log('Move Left')
        this.x -= 1;
        break;
      case 'u':
        console.log('Move Up')
        this.y -= 1;
        break;
    
      case 'd':
        console.log('Move Down')
        this.y += 1;
        break;
    
      default:
        break;
    }

  }
  
  checkIfWin() {
    if (this.field[this.y] == undefined) {
      console.log('You lost, you fall outside of the field');
      stillPlaying = false;
    }

    switch (this.field[this.y][this.x]) {
      case hole:
        console.log('You lost, you fall into the hole');
        stillPlaying = false;
        break;
     case hat:
        console.log('You found the hat, you win');
        stillPlaying = false;
        break;
     case fieldCharacter:
        console.log('Keep going and look for the hat');
        this.field[this.y][this.x] = pathCharacter;
        stillPlaying = true;
        break;
      case undefined:
        console.log('You lost, you fall outside of the field');
        stillPlaying = false;
        break;

      default:
        break;
    }
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
        //Create the array that represent the field when taken in height and width
        let resultArr =[];
        for (let j = 0; j < height; j++) {
            let widthArr = [];
            for (let i = 0; i < width; i++) {
                widthArr.push(fieldOrHole());
            }
            resultArr.push(widthArr);
        }

        //Random position for the Hat
        let randomYOfHat = Math.floor(Math.random() * height);
        let randomXOfHat = Math.floor(Math.random() * width);
        while (randomXOfHat === 0 && randomYOfHat === 0) {
            randomYOfHat = Math.floor(Math.random() * height);
            randomXOfHat = Math.floor(Math.random() * width);
        }
        resultArr[randomYOfHat][randomXOfHat] = hat;

        //User start at the top left position
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


const myField = new Field(Field.generateField(10,10,20));

const playGame = myField => {
  while (stillPlaying) {
    console.log(myField.print());
    myField.askUser();
    myField.checkIfWin();
  }
  console.log('Game over!');
}

playGame(myField);