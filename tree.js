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
        Tree.#insertInner(value, this.root);
    }

    static #insertInner(value, nodeToCompare) {
        let nodeVal = nodeToCompare.getData();
        let checkLeft; // True for left leaf, false for right leaf
        let childNodeToCompare;

        // Check which leaf to compare against, leave if same as current node's value
        if (value < nodeVal) {
            checkLeft = true;
            childNodeToCompare = nodeToCompare.getLeft();
        } else if (value > nodeVal) {
            checkLeft = false;
            childNodeToCompare = nodeToCompare.getRight();
        } else { // Same value
            return;
        }

        // Add leaf if one doesn't exist, otherwise compare against the leaf
        if (childNodeToCompare === null) {
            let node = new Node(value);
            if (checkLeft) {
                nodeToCompare.setLeft(node);
            } else {
                nodeToCompare.setRight(node);
            }
        } else {
           Tree.#insertInner(value, childNodeToCompare); 
        }
    }

    delete(value) {
        Tree.#deleteInner(value, this.root);
    }

    static #deleteInner(value, nodeToCompare) {
        // The value wasn't found in the tree
        if (nodeToCompare === null) {
            return null;
        }
        
        // Get values needed for comparison
        let nodeVal = nodeToCompare.getData();
        let left = nodeToCompare.getLeft();
        let right = nodeToCompare.getRight();

        // See if we need to go to a child node or if we are at the one we want deleted
        if (value < nodeVal) {
            let updatedLeft = Tree.#deleteInner(value, left);
            nodeToCompare.setLeft(updatedLeft);
        } else if (value > nodeVal) {
            let updatedRight = Tree.#deleteInner(value, right);
            nodeToCompare.setRight(updatedRight);
        } else { // This is the node we want deleted
            // Act based on existing children
            if (left !== null && right === null) { // Only left child exists
                return left;
            } else if (left === null && right !== null) { // Only right child exists
                return right;
            } else if (left !== null && right !== null) { // Both children exist

                // Replace node
                let successor = Tree.#findInOrderSuccessor(nodeToCompare);
                nodeToCompare.setData(successor.getData());
                
                // Remove leaf that replaced the node
                let updatedRight = Tree.#deleteInner(successor.getData(), right);
                nodeToCompare.setRight(updatedRight);
            } else { // Neither child exists
                return null;
            }
        }

        // We went in either the left or right branch, so return this node with any changes done to it
        return nodeToCompare;
    }

    static #findInOrderSuccessor(nodeToCompare) {
        // Get right branch before looping
        let toReturn = nodeToCompare.getRight();
        let left = toReturn.getLeft();

        if (left !== null) {
            let nextLeft = left.getLeft();
            while (nextLeft!== null) {
                left = nextLeft;
                nextLeft = left.getLeft();
            }
            toReturn = left;
        }
        return toReturn;
    }

    find(value) {
        return Tree.#findInner(value, this.root);
    }

    static #findInner(value, nodeToCompare) {
        if (nodeToCompare === null) {
            return null;
        }

        let nodeVal = nodeToCompare.getData();

        if (value < nodeVal) {
            return Tree.#findInner(value, nodeToCompare.getLeft());
        } else if (value > nodeVal) {
            return Tree.#findInner(value, nodeToCompare.getRight());
        } else { // Correct node
            return nodeToCompare;
        }
    }

    levelOrderForEach(callback) {
        if (callback === null) {
            throw new Error("levelOrderForEach must be given a callback function")
        }

        Tree.#innerLevelOrderForEachIteration(callback, [this.root]);
    }

    static #innerLevelOrderForEachRecursion(callback, queue) {
        if (queue.length === 0) {
            return;
        }

        let currentNode = queue.shift();

        callback(currentNode);

        Tree.#addChildrenToQueue(currentNode, queue);

        // Process children
        Tree.#innerLevelOrderForEachRecursion(callback, queue);
    }

    static #innerLevelOrderForEachIteration(callback, queue) {
        while (queue.length > 0) {
            let currentNode = queue.shift();
            callback(currentNode);

            Tree.#addChildrenToQueue(currentNode, queue);
        }
    }

    static #addChildrenToQueue(currentNode, queue) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();
        if (left !== null) {
            queue.push(left);
        }

        if (right !== null) {
            queue.push(right);
        }
    }

    inOrderForEach(callback) {
        if (callback === null) {
            throw new Error("levelOrderForEach must be given a callback function")
        }

        Tree.#inOrderForEachInner(callback, this.root);
    }

    preOrderForEach(callback) {
        if (callback === null) {
            throw new Error("levelOrderForEach must be given a callback function")
        }

        Tree.#preOrderForEachInner(callback, this.root);
    }

    postOrderForEach(callback) {
        if (callback === null) {
            throw new Error("levelOrderForEach must be given a callback function")
        }

        Tree.#postOrderForEachInner(callback, this.root);
    }

    static #inOrderForEachInner(callback, currentNode) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();

        if (left !== null) {
            Tree.#inOrderForEachInner(callback, left);
        }

        callback(currentNode);

        if (right !== null) {
            Tree.#inOrderForEachInner(callback, right);
        }
    }

    static #preOrderForEachInner(callback, currentNode) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();

        callback(currentNode);

        if (left !== null) {
            Tree.#preOrderForEachInner(callback, left);
        }

        if (right !== null) {
            Tree.#preOrderForEachInner(callback, right);
        }
    }

    static #postOrderForEachInner(callback, currentNode) {
        let left = currentNode.getLeft();
        let right = currentNode.getRight();

        if (left !== null) {
            Tree.#postOrderForEachInner(callback, left);
        }

        if (right !== null) {
            Tree.#postOrderForEachInner(callback, right);
        }

        callback(currentNode);
    }

    height(value) {
        // See if the value is present in the tree
        let nodeWithValue = Tree.#findInner(value, this.root);
        if (nodeWithValue === null) {
            return null;
        }

        // Node with the value exists, find height
        return Tree.#innerHeight(nodeWithValue);   
    }

    static #innerHeight(node) {
        let leftHeight = 0;
        let rightHeight = 0;

        let left = node.getLeft();
        let right = node.getRight();

        if (left !== null) {
            leftHeight++;
            leftHeight += Tree.#innerHeight(left);
        }

        if (right !== null) {
            rightHeight++;
            rightHeight += Tree.#innerHeight(right);
        }

        // At a leaf
        if (left === null && right === null) {
            return 0;
        }

        // Return greater height
        if (leftHeight > rightHeight) {
            return leftHeight;
        } else {
            return rightHeight;
        }
    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }
}