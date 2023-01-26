// Using iteration, write a function fibs which takes a number and returns an array containing that many numbers from the fibonacci sequence. Using an example input of 8, this method should return the array [0, 1, 1, 2, 3, 5, 8, 13].
// Now write another method fibsRec which solves the same problem recursively. This can be done in just a couple of lines.

// Fibonacci using iteration
const fibs = (num) => {
  let arr = [];
  let n1 = 0;
  let n2 = 1;
  let nextTerm = 0;
  let iterator = 1;
  while (iterator <= num) {
    iterator += 1;
    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
    arr.push(nextTerm);
  }
  console.log(arr);
};
// Function call
// fibs(8);

//

// Fibonacci using recursion
const fibsRec = (num) => {
  if (num < 2) {
    return [1];
  }
  if (num < 3) {
    return [1, 1];
  }
  let arr2 = fibsRec(num - 1);
  arr2.push(arr2[num - 2] + arr2[num - 3]);
  return arr2;
};

// Function call
// fibsRec(10);
// console.log(fibsRec(10));

//

// mergeSort exercise

// Build a function mergeSort that takes in an array and returns a sorted array, using a recursive merge sort methodology.
// Tips:
// Think about what the base case is and what behavior is happening again and again and can actually be delegated to someone else (e.g. that same method!).
// It may be helpful to check out the background videos again if you don’t quite understand what should be going on.

let arr = [1, 6, 2, 8, 3, 7, 5, 1, 100, 9];

const mergeSort = (arr) => {
  //   BASE CASE: If is just one element, stop dividing and return element.
  if (arr.length < 2) {
    return arr;
  }
  //   Split array in the middle
  const mid = Math.floor(arr.length / 2);
  //   Get left side
  const leftArr = arr.slice(0, mid);
  //   Get ride side
  const rightArr = arr.slice(mid);
  //   Recursively divide all arrays into lengths of 1, then put them back together in their sorted order using the merge function.
  return merge(mergeSort(leftArr), mergeSort(rightArr));
};

const merge = (leftArr, rightArr) => {
  // Declare final sorted array
  const sortedArr = [];
  //   Loop that ensures only arrays that has length above 0 are accepted
  while (leftArr.length && rightArr.length) {
    // Next 4 lines: pushes the smallest array item of the two into the sorted array.
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else {
      sortedArr.push(rightArr.shift());
    }
  }
  //   Returns the sorted array followed by the left array, then the right array.
  return [...sortedArr, ...leftArr, ...rightArr];
};

// Function call
// mergeSort(arr);
console.log(mergeSort(arr));
