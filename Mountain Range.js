var drawRange = function(a, b) {
    var incAmount = 0.01;
    var randVar = random(10) + a;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t + randVar);
        var y = map(n, 0, 1, 0, height/b);

        rect(t*100, height-y, 1, y);
    }
};

var drawBird = function(){
    for (var i = 0; i < 5; i++){
        var randX = Math.floor(random(400));
        var randY = Math.floor(random(10, 250));
        stroke(0, 0, 0);
        noFill();
        arc(randX,randY,23,15,-200,18);
        arc(randX+23,randY,23,15,-200,18);
    }
  
    
};
var drawClouds = function(){
     var xOff = random(0.1, 50);
    
     for (var x = 0; x < 400; x++) {
        
        var yOff = 0.0;
        
        for (var y = 0; y < 300; y++) {
            
            var bright = map(noise(xOff, yOff), 0, 1, -120, 255);
            
            stroke(bright, bright, bright, 99);
            
            point(x, y);
            
            yOff += 0.01;
        }
        
        xOff += 0.01;
     }
};

    background(57, 146, 247);
    drawClouds();
    
    noStroke();
    fill(156, 194, 237);
    drawRange(0, 1.1);
    fill(120, 114, 186);
    drawRange(0, 1.3);
    fill(91, 75, 133);
    drawRange(0, 2.2);
    drawBird();
    
