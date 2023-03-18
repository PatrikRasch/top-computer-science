const chessboardContainer = document.querySelector(".chessboardContainer");
const gameboardNumbers = document.querySelector(".gameboardNumbers");
const gameboard = document.querySelector(".gameboard");
const gameboardWrapper = document.querySelector(".gameboardWrapper");
const userInputStart = document.querySelector(".startingPosition");
const userInputEnd = document.querySelector(".endPosition");
const run = document.querySelector(".playButton");

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

const knightStart = userInputStart; // Get from user later on
const knightGoal = userInputEnd; // Where the knight should end up

const convertCoordinatesToArray = (toConvert) => {
  for (let i = 0; i < 64; i++) {
    if (gameboard.childNodes[i].id === toConvert.value) {
      toConvert = gameboard.childNodes[i].dataset.coord;
      toConvert = [parseInt(toConvert[0]), parseInt(toConvert[2])];
      return toConvert;
    }
  }
};

const chessboardGraph = new Map(); // Map
const speed = 10;

let visitedArray = [];
let startingPoint = [];
let movesQueue = [];
let initialPosition = [];

let numOfMoves = 0; // Number of "new" moves knight has taken

const checkIfValid = (nextPosition) => {
  // If the next position is outside of the board, return false
  if (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[1] > 7 || nextPosition[0] > 7) return false;
  // If the next position has already been visited, return false
  if (visitedArray.some((subArray) => subArray.toString() === nextPosition.toString())) return false;
  visitedArray.push(nextPosition);
  return true;
};

// Makes the graph for the chessboard covering all possible moves
const createGraph = (knightStart) => {
  initialPosition = [...knightStart];
  startingPoint = [...knightStart];
  visitedArray = [...knightStart];
  movesQueue = [[[startingPoint], 0]];
  // Add values to all nodes
  let squaresArray = [];
  // Push squares into array
  for (let child of gameboard.childNodes) {
    let pushIntoArray = [parseInt(child.dataset.coord[0]), parseInt(child.dataset.coord[2])];
    squaresArray.push(pushIntoArray);
  }
  for (square of squaresArray) {
    addNode(square); // Makes nodes for every square square
    for (let i = 0; i < 8; i++) {
      let testMove = [square[0] + legalMoves[i][0], square[1] + legalMoves[i][1]]; // Make a test move
      if (testMove[0] < 0 || testMove[1] < 0 || testMove[1] > 7 || testMove[0] > 7) continue; // Check if on board
      addEdge(square, testMove); // Add edges/links/value to all squares
    }
  }
};

// Add node. Adds key as the square the knight is currently in
const addNode = (square) => {
  chessboardGraph.set(square, []);
};

// Add edge, undirected. The values are arrays of edges (the other squares the current square is connected to)
const addEdge = (origin, destination) => {
  chessboardGraph.get(origin).push(destination);
};

function updateKnight(ms, testPosition, knightStart) {
  return new Promise((resolve) =>
    setTimeout(() => {
      knightStart[0] = testPosition[0];
      knightStart[1] = testPosition[1];
      setKnightStart(knightStart);
      resolve(testPosition);
    }, ms)
  );
}

// Flow control of the project. Ties everything together.
const knightMoves = async (knightGoal, startingPoint, speed) => {
  let parentMap = new Map(); // Creates the parent map → keys (positions) points to the values (parent position) they came from
  while (movesQueue.length > 0) {
    let testPosition = [...movesQueue[0][0][0]]; // Takes the first move from the queue
    // Test all legalMoves on the knight.
    for (let i = 0; i < 8; i++) {
      numOfMoves = movesQueue[0][1] + 1; // Adds +1 to number of moves for this move
      let nextPosition = [testPosition[0] + legalMoves[i][0], testPosition[1] + legalMoves[i][1]]; // Test all legal moves on the queue item
      if (!checkIfValid(nextPosition)) continue; // Check if the move is valid
      parentMap.set(nextPosition, testPosition); // Update the parent map
      await updateKnight(speed, nextPosition, startingPoint); // Update knight position using a setTimeout
      // Check if the knight has found the goal.
      if (nextPosition.toString() === knightGoal.toString()) {
        console.log(`You made it in ${numOfMoves} moves! Here's your path:`); // Log the number of moves it took
        retraceKnight(startingPoint, knightGoal, parentMap); // Show the path the knight took
        return true;
      }
      movesQueue.push([[nextPosition], numOfMoves]); // Since move is valid, but not the goal, add to queue.
    }
    movesQueue.shift(); // Remove the used value from the queue.
  }
};

