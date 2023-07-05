import CountdownTimer from "./CountdownTimer.js";

class Game {

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.level = 0;
        this.score = 0;
        this.paused = true;
        this.userChar;
        this.userString = "";
        this.targetChar = 0;
        this.correctlyTyped = "";
        this.targetString;
        this.wordList = [
            'hello',
            'example',
            'house',
            'computer',
            'vehicle',
            'library'
        ];
    }
    
    /* Create game DOM elements
        All DOM elements will be created on initialization
        They will be placed in two separate Divs
            1. representing in in play state
            2. representing a paused state
            These element can then be displayed and undisplayed based on game state

    */


    // this is a temporary button to test startGame
    createTemporaryButton = () => {
        this.startButton = document.createElement('button');
        this.startButton.innerHTML = 'Start Round';
        this.parentElement.append(this.startButton);
    }

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
        // this.header.style.display = 'flex';
        // this.header.style.justifyContent = 'space-between';
        this.levelElement = document.createElement('div');
        this.scoreElement = document.createElement('div');
        this.headerElement.append(this.levelElement, this.scoreElement);
        // this.header.append(this.scoreElement);
        // this.header.append(this.levelElement);
        this.gameElement.append(this.headerElement);
    }

    createTimerElement = () => {
        this.timerElement = document.createElement('div');
        this.timerElement.setAttribute('id', 'timer');
        this.gameElement.append(this.timerElement);
        // dont think i need to init this timer yet
        // this.timer = new CountdownTimer(1000, 10, this.timerParent, () => console.log('stopped timer')); 
        // this.timer.init();
    }

    createTargetWordElement = () => {
        this.targetElement = document.createElement('div');
        this.targetElement.setAttribute('id', 'target');
        this.promptElement = document.createElement('p');
        this.promptElement.innerHTML = `--- TYPE THE WORD BELOW ---`;
        this.targetWordElement = document.createElement('h3');
        this.targetElement.append(this.promptElement, this.targetWordElement);
        this.gameElement.append(this.targetElement);
        // this.targetWordElement.innerHTML = 'hello';
        // this.gameElement.append(this.targetWordElement);
    }

    createTypingDisplayElement = () => {
        this.typingDisplayElement = document.createElement('div');
        this.typingDisplayElement.setAttribute('id', 'typing');
        this.typingTextElement = document.createElement('h3');
        this.cursorElement = document.createElement('div');
        this.typingDisplayElement.append(this.typingTextElement, this.cursorElement);
        this.gameElement.append(this.typingDisplayElement);
    }

    createAllElements = () => {
        this.createTemporaryButton();
        this.createGameElement();
        this.createPausedElement();
        this.createPausedMessageElement();
        this.createHeaderElement();
        this.createTimerElement();
        this.createTargetWordElement();
        this.createTypingDisplayElement();
    }

    /* End of create elements */

    /* Render methods for elements */

    renderHeader = () => {
        this.levelElement.innerHTML = `<p>Level: ${this.level}</p>`
        this.scoreElement.innerHTML = `<p>Score: ${this.score}</p>`;
    }

        // render the typing on screen
    renderTyping = () => {
        // typingEl.innerHTML = userString; // simple
        this.typingTextElement.innerHTML = this.correctlyTyped;
    }

    renderTargetWord = () => {
        this.targetWordElement.innerHTML = `${this.targetString}`;
    }

    renderPausedMessage = () => {
        if (this.score > 0) {
            this.mainPausedMessage.innerHTML = `You scored ${this.score} points!`;
        } else {
            this.mainPausedMessage.innerHTML = `Welcome to TikType`
        }
        this.continueMessage.innerHTML = `Press the spacebar to ${this.score ? 'continue' : 'begin'}`
    }

    /* End of render Methods */


    render = () => {

        console.log('render');

        this.renderHeader();
        this.renderTyping();
        this.renderTargetWord();
        this.renderPausedMessage();
        // this.renderTimer();
    }

    setLayout = () => {
        if (this.paused === true) {
            this.pausedElement.style.display = 'flex';
            this.gameElement.style.display = 'none';
        } else {
            this.gameElement.style.display = 'grid';
            this.pausedElement.style.display = 'none';
        }
        // this.render();
    }

    /* Event Listeners and function */

    addKeyboardEventListener = () => {
          // event listener for keyboard input
        document.addEventListener("keydown", (event) => {
            // If paused we're only listening for the space key
            if (this.paused) {
                if(event.code === 'Space') {
                    this.startNewLevel();
                }
            } else {
                this.userChar = event.key;
                console.log('char: ', this.userChar);
                this.userString += this.userChar;
                console.log(this.userString);
                // logic for displaying so far correctly typed
                if (this.userChar === this.targetString[this.targetChar]) {
                    this.correctlyTyped += this.userChar
                    this.targetChar++;
                } else {
                    this.correctlyTyped = "";
                    this.targetChar = 0;
                }
                console.log(this.userString);
                this.render();
                this.testWinner();
            }

        });
    }

    /* End of Event Listeners */

    /* Game play Functions */

    timeUp = () => {
        this.paused = true;
        this.setLayout();
        console.log('You scored: ', this.score);
    }

    testWinner = () => {
        if (this.targetRegEx.test(this.userString)) {
            console.log('winner!')
            this.startNewRound();
            this.score += 100;
            this.render();
        }
    }
    
    getNewTargetWord = () => {
        this.targetString = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.targetRegEx = new RegExp(this.targetString);
        console.log(`target word : ${this.targetString}`);
    }

    startNewRound = () => {
        console.log('round started');
        if (this.paused) {
            this.paused = false;
            this.setLayout();
        }
        this.getNewTargetWord();

        this.userString = "";
        this.targetChar = 0;
        this.correctlyTyped = "";
        // if (this.timer) {
        //     this.timer.stop(); // if its running
        // }
        
        // this.timer.init();
        // this.timer.start();
        this.render();
    }

    startNewLevel = () => {
        console.log('level Started');
        if (this.paused) {
            this.paused = false;
            this.setLayout();
        }
        if (this.timer) {
            this.timer.stop(); // if its running
        }
        this.timer = new CountdownTimer(1000, 20, this.timerElement, this.timeUp); 
        this.timer.init();
        this.startNewRound();
        this.timer.start();
    }
    /* End of Gameplay functions */



    init = () => {
        // first we call create elements this creates all the elements we will need
        this.createAllElements();
        this.setLayout();
        this.addKeyboardEventListener();
        this.setLayout();
        this.render();
        // this.timer = new CountdownTimer(1000, 10, )
        this.startButton.addEventListener('click', this.startNewLevel) // add start round to temporary button
    }


}

export default Game;