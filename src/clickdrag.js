var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Query = Matter.Query,
    Common = Matter.Common
    // Mouse = Matter.Mouse,
    // MouseConstraint = Matter.MouseConstraint;


    var Mouse = Matter.Mouse;
    var MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine;
var world;
// var boxA;
var boxes = [];
var stars = [];

var ground;
// var mConstraint;
var mouseConstraint;

// window.addEventListener('resize', resizeCanvas, false);
// resizeCanvas();

// let clickdragsketch = function(p){
//     let x = 0;
//     let y = 0;


// p.setup = function(){
//     // let matterCanvasid = document.getElementById("matterCanvas");
//     var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
//     canvas.parent("matterCanvas");
//     // background(0,0,0);
//     engine = Engine.create();
//     world = engine.world;
//     world.gravity.y = 0;
//     Engine.run(engine);
//     var boundaryoptions = {
//         isStatic: true   
//     }

//     ground = Bodies.rectangle(0, p.height / 2, p.width, 1, boundaryoptions);
//     ceiling = Bodies.rectangle(0, -p.height / 2, p.width, 1, boundaryoptions);
//     left = Bodies.rectangle(-p.width / 2, 0, 1, p.height, boundaryoptions);
//     right = Bodies.rectangle(p.width / 2, 0, 1, p.height, boundaryoptions);
//     // console.log(boxA);
//     // console.log(World)
//     World.add(world, ground);
//     World.add(world, ceiling);
//     World.add(world, left);
//     World.add(world, right);
    
//     boxes.push(new Box(0, 0, 50, 50, 255));
//     console.log("clickdragbox 1 created");
//     boxes.push(new Box(0, 0, 100, 100, 255));
//     console.log("clickdragbox 2 created");

//     noStroke();
//     rectMode(CENTER);

//     // var canvasmouse = Mouse.create(myCanvas.elt);
//     // canvasmouse.offset = {
//     //     x: width/2,
//     //     y: height/2
//     // }
//     // var mouseoptions = {
//     //     mouse: canvasmouse
//     // }
//     // console.log(canvasmouse);

//     // mConstraint = MouseConstraint.create(engine, mouseoptions);
//     // mConstraint.pixelRatio = pixelDensity();
//     // World.add(world, mConstraint);

//     var mouse = Mouse.create(canvas.elt);
//         mouse.offset = {
//         x: -width/2,
//         y: -height/2
//     }
//   var mouseParams = {
//     mouse: mouse,
//     constraint: {
//       stiffness: 0.1,
//     }
//   }
//   mouseConstraint = MouseConstraint.create(engine, mouseParams);
//   mouseConstraint.mouse.pixelRatio = pixelDensity();
//   World.add(world, mouseConstraint);

// }

// p.draw = function draw(){
//     // background(0,0,0);
//     colorMode(HSB);
//     // background((mouseX/width) * 255 , ((mouseY/height) * 255),255, 100);

//     for(var i = 0; i < boxes.length; i++){
//         boxes[i].show();
//         if (boxes[i].isOffScreen()){
//             boxes[i].removeFromWorld();
//             boxes.splice(i, 1);
//             i--;
//         }
//     }
// }


// }


let clickdragp5 = new p5((p) => {
    let x = 0;
    let y = 0;

p.preload = function preload(){
    img = p.loadImage('../media/mentorship.png');
}

p.setup = function(){
    var element = document.getElementById('matterCanvas');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    var canvas = p.createCanvas(width, height, p.WEBGL);
    canvas.parent('matterCanvas');

    var imageRatio = img.height/img.width;


    // var canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    // canvas.parent("matterCanvas");
    p.background(0,0,0);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0;
    Engine.run(engine);
    var boundaryoptions = {
        isStatic: true
    }

    ground = Bodies.rectangle(0, p.height / 2, p.width, 100, boundaryoptions);
    ceiling = Bodies.rectangle(0, -p.height / 2, p.width, 100, boundaryoptions);
    left = Bodies.rectangle(-p.width / 2, 0, 100, p.height, boundaryoptions);
    right = Bodies.rectangle(p.width / 2, 0, 100, p.height, boundaryoptions);
    // console.log(boxA);
    // console.log(World)
    World.add(world, ground);
    World.add(world, ceiling);
    World.add(world, left);
    World.add(world, right);
    
    // --blue: #2727E7;
    // --lightblue: #B2CCFF;
    // --red: #F93528;
    // --pink: #FFC2C2;
    // --orange: #FF7043;
    // --lightyellow: #FFD362;
    // --deepyellow: #FFB615;
    // --green: #00C27B;
    // --teal: #00A4CB;

    var colors = ['#2727E7', '#B2CCFF', '#F93528', '#FFC2C2', '#FF7043', '#FFD362', '#FFB615', '#00C27B'];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];

    boxes.push(new Box(0, 0, 50, 50, colors[Math.floor(Math.random()*colors.length)], p));
    stars.push(new Star(0,0, 50, 50, colors[Math.floor(Math.random()*colors.length)], p));
    // Matter.Bodies.fromVertices(x, y, [[vector]], [options], [flagInternal=false], [removeCollinear=0.01], [minimumArea=10], [removeDuplicatePoints=0.01])
    // console.log("clickdragbox 1 created");
    boxes.push(new Box(0, 0, 100, 100, colors[Math.floor(Math.random()*colors.length)], p));
    boxes.push(new Box(0, 0, 150, 150, colors[Math.floor(Math.random()*colors.length)], p));
    // console.log("clickdragbox 2 created");

    p.noStroke();
    // p.rectMode(p.CENTER);

    var mouse = Mouse.create(canvas.elt);
        mouse.offset = {
        x: -p.width/2,
        y: -p.height/2
    }

  var mouseParams = {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
    }
  }
  
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.pixelRatio = p.pixelDensity();
  World.add(world, mouseConstraint);


}

p.draw = function draw(){
    p.background(255, 255, 255);
    p.colorMode(p.HSB);
    p.clear();
    
    // background((mouseX/width) * 255 , ((mouseY/height) * 255),255, 100);
    
    for(var i = 0; i < boxes.length; i++){
        boxes[i].show();
        if (boxes[i].isOffScreen()){
            boxes[i].removeFromWorld();
            boxes.splice(i, 1);
            i--;
        }
    }

    for(var i = 0; i < stars.length; i++){
        stars[i].show();
        if (stars[i].isOffScreen()){
            stars[i].removeFromWorld();
            stars.splice(i, 1);
            i--;
        }
    }
    // var scale = 0.75;
    // p.imageMode(p.CENTER);
    // p.image(img, 0, 0, p.width, p.width*0.65241343127);

    // console.log(Query.point([boxes.Bodies], { x: 0, y: 0 }));

    // if (Query.point(boxes, { x: 0, y: 0 }).length === 0) {
    //     console.log("Mouse over box!")
    // }
}

// p.mousePressed = function mousePressed(){
//     console.log(p.mouseX, p.mouseY);
// }


// p.windowResized = function(){
//     var element = document.getElementById('matterCanvas');
//     var positionInfo = element.getBoundingClientRect();
//     var height = positionInfo.height;
//     var width = positionInfo.width;
//     p.resizeCanvas(width, height);
//     // img.resize(width, width*0.65241343127);
// }
});