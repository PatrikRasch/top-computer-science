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

// Sorts the array from smallest to larger number
const sortArray = (array) => {
  return array.sort((a, b) => a - b);
};

// Removes duplicates from the array
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

// Builds the Balanced Search Tree
const buildTree = (arr, start, end) => {
  if (start > end) return null;

  let mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
};

// Inserts another number into the Balanced Search Tree when called
const insert = (root, key, arr) => {
  if (arr.indexOf(key) === -1) arr.push(key);
  if (!root) {
    root = new Node(key);
    return root;
  }
  if (key < root.data) {
    root.left = insert(root.left, key, arr);
    return root;
  }
  if (key > root.data) {
    root.right = insert(root.right, key, arr);
    return root;
  }
};

// Removes a number from the Balanced Search Tree when called
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

// Finds the node containing the inputted value in the Balanced Search Tree.
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

// Prints out the Balanced Search Tree in level order.
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

// Uses iteration to print out the Balanced Search Tree in level order.
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

// Prints out the Balanced Search Tree in order.
// Inorder → Reads from left to right
const inorder = (root) => {
  document.write("Inorder: ");
  const inorderArr = [];
  const inorderFunction = (root) => {
    if (root === null) return root;
    if (root.left) inorderFunction(root.left);
    inorderArr.push(root.data);
    document.write(root.data + " ");
    root.right = inorderFunction(root.right);
    return root;
  };
  inorderFunction(root);
  console.log("Inorder:", inorderArr);
  document.write("<br>");
};

// Prints out the Balanced Search Tree in pre order.
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

// Prints out the Balanced Search Tree in post order.
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

// Returns the height of the node inputted in the Balanced Search Tree
// Height → Number of nodes from inputNode to longest leaf node
const height = (inputNode) => {
  // Base Case
  if (!inputNode) {
    return -1;
  }
  return Math.max(height(inputNode.left), height(inputNode.right)) + 1;
};

// Returns the depth of the node inputted in the Balanced Search Tree
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

// Checks if the Balanced Search Tree is actually balanced
const isBalanced = (root) => {
  if (root === null) return -1;

  // Ensures that the rightHeight and the leftHeight function only traverses into their respective branches in relation to root.
  let rightRoot = root.right;
  let leftRoot = root.left;

  const rightHeight = (rightRoot) => {
    if (rightRoot === null) return -1;
    if (rightRoot === undefined) {
      console.log("lol");
      console.log(rightRoot);
      // This logs as undefined when an error is thrown, so need to add additional checks to avoid an undefined root getting through
      return;
    }
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

// Rebalances the Balanced Search Tree in case it is not actually balanced.
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
  let long = newArr.length;
  root = buildTree(sortedArray, 0, long - 1);
  prettyPrint(root);
  return root;
};

// The driverScript below does the following:
// 1. Creates a binary search tree from an array of random numbers
// 2. Confirms that the tree is balanced by calling isBalanced
// 3. Prints out all the elements in level, pre, post, and in order
// 4. Unbalances the tree by adding several numbers
// 5. Confirms that the tree is unbalanced by calling isBalanced
// 6. Balances the tree by calling rebalance
// 7. Confirms that the tree is balanced by calling isBalanced
// 8. Prints out all elements in level, pre, post, and in order

const driverScript = () => {
  // 1. Makes the array (numArray) with random numbers
  const createArray = () => {
    let numArray = [];
    for (let i = 0; i < 10; i++) {
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

  // 2. Confirms that the tree is balanced
  console.log(isBalanced(root));

  // 3. Prints out all the elements in their respective orders
  levelOrder(root);
  preorder(root);
  postorder(root);
  inorder(root);
  prettyPrint(root);

  document.write("<br> Unbalance by adding more numbers <br><br>");

  console.log("%c After insertion", "font-size: 16px");

  // 4. Unbalances the tree by adding several numbers.
  for (let i = 0; i < 10; i++) {
    // Don't push if the item already exists in the array
    let num = Math.floor(Math.random() * 100 + 100);
    if (numArray.indexOf(num) === -1) insert(root, num, numArray);
  }

  document.write(numArray);

  prettyPrint(root);

  // 5. Confirms that the tree is unbalanced by calling isBalanced
  console.log(isBalanced(root));
  console.log("%c After rebalancing", "font-size: 16px");

  // 6. Balances the tree by calling rebalance
  root = rebalance(root);

  // 7. Confirms that the tree is balanced by calling isBalanced
  console.log(isBalanced(root));

  // 8. Prints out all elements in level, pre, post, and in order
  levelOrder(root);
  preorder(root);
  postorder(root);
  inorder(root);
};

driverScript();
