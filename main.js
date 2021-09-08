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

  checkIfWin() {
    if (this.field[this.y] == undefined) {
      console.log('You lost, you fall outside of the field');
      stillPlaying = false;
    }
    if (stillPlaying == true) {
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
  
        case pathCharacter:
          console.log('You move back, keep going to find the hat');
          // if (this.field[this.y][this.x + 1] == pathCharacter) {
          //   this.field[this.y][this.x +1] = fieldCharacter;
          // }

          // currentPositon = fieldCharacter;
          // this.field[this.y][(this.x+1)] = fieldCharacter;
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
  }

  askAndMove() {
    let move = prompt('Which direction to move (l to move left, r to move right, u to move up, d to move down)');
    // Adjust the x,y right after user input
    // Special case to check when user move backward or foward
    // Also Check undefined because when user move out of the field, it lost, when user move out of the filed transfer to the checkIfWin function 
    switch (move.toLowerCase()) {
      case 'r':
        if (this.field[this.y][this.x + 1] !== pathCharacter && this.field[this.y][this.x + 1] !== undefined){
          console.log('Move Right');
          this.x += 1;
        } else {
          console.log('Move Right')
          this.field[this.y][this.x] = fieldCharacter;
          this.x +=1;
        }
        break;

      case 'l':
        if (this.field[this.y][this.x - 1] !== pathCharacter && this.field[this.y][this.x - 1] !== undefined){
          console.log('Move Left');
          this.x -= 1;
        } else {
          console.log('Move Left')
          this.field[this.y][this.x] = fieldCharacter;
          this.x -=1;
        }
        break;
      
      case 'u':
        if (this.field[this.y - 1] == undefined) {
          this.y -=1;
        } else if (this.field[this.y - 1][this.x] !== pathCharacter && this.field[this.y - 1] !== undefined) {
          console.log('Move Up')
          this.y -= 1;
        } else {
          console.log('Move Up')
          this.field[this.y][this.x] = fieldCharacter;
          this.y -=1;
        }
        break;
      case 'd':
        if (this.field[this.y + 1] == undefined) {
          this.y +=1;
        } else if (this.field[this.y + 1][this.x] !== pathCharacter && this.field[this.y + 1] !== undefined) {
          console.log('Move Down')
          this.y += 1;
        } else {
          console.log('Move Down')
          this.field[this.y][this.x] = fieldCharacter;
          this.y +=1;
        }
        break;
      default:
        console.log("Please enter valid character 'l','r','u','d' ");
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

    const randomHat = (arr, hatOrPath) => {
      let randomY = Math.floor(Math.random() * height);
      let randomX = Math.floor(Math.random() * width);

      arr[randomY][randomX] = hatOrPath;
      return arr;
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

        //Put random Hat position into the field
        randomHat(resultArr,hat);
        //Put random Path Character position into the field
        randomHat(resultArr,pathCharacter);

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

//Adjust random starter position
const adjustStartPosition = fieldClass => {
  let y = 0;
  let x = 0;
  fieldClass.field.filter((item,index) => {
    if (item.includes(pathCharacter)) {
      y = index;
      x = item.indexOf(pathCharacter);
    }
  })

  fieldClass.x = x;
  fieldClass.y = y;
  return fieldClass;
  
}

const playGame = myField => {
  adjustStartPosition(myField);
  while (stillPlaying) {
    console.log(myField.print());
    myField.askAndMove();
    myField.checkIfWin();
  }
  console.log('Game over!');
}

playGame(myField);