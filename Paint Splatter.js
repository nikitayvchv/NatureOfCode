//RESTART THE PROGRAM FOR NEW SPLATTER
var generator = new Random(1);

var splatter = function() {
    //Genorating random numbers for sizes and x/y coordinates
    var colour1 = generator.nextGaussian();
    var colour2 = generator.nextGaussian();
    var numx = generator.nextGaussian();
    var numy = generator.nextGaussian();
    var standardDeviation = random(60, 210);
    var mean = random(166, 285);
    
    //setting the x and y 
    var x = standardDeviation * numx + mean;
    var y = standardDeviation * numy + mean;
    
    //Finding Distance between center and current point coordinates
    var a = x - 200;
    var b = y - 200;
    var c = Math.sqrt( a*a + b*b );
   
   //Determining size based on distance (further = smaller) 
    var size = 100; 
    for (var i = 0; i < c; i++){
        size --;
    }
    
    //Determining colours
    colour1 = standardDeviation * colour1 + mean;
    colour2 = standardDeviation * colour2 + mean;
    
    //Drawing ellipses
    noStroke();
    fill(colour1, 0, colour2);
    ellipse(x, y, size, size);
};

//For Loop to draw 275 circles
for (var i = 0; i < 275; i++){
    splatter();
}
