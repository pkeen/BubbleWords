import Display from "./display.js";
import CountdownTimer from "./CountdownTimer.js";
import Word from './word.js';

class Game {

    constructor(parentElement) {
        this.display = new Display(parentElement);
        // this.parentElement = parentElement;
        this.level = 0;
        this.score = 0;
        this.paused = false; // temporary
        this.userChar;
        this.userString = "";
        // this.targetChar = 0;
        // this.correctlyTyped = ""; // These values have been moved into words
        this.targetString = '';
        this.wordList = [
            'hello',
            'example',
            'house',
            'computer',
            'vehicle',
            'library',
            'election',
            'discipline',
            'embargo',
            'transfer',
            'foreign',
            'extreme',
            'exaggeration'
        ];
        this.scoreNeededPerRound = {
            1: 100,
            2: 200,
            3: 300,
            4: 400
        }
        // temporary
        this.words = [new Word('hello', 30), new Word('example', 70)]
    }
    
    // /* Event Listeners and function */

    // addKeyboardEventListener = () => {
    //       // event listener for keyboard input
    //     document.addEventListener("keydown", (event) => {
    //         // If paused we're only listening for the space key
    //         if (this.paused) {
    //             if(event.code === 'Space') {
    //                 console.log('space key')
    //                 this.startNewLevel();
    //             }
    //         } else {
    //             this.userChar = event.key;
    //             console.log('char: ', this.userChar);
    //             this.userString += this.userChar;
    //             console.log(this.userString);
    //             // logic for displaying so far correctly typed
    //             if (this.userChar === this.targetString[this.targetChar]) {
    //                 this.correctlyTyped += this.userChar
    //                 this.targetChar++;
    //             } else {
    //                 this.correctlyTyped = "";
    //                 this.targetChar = 0;
    //             }
    //             console.log(this.userString);
    //             // this.render();
    //             this.testMatch(); // seems to
    //         }

    //     });
    // }

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
                // console.log(this.userString);
                // this.words.forEach(word => {
                //     if (this.userChar === word.text[word.targetChar]) {
                //         word.correctyTyped += this.userChar
                //         word.targetChar++;
                //     } else {
                //         word.correctlyTyped = "";
                //         word.targetChar = 0;
                //     }
                //     console.log(word.correctlyTyped);
                // })

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

                this.words.forEach(word => {
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
          }

      });
  }

    /* End of Event Listeners */

    /* Game play Functions */

    timeUp = () => {
        this.paused = true;
        console.log(this.score - this.scoreBeforeRound)
        if ((this.score - this.scoreBeforeRound) >= this.scoreNeededPerRound[this.level]) {
            this.level++;
            console.log(this.scoreNeededPerRound[this.level])
        }
        // console.log('paused = ', this.paused);
        // console.log('You scored: ', this.score);
        this.render();
    }

    // testWinner = () => {
    //     if (this.targetRegEx.test(this.userString)) {
    //         console.log('winner!')
    //         this.startNewRound();
    //         this.score += 100;
    //         this.render();
    //     }
    // }
    
    testMatch = () => {
        this.words.forEach(word => {
            if (word.regExp.test(this.userString)) {
                console.log('Winner!!');
            }
        })
    }
    getNewTargetWord = () => {
        this.targetString = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.targetRegEx = new RegExp(this.targetString);
        console.log(`target word : ${this.targetString}`);
    }

    startNewRound = () => {
        console.log('round started');
        if(this.level === 0) {
            this.level =1;
        }
        this.paused = false;
        console.log('this paused =', this.paused)
        this.userString = "";
        // this.targetChar = 0;
        // this.correctlyTyped = "";
        this.scoreBeforeRound = this.score;
        this.getNewTargetWord();
        this.render();
    }

    startNewLevel = () => {
        if (this.timer) {
            this.timer.stop(); // if its running
        }
        this.timer = new CountdownTimer(1000, 5, this.display.timerElement, this.timeUp); 
        this.timer.init();
        this.startNewRound();
        this.timer.start();
    }
    /* End of Gameplay functions */

    // render = () => {
    //     this.display.setLayout(this.paused);
    //     this.display.renderHeader(this.level, this.score);
    //     this.display.renderTargetWord(this.targetString, this.correctlyTyped);
    //     // this.display.renderTyping(this.correctlyTyped);
    //     this.display.renderPausedMessage(this.score);
    // }

    renderWords = () => {
        this.words.forEach(word => {
            this.display.renderTargetWord(word);
            word.y += word.speed / 10;
            if (word.y >= 100) {
                word.y = 0; 
            };
        })
    }

    render = () => {
        this.display.ctx.clearRect(0, 0, this.display.gameCanvas.width, this.display.gameCanvas.height);   
        this.renderWords();
        // this.display.renderOtherThing();
        // this.display.renderTargetWord(this.wordOne);
        // this.wordOne.y += this.wordOne.speed / 10;
        requestAnimationFrame(this.render);
    }

    init = () => {
        this.display.init(); // create all elements
        this.addKeyboardEventListener();
        // this.display.setLayout(this.paused);
        // this.display.startButton.addEventListener('click', this.startNewLevel) // add start round to temporary button
        // console.log(this.words)
        this.render();
    }


}

export default Game;