import Position from "./position.js";

class Word {

    // The class for creating word instances for the game

    constructor(text, x) {
        this.text = text;
        this.regExp = new RegExp(text);
        this.correctlyTyped = "";
        this.targetChar = 0;
    }

    generateNextPosition () {
        // this is the callback passed to position telling it what to do when it reaches next position
        this.from.x = this.to.x;
        this.from.y = this.to.y;
        this.to.x = Math.floor(Math.random() * 100);
        this.to.y = Math.floor(Math.random() * 100);
        this.alpha = 0;
    }

    initPosition = () => {
        this.position = new Position(this.generateNextPosition);
    }
}

export default Word;