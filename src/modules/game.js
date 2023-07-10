import Display from "./display.js";
import CountdownTimer from "./CountdownTimer.js";
import BubbleMachine from "./bubbleMachine.js";
import Message from "./message.js";
import Position from "./position.js";
import {sfx} from '../../assets/audio.js';

class Game {

    constructor(parentElement) {
        this.display = new Display(parentElement);
        this.level = 0;
        this.score = 0;
        this.pausedState = 1; // game starts paused
        this.userChar;
        this.userString = ""; // i think no longer needed
        this.targetString = ''; // no longer needed
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
                        sfx.pop1.play();
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
        // 50 points for character in word
        let wordScore = text.length * 50;
        this.score += wordScore;
    }

    clearCorrectTyped = () => {
        // Reset correctly typed after succesful word pop
        this.bubbleMachine.words.forEach(word => {
            word.correctlyTyped = "";
        })
    }

    popWords = (indexes) => {
        // function to remove words from the array after correctly typed
        // Takes indexes, then runs backwards through array, so as not to disrupt later indices

        // sort indexes descending
        indexes = indexes.sort((a, b) => b - a);

        // remove the indexes from words
        indexes.forEach(i => {
            this.addScore(this.bubbleMachine.words[i].text);
            this.bubbleMachine.words.splice(i, 1);
        });

        // pop sound effect
        sfx.pop2.play();

        // reset current user typing
        this.userString = "";
        this.clearCorrectTyped();
       
    }

    timeUp = () => {
        // call back function supplied to timer to be called at end of round

        // set paused state to paused
        this.pausedState = 1;

        // Return to beggining of game scoreNeeded not reached
        if ((this.score - this.scoreBeforeRound) < this.scoreNeeded) {
            sfx.loss.play(); // loss sound effect
            this.level = 0;
        } else {
            sfx.win.play();
        }

        // reset the position of second paused message for animation
        this.pausedMessages[1].position.from.y = 100;


        // reset the paused messages
        this.setPausedMessages();

    }

    testMatch = () => {
        // testing for matches between typing and words

        // array for indexes that match
        const wordsToPop = [];
        
        // check each word for match
        this.bubbleMachine.words.forEach((word, index) => {
            if (word.text === word.correctlyTyped) {
                wordsToPop.push([index])
            }
        })

        // call pop words if array is not empty
        if (wordsToPop.length > 0) {
            this.popWords(wordsToPop);
        }

    }

    startGame = () => {
        // callback function for pre-round timer to start the game properly

        this.pausedState = -1
        this.timer = new CountdownTimer(1000, 16, this.timeUp);
        this.timer.start();
        this.bubbleMachine.start();
        sfx.music.play();
      
    }

    startNewLevel = () => {
        // start new level 
        this.scoreNeeded = this.level * 100 + 1000;
        this.scoreBeforeRound = this.score;
        this.setPreRoundMessage();
        this.level++;

        // when timer ends game starts for real
        this.timer = new CountdownTimer(1000, 3, this.startGame);
        this.timer.start();
        this.bubbleMachine = new BubbleMachine(1500);
        this.pausedState = 0;
    }

    /* End of Gameplay functions */

    /* Rendering Functions */

    renderWords = () => {
        // render words function

        // return if no words
        if (!this.bubbleMachine) return;

        // call renderBubbleWord in display
        this.bubbleMachine.words.forEach(word => {
            this.display.renderBubbleWord(word);
            word.position.update();
        })

    }

    renderPausedMessages = () => {
        // pass each paused message to be rendered in display
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

        // Main Animation Loop

        // clear the canvas each loop
        this.display.ctx.clearRect(0, 0, this.display.gameCanvas.width, this.display.gameCanvas.height);

        // logic for what to render based on paused state
        if (this.pausedState === 1) {
            // paused state
            this.renderPausedMessages();

        } else if (this.pausedState === -1) {
            // playing state
            this.renderWords();
            this.display.renderScore(this.score - this.scoreBeforeRound, this.scoreNeeded);
            this.display.renderLevel(this.level);
            this.display.renderTimer(this.timer.secondsRemaining);
        } else {
            // this is the pre-round state
            this.display.renderTimer(this.timer.secondsRemaining);
            this.display.renderMessage(this.preRoundMsg);
        }
        
        // loop 
        requestAnimationFrame(this.render);
    }

    init = () => {
        // Initialize the game

        this.display.init(); // create all elements
        this.addKeyboardEventListener();
        this.initPausedMessages();
        this.render();
    }


}

export default Game;