
class Position {
    // A dynamic position class
    // Holds 2d to and from cordinates and an alpha
    // Must be interpreted with a lerp function (to, from, alpha)
    
    constructor(
      cbNext, // callback for what to do when reaches destination
      from = {
        x: Math.floor(Math.random() * 100),
        y: 100
      }, 
      to = {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      }, 
      speed = 2
    ) {
      this.cbNext = cbNext;
      this.from = from;
      this.to = to;
      this.speed = speed;
      this.alpha = 0; // "Percent" between 0 and 1 to interpolate between the two values
    }
    
    
    update = () => {
      // The update expresses logic for updating and is called by animation loop
      // Uses the call back supplied to generate the next position according to the rules supplied
      if (this.alpha < 1) {
        this.alpha += this.speed / 1000;
      } else {
        // this must be bound to call the callback function to update variables within this instance of position
        this.cbNext.call(this);
      }
    }
    
}
  
  export default Position;