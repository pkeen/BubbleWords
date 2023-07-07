class Word {
    constructor(text, x) {
        this.text = text;
        this.x = Math.random() * 100; // as percent 0 - 100
        this.y = 100; // percent
        this.speed = 1;
        this.regExp = new RegExp(text);
        this.correctlyTyped = "";
        this.targetChar = 0;
    }
}

export default Word;