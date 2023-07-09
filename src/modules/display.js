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
        They will be placed in two separate Divs
            1. representing in in play state
            2. representing a paused state
            These element can then be displayed and undisplayed based on game state

    */

    createGameCanvas= () => {
        this.gameCanvas = document.createElement('canvas');
        this.gameCanvas.setAttribute('width', document.getElementById('app').clientWidth);
        this.gameCanvas.setAttribute('height', document.getElementById('app').clientHeight);
        this.ctx = this.gameCanvas.getContext('2d');
        this.gameCanvas.setAttribute('id', 'game');
        this.parentElement.append(this.gameCanvas);
    }

    // createPausedElement = () => {
    //     this.pausedElement = document.createElement('div');
    //     this.pausedElement.setAttribute('id', 'paused');
    //     this.parentElement.append(this.pausedElement);
    // }
        
    // createPausedMessageElement = () => {
    //     this.pausedMessageDiv = document.createElement('div');
    //     this.mainPausedMessage = document.createElement('h1');
    //     this.subPausedMessage = document.createElement('h3');
    //     this.continueMessage = document.createElement('h4');
    //     this.continueMessage.setAttribute('id', 'continue');
       
    //     this.pausedMessageDiv.append(this.mainPausedMessage, this.subPausedMessage, this.continueMessage);
    //     this.pausedElement.append(this.pausedMessageDiv); // belongs in paused element
    // }

    // createHeaderElement = () => {
    //     this.headerElement = document.createElement('div');
    //     this.headerElement.setAttribute('id', 'header');
    //     this.levelElement = document.createElement('div');
    //     this.scoreElement = document.createElement('div');
    //     this.headerElement.append(this.levelElement, this.scoreElement);
    //     this.gameElement.append(this.headerElement);
    // }

    // createTimerElement = () => {
    //     this.timerElement = document.createElement('div');
    //     this.timerElement.setAttribute('id', 'timer');
    //     this.gameElement.append(this.timerElement);
    // }

    // createTargetWordElement = () => {
    //     this.targetElement = document.createElement('div');
    //     this.targetElement.setAttribute('id', 'target');
    //     this.promptElement = document.createElement('p');
    //     this.promptElement.innerHTML = `--- TYPE THE WORD BELOW ---`;
    //     this.targetWordElement = document.createElement('h3');
    //     this.targetElement.append(this.promptElement, this.targetWordElement);
    //     this.gameElement.append(this.targetElement);
    // }

    // // createTypingDisplayElement = () => {
    // //     this.typingDisplayElement = document.createElement('div');
    // //     this.typingDisplayElement.setAttribute('id', 'typing');
    // //     this.typingTextElement = document.createElement('h3');
    // //     this.cursorElement = document.createElement('div');
    // //     this.typingDisplayElement.append(this.typingTextElement, this.cursorElement);
    // //     this.gameElement.append(this.typingDisplayElement);
    // // }


    // //  /* Render methods for elements */

    // renderHeader = (level, score) => {
    //     this.levelElement.innerHTML = `<p>Level: ${level}</p>`
    //     this.scoreElement.innerHTML = `<p>Score: ${score}</p>`;
    // }

    // // render correct in span
    // renderTargetWord = (target, correctlyTyped) => {
    //     let renderTarget = ``;

    //     for (let i = 0; i < target.length; i++) {
    //         if (target[i] === correctlyTyped[i]) {
    //             renderTarget += `<span>${target[i]}</span>`
    //         } else {
    //             renderTarget += target[i];
    //         }
    //     }
    //     // console.log(`rendertarget= ${renderTarget}`);
    //     this.targetWordElement.innerHTML = `${renderTarget}`;
    // }

    // // // render the typing on screen
    // // renderTyping = (correctlyTyped) => {
    // //     this.typingTextElement.innerHTML = correctlyTyped;
    // // }
    
    // renderPausedMessage = (score) => {
    //     if (score > 0) {
    //         this.mainPausedMessage.innerHTML = `You scored ${score} points!`;
    //     } else {
    //         this.mainPausedMessage.innerHTML = `Welcome to TikType`
    //     }
    //     this.continueMessage.innerHTML = `Press the spacebar to ${score ? 'continue' : 'begin'}`
    // }

    setLayout = (paused) => {
        if (paused === true) {
            this.pausedElement.style.display = 'flex';
            this.gameCanvas.style.display = 'none';
        } else {
            this.gameCanvas.style.display = 'block';
            this.pausedElement.style.display = 'none';
        }
    }
    

   adjustToFitX = (x, textWidth, outerCircleRadius) => {
        // if it exceeds right
        const rightBoundary = x + (textWidth / 2) + outerCircleRadius
        const leftBoundary = x + (textWidth / 2) - outerCircleRadius
        if (rightBoundary >= this.gameCanvas.width) {
          x = x - (rightBoundary - this.gameCanvas.width)
        } else if (leftBoundary <= 0) {
          x = x - (leftBoundary)
        }
        return x;
      }
      

      
      // renderBubble = (textWidth, centerX, centerY) => {
          //     // vars
          
          //     // draw outer circle
          //     this.ctx.beginPath();
          //     this.ctx.arc(centerX, centerY, textWidth - textWidth *.2, 0, Math.PI * 2, true);
          //     this.ctx.stroke();
          
          //     // draw inner circle
          //     this.ctx.beginPath();
          //     this.ctx.arc(centerX, centerY, textWidth - textWidth * .3, 0, Math.PI * 2 / 1.5, true) // you could animate that by going through vales from 1.1 to 2 lerp;
          //     this.ctx.stroke();
          // }
          
          // renderBubbleWord = (word) => {
              //     // vars
              //     let x = word.x / 100 * this.gameCanvas.width; // turning percent to pixel cordinates
              //     let y  = word.y / 100 * this.gameCanvas.height;
              //     const textMetrics = this.ctx.measureText(word.text); // text measurements object
              //     const textWidth = textMetrics.width
              //     const outerCircleRadius = textWidth - textWidth *.2;
              
              //     // const textWidth = textMetrics.width;
              
              //     // ctx settings
              //     this.ctx.font = "30px Arial";
              //     this.ctx.strokeStyle = "white";
              
              //     // adjust to width boundaries
              //     x = this.adjustToFitX(x, textWidth, outerCircleRadius);
              
              //     // Color words correctly
              //     this.renderWordColors(word, x, y);
              
              
              //     // Draw bubbles around words
              //     const centerX = textMetrics.width / 2 + x; // half of width of text + x position,
              //     const centerY = y - textMetrics.fontBoundingBoxDescent;
              //     this.renderBubble(textWidth, centerX, centerY);
              // }
              
    renderWordColors = (word, x, y) => {

        this.ctx.textAlign = 'left'; // align text left

        for (let i = 0; i < word.text.length; i++) {
            if (word.text[i] === word.correctlyTyped[i]) {
                this.ctx.fillStyle = '#1BF9A9';
                this.ctx.fillText(word.text[i], x, y);
            } else {
                this.ctx.fillStyle = "white";
                this.ctx.fillText(word.text[i], x, y);
            }
            x += this.ctx.measureText(word.text[i]).width;
        }
    }

    lerp = (a, b, alpha) => {
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

        this.drawBubbleWord(
            word, 
            this.getX(word.position.from.x, word.position.to.x, word.position.alpha), 
            this.getY(word.position.from.y, word.position.to.y, word.position.alpha)
        )

    }
    
    // Format the time
    formatTime = (secondsRemaining) => {
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


    renderScore = (score) => {
        this.ctx.font = "30px Arial";
        const text = `Score: ${score}`;
        const textWidth = this.ctx.measureText(text).width;
        const x = this.gameCanvas.width * 0.2;
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.fillText(text, x - textWidth / 2, 50);
    }

    renderLevel = (level) => {
        this.ctx.font = "30px Arial";
        const text = `Level: ${level}`;
        const textWidth = this.ctx.measureText(text).width;
        const x = this.gameCanvas.width * 0.8;
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.fillText(text, x - textWidth / 2, 50);
    }

    // renderPaused = (score) => {
    
    //     if (score) {
    //         this.mainMsg.text = `You scored ${score}!`;
    //         this.subMsg.text = `Hit space to continue`;
    //     } else {
    //         this.mainMsg.text = 'Welcome to Bubble World';
    //         this.subMsg.text = `Hit space to begin`;
    //     }

    //     // render main message in center
    //     this.ctx.font = "48px Arial";
    //     this.ctx.fillStyle = 'white';
    //     this.ctx.textAlign = "center";
    //     this.ctx.fillText(this.mainMsg.text, this.gameCanvas.width / 2, this.gameCanvas.height / 2);

    //     // render sub message moving
    //     this.ctx.font = "30px Arial";
    //     this.ctx.fillStyle = this.primaryColor;
    //     this.ctx.fillText(this.subMsg.text, this.gameCanvas.width / 2, this.gameCanvas.height / 2 + 50);

    // }

    // renderPaused = (messages, score) => {
    //     if (score) {
    //         messages.main.text = 'You score ${score}';
    //         messages.sub.text = `Hit space to continue`;
    //     } else {
    //         messages.main.text = 'Welcome to Bubble World';
    //         messages.sub.text = "Hit space to begin";
    //     }

    //     // render main message 
    //     this.ctx.font = "48px Arial";
    //     this.ctx.fillStyle = 'white';
    //     this.ctx.textAlign = "center";
    //     this.ctx.fillText(messages.main.text, messages.main.position.from.x, messages.main.position.from.y);
    // }

    renderMessage = (msg) => {

        this.ctx.font = msg.font;
        this.ctx.fillStyle = msg.fillStyle;
        this.ctx.textAlign = msg.textAlign;
        this.ctx.fillText(msg.text, this.getX(msg.position.from.x, msg.position.to.x, msg.position.alpha), 
        this.getY(msg.position.from.y, msg.position.to.y, msg.position.alpha));
        
    }

    init = () => {
        // this.createTemporaryButton();
        this.createGameCanvas();
        // this.createPausedElement();
        // this.createPausedMessageElement();
        // this.createHeaderElement();
        // this.createTimerElement();
        // this.createTargetWordElement();
        // this.createTypingDisplayElement();
    }

}

export default Display;