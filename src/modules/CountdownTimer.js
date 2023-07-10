import { sfx } from "../../assets/audio.js";

// import {audio, audioCtx} from "./audio.js";

class CountdownTimer {
  
    /* 
    Description : CountdownTimer Class counts down from seconds provided
      It is self-adjusting to the drift (extra time taken due to processes)
      
    Parameters: 
      timeInterval : How long between
      secondsRemaining : seconds to count down from
      endingCallback : function to run after timer ends
      // not included in this implementation /// parentElement : where to place the timer display in DOM //
    */
    
    constructor(timeInterval, secondsRemaining, endingCallback) {
        this.timeInterval = timeInterval;
        this.secondsRemaining = secondsRemaining;
        this.endingCallback = endingCallback;
    }
    
    start = () => {
      // start timer
      this.expected = Date.now() + this.timeInterval
      this.timeout = setTimeout(this.round, this.timeInterval);
      sfx.tick.play(); // play sound effect
    }
      
    stop = () => {
      // to stop timer
        clearTimeout(this.timeout);
        this.endingCallback(); // call the ending function
    }
      
    // method that runs callback and adjust time interval
    round = () => {
        sfx.tick.play();

        // expected is the time that we should be at if there was no drift    
        let drift = Date.now() - this.expected;
        // Check if drift greater than interval - browser clicked away
        drift > this.interval && this.stop();
        
        this.expected += this.timeInterval;
        this.secondsRemaining--;
        console.log(this.secondsRemaining); // testing
        // this.render();
        
        if (this.secondsRemaining <= 0) {
          // stop timer when seconds reaches 0
          this.stop();
        } else {
          // repeat for another second
          this.timeout = setTimeout(this.round, this.timeInterval - drift);
        }
    }
  
    // these functions were for rendering in the DOM, but I moved the rendering functionality to display

    // // Format the time
    // formatTime = () => {
    //   const seconds = this.secondsRemaining % 60;
    //   const minutes = Math.floor(this.secondsRemaining / 60);
    //   return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    // }
    
    // // render in DOM
    // render = () => {
    //   this.timerElement.innerHTML = this.formatTime();
    // }
  
    // // intialization must be called before start
    // init = () => {
    //   // this.parentElement.innerHTML = '';
    //   // // this.parentElement.append(this.timerElement);
    //   // this.render();
    // }
}

export default CountdownTimer;