// Retraces the knight once it has finished traversing the chessboard
const retraceKnight = (startingPoint, knightGoal, parentMap) => {
  let track = knightGoal;
  let resultArray = [];
  console.log(track);
  console.log(startingPoint);
  // While we haven't found the starting point, loop
  while (track.toString() !== startingPoint.toString()) {
    // For every loop, go over all parentMap's key-value pairs
    parentMap.forEach((key, value) => {
      console.log(parentMap);
      // If the value is equal to the position we're looking for ---
      if (value.toString() === track.toString()) {
        track = key; // Update the current position
        resultArray.push(track); // Push the current position into the array which holds our result
      }
    });
  }
  resultArray.reverse(); // Reverse the array to show path from start to end
  resultArray.push(knightGoal); // Push the end point into the array
  for (let i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i]);
  }
  console.log("Your path in chessboard coordinates:");
  for (let i = 0; i < resultArray.length; i++) {
    convertCoordinatesToId(resultArray[i]);
  }
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

const convertCoordinatesToId = (resultArray) => {
  for (let i = 0; i < 64; i++) {
    if (resultArray.toString() === gameboard.childNodes[i].dataset.coord) console.log(gameboard.childNodes[i].id);
  }
};

// Matches the position of the knight to the knightStart array.
const setKnightStart = (knightStart) => {
  for (let i = 0; i < 64; i++) {
    if (knightStart.toString() === gameboard.childNodes[i].dataset.coord) {
      return gameboard.childNodes[i].appendChild(knightImg);
    }
  }
};

userInputStart.addEventListener("input", (e) => {
  const knightStartCoordinates = convertCoordinatesToArray(knightStart);
  setKnightStart(knightStartCoordinates);
  return knightStartCoordinates;
});

userInputEnd.addEventListener("input", (e) => {
  const knightEndCoordinates = convertCoordinatesToArray(knightGoal);
  return knightEndCoordinates;
});

createGameboard();
idGameboard();

run.addEventListener("click", (e) => {
  const userInputStartConverted = convertCoordinatesToArray(knightStart);
  const userInputEndConverted = convertCoordinatesToArray(knightGoal);
  createGraph(userInputStartConverted);
  knightMoves(userInputEndConverted, userInputStartConverted, speed);
});

// BELOW: Thoughts and notes that were pivotal towards the end of the project in order to solve it.

// CP: Retrace the steps of the knight
// Q: Is it best here to create a graph of the entire chessboard first?
//    - That is, a key for each square with all of its edges/values/possible-moves attached.
//      In this way, the knight won't need to update any values as it traverses the chessboard.
//    - This should somehow allow for retracing of the knight's moves.
// Currently, the knight creates the graph as it goes, but doesn't create a undirectional graph.
// This makes it an incomplete graph.
// Q: How would the knight traverse the graph if we made the entire graph first?
//    - Using breadth-first search just as it already does.
// Would still need to ensure the move was valid (visited and on the board).

// The child nodes need to point back at their respective parent nodes:
// Every time the knight visits a square, make a new node.
// The node should have the new square as it's key and where it came from as its parent
// This way, every time the knight lands on a new square, it'll point back to where it came from
// → Allows for retracing!
