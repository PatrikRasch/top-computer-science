// Exercise 1
// const sumRange = (n) => {
//   if(n <= 0)
//     return n;
//   else
//   return n + sumRange(n-1);
// }

// console.log(sumRange(3));

//

// Exercise 2
// const power = (constant, num) => {
//   if(num === 0)
//     return 1;
//   else
//     return constant*power(constant, num-1)
// }

// console.log(power(2, 4))

//

// Exercise 3
// const factorial = (n) => {
//   if(n === 1)
//     return n;
//   else
//     return n*factorial(n-1)
// }

// console.log(factorial(4))

//

// Exercise 4
// const myArr = [1, 2, 3, 3, 3, 8];

// const callback = (num) => {
//   return num < 7;
// }

// const all = (array, callback) => {
//   const copy = [...array];

//   if(copy.length === 0) {
//     console.log("The array is acceptable.")
//     return true;
//   }

//   if(callback(copy[0])) {
//     myArr.shift()
//     return all(myArr, callback);
//   } else {
//     console.log("The array is unacceptable")
//   }
// }

// all(myArr, callback);

//

// Exercise 5
// Write a function called productOfArray which takes in an array of numbers and returns the product of them all.
// const productOfArray = (array) => {
//   if (array.length === 0) return 1;
//   return array.shift() * productOfArray(array);
// };
// console.log(productOfArray([1, 2, 3, 4, 5, 6]));

//

// Exercise 6
// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.

// let nestedObject = {
//   data: {
//     info: {
//       stuff: {
//         thing: {
//           moreStuff: {
//             magicNumber: 44,
//             something: "foo2",
//           },
//         },
//       },
//     },
//   },
// };

// const contains = (obj, target) => {
//   for (key in obj) {
//     if (typeof obj[key] === "object") {
//       return contains(obj[key], target);
//     }
//     if (obj[key] === target) return true;
//   }
//   return false;
// };

// const hasIt = contains(nestedObject, 44);
// console.log(hasIt);

//

// Exercise 7
// Given a multi-dimensional integer array, return the total number of integers stored inside this array
// Sample:

// let arr = [[[5], 3], 0, 2, 3, 3, 3, ["foo"], [[3, 3, 23412423, [[[[4]]]]]], [4, [5, 6]]];
// let total = 0;

// const totalInt = (arr) => {
//   arr.forEach((element) => {
//     if (typeof element === "number") {
//       return (total += 1);
//     }
//     if (typeof element === "object") {
//       return totalInt(element);
//     }
//   });
// };

// totalInt(arr);
// console.log(total);

//

// Exercise 8
// Write a function that sums squares of numbers in list that may contain more lists
// Sample:
// var l = [1, 2, 3];
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14
// let l = [[1, 2], 3];
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14
// l = [[[[[[[[[1]]]]]]]]];
// console.log(SumSquares(l)); // 1 = 1
// l = [10, [[10], 10], [10]];
// console.log(SumSquares(l)); // 100 + 100 + 100 + 100 = 400

// let total = 0;

// const sumSquares = (l) => {
//   if (l.length === 0) {
//     return 0;
//   }
//   l.forEach((element) => {
//     if (typeof element !== "number") {
//       return sumSquares(element);
//     } else return (total += element * element);
//   });
// };

// sumSquares(l);
// console.log(total);

// Exercise 9
// The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.
// Sample:
// console.log(replicate(3, 5)) // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []

// let arr = [];
// const replicate = (times, number) => {
//   if (times === 0 || times < 0) return;
//   arr.push(number);
//   return arr + replicate(times - 1, number);
// };

// replicate(10, 6);
// console.log(arr);
