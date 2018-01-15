angleMode = "radians";
//A family fireflies that will spin forever
//The fireflies' rotation changes based on velocity (but has a limit/capacity)
//the smaller fireflies are flung much further and rotate faster

//creating flies
var Fly = function() {
    this.c = color(240, 235, 149, 170);
    this.s=floor(random(2,10));//size
    this.pos = new PVector(random(0,400),random(0, 400));
    this.vel = new PVector(random(4,-4),random(2,-2)); 
    this.acc = new PVector(3 ,0.0002);
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = this.s*0.002;
};

//rotating and drawing flies
Fly.prototype.display = function() {
    noStroke();
    fill(this.c);
  
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);
    popMatrix();

};

//adding the velocity to the position
Fly.prototype.move = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.s/5);
    this.pos.add(this.vel);
   
};

//redrawing the flies if they are out of the canvas
Fly.prototype.checkEdges = function() {
     if (this.pos.x < 0) {
        this.pos.x= 5;
    }else if (this.pos.x > 400) {
        this.pos.x= 5;
    }
    else if (this.pos.y > 400) {
        this.pos.y= 5;
    }
    else if (this.pos.y < 0) {
        this.pos.y= 10;
    }

};

//calling all the functions for the flies
Fly.prototype.go = function() {
    this.move();
    this.display();
    this.checkEdges();
    
    this.angle += this.aVelocity;
    this.aVelocity += this.aAcceleration;
    if (this.aVelocity > 0.03){
        this.aVelocity = 0;
    }
};

//creating the objects in array
var fireflies = [];
for (var i = 0; i < 150; i++){
    fireflies[i] = new Fly();
}


var draw = function() {
    background(4, 0, 66);
    for (var i =0; i < fireflies.length; i++) {
        fireflies[i].go();
    }
};


