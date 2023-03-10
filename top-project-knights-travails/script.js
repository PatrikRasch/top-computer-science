// For this project, you’ll need to use a data structure that’s similar (but not identical) to a binary tree.
// For a summary of a few different examples, reference this article.

// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

// You can think of the board as having 2-dimensional coordinates. Your function would therefore look like:

// knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
// knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]

// 1. Put together a script that creates a game board and a knight. → DONE
// 2. Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board. → DONE
// 3. Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series. → DONE

// 4. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:
//   > knightMoves([3,3],[4,3])
//   => You made it in 3 moves!  Here's your path:
// [3,3]
// [4,5]
// [2,4]
// [4,3]

// ------------- MY NOTES BELOW -------------
// Need a function that uses Breadth-First search by visiting all the possible methods of getting to the user's square and choosing the shortest one.
// 1. Write a function that checks if the position is correct. If not, it takes every move possible from the current position and adds it into the queue
// 2. For every move, check if the move is valid (hasn't been visited before and is on the board)
// This way, we will always check every level before moving on to the "children steps".

const container = document.querySelector(".container");
const gameboardNumbers = document.querySelector(".gameboardNumbers");
const gameboard = document.querySelector(".gameboard");
const gameboardWrapper = document.querySelector(".gameboardWrapper");

const knightImg = document.createElement("img");
knightImg.src = "img/knight-pixel-art.png";
knightImg.setAttribute("class", "knightImg");

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

// Determines the starting position of the knight.
let knightPosition = [3, 3];

const movesQueue = [[0, 1]];
const visited = [];
const knightGoal = [4, 3];

const checkIfValid = (newPosition) => {
  // If the new position is outside of the board, then return false
  if (newPosition[0] < 0 || newPosition[1] < 0 || newPosition[1] > 7 || newPosition[0] > 7) return false;
  // If the new position exists in the visited array, then return false
  if (visited.some((subArray) => subArray.toString() === newPosition.toString())) return false;
  // console.log(visited);
  visited.push(newPosition);
  // console.log(visited);
};

function updateKnight(ms, tempKnight) {
  return new Promise((resolve) =>
    setTimeout(() => {
      knightPosition[0] = tempKnight[0];
      knightPosition[1] = tempKnight[1];
      setKnightPosition();
      console.log(knightPosition);
      resolve(tempKnight);
    }, ms)
  );
}

const knightMoves = async () => {
  visited.push(knightPosition);
  // Initialise the number of moves the knight has taken to get to its goal.
  let numOfMoves = 0;
  while (knightPosition.toString() !== knightGoal.toString()) {
    // Take all legalMoves and test them on the knight. If the moves are valid, push them into the movesQueue.
    // Loop as 8 iterations as the knight can always make 8 possible moves.
    for (let i = 0; i < 8; i++) {
      // Take the first move from the queue and work on that one.
      let tempKnight = [...movesQueue[0]];
      // Test each move using the iterator.
      tempKnight[0] = tempKnight[0] + legalMoves[i][0];
      tempKnight[1] = tempKnight[1] + legalMoves[i][1];
      // Set the value that's now to be checked.
      let newValue = [tempKnight[0], tempKnight[1]];
      // Check if the move is valid (not outside the board and hasn't been visisted before).
      if (checkIfValid(newValue) === false) continue;
      // Update the position of the knight on the board with a promise using setTimeout.
      await updateKnight(30, tempKnight);
      numOfMoves++;
      // Check if the knight has found the goal.
      if (newValue.toString() === knightGoal.toString()) {
        console.log(`You made it in ${numOfMoves} moves! Here's your path:`);
        return true;
      }
      // Since the value is valid but not the target end value, add it to the queue.
      movesQueue.push(newValue);
    }
    // Remove the value from the queue.
    movesQueue.shift();
  }
};

// 4. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:
//   > knightMoves([3,3],[4,3])
//   => You made it in 3 moves!  Here's your path:
// [3,3]
// [4,5]
// [2,4]
// [4,3]

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
knightMoves();
