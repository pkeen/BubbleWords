import Display from "./display.js";
import CountdownTimer from "./CountdownTimer.js";
import BubbleMachine from "./bubbleMachine.js";
import Message from "./message.js";
import Position from "./position.js";

class Game {

    constructor(parentElement) {
        this.display = new Display(parentElement);
        // this.parentElement = parentElement;
        this.level = 0;
        this.score = 0;
        this.pausedState = 1; // temporary
        this.userChar;
        this.userString = "";
        // this.targetChar = 0;
        // this.correctlyTyped = ""; // These values have been moved into words
        this.targetString = '';
        this.pausedMessages = [];
        this.preRoundMsg;
    }

/* === SETUP === */

    initPausedMessages = () => {

        // Main Message
        this.pausedMessages.push(new Message(
            'Welcome to Bubble Words', 
            new Position(
                function () {
                    this.from.x = this.to.x;
                    this.from.y = this.to.y;
                }, 
                {x: 50, y: 50},
                {x: 50, y: 50}
            ),
            "48px Arial",
            "white",
            "center"
        ));

        // sub message
        this.pausedMessages.push(new Message(
            "Hit the space key to begin",
            new Position(
                function () {
                this.from.x = this.to.x;
                this.from.y = this.to.x;
                },
                {x: 50, y: 100},
                {x: 50, y: 58},
                5
            ),
            "30px Arial",
            '#83D2F3',
            "center"
        ));
    }

    
/* === EVENT LISTENERS === */

    addKeyboardEventListener = () => {
        // event listener for keyboard input
      document.addEventListener("keydown", (event) => {
          // If paused we're only listening for the space key
          if (this.pausedState === 1) {
              if(event.code === 'Space') {
                  console.log('space key')
                  this.startNewLevel();
              }
          } else {
                let char = event.key;
                // this.userString += char;

                this.bubbleMachine.words.forEach(word => {
                    if (char === word.text[word.targetChar]) {
                        // console.log(char);
                        word.targetChar++;
                        word.correctlyTyped += char;
                    } else {
                        word.correctlyTyped = '';
                        word.targetChar = 0;
                    }
                })
              this.testMatch(); // seems to
          }

      });
  }


/* === GAME LOGIC FUNCTIONS === */

    addScore = (text) => {
        let wordScore = text.length * 50;
        this.score += wordScore;
    }

    clearCorrectTyped = () => {
        this.bubbleMachine.words.forEach(word => {
            word.correctlyTyped = "";
        })
    }

    popWords = (indexes) => {

        indexes = indexes.sort((a, b) => b - a);
        // console.log(indexes);
        indexes.forEach(i => {
            // console.log(`Index: ${i}`);
            this.addScore(this.bubbleMachine.words[i].text);
            this.bubbleMachine.words.splice(i, 1);
        });
        this.userString = "";
        this.clearCorrectTyped();
        // this.bubbleMachine.words.splice(index, 1);
        // this.userString = ""; // needs to pop two or more before
    }

    timeUp = () => {
        this.pausedState = 1;
        // console.log(this.score - this.scoreBeforeRound)

        // Return to beggining if score not reached
        if ((this.score - this.scoreBeforeRound) < this.scoreNeeded) {
            // this.level++;
            this.level = 0;
        }

        // reset the position of second paused message
        this.pausedMessages[1].position.from.y = 100;


        // console.log('paused = ', this.paused);
        // console.log('You scored: ', this.score);
        this.setPausedMessages();
        this.render();
    }

    testMatch = () => {
        const wordsToPop = [];
       
        this.bubbleMachine.words.forEach((word, index) => {
            if (word.text === word.correctlyTyped) {
                wordsToPop.push([index])
            }
        })

        if (wordsToPop.length > 0) {
            this.popWords(wordsToPop);
        }
        // console.log(wordsToPop);

    }

    startGame = () => {
       
        this.pausedState = -1
        this.timer = new CountdownTimer(1000, 15, this.timeUp);
        this.timer.start();
        this.bubbleMachine.start();
        // console.log('start game');
      
    }

    startNewLevel = () => {
        if (this.timer) {
            this.timer.stop();
        }
        this.scoreNeeded = this.level * 100 + 1000;
        this.scoreBeforeRound = this.score;
        this.setPreRoundMessage();
        this.level++;
        this.timer = new CountdownTimer(1000, 3, this.startGame);
        this.timer.start();
        this.bubbleMachine = new BubbleMachine(1500);
        this.pausedState = 0;
    }

