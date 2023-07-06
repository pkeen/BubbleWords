class Word {
    constructor(text, x) {
        this.text = text;
        this.x = x; // as percent 0 - 100
        this.y = 0;
        this.speed = 1;
        this.regExp = new RegExp(text);
        this.correctlyTyped = "";
        this.targetChar = 0;
    }
}

export default Word;