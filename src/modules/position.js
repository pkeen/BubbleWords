

// class Position {
//     // A dynamic position class
//     // Interpreted with a lerp function
    
//     constructor(
//       cbNext, // callback for what to do when reaches destination
//       from = {
//         x: Math.floor(Math.random() * 100),
//         y: 100
//       }, 
//       to = {
//         x: Math.floor(Math.random() * 100),
//         y: Math.floor(Math.random() * 100)
//       }, 
//       speed = 2
//     ) {
//       this.from = from;
//       this.to = to;
//       this.speed = speed;
//       this.cbNext = cbNext;
//       this.alpha = 0; // "Percent" between 0 and 1 to interpolate between the two values
//     }
    
  
//     // The update expresses logic for updating
//     // Uses the call back supplied to generate the next position according to the rules supplied
    
//     update = () => {
//       if (this.alpha < 1) {
//         this.alpha += this.speed / 1000;
//       } else {
//         this.alpha = 0;
//         this.from = {
//           x: this.to.x,
//           y: this.to.y
//         }
//         this.genRandomTo();
//       }
//     }
  
//     genRandomTo = () => {
//       this.to.x = Math.floor(Math.random() * 100);
//       this.to.y = Math.floor(Math.random() * 100);
//     }
    
// }
  
//   export default Position;


class Position {
    // A dynamic position class
    // Interpreted with a lerp function
    
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
    
    
    // The update expresses logic for updating
    // Uses the call back supplied to generate the next position according to the rules supplied
    
    update = () => {
      if (this.alpha < 1) {
        this.alpha += this.speed / 1000;
      } else {
        // console.log(this);
        this.cbNext.call(this);
      }
    }
    
  
    genRandomTo = () => {
      this.to.x = Math.floor(Math.random() * 100);
      this.to.y = Math.floor(Math.random() * 100);
    }
    
}
  
  export default Position;