const NodeLocation = {
    Right: 'Right',
    Left: 'Left'
};

class Node {
    constructor(isRoot, level, node_loc, parentNumber) {
        this.isRoot = isRoot;
        this.level = level;
        this.location = node_loc;
        this.parentNumber = parentNumber;
        this.number = this.setNodeNumber();
    }

    setNodeNumber() {
        if (this.isRoot){
            this.level = 0;
            this.location = null;
            this.parentNumber = null;

            return 1;
        }

        if (this.location === NodeLocation.Left) {
            return this.number = this.parentNumber * 2;
        }
        else {
            return this.number = (this.parentNumber * 2) + 1;
        }
    }

    fanout(depth){
        if(this.level >= depth) {
            this.children = [];
            return;
        }

        this.children = [];
        let leftChild = new Node(false, this.level+1, NodeLocation.Left, this.number);
        let rightChild = new Node(false, this.level+1, NodeLocation.Right, this.number);

        this.children.push(leftChild, rightChild);
        leftChild.fanout(depth);
        rightChild.fanout(depth);
    }
}

export default class Tree {
    constructor(fileName, depth) {
        this.countryCode = fileName.substring(0, 2);
        this.year = '2018',
        this.response = fileName.substring(4, fileName.indexOf('.'))
        this.sourcefile = fileName;
        this.depth = depth;
        this.root = new Node(true);
        this.createStructure();
        this.lastupdated = [];
    }

    createStructure() {
        this.root.fanout(this.depth);
    }

    getNodeByNumber(nodeNumber){
        let [isFound, fringe] = [false, []];
        
        if (this.root.number === nodeNumber) return this.root;
        fringe.push(this.root);

        while (fringe.length > 0) {
            let aNode = fringe.pop();
            if(aNode.number === nodeNumber) return aNode;
            if(aNode.children.length > 0){
                fringe = fringe.concat(aNode.children);
            }
        }

        return null
    }
}