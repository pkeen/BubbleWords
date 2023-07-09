// messages class for dispalying pause messages etc
import Position from "./position.js";

const messages = [

    {
        text: "Welcome to Bubble Words",
        font: "48px Arial",
        fillStyle: "white",
        textAlign: "center",
        position: new Position(
            function () {
                this.from.x = this.to.x;
                this.from.y = this.to.y;
            }, 
            {x: 50, y: 50},
            {x: 50, y: 50}
        )
    },

    {
        text: "Hit the space key to begin",
        font: "30px Arial",
        fillStyle: '#83D2F3',
        textAlign: "center",
        position: new Position(
            function () {
            this.from.x = this.to.x;
            this.from.y = this.to.x;
            },
            {x: 50, y: 100},
            {x: 50, y: 58},
            5
        )
    },
]

export default messages;