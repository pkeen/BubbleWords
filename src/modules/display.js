class Display {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }

     /* Create game DOM elements
        All DOM elements will be created on initialization
        They will be placed in two separate Divs
            1. representing in in play state
            2. representing a paused state
            These element can then be displayed and undisplayed based on game state

    */

    createGameElement = () => {
        this.gameCanvas = document.createElement('canvas');
        this.gameCanvas.setAttribute('width', document.getElementById('app').clientWidth);
        this.gameCanvas.setAttribute('height', document.getElementById('app').clientHeight);
        this.ctx = this.gameCanvas.getContext('2d');
        this.gameCanvas.setAttribute('id', 'game');
        this.parentElement.append(this.gameCanvas);
    }

    createPausedElement = () => {
        this.pausedElement = document.createElement('div');
        this.pausedElement.setAttribute('id', 'paused');
        this.parentElement.append(this.pausedElement);
    }
        
    createPausedMessageElement = () => {
        this.pausedMessageDiv = document.createElement('div');
        this.mainPausedMessage = document.createElement('h1');
        this.subPausedMessage = document.createElement('h3');
        this.continueMessage = document.createElement('h4');
        this.continueMessage.setAttribute('id', 'continue');
       
        this.pausedMessageDiv.append(this.mainPausedMessage, this.subPausedMessage, this.continueMessage);
        this.pausedElement.append(this.pausedMessageDiv); // belongs in paused element
    }

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

    // setLayout = (paused) => {
    //     if (paused === true) {
    //         this.pausedElement.style.display = 'flex';
    //         this.gameElement.style.display = 'none';
    //     } else {
    //         this.gameElement.style.display = 'grid';
    //         this.pausedElement.style.display = 'none';
    //     }
    // }
    
    // renderOtherThing = () => {
    //     const data = `
    //         <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
    //         <foreignObject width='100%' height='100%'>
    //             <div xmlns='http://www.w3.org/1999/xhtml' style='font-size:40px'>
    //             <em>I</em> like <span style='color:white; text-shadow:0 0 2px blue;'>CANVAS</span>
    //             </div>
    //         </foreignObject>
    //         </svg>
    //         `;
    //     const img = new Image();
    //     const svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
    //     const url = URL.createObjectURL(svg);
    //     img.onload = () => {
    //         this.ctx.drawImage(img, 0, 0);
    //         URL.revokeObjectURL(url);
    //     };
    //     img.src = url;
    // }

    // renderColoredText = () => {
    //     const text = ``;

    // }
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
        const percentToCanvasX = (x) => x / 100 * this.gameCanvas.width
        return this.lerp(percentToCanvasX(from), percentToCanvasX(to), alpha);
    }
                
    getY = (from, to, alpha) => {
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


    init = () => {
        // this.createTemporaryButton();
        this.createGameElement();
        this.createPausedElement();
        this.createPausedMessageElement();
        // this.createHeaderElement();
        // this.createTimerElement();
        // this.createTargetWordElement();
        // this.createTypingDisplayElement();
    }

}

export default Display;