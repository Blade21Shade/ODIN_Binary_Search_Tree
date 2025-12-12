import { Tree } from "./tree.js";

// From The Odin Project - Project: Binary Search Trees
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

/*
1, 3, 5, 7, 9, 11, 13, 15, 17
19, 21, 23, 25, 27, 29, 31, 33
*/

let arr = [19, 21, 23, 25, 27, 29, 31, 33];
let tree = new Tree(arr);
for (let i = 1; i <= 9; i+=2) {
  tree.insert(i);
}

for (let i = 17; i >= 11; i-=2) {
  tree.insert(i);
}

prettyPrint(tree.root);

let balance = tree.isBalanced();
console.log(balance);

// // Testing code
// let testVal = 9;

// console.log(`\nOriginal\n===============================\nUpdated: ${testVal}\n`)

// let findVal = tree.find(testVal);
// //console.log(findVal);
// prettyPrint(findVal);