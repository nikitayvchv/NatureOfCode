//All of this was done with reference to Interactive Vector Motion and Braking Car. I used this code as inspiration for my own version of it. The frog, which I am very proud of, was drawn by me too :D

//The frog: The user is in charge of moving the frog
//Simply press an arrow key once, and it will begin moving in that direction
//Once you get to the edge, the frog will stop moving
//The frog also turns to face the direction you move it

//The flies: The flies will follow the frog
//If they get to the edge, they will randomly respawn in the center
//If you find that the flies get too close together, then move the frog to the edge to "reset" them
var Mover = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(4);

    this.position.add(this.velocity);
};

Mover.prototype.displayRight = function() {
    stroke(0);
    strokeWeight(2);
    fill(0, 125, 48);
    ellipse(this.position.x  -12, this.position.y -16, 40, 20);
    ellipse(this.position.x  -12, this.position.y+ 16, 40, 20);
    ellipse(this.position.x, this.position.y, 48, 48);
    ellipse(this.position.x + 18, this.position.y+ 10, 20, 20);
    ellipse(this.position.x + 18, this.position.y -10, 20, 20);

};

Mover.prototype.displayLeft = function() {
    stroke(0);
    strokeWeight(2);
    fill(0, 125, 48);
    ellipse(this.position.x + 12, this.position.y+ -16, 40, 20);
    ellipse(this.position.x + 12, this.position.y+ 16, 40, 20);
    ellipse(this.position.x, this.position.y, 48, 48);
    ellipse(this.position.x - 18, this.position.y+ 10, 20, 20);
    ellipse(this.position.x - 18, this.position.y+ -10, 20, 20);

};

Mover.prototype.displayUp = function() {
    stroke(0);
    strokeWeight(2);
    fill(0, 125, 48);
    ellipse(this.position.x + 16, this.position.y+ 12, 20, 40);
    ellipse(this.position.x - 16, this.position.y+ 12, 20, 40);
    ellipse(this.position.x, this.position.y, 48, 48);
    ellipse(this.position.x - 10, this.position.y -18, 20, 20);
    ellipse(this.position.x + 10, this.position.y -18, 20, 20);

};

Mover.prototype.displayDown = function() {
    stroke(0);
    strokeWeight(2);
    fill(0, 125, 48);
    ellipse(this.position.x + 16, this.position.y- 12, 20, 40);
    ellipse(this.position.x - 16, this.position.y- 12, 20, 40);
    ellipse(this.position.x, this.position.y, 48, 48);
    ellipse(this.position.x - 10, this.position.y +18, 20, 20);
    ellipse(this.position.x + 10, this.position.y +18, 20, 20);

};

Mover.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = width;
    this.acceleration.set(0, 0);

  } 
  else if (this.position.x < 0) {
    this.position.x = 0;
    this.acceleration.set(0, 0);
  }

  if (this.position.y > height) {
    this.position.y = height;
    this.acceleration.set(0, 0);
    
  } 
  else if (this.position.y < 0) {
    this.position.y = 0;
    this.acceleration.set(0, 0);
  }
};

var mover = new Mover();



var flies = function() {
  this.position = new PVector(random(width), random(height));
  this.velocity = new PVector(0, 0);
  this.acceleration = new PVector(0, 0);
};

flies.prototype.update = function() {
    var moverSpot = new PVector(mover.position.x, mover.position.y);
    var dir = PVector.sub(moverSpot, this.position);
    dir.normalize();
    dir.mult(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

flies.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(255, 255, 255);
  triangle(this.position.x, this.position.y, this.position.x + 20, this.position.y - 10 , this.position.x + 20, this.position.y + 10);
  triangle(this.position.x, this.position.y, this.position.x - 20, this.position.y - 10 , this.position.x - 20, this.position.y + 10);
  fill(127);
  ellipse(this.position.x, this.position.y, 10, 10);
};

flies.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = random(0, width);
    this.position.y = random(0, height);
  } 
  else if (this.position.x < 0) {
    this.position.x = random(0, width);
    this.position.y = random(0, height);
  }

  if (this.position.y > height) {
    this.position.x = random(0, width);
    this.position.y = random(0, height);
  } 
  else if (this.position.y < 0) {
    this.position.x = random(0, width);
    this.position.y = random(0, height);
  }
};

var fly = [];

for (var i = 0; i < 5; i++) {
    fly[i] = new flies(); 
}

var MoverCode = 0;

draw = function() {
    background(106, 207, 230);
    for (var i = 0; i < fly.length; i++) {
        fly[i].update();
        fly[i].display();
        fly[i].checkEdges();
    }
     if (keyIsPressed && keyCode === 39 ) {
        MoverCode = 1;
        mover.acceleration.set(1, 0);
        mover.displayRight();
    } 
    else if (keyIsPressed && keyCode === 37){
        MoverCode = 2;
        mover.acceleration.set(-1, 0);
        mover.displayLeft();
    }
    else if (keyIsPressed && keyCode === 38){
        MoverCode = 3;
        mover.acceleration.set(0, -1);
        mover.displayUp();
    }
    else if (keyIsPressed && keyCode === 40){
        MoverCode = 4;
        mover.acceleration.set(0,1);
        mover.displayDown();
    }
    else{
        mover.acceleration.set(0, 0);
        if (MoverCode === 1){
            mover.displayRight();
        }
        else if (MoverCode === 2){
            mover.displayLeft();
        }
        else if (MoverCode === 3){
            mover.displayUp();
        }
        else if (MoverCode === 4){
            mover.displayDown();
        }
        else{
            mover.displayUp();
        }
    }
    
    mover.update();
    mover.checkEdges();
     
};
