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

const knightStart = [0, 1]; // Get from user later on
const knightGoal = [7, 7]; // Where the knight should end up
const chessboardGraph = new Map(); // Map
const visitedArray = [[...knightStart]]; //

const startingPoint = [...knightStart];
const movesQueue = [[[startingPoint], 0]];
let numOfMoves = 0; // Number of "new" moves knight has taken

const checkIfValid = (testPosition, nextPosition) => {
  // If the next position is outside of the board, return false
  if (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[1] > 7 || nextPosition[0] > 7) return false;
  // If the next position has already been visited, return false
  if (visitedArray.some((subArray) => subArray.toString() === nextPosition.toString())) return false;
  visitedArray.push(nextPosition);
  return true;
};
// const checkIfInMap = (testPosition, nextPosition) => {
//   if (chessboardGraph.size === 0) addNode(testPosition); // If map is empty, add testPosition
//   // Iterate over all keys in the map
//   for (const key of chessboardGraph.keys()) {
//     // If there's a key that matches testPosition, take the key and push nextPosition into its value
//     if (key.toString() === testPosition.toString()) {
//       return chessboardGraph.get(key).push(nextPosition);
//     }
//   }
//   addNode(testPosition); // If no match, make new node
//   return true;
// };

// Makes the graph for the chessboard covering all possible moves
const createGraph = () => {
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

function updateKnight(ms, testPosition) {
  return new Promise((resolve) =>
    setTimeout(() => {
      knightStart[0] = testPosition[0];
      knightStart[1] = testPosition[1];
      setknightStart();
      resolve(testPosition);
    }, ms)
  );
}

const knightMoves = async (knightGoal, startingPoint) => {
  // The child nodes need to point back at their respective parent nodes:
  // Every time the knight visits a square, make a new node.
  // The node should have the new square as it's key and where it came from as its parent
  // This way, every time the knight lands on a new square, it'll point back to where it came from
  // → Allows for retracing!
  let parentMap = new Map();
  while (movesQueue.length > 0) {
    let testPosition = [...movesQueue[0][0][0]]; // Takes the first move from the queue
    // Test all legalMoves on the knight.
    for (let i = 0; i < 8; i++) {
      numOfMoves = movesQueue[0][1] + 1; // Adds +1 to number of moves for this move
      // Test all legal moves on the queue item
      let nextPosition = [testPosition[0] + legalMoves[i][0], testPosition[1] + legalMoves[i][1]];
      if (!checkIfValid(testPosition, nextPosition)) continue; // Check if the move is valid
      await updateKnight(1, nextPosition); // Update knight position using a setTimeout
      parentMap.set(nextPosition, testPosition);
      // Check if the knight has found the goal.
      if (nextPosition.toString() === knightGoal.toString()) {
        console.log(`You made it in ${numOfMoves} moves! Here's your path:`);
        retraceKnight(startingPoint, knightGoal, parentMap);
        return true;
      }
      movesQueue.push([[nextPosition], numOfMoves]); // Since move is valid, but not the goal, add to queue.
    }
    movesQueue.shift(); // Remove the value from the queue.
  }
};
// CP: Finish this function and implement it into the knightMoves function
const retraceKnight = (startingPoint, knightGoal, parentMap) => {
  // We need to access the square the knight is currently on in the parentMap
  // Then, we have to use its value to see where it came from
  // This must be repeated until the value it's pointing to is the startingPoint.
  // Turn all parentMap items into strings
  let track = knightGoal;
  let resultArray = [];
  while (track.toString() !== startingPoint.toString()) {
    parentMap.forEach((key, value) => {
      if (value.toString() === track.toString()) {
        track = key;
        resultArray.push(track);
      }
    });
  }
  resultArray.reverse();
  resultArray.push(knightGoal);
  for (let i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i]);
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

// Matches the position of the knight to the knightStart array.
const setknightStart = () => {
  for (let i = 0; i < 64; i++) {
    if (knightStart.toString() === gameboard.childNodes[i].dataset.coord) {
      return gameboard.childNodes[i].appendChild(knightImg);
    }
  }
};

// Changes the knight's position to whichever cell is clicked on the chessboard.
const clickknightStart = () => {
  for (let i = 0; i < 64; i++) {
    gameboard.children[i].addEventListener("click", (e) => {
      //   console.log(gameboard.children[i].dataset.coord);
      knightStart = gameboard.children[i].dataset.coord;
      setknightStart();
    });
  }
};

createGameboard();
idGameboard();
setknightStart();
clickknightStart();
knightMoves(knightGoal, startingPoint);
createGraph();
