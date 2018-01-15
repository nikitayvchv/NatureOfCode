angleMode = "radians";
//A family fireflies
//The Fireflies have a very short life and are born every few frames
//The Fireflies will grow until they have reached adulthood (then they stop growing)
//If a firefly is close to death, it will turn orange (lose it's light D: )

//creating flies
var Fly = function() {
    this.c = color(240, 235, 149, 170);
    this.s=floor(random(2,10));//size
    this.pos = new PVector(random(0,400),random(0, 400));
    this.vel = new PVector(random(4,-4),random(2,-2)); 
    this.acc = new PVector(random(-3, 3) ,random (-3, 3));
    this.timeToLive = 350;
    this.LifeCounter = 0;
};

//Updating all of the lifespan and growing of the fireflies
Fly.prototype.update = function(){
    this.timeToLive -= 2;
    this.s += this.LifeCounter/100;
    
    if (this.LifeCounter < 10){
        this.LifeCounter++;
    }
    
    if (this.LifeCounter >= 10){
        this.LifeCounter = 0;
    }
    
    if (this.timeToLive < 100){
        this.c = color(247, 113, 46, 100);
    }
};

//rotating and drawing flies
Fly.prototype.display = function() {
    noStroke();
    fill(this.c);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);

};

//adding the velocity to the position
Fly.prototype.move = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.s/5);
    this.pos.add(this.vel);
    
};

//Check to see if the flies are dead
Fly.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

//redrawing the flies if they are out of the canvas
Fly.prototype.checkEdges = function() {
     if (this.pos.x < 0) {
        this.acc = new PVector(3 , this.acc.y);
    }else if (this.pos.x > 400) {
        this.acc = new PVector(-3 ,this.acc.y);
    }
    else if (this.pos.y > 400) {
        this.acc = new PVector(this.acc.x , -3);
    }
    else if (this.pos.y < 0) {
        this.acc = new PVector(this.acc.x , 3);
    }
    
};

//calling all the functions for the flies
Fly.prototype.go = function() {
    this.move();
    this.update();
    this.display();
    this.checkEdges();
    
    this.aVelocity += this.aAcceleration;
    if (this.aVelocity > 0.03){
        this.aVelocity = 0;
    }
};

//Creating new system
var ParticleSystem = function(position) {
    this.flies = [];
};

//Adding particle to the system
ParticleSystem.prototype.addParticle = function() {
    this.flies.push(new Fly());
};

//Running all of the code for the particles (and checking if it's dead)
ParticleSystem.prototype.run = function() {
    for (var i = this.flies.length-1; i >= 0; i--) {
        var p = this.flies[i];
        p.go();
        if (p.isDead()) {
            this.flies.splice(i, 1);
        }
    }
};

//creating all of the flies
var fireflies = new ParticleSystem();


//adding new fireflies every couple of frames
var draw = function() {
    background(4, 0, 66);
    fireflies.run();
    if (frameCount % 10 === 0){
        fireflies.addParticle();
    }
};

