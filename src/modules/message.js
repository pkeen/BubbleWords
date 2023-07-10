import Position from "./position.js";

class Message {
    constructor(
        text, 
        position = new Position(
            function () {
                this.from.x = this.to.x;
                this.from.y = this.to.y;
            }, 
            {x: 50, y: 50},
            {x: 50, y: 50}
        ), 
        font = '30px Arial', 
        fillStyle = 'white', 
        textAlign = 'center'
        ) {
        this.text = text;
        this.position = position;
        this.font = font;
        this.fillStyle = fillStyle;
        this.textAlign = textAlign
    }
}

export default Message;