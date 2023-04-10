const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const user = '░';
const pathUser = '*';
const row = 10;
const col = 10;

const field = [];

// draw the field
for (let i = 0; i < row; i++) {
  const row = [];
  for (let j = 0; j < col; j++) {
    row.push(user);
  }
  field.push(row);
}

// generate the number of holes for eg this is 1/4 of the number of fields
let numHoles = Math.floor((row * col) / 4);

// generate random hole position
for (let i = 0; i < numHoles; i++) {
  let x = Math.floor(Math.random() * col);
  let y = Math.floor(Math.random() * row);
  if (x === 0 && y === 0) {     // cannot be in user start pos
    i--;
  } else {
    field[y][x] = hole;
  }
}

// place HAT randomly
const hatX = Math.floor(Math.random() * col);
const hatY = Math.floor(Math.random() * row);
field[hatY][hatX] = hat;

// user start pos
let userPos = [0, 0];
field[userPos[0]][userPos[1]] = pathUser;

// print the field to console
function printField() {
  for (let i = 0; i < field.length; i++) {
    console.log(field[i].join(''));
  }
}

// Function to get user input and update the user's position
function userMove() {
    let move = prompt('Which way would you like to move? (u/d/l/r)');
    while (!['u', 'd', 'l', 'r']) {
    console.log('Please enter u, d, l, or r.');
    move = prompt('Which way? (u/d/l/r) ');
    }

    switch (move) {
      case 'u':
        userPos[0] -= 1;
        break;
      case 'd':
        userPos[0] += 1;
        break;
      case 'l':
        userPos[1] -= 1;
        break;
      case 'r':
        userPos[1] += 1;
        break;
      default:
        console.log('Invalid move!');
    }

    //if user goes into a hole
    if (field[userPos[0]][userPos[1]] === hole) {
        console.log('Sorry, you fell into a hole!');
        process.exit(0);
      }
    
  
    // if the user go out of bounds
    if (userPos[0] < 0 || userPos[0] >= row || userPos[1] < 0 || userPos[1] >= col) {
      console.log('Out of bounds! Game over.');
      process.exit(0);
    }
  
    // if the user find the hat
    if (field[userPos[0]][userPos[1]] === hat) {
      console.log('Congratulations, you found the hat!');
      process.exit(0);
    }
  
    // Update the game field with the new user position
    field[userPos[0]][userPos[1]] = pathUser;
  
    // clear the field, update the field again 
    clear();
    printField();
  
    // user continue next move
    userMove();
  }

// Print the welcome message
console.log('WELCOME ADVENTURER. \nOur wizard has lost his HAT. \nYOU, have to help him find his hat. \nUse (U/D/L/R) to move Up, Down, Left, Right as you navigate through this MAZE OF TERROR. \nBEWARE OF THE HOLES IN THE GROUND.');

// Print the initial game field and start the game
printField();
userMove();