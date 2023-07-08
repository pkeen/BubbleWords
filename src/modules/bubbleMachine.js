import Word from './word.js';
import WORDLIST from './wordList.js';

class BubbleMachine {

    constructor(interval) {
        this.interval = interval;
        // this.callBack = callBack;
        this.words = [];
    }

    start = () => {
        this.expected = Date.now() + this.interval;
        this.createRandomBubbles();
        this.timeout = setTimeout(this.repeat, this.interval);
        console.log(this.words.length)
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
        
        // Function for different animation values of innner circle ?
        // LERP
        // this.redirectBubbles();
        // console.log(this.words.length);
        
        // repeat
        this.timeout = setTimeout(this.repeat, this.interval - drift);
        
    }
    
    createRandomBubbles = () => {
        const maxBubbles = 3;
        const minBubbles = 1;
        let numBubbles = Math.floor(Math.random() * (maxBubbles - minBubbles) + minBubbles);
        for (let i = 0; i < numBubbles; i++) {
            // this.callBack();
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