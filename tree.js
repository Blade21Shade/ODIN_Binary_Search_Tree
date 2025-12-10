import { Node } from "./node.js";

export class Tree {
    constructor(arr) { // Assumes arr is sorted and no duplicates for simplicity
        this.root = Tree.buildTree(arr);
    }

    static buildTree(arr) { // Assumes arr is sorted and no duplicates for simplicity
        return Tree.#buildTreeInner(arr, 0, arr.length - 1);
    }

    // From https://www.geeksforgeeks.org/dsa/sorted-array-to-balanced-bst/
    // I didn't want to copy this, but the example code just sort of flowed with the rest of the article and I saw it, so I decided to copy it
    static #buildTreeInner(arr, start, end) {
        // Caller is a leaf, return null
        if (start > end) {
            return null;
        }

        // Find middle and create node for that value
        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid]);

        // Find left and right values
        root.setLeft(Tree.#buildTreeInner(arr, start, mid - 1));
        root.setRight(Tree.#buildTreeInner(arr, mid + 1, end));

        return root;
    }

    insert(value) {

    }

    delete(value) {

    }

    find(value) {

    }

    levelOrderForEach(callback) {

    }

    inOrderForEach(callback) {

    }

    preOrderForEach(callback) {

    }

    postOrderForEach(callback) {

    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }
}