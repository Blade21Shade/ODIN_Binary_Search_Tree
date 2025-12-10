export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    // Setters
    setData(value) {
        this.data = value;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    // Getters
    getData() {
        return this.data;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }
}