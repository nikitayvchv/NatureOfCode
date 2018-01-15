//Press and hold space to start the spaceship up
//Once moving, release the space bar and use arrow keys to turn!

//Setting angle mode to "Radians"
angleMode = "radians";

//Function "Mover" used to create the ship. Sets all of the different variables up to be used
var Mover = function(x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 4;
    this.xoff = 1000;
    this.yoff = 0;
    this.r = 16;
};

//Function Star, used to make all of the stars
var Star = function(x, y){
    this.position = new PVector(x, y);
};

//Function Accelerate (used for the object "Mover"), calculates the correct acceleration for the mover
Mover.prototype.accelerate = function(){
    this.velocity.x += 0.1;
    this.acceleration.x += 0.1;
};

//Function Update (used for the object "Mover"), updates the current position, velocity, and acceleration
Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//Function TurnLeft (used for the object "Mover"), rotates the object when called
Mover.prototype.turnLeft = function() {
    angleMode = "degree";
    pushMatrix();
    this.velocity.rotate(-0.1);
    popMatrix();
};

//Function TurnRight (used for the object "Mover"), rotates the object when called
Mover.prototype.turnRight = function() {
    angleMode = "degree";
    pushMatrix();
    this.velocity.rotate(0.1);
    popMatrix();
};

//Function DisplayStars (used for the object "Star"), displays all of the stars
Star.prototype.displayStars = function(){
    noStroke();
    fill (255, 255, 255);
    ellipse(this.position.x,this.position.y,2,2);
};

//Function display (used for the object "Mover"), displays the spaceship in it's current possition
Mover.prototype.display = function () {
    var angle = this.velocity.heading();
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(127, 127, 127);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(angle);
    fill(153, 153, 153);
    ellipse(-26,10,10,10);
    ellipse(-26,-5,10,10);
    triangle(-25, 20, 16, 5, -25, -15);
    fill(138, 173, 191);
    rect(-16, -7, 8, 20, 20);
    popMatrix();
};

//Function CheckEdges (used for the object "Mover"), detects if the ship goes outside the canvas. If it does, then it moves the ship to the other side
Mover.prototype.checkEdges = function () {
    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//Creating objects
var ship = new Mover(width/2, height/2);
var stars = [];
for (var i = 0; i < 100; i++){
    stars[i]= new Star(random(width), random(height));
}

//Detects if a key on the computer is pressed. If it is, and it's the left/right arrow key or the space bar, it will call a function
keyPressed = function(){
    if (keyCode === 37){
        ship.turnLeft();
    }
    else if (keyCode === 39){
        ship.turnRight();
    }
    else if (keyCode ===32){
        ship.accelerate();
    } 
};

//Draw function (loops forever). Will update the ship and the star's positions constantly
draw = function() {
    background(42, 54, 71);
    fill(255, 255, 255);
    text("Hold Space to Start/Accelerate", width/2-90, height-30, 190, 146);
    for (i = 0; i < stars.length; i++){
        stars[i].displayStars();
    }
    ship.update();
    ship.checkEdges();
    ship.display();
};
