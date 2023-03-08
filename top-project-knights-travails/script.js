// For this project, you’ll need to use a data structure that’s similar (but not identical) to a binary tree.
// For a summary of a few different examples, reference this article.

// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

// You can think of the board as having 2-dimensional coordinates. Your function would therefore look like:

// knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]

// 1. Put together a script that creates a game board and a knight. → DONE

// 2. Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.

// 3. Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series.

// 4. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:
//   > knightMoves([3,3],[4,3])
//   => You made it in 3 moves!  Here's your path:
// [3,3]
// [4,5]
// [2,4]
// [4,3]
const container = document.querySelector(".container");
const gameboardNumbers = document.querySelector(".gameboardNumbers");
const gameboard = document.querySelector(".gameboard");
const gameboardWrapper = document.querySelector(".gameboardWrapper");

const knightImg = document.createElement("img");
knightImg.src = "img/knight-pixel-art.png";
knightImg.setAttribute("class", "knightImg");

// Determines the starting position of the knight.
let knightPosition = [0, 1];

const legalMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [-1, 2],
  [1, -2],
  [-1, -2],
];

const movesTaken = [];

const knightGoal = [2, 2];

// Need a function that uses Breadth-First search by visiting all the possible methods of getting to the user's square and choosing the shortest one.

const knightMoves = () => {
  console.log("knightPosition", knightPosition);
  console.log("knightGoal", knightGoal);

  if (knightPosition !== knightGoal) {
    knightPosition[0] = knightPosition[0] + legalMoves[0][0];
    knightPosition[1] = knightPosition[1] + legalMoves[0][1];
    movesTaken.push(knightPosition);
    console.log(movesTaken);
  }

  setKnightPosition();
};

// Creates the chessboard squares using two nested loops and labels the cells as either white or black respectively.
const createGameboard = () => {
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      const cell = document.createElement("div");
      if ((i + j) % 2 === 0) cell.className = "cell white";
      else cell.className = "cell black";
      gameboard.appendChild(cell);
    }
  }
};

// Gives the chessboard squares their respective ID's in relation to how a traditional chessboard is labelled.
const idGameboard = () => {
  let num = 0;
  for (i = 8; i > 0; i--) {
    for (j = 0; j < 8; j++) {
      let letter = String.fromCharCode(97 + j).toUpperCase();
      gameboard.childNodes[num].id = letter + i;
      gameboard.childNodes[num].dataset.coord = i - 1 + "," + j;
      num++;
    }
  }
};

// Matches the position of the knight to the knightPosition array.
const setKnightPosition = () => {
  for (let i = 0; i < 64; i++) {
    if (knightPosition.toString() === gameboard.childNodes[i].dataset.coord) {
      return gameboard.childNodes[i].appendChild(knightImg);
    }
  }
};

const stayOnGameboard = () => {
  knightPosition.forEach((element) => {
    if (element < 0 || element > 7) return false;
    else return true;
  });
};

// Changes the knight's position to whichever cell is clicked on the chessboard.
const clickKnightPosition = () => {
  for (let i = 0; i < 64; i++) {
    gameboard.children[i].addEventListener("click", (e) => {
      //   console.log(gameboard.children[i].dataset.coord);
      knightPosition = gameboard.children[i].dataset.coord;
      setKnightPosition();
    });
  }
};

createGameboard();
idGameboard();
setKnightPosition();

clickKnightPosition();
stayOnGameboard();
knightMoves();
