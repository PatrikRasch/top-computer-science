const chessboardContainer = document.querySelector(".chessboardContainer");
const gameboardNumbers = document.querySelector(".gameboardNumbers");
const gameboard = document.querySelector(".gameboard");
const gameboardWrapper = document.querySelector(".gameboardWrapper");
const userInputStart = document.querySelector(".startingPosition");
const userInputEnd = document.querySelector(".endPosition");
const run = document.querySelector(".playButton");
const result = document.querySelector(".result");

const knightImg = document.createElement("img");
knightImg.src = "img/knight-pixel-art.png";
knightImg.setAttribute("class", "knightImg");

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

const convertCoordinatesToArray = (toConvert) => {
  for (let i = 0; i < 64; i++) {
    if (gameboard.childNodes[i].id === toConvert.value) {
      toConvert = gameboard.childNodes[i].dataset.coord;
      toConvert = [parseInt(toConvert[0]), parseInt(toConvert[2])];
      return toConvert;
    }
  }
};

const convertCoordinatesToId = (resultArray) => {
  for (let i = 0; i < 64; i++) {
    if (resultArray.toString() === gameboard.childNodes[i].dataset.coord) {
      console.log(gameboard.childNodes[i].id);
      resultArrayCoordinates.push(gameboard.childNodes[i].id);
    }
  }
};

// Matches the position of the knight to the userInputStart array.
const placeKnightOnBoard = (userInputStart) => {
  for (let i = 0; i < 64; i++) {
    if (userInputStart.toString() === gameboard.childNodes[i].dataset.coord) {
      return gameboard.childNodes[i].appendChild(knightImg);
    }
  }
};

const updateKnight = (ms, testPosition, userInputStart) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      userInputStart[0] = testPosition[0];
      userInputStart[1] = testPosition[1];
      placeKnightOnBoard(userInputStart);
      resolve(testPosition);
    }, ms)
  );
};

const checkIfValid = (nextPosition) => {
  // If the next position is outside of the board, return false
  if (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[1] > 7 || nextPosition[0] > 7) return false;
  // If the next position has already been visited, return false
  if (visitedSquaresArr.some((subArray) => subArray.toString() === nextPosition.toString())) return false;
  visitedSquaresArr.push(nextPosition);
  return true;
};

// Add node. Adds key as the square the knight is currently in
const addNode = (square) => {
  chessboardGraph.set(square, []);
};

// Add edge, undirected. The values are arrays of edges (the other squares the current square is connected to)
const addEdge = (origin, destination) => {
  chessboardGraph.get(origin).push(destination);
};

// Makes the graph for the chessboard covering all possible moves
const createGraph = (userInputStart) => {
  // initialPosition = [...userInputStart];
  startingPoint = [...userInputStart];
  visitedSquaresArr = [...userInputStart];
  movesQueue = [[[startingPoint], 0]];
  // Add values to all nodes
  let squaresArray = [];
  // Push squares into array
  for (let child of gameboard.childNodes) {
    let pushIntoArray = [parseInt(child.dataset.coord[0]), parseInt(child.dataset.coord[2])];
    squaresArray.push(pushIntoArray);
  }
  for (square of squaresArray) {
    addNode(square); // Makes nodes for every square
    for (let i = 0; i < 8; i++) {
      let testMove = [square[0] + legalMoves[i][0], square[1] + legalMoves[i][1]]; // Make a test move
      if (testMove[0] < 0 || testMove[1] < 0 || testMove[1] > 7 || testMove[0] > 7) continue; // Check if on board
      addEdge(square, testMove); // Add edges/links/value to all squares
    }
  }
};

// Flow control of the project. Ties everything together.
const knightMoves = async (startingPoint, userInputEnd, speed, initialPosition) => {
  initialPosition = [...startingPoint]; // Ensures that we always have a reference to where we round started.
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
      if (nextPosition.toString() === userInputEnd.toString()) {
        console.log(`You made it in ${numOfMoves} moves! Here's your path:`); // Log the number of moves it took
        retraceKnight(initialPosition, userInputEnd, parentMap, startingPoint); // Show the path the knight took
        return true;
      }
      movesQueue.push([[nextPosition], numOfMoves]); // Since move is valid, but not the goal, add to queue.
    }
    movesQueue.shift(); // Remove the used value from the queue.
  }
};

// Retraces the knight once it has finished traversing the chessboard
const retraceKnight = (initialPosition, userInputEnd, parentMap) => {
  let track = [...userInputEnd];
  let resultSet = new Set();
  // While we haven't found the initial point, loop
  while (!resultSet.has(initialPosition.toString())) {
    // For every loop, go over all parentMap's key-value pairs
    parentMap.forEach((key, value) => {
      if (value.toString() === track.toString()) {
        track = key; // Update the current position
        resultSet.add(track.toString()); // Push the current position into the array which holds our result
      }
    });
  }
  let resultArray = [...resultSet];
  resultArray.reverse(); // Reverse the array to show path from start to end
  resultArray.push(userInputEnd.toString()); // Push the end point into the array
  for (let i = 0; i < resultArray.length; i++) {
    console.log([parseInt(resultArray[i][0]), parseInt(resultArray[i][2])]);
  }
  console.log("Your path in chessboard coordinates:");
  for (let i = 0; i < resultArray.length; i++) {
    convertCoordinatesToId(resultArray[i]);
    const div = document.createElement("div");
    div.classList.add("resultHolder");
    const arrow = document.createElement("div");
    arrow.textContent = "→";
    div.textContent = resultArrayCoordinates[i];
    result.appendChild(div);
    if (i + 1 < resultArray.length) result.appendChild(arrow);
  }
};

userInputStart.addEventListener("input", (e) => {
  const userInputStartCoordinates = convertCoordinatesToArray(userInputStart);
  placeKnightOnBoard(userInputStartCoordinates);
  return userInputStartCoordinates;
});

userInputEnd.addEventListener("input", (e) => {
  const userInputEndCoordinates = convertCoordinatesToArray(userInputEnd);
  return userInputEndCoordinates;
});

run.addEventListener("click", (e) => {
  result.textContent = "";
  const userInputStartConverted = convertCoordinatesToArray(userInputStart);
  const userInputEndConverted = convertCoordinatesToArray(userInputEnd);
  createGraph(userInputStartConverted);
  knightMoves(userInputStartConverted, userInputEndConverted, speed, initialPosition);
});

const chessboardGraph = new Map(); // Map
const speed = 10;

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
let visitedSquaresArr = [];
let startingPoint = [];
let movesQueue = [];
let initialPosition = [];
let resultArrayCoordinates = [];

let numOfMoves = 0; // Number of "new" moves knight has taken

createGameboard();
idGameboard();

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
