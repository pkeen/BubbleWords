import Position from "./position.js";

class Display {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.primaryColor = '#83D2F3';
        this.mainMsg = {};
        this.subMsg = {};
    }

     /* Create game DOM elements
        All DOM elements will be created on initialization
    */

    createGameCanvas= () => {
        this.gameCanvas = document.createElement('canvas');
        this.gameCanvas.setAttribute('width', document.getElementById('app').clientWidth);
        this.gameCanvas.setAttribute('height', document.getElementById('app').clientHeight);
        this.ctx = this.gameCanvas.getContext('2d');
        this.gameCanvas.setAttribute('id', 'game');
        this.parentElement.append(this.gameCanvas);
    }
    
     
    renderWordColors = (word, x, y) => {
        // This function colors the words as they appear on the screen
        // White is default and a greenish color for the characters correctly typed

        this.ctx.textAlign = 'left'; // align text left, needed for the way this works

        // word characters are checked against those held in correctlyTyped
        for (let i = 0; i < word.text.length; i++) {
            if (word.text[i] === word.correctlyTyped[i]) {
                this.ctx.fillStyle = '#1BF9A9';
                this.ctx.fillText(word.text[i], x, y);
            } else {
                this.ctx.fillStyle = "white";
                this.ctx.fillText(word.text[i], x, y);
            }
            // The width of the character is measured and added to the current x position to align characters
            x += this.ctx.measureText(word.text[i]).width;
        }
    }


    lerp = (a, b, alpha) => {
        // Math function to interpolate between two vales based on the alpha (a number between 0 and 1)
        return a + alpha * (b - a);
    }
    
    getX = (from, to, alpha) => {
        // Covert from percentage to canvas cordinate
        const percentToCanvasX = (x) => x / 100 * this.gameCanvas.width
        return this.lerp(percentToCanvasX(from), percentToCanvasX(to), alpha);
    }
                
    getY = (from, to, alpha) => {
        // Covert from percentage to canvas cordinate
        const percentToCanvasY = (y) => y / 100 * this.gameCanvas.height
        return this.lerp(percentToCanvasY(from), percentToCanvasY(to), alpha);
    }

    adjustToFit = (x, y, bubbleRadius) => {
        // This function confines the word bubbles to within the canvas
            // In amother version I would like not to contain them, but let them float away and be removed from the words array

        const rightBoundary = x + bubbleRadius
        const leftBoundary = x - bubbleRadius
        const topBoundary = y - bubbleRadius;
        const bottomBoundary = y + bubbleRadius;
        
        // adjust left right
        if (rightBoundary >= this.gameCanvas.width) {
            x = x - (rightBoundary - this.gameCanvas.width)
        } else if (leftBoundary <= 0) {
            x = x - (leftBoundary)
        }

        // adjust top bottom
        if (topBoundary <= 0) {
            y = y - (topBoundary);
        } else if (bottomBoundary >= this.gameCanvas.height) {
            y = y - (bottomBoundary - this.gameCanvas.height)
        }
        return [x, y];

    }

    drawBubbleWord = (word, x, y) => {
        // function to draw the bubble words
        // uses the size of the text to calculate values for outer circle and text position

        this.ctx.font = "30px Arial";

        const textMetrics = this.ctx.measureText(word.text);
        const textWidth = textMetrics.width;
        const bubbleRadius = textWidth - textWidth * .2;

        [x, y] = this.adjustToFit(x, y, bubbleRadius);

        this.ctx.strokeStyle = "white";

        // draw outer circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        // draw inner decoration
        this.ctx.beginPath();
        this.ctx.arc(x, y, bubbleRadius - bubbleRadius * .2, 0, Math.PI * 2 / 1.5, true);
        this.ctx.stroke();

        // draw Text
        const textX = x - textWidth / 2;
        const textY = y + textMetrics.fontBoundingBoxDescent;
        this.renderWordColors(word, textX, textY);
    }

    renderBubbleWord = (word) => {
        // middleman - recives the words from the game and passes to drawBubbleWord

        this.drawBubbleWord(
            word, 
            this.getX(word.position.from.x, word.position.to.x, word.position.alpha), 
            this.getY(word.position.from.y, word.position.to.y, word.position.alpha)
        )

    }
    
    formatTime = (secondsRemaining) => {
        // Format the time
        const seconds = secondsRemaining % 60;
        const minutes = Math.floor(secondsRemaining / 60);
        return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }

    renderTimer = (secondsRemaining) => {
        this.ctx.font = "30px Arial";
        const text = this.formatTime(secondsRemaining);
        const textWidth = this.ctx.measureText(text).width;
        const x = this.gameCanvas.width / 2;
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.fillText(text, x, 100);
        // this.ctx.fillText
    }


    renderScore = (score, scoreNeeded) => {
        // render the score
        this.ctx.font = "20px Arial";
        const text = `Score: ${score}`;
        const textWidth = this.ctx.measureText(text).width;
        const x = this.gameCanvas.width * 0.2;

        // Show score in green if exceeds score needed
        if (score >= scoreNeeded) {
            this.ctx.fillStyle = '#1BF9A9';
        } else {
            this.ctx.fillStyle = this.primaryColor;
        }
        
        this.ctx.fillText(text, x - textWidth / 2, 50);
    }

    renderLevel = (level) => {
        // render current level
        this.ctx.font = "20px Arial";
        const text = `Level: ${level}`;
        const textWidth = this.ctx.measureText(text).width;
        const x = this.gameCanvas.width * 0.8;
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.fillText(text, x - textWidth / 2, 50);
    }

    renderMessage = (msg) => {

        this.ctx.font = msg.font;
        this.ctx.fillStyle = msg.fillStyle;
        this.ctx.textAlign = msg.textAlign;
        this.ctx.fillText(msg.text, this.getX(msg.position.from.x, msg.position.to.x, msg.position.alpha), 
        this.getY(msg.position.from.y, msg.position.to.y, msg.position.alpha));

    }

    init = () => {
        // create the canvas element
        this.createGameCanvas();
    }

}

export default Display;