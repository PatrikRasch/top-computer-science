// Make the pretty tree visualisation in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array, root) {
    this.array = array;
    this.root = root;
  }
}

let root = null;

const sortArray = (array) => {
  return array.sort((a, b) => a - b);
};

const removeDuplicates = (array) => {
  for (let i = 0; i <= array.length; i++) {
    while (array[i] === array[i + 1]) {
      let index = array.indexOf(array[i]);
      if (index > -1) {
        array.splice(index, 1);
      } else return;
    }
  }
};

const buildTree = (arr, start, end) => {
  if (start > end) return null;

  let mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
};

const insert = (root, key) => {
  if (arr.indexOf(key) === -1) arr.push(key);
  if (!root) {
    root = new Node(key);
    return root;
  }
  if (key < root.data) {
    root.left = insert(root.left, key);
    return root;
  }
  if (key > root.data) {
    root.right = insert(root.right, key);
    return root;
  }
};

const remove = (root, key) => {
  if (!root) {
    console.log("No root exists");
    return;
  }
  // The traversal stages
  // Recur down into the BST if key is smaller than the node
  if (key < root.data) {
    root.left = remove(root.left, key);
    // Recur down into the BST if key is larger than the node
  } else if (key > root.data) {
    root.right = remove(root.right, key);

    // The deletion stages
  } else {
    // Node only has one or zero children
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    // Node has two children
    root.data = minValue(root.right);

    // Delete the inorder successor
    root.right = remove(root.right, root.key);
  }

  return root;
};

function minValue(root) {
  let minv = root.data;
  while (root.left !== null) {
    minv = root.left.data;
    root = root.left;
  }
  return minv;
}

const find = (root, value) => {
  if (!root) {
    console.log("There is no root!");
    return null;
  }
  if (value < root.data) {
    root.left = find(root.left, value);
  }
  if (value > root.data) {
    root.right = find(root.right, value);
  }
  if (value === root.data) {
    console.log("The 'find' node is ", root);
  }
  return root;
};

const levelOrder = (root) => {
  document.write("Level order: ");
  let queue = [];
  let finalArr = [];
  const levelOrderFunction = (root) => {
    // Only for the first node, push into queue
    document.write(root.data + " ");
    if (queue.indexOf(root) === -1) queue.push(root);
    // Push children into queue
    if (root.left !== null) queue.push(root.left);
    if (root.right !== null) queue.push(root.right);
    // Remove first item from queue, then push it into the final array
    let temp = queue.shift();
    finalArr.push(temp.data);
    // Stop recursion when the queue is empty
    if (queue.length === 0) {
      console.log("Level order:", finalArr);
      return root;
    }
    levelOrderFunction(queue[0]);
  };
  levelOrderFunction(root);
  document.write("<br>");
};

const levelOrderIteration = (root) => {
  if (root === null) return;

  const queue = [root];
  const total = [];
  while (queue.length) {
    // Loop based on the length of queue
    for (let i = 0; i < queue.length; i++) {
      // Removes the first item from the array and store it in <item>
      const item = queue.shift();
      // Push the removed element into the ans array
      total.push(item.data);
      // If the node (item) has children, push them into the queue, repeating the process
      if (item.left) queue.push(item.left);
      if (item.right) queue.push(item.right);
    }
  }
  console.log("Traverse the levels using iteration, breadth-first:", total);
  return total;
};

// Inorder → Reads from left to right
const inorder = (root) => {
  document.write("Inorder: ");
  const inorderArr = [];
  const inorderFunction = (root) => {
    document.write(root.data + " ");
    if (root.left === null) {
      inorderArr.push(root.data);
    }
    // If there's still smaller nodes on the left, recur down
    if (root.left !== null) {
      // Push the leftmost node
      inorderArr.push(root.data);

      root.left = inorderFunction(root.left);
      // Push parent node
      // Push the rightmost node
      root.right = inorderFunction(root.right);
    }
    return root;
  };
  inorderFunction(root);
  console.log("Inorder:", inorderArr);
  document.write("<br>");
};

// Preorder → Reads "root → all children left to right"
const preorder = (root) => {
  document.write("Preorder: ");
  const preorderArr = [];
  const preorderFunction = (root) => {
    if (root === null) return root;
    document.write(root.data + " ");
    preorderArr.push(root.data);
    root.left = preorderFunction(root.left);
    root.right = preorderFunction(root.right);
    return root;
  };
  preorderFunction(root);
  console.log("Preorder:", preorderArr);
  document.write("<br>");
};

// Postorder → Reads "Bottom left → sibling, parent → same for right hand side"
const postorder = (root) => {
  document.write("Postorder: ");
  const postorderArr = [];
  const postorderFunction = (root) => {
    if (root.left !== null) root.left = postorderFunction(root.left);
    if (root.right !== null) root.right = postorderFunction(root.right);
    document.write(root.data + " ");
    postorderArr.push(root.data);
    return root;
  };
  postorderFunction(root);
  document.write("<br>");
  console.log("Postorder:", postorderArr);
};

