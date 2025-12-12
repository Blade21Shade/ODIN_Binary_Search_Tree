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


let arr = [1, 3, 5, 7, 9, 11, 13, 15, 17];
let tree = new Tree(arr);

// prettyPrint(tree.root);


tree.levelOrderForEach(prettyPrint);


// // Testing code
// let testVal = 13;
// // Tested: 0, 17, 1, 15, 11, 9, 13

// console.log(`\nOriginal\n===============================\nUpdated: ${testVal}\n`)

// let findVal = tree.find(testVal);
// prettyPrint(findVal);