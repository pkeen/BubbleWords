class CountdownTimer {
  
    /* 
    Description : CountdownTimer Class counts down from seconds provided
      It is self-adjusting to the drift (extra time taken due to processes)
      
    Parameters: 
      timeInterval : How long between
      secondsRemaining : seconds to count down from
      parentElement : where to place the timer display in DOM
      endingCallback : function to run after timer ends
    */
    
    constructor(timeInterval, secondsRemaining, parentElement, endingCallback) {
        this.timeInterval = timeInterval;
        this.secondsRemaining = secondsRemaining;
        this.parentElement = parentElement;
        this.endingCallback = endingCallback;
        this.timerElement = document.createElement('p');
    }
    
    // start timer
    start = () => {
      this.expected = Date.now() + this.timeInterval
      this.timeout = setTimeout(this.round, this.timeInterval);
    }
      
    // to stop timer
    stop = () => {
        clearTimeout(this.timeout);
        this.endingCallback(); // call the ending function
    }
      
    // method that runs callback and adjust time interval
    round = () => {
        // expected is the time that we should be at if there was no drift    
        let drift = Date.now() - this.expected;
        // Check if drift greater than interval - browser clicked away
        drift > this.interval && this.stop();
        
        this.expected += this.timeInterval;
        this.secondsRemaining--;
        this.render();
        
        if (this.secondsRemaining <= 0) {
          console.log(this.timeout);
          this.stop();
        } else {
          this.timeout = setTimeout(this.round, this.timeInterval - drift);
        }
    }
  
    // Format the time
    formatTime = () => {
      const seconds = this.secondsRemaining % 60;
      const minutes = Math.floor(this.secondsRemaining / 60);
      return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    // render in DOM
    render = () => {
      this.timerElement.innerHTML = this.formatTime();
    }
  
    // intialization must be called before start
    init = () => {
      this.parentElement.innerHTML = '';
      this.parentElement.append(this.timerElement);
      this.render();
    }
}

export default CountdownTimer;