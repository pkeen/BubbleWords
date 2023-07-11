import Word from './word.js';
import WORDLIST from './wordList.js';

class BubbleMachine {

    /*
        This class produces the bubbles and contains the array of words for the game
        Uses a similar structure to the timer, by repeating a timeout function based on the interval provided
    */

    constructor(interval) {
        this.interval = interval; // The interval at which to spit out more bubbles
        this.words = [];
    }

    start = () => {
        this.expected = Date.now() + this.interval;
        this.createRandomBubbles();
        this.timeout = setTimeout(this.repeat, this.interval);
    }
    
    stop = () => {
        clearTimeout(this.timeout);
    }
    
    repeat = () => {
        // expected is the time that we should be at if there was no drift    
        let drift = Date.now() - this.expected;
        // Check if drift greater than interval - browser clicked away
        drift > this.interval && this.stop();
        // next excpected
        this.expected += this.interval;
        // function create random nuber of bubbles between 2 - 8
        if (this.words.length < 5) {
            this.createRandomBubbles();
        }
        
        // repeat
        this.timeout = setTimeout(this.repeat, this.interval - drift);
        
    }
    
    createRandomBubbles = () => {
        // This creates the bubbles
        const maxBubbles = 3;
        const minBubbles = 1;
        let numBubbles = Math.floor(Math.random() * (maxBubbles - minBubbles) + minBubbles);
        for (let i = 0; i < numBubbles; i++) {
            const newWord = new Word(WORDLIST[Math.floor(Math.random() * WORDLIST.length)])
            newWord.initPosition();
            this.words.push(newWord);
        }

    }

    redirectBubbles = () => {
        this.words.forEach(word => {
            word.y = word.y - Math.floor(Math.random() * 3);
        })
    }

}

export default BubbleMachine;