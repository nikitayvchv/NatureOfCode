//The frog will chase the fly (it's eyes follow it!)
//I tried to code in multiple flies but then its eyes start acting weird so I stuck to one for now

var G = 1;

//Will create a mover with a mass and a random position, and will set it's velocity and acceleration to 0
var Mover = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//Applies any forces passed through the function (attraction, repulsion)
Mover.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
//Will update the position, velocity, and acceleraiton of the animal
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//Displays the frog
Mover.prototype.displayFrog = function() {
    noStroke();
    fill(43, 105, 22);
    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    ellipse(this.position.x - 13, this.position.y-21, 20, 20);
    ellipse(this.position.x + 14, this.position.y-21, 20, 20);
    ellipse(this.position.x + 23, this.position.y+8, 14, 34);
    ellipse(this.position.x - 23, this.position.y+8, 14, 34);
    fill(255, 255, 255);
    ellipse(this.position.x + 14, this.position.y-21, 14, 14);
    ellipse(this.position.x - 13, this.position.y-21, 14, 14);
    fill(26, 26, 26);
    arc(this.position.x, this.position.y, 38, 32, 0, 180);
    fill(217, 21, 80);
    arc(this.position.x, this.position.y+9, 16, 23, 0, 180);
};

//Displays the fly
Mover.prototype.displayFly = function() {
    stroke(0);
  strokeWeight(2);
  fill(255, 255, 255);
  triangle(this.position.x, this.position.y, this.position.x + 20, this.position.y - 10 , this.position.x + 20, this.position.y + 10);
  triangle(this.position.x, this.position.y, this.position.x - 20, this.position.y - 10 , this.position.x - 20, this.position.y + 10);
  fill(127);
  ellipse(this.position.x, this.position.y, 10, 10);
    
};

//Displays the eyes of the frog
Mover.prototype.displayEyes= function() {
    noStroke();
    fill(0);
    ellipse(this.position.x, this.position.y, this.mass*10, this.mass*10);
};

//These next two functions could technically be one function, but I got an error when trying to pass both coordinates at the same time, even after trying multiple ways. Maybe I'll figure it out one day :)
//Will check the X coordinate of the Frog
Mover.prototype.CheckPositionX = function(){
    return this.position.x;
};

//Will check the Y coordinate of the Frog
Mover.prototype.CheckPositionY = function(){
    return this.position.y;
};

//Will make the fly run away from the frog
Mover.prototype.calculateAttractionFly = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = (G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

//Will make the frog chase the fly
Mover.prototype.calculateAttractionFrog = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = (G * this.mass * m.mass) / (-distance * distance);
    force.mult(strength);
    return force;
};

//Will make the frog's eyes look at the fly
Mover.prototype.calculateAttractionEyes = function(m){
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = (2 * G * this.mass * m.mass) / (-distance * distance);
    force.mult(strength);
    return force;
};

//Will make any animal that hits an edge bounce back
Mover.prototype.CheckEdges = function() {

  if (this.position.x > width) {
    this.position.x = width;
    this.acceleration.set(-0.5, 0);

  } 
  else if (this.position.x < 0) {
    this.position.x = 0;
    this.acceleration.set(0.5, 0);
  }

  if (this.position.y > height) {
    this.position.y = height;
    this.acceleration.set(0, -0.5);
    
  } 
  else if (this.position.y < 0) {
    this.position.y = 0;
    this.acceleration.set(0, 0.5);
  }
};

//Will make sure that the left pupil will not leave the white of the eye
Mover.prototype.CheckEye1 = function(x, y) {

  if (this.position.x > x - 10) {
    this.position.x = x - 10;
    this.acceleration.set(-0.01, 0);

  } 
  else if (this.position.x < x - 15) {
    this.position.x = x - 15;
    this.acceleration.set(0.01, 0);
  }

  if (this.position.y > y - 17) {
    this.position.y = y - 17;
    this.acceleration.set(0, -0.01);
    
  } 
  else if (this.position.y < y - 23) {
    this.position.y = y - 23;
    this.acceleration.set(0, 0.01);
  }
};

//will make sure that the right pupil will not leve it's eye
Mover.prototype.CheckEye2 = function(x, y) {

  if (this.position.x > x + 15) {
    this.position.x = x + 15;
    this.acceleration.set(-0.01, 0);

  } 
  else if (this.position.x < x + 10) {
    this.position.x = x + 10;
    this.acceleration.set(0.01, 0);
  }

  if (this.position.y > y - 17) {
    this.position.y = y - 17;
    this.acceleration.set(0, -0.01);
    
  } 
  else if (this.position.y < y - 23) {
    this.position.y = y - 23;
    this.acceleration.set(0, 0.01);
  }
};

//Creating all the animals (and the frog's eyes)
var fly = new Mover(1.5, random(width), random(height));
var frog = new Mover(3, random(width), random(height));
var EyePositionX = frog.CheckPositionX();
var EyePositionY = frog.CheckPositionY();
var eye1 = new Mover(1, EyePositionX - 15, EyePositionY - 20);
var eye2 = new Mover(1, EyePositionX + 15, EyePositionY - 20);

//Infanite loop o.o
draw = function() {
    background(161, 232, 255);
    
    //Updates all the variables for the fly
    var force = fly.calculateAttractionFly(frog);
    fly.applyForce(force);
    fly.CheckEdges();
    fly.update();
    fly.displayFly();
    
    //Updates all the variables for the frog
    force = frog.calculateAttractionFrog(fly);
    frog.applyForce(force);
    frog.CheckEdges();
    EyePositionX = frog.CheckPositionX();
    EyePositionY = frog.CheckPositionY();
    frog.update();
    frog.displayFrog();
    
    //Updates the left eye
    eye1.CheckEye1(EyePositionX, EyePositionY);
    force = eye1.calculateAttractionEyes(fly);
    eye1.applyForce(force);
    eye1.update();
    eye1.displayEyes();
    
    //Updates the right eye
    eye2.CheckEye2(EyePositionX, EyePositionY);
    force = eye2.calculateAttractionEyes(fly);
    eye2.applyForce(force);
    eye2.update();
    eye2.displayEyes();

};
