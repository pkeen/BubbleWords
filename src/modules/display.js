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
        this.gameElement = document.createElement('div');
        this.gameElement.setAttribute('id', 'game');
        this.parentElement.append(this.gameElement);
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

    createHeaderElement = () => {
        this.headerElement = document.createElement('div');
        this.headerElement.setAttribute('id', 'header');
        this.levelElement = document.createElement('div');
        this.scoreElement = document.createElement('div');
        this.headerElement.append(this.levelElement, this.scoreElement);
        this.gameElement.append(this.headerElement);
    }

    createTimerElement = () => {
        this.timerElement = document.createElement('div');
        this.timerElement.setAttribute('id', 'timer');
        this.gameElement.append(this.timerElement);
    }

    createTargetWordElement = () => {
        this.targetElement = document.createElement('div');
        this.targetElement.setAttribute('id', 'target');
        this.promptElement = document.createElement('p');
        this.promptElement.innerHTML = `--- TYPE THE WORD BELOW ---`;
        this.targetWordElement = document.createElement('h3');
        this.targetElement.append(this.promptElement, this.targetWordElement);
        this.gameElement.append(this.targetElement);
    }

    // createTypingDisplayElement = () => {
    //     this.typingDisplayElement = document.createElement('div');
    //     this.typingDisplayElement.setAttribute('id', 'typing');
    //     this.typingTextElement = document.createElement('h3');
    //     this.cursorElement = document.createElement('div');
    //     this.typingDisplayElement.append(this.typingTextElement, this.cursorElement);
    //     this.gameElement.append(this.typingDisplayElement);
    // }


    //  /* Render methods for elements */

    renderHeader = (level, score) => {
        this.levelElement.innerHTML = `<p>Level: ${level}</p>`
        this.scoreElement.innerHTML = `<p>Score: ${score}</p>`;
    }

    // render correct in span
    renderTargetWord = (target, correctlyTyped) => {
        let renderTarget = ``;

        for (let i = 0; i < target.length; i++) {
            if (target[i] === correctlyTyped[i]) {
                renderTarget += `<span>${target[i]}</span>`
            } else {
                renderTarget += target[i];
            }
        }
        // console.log(`rendertarget= ${renderTarget}`);
        this.targetWordElement.innerHTML = `${renderTarget}`;
    }

    // // render the typing on screen
    // renderTyping = (correctlyTyped) => {
    //     this.typingTextElement.innerHTML = correctlyTyped;
    // }
    
    renderPausedMessage = (score) => {
        if (score > 0) {
            this.mainPausedMessage.innerHTML = `You scored ${score} points!`;
        } else {
            this.mainPausedMessage.innerHTML = `Welcome to TikType`
        }
        this.continueMessage.innerHTML = `Press the spacebar to ${score ? 'continue' : 'begin'}`
    }

    setLayout = (paused) => {
        if (paused === true) {
            this.pausedElement.style.display = 'flex';
            this.gameElement.style.display = 'none';
        } else {
            this.gameElement.style.display = 'grid';
            this.pausedElement.style.display = 'none';
        }
    }

    init = () => {
        // this.createTemporaryButton();
        this.createGameElement();
        this.createPausedElement();
        this.createPausedMessageElement();
        this.createHeaderElement();
        this.createTimerElement();
        this.createTargetWordElement();
        // this.createTypingDisplayElement();
    }

}

export default Display;