// Height → Number of nodes from inputNode to longest leaf node
const height = (inputNode) => {
  // Base Case
  if (!inputNode) {
    return -1;
  }
  return Math.max(height(inputNode.left), height(inputNode.right)) + 1;
};

const depth = (root, inputNode) => {
  const dfs = (node, currentDepth) => {
    // Base case
    if (node === null) return null;
    // If inputNode is found, return the depth
    if (node === inputNode) return currentDepth;

    // Go down leftwards searching for the inputNode
    const leftDepth = dfs(node.left, currentDepth + 1);
    // Return leftDepth with its value of 1
    if (leftDepth !== null) return leftDepth;

    // Go down rightwards searching for the inputNode
    const rightDepth = dfs(node.right, currentDepth + 1);
    // Return rightDepth with its value of 1
    if (rightDepth !== null) return rightDepth;

    // Returns null if the inputNode was not found in the subtree
    return null;
  };
  return dfs(root, 0);
};

const isBalanced = (root) => {
  if (root === null) return -1;

  // Ensures that the rightHeight and the leftHeight function only traverses into their respective branches in relation to root.
  let rightRoot = root.right;
  let leftRoot = root.left;

  const rightHeight = (rightRoot) => {
    if (rightRoot === null) return -1;
    const right = rightHeight(rightRoot.right) + 1;
    const left = rightHeight(rightRoot.left) + 1;
    return Math.max(right, left);
  };
  const leftHeight = (leftRoot) => {
    if (leftRoot === null) return -1;
    const right = leftHeight(leftRoot.right) + 1;
    const left = leftHeight(leftRoot.left) + 1;
    return Math.max(left, right);
  };

  console.log("Right, up:", rightHeight(rightRoot));
  console.log("Left, down:", leftHeight(leftRoot));

  if (Math.abs(leftHeight(leftRoot) - rightHeight(rightRoot)) > 1) {
    return false;
  } else return true;
};

// Write a rebalance function which rebalances an unbalanced tree.
// Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

const rebalance = (root) => {
  let newArr = [];

  const placeInArray = (root) => {
    if (root === null) return root;
    if (newArr.indexOf(root) === -1) newArr.push(root.data);

    if (root.left !== null) newArr.push(root.left.data);
    placeInArray(root.left);
    if (root.right !== null) newArr.push(root.right.data);
    placeInArray(root.right);
  };
  placeInArray(root);
  let sortedArray = sortArray(newArr);
  let duplicatesRemoved = removeDuplicates(newArr);
  let long = arr.length;
  root = buildTree(sortedArray, 0, long - 1);
  prettyPrint(root);
};

// let arr = [5, 2, 1, 3, 6, 4, 7, 7, 4, 1, 7, 7, 2];

// let sortedArray = sortArray(arr);
// let duplicatesRemoved = removeDuplicates(arr);

// let long = arr.length;
// root = buildTree(sortedArray, 0, long - 1);

// insert(root, 10);
// remove(root, 6);
// find(root, 3);
// levelOrder(root);
// levelOrderIteration(root);
// inorder(root);
// preorder(root);
// postorder(root);
// insert(root, 3.5);
// insert(root, 1.1);
// insert(root, 1.2);
// insert(root, 6);
// insert(root, 5.5);
// insert(root, 5.8);
// insert(root, 5.9);
// insert(root, 64.7);
// insert(root, 64.9);
// height(root);
// console.log("The height of the node is:", height(root));
// depth(root, root.right.left);
// console.log("The depth of the node is:", depth(root, root.right));

// isBalanced(root);
// prettyPrint(root);
// rebalance(root);

const driverScript = () => {
  // Makes the array (numArray) with random numbers
  const createArray = () => {
    let numArray = [];
    for (let i = 0; i < 25; i++) {
      let num = Math.floor(Math.random() * 200);
      numArray.push(num);
    }
    return numArray;
  };
  createArray();

  // Sorts the array and removes duplicates
  let numArray = sortArray(createArray());
  removeDuplicates(numArray);
  console.log("Sorted array", numArray);

  // Builds the array
  let long = numArray.length;
  root = buildTree(numArray, 0, long - 1);

  console.log(isBalanced(root));

  levelOrder(root);
  preorder(root);
  postorder(root);
  inorder(root);

  prettyPrint(root);
};

driverScript();

// Tie it all together
// 1. Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
// 2. Confirm that the tree is balanced by calling isBalanced
// 3. Print out all elements in level, pre, post, and in order
// 4. Unbalance the tree by adding several numbers > 100
// 5. Confirm that the tree is unbalanced by calling isBalanced
// 6. Balance the tree by calling rebalance
// 7. Confirm that the tree is balanced by calling isBalanced
// 8. Print out all elements in level, pre, post, and in order
