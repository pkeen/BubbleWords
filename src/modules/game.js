import Display from "./display.js";
import CountdownTimer from "./CountdownTimer.js";
import Word from './word.js';
import BubbleMachine from "./bubbleMachine.js";
import WORDLIST from "./wordList.js"; // temporary
import Position from "./position.js";
import messages from "./messages.js";

class Game {

    constructor(parentElement) {
        this.display = new Display(parentElement);
        // this.parentElement = parentElement;
        this.level = 0;
        this.score = 0;
        this.paused = true; // temporary
        this.userChar;
        this.userString = "";
        // this.targetChar = 0;
        // this.correctlyTyped = ""; // These values have been moved into words
        this.targetString = '';
        this.scoreNeededPerRound = {
            1: 100,
            2: 200,
            3: 300,
            4: 400
        }
        this.messages = messages;
        // this.words = [];
    }
    
/* === EVENT LISTENERS === */

    addKeyboardEventListener = () => {
        // event listener for keyboard input
      document.addEventListener("keydown", (event) => {
          // If paused we're only listening for the space key
          if (this.paused) {
              if(event.code === 'Space') {
                  console.log('space key')
                  this.startNewLevel();
              }
          } else {
                let char = event.key;
                // console.log('char: ', this.userChar);
                this.userString += char;
                // //working loop
                // for (let i = 0; i < this.words.length; i++) {
                //     if (this.userChar === this.words[i].text[this.words[i].targetChar]) {
                //         console.log(this.userChar);
                //         this.words[i].targetChar++;
                //         this.words[i].correctlyTyped += this.userChar;
                //     } else {
                //         this.words[i].correctlyTyped = "";
                //         this.words[i].targetChar = 0;
                //     }
                //     console.log(`${this.words[i].text} : ${this.words[i].correctlyTyped}`)
                // }

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
            //   // logic for displaying so far correctly typed
            //   if (this.userChar === this.targetString[this.targetChar]) {
            //       this.correctlyTyped += this.userChar
            //       this.targetChar++;
            //   } else {
            //       this.correctlyTyped = "";
            //       this.targetChar = 0;
            //   }
              // this.render();
              this.testMatch(); // seems to
            //   console.log(this.bubbleMachine.words) // debugging
          }

      });
  }


/* === GAME LOGIC FUNCTIONS === */

    addScore = (text) => {
        let wordScore = text.length * 50;
        this.score += wordScore;
    }

    cleanCorrectTyped = () => {
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
        this.cleanCorrectTyped();
        // this.bubbleMachine.words.splice(index, 1);
        // this.userString = ""; // needs to pop two or more before
    }

    timeUp = () => {
        this.paused = true;
        console.log(this.score - this.scoreBeforeRound)
        if ((this.score - this.scoreBeforeRound) >= this.scoreNeededPerRound[this.level]) {
            // this.level++;
            console.log(this.scoreNeededPerRound[this.level])
        }
        // console.log('paused = ', this.paused);
        // console.log('You scored: ', this.score);
        this.setPausedMessages();
        this.render();
    }

    testMatch = () => {
        const wordsToPop = [];
        // this.bubbleMachine.words.forEach((word, index, array) => {
        //     if (word.regExp.test(this.userString)) {
        //         wordsToPop.push([word.text, index]);
        //         // this.calculateScore(word.text);
        //         // this.popWord(index);
        //     }
        // })
        this.bubbleMachine.words.forEach((word, index) => {
            if (word.text === word.correctlyTyped) {
                wordsToPop.push([index])
            }
        })

        // for (let i = this.bubbleMachine.words.length -1; i > -1 ; i--) {
        //     if (this.bubbleMachine.words[i].text === this.bubbleMachine.words[i].correctlyTyped) {
        //         this.bubbleMachine.words.splice(i, 1);
        //     }
        // }

        if (wordsToPop.length > 0) {
            this.popWords(wordsToPop);
        }
        // console.log(wordsToPop);

    }


    // startNewRound = () => {
    //     console.log('round started');
    //     if(this.level === 0) {
    //         this.level =1;
    //     }
    //     this.paused = false;
    //     console.log('this paused =', this.paused)
    //     this.userString = "";
    //     // this.targetChar = 0;
    //     // this.correctlyTyped = "";
    //     this.scoreBeforeRound = this.score;
    //     this.getNewTargetWord();
    //     this.render();
    // }

    // startNewLevel = () => {
    //     if (this.timer) {
    //         this.timer.stop(); // if its running
    //     }
    //     this.timer = new CountdownTimer(1000, 5, this.display.timerElement, this.timeUp); 
    //     this.timer.init();
    //     this.startNewRound();
    //     this.timer.start();
    // }

    startNewLevel = () => {
        if (this.timer) {
            this.timer.stop();
        }

        this.level++;
        this.timer = new CountdownTimer(1000, 8, this.timeUp);
        this.bubbleMachine = new BubbleMachine(1500);
        this.paused = false;
        this.timer.start();
        this.bubbleMachine.start();
        
    }

    /* End of Gameplay functions */

    renderWords = () => {
        if (!this.bubbleMachine) return;

        this.bubbleMachine.words.forEach(word => {
            this.display.renderBubbleWord(word);
            word.position.update();
        })

    }

    renderMessages = () => {
    
        this.messages.forEach(msg => {
            this.display.renderMessage(msg);
            msg.position.update();
        });
        
    }

    setPausedMessages = () => {
        if (this.score) {
            this.messages[0].text = `You scored ${this.score}`;
            this.messages[1].text = "Hit space to continue";
        } else {
            // this.messages.main.text = "Welcome to "
        }

    }

    render = () => {
        this.display.ctx.clearRect(0, 0, this.display.gameCanvas.width, this.display.gameCanvas.height);  // clear function
        // this.display.setLayout(this.paused);
        if (this.paused) {
            // this.display.renderPaused(this.messages, this.score);
            this.renderMessages();

        } else {
            this.renderWords();
            this.display.renderScore(this.score);
            this.display.renderLevel(this.level);
            this.display.renderTimer(this.timer.secondsRemaining);
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