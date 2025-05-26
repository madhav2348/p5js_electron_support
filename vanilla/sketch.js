function setup() {
  // Creates a canvas 600 pixels wide
  // and 400 pixels high.
  createCanvas(600, 400);
}
function draw() {
  //sky blue background
  background(135, 206, 235);
  //sun in top right
  fill("yellow"); //yellow  

  stroke("orange"); //orange outline 

  strokeWeight(20); //large outline    

  circle(550, 50, 100);
}