    /* End of Gameplay functions */

    renderWords = () => {
        if (!this.bubbleMachine) return;

        this.bubbleMachine.words.forEach(word => {
            this.display.renderBubbleWord(word);
            word.position.update();
        })

    }

    renderPausedMessages = () => {
    
        this.pausedMessages.forEach(msg => {
            this.display.renderMessage(msg);
            msg.position.update();
        });
        
    }

    setPreRoundMessage = () => {
        this.preRoundMsg = new Message(
            `You need to score ${this.scoreNeeded} points to advance`,
            new Position(
                function () {
                    this.from.x = this.to.x;
                    this.from.y = this.to.y;
                }, 
                {x: 50, y: 50},
                {x: 50, y: 50}
            ),

        )
    }

    setPausedMessages = () => {
        console.log(this.score);
        if (this.score) {
            this.pausedMessages[0].text = `Total score ${this.score}`;
            if (this.pausedMessages[2]) {
                this.pausedMessages[2].text = `You needed ${this.scoreNeeded} and you scored ${this.score - this.scoreBeforeRound}`
            } else {
                console.log(this.scoreNeeded);
                this.pausedMessages.push({
                    text: `You needed ${this.scoreNeeded} and you scored ${this.score - this.scoreBeforeRound}`,
                    fillStyle: '#83D2F3',
                    textAlign: "center",
                    position: new Position(
                        function () {
                            this.from.x = this.to.x;
                            this.from.y = this.to.y;
                        }, 
                        {x: 50, y: 40},
                        {x: 50, y: 40}
                    )
                })
            }
            if (this.pausedMessages[3]) {
                this.pausedMessages[3].text = "Nicely done!"
            } else {
                this.pausedMessages.push(new Message(
                    "Nicely done!",
                    new Position(
                        function() {
                            this.from.x = this.to.x;
                            this.from.y = this.to.y;
                        },
                        {x: 50, y: 0},
                        {x: 50, y: 30},
                    ),
                    "38px Arial"
                ))
            }

            if (this.score - this.scoreBeforeRound > this.scoreNeeded) {
                this.pausedMessages[1].text = "Hit space to continue";
                this.pausedMessages[3].text = "Nicely done!"
            } else {
                this.pausedMessages[1].text = "Hit space to restart"
                this.pausedMessages[3].text = "Aww shoot..."
            }
        }

    }

    render = () => {
        this.display.ctx.clearRect(0, 0, this.display.gameCanvas.width, this.display.gameCanvas.height);  // clear function
        // this.display.setLayout(this.paused);
        if (this.pausedState === 1) {
            // console.log('paused')
            // actual puased state
            // this.display.renderPaused(this.messages, this.score);
            this.renderPausedMessages();

        } else if (this.pausedState === -1) {
            // game play state
            // console.log('play')
            this.renderWords();
            this.display.renderScore(this.score - this.scoreBeforeRound, this.scoreNeeded);
            // this.display.renderScoreNeeded(this.scoreNeeded);
            this.display.renderLevel(this.level);
            this.display.renderTimer(this.timer.secondsRemaining);
        } else {
            // console.log('pre');
            this.display.renderTimer(this.timer.secondsRemaining);
            this.display.renderMessage(this.preRoundMsg);
        }
        // this.display.renderTimer(this.timer.secondsRemaining);
        // this.display.renderOtherThing();
        // this.display.renderTargetWord(this.wordOne);
        // this.wordOne.y += this.wordOne.speed / 10;
        requestAnimationFrame(this.render);
    }

    init = () => {
        this.display.init(); // create all elements
        this.addKeyboardEventListener();
        this.initPausedMessages();
        // this.startNewLevel();
        // this.display.setLayout(this.paused);
        // this.display.startButton.addEventListener('click', this.startNewLevel) // add start round to temporary button
        // console.log(this.words);
        // this.bubbleMachine = new BubbleMachine(1500);
        // this.bubbleMachine.start();
        // this.bubbleMachine.words.push(new Word(WORDLIST[Math.floor(Math.random() * WORDLIST.length)]));
        this.render();
    }


}

export default Game;