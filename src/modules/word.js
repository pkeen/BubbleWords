import Position from "./position.js";

class Word {
    constructor(text, x) {
        this.text = text;
        // this.x = Math.random() * 100; // as percent 0 - 100
        // this.y = 100; // percent
        // this.speed = 1;
        this.regExp = new RegExp(text);
        this.correctlyTyped = "";
        this.targetChar = 0;
    }

    generateNextPosition () {
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