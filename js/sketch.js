// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// How to make a custom *convex* polygon

// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let polygons = [];

var xx;
var changeDirection;

function setup() {
  createCanvas(windowWidth / 1.5, windowHeight);

  xx = 1;
  yy = 10;
  changeDirection = false;

  // create first custom shape

  // Initialize box2d physics and create the world
  world = createWorld();
  // Add a bunch of fixed boundaries
  boundaries.push(
    new Boundary(width / 4 + width / 4, height - 5, width / 2 - 50, 10, 0)
  );
  boundaries.push(new Boundary(width - 5, height / 2, 10, height, 0));
  boundaries.push(new Boundary(5, height / 2, 10, height, 0));

  let cs = new CustomShape(xx, yy);
  polygons.push(cs);
}

function cloud(x, y, size) {
  fill(255, 255, 255);
  noStroke();
  arc(x, y, 25 * size, 20 * size, PI + TWO_PI, TWO_PI);
  arc(x + 10, y, 25 * size, 45 * size, PI + TWO_PI, TWO_PI);
  arc(x + 25, y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI);
  arc(x + 40, y, 30 * size, 20 * size, PI + TWO_PI, TWO_PI);
}

// let cs2 = null;

function draw() {
  background(color("rgb(240,248,255)"));

  // mover
  ellipse(xx, yy, 30);
  fill(0);

  // let cs = new CustomShape(xx, yy);

  if (xx > width) {
    changeDirection = true;
  } else if (xx <= 0) {
    changeDirection = false;
  }
  if (xx >= -10 && changeDirection == false) {
    xx = xx + 6;
  } else if (changeDirection == true) {
    xx = xx - 6;
  }

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = polygons.length - 1; i >= 0; i--) {
    polygons[i].display();
    if (polygons[i].done()) {
      polygons.splice(i, 1);
    }
  }
}

// function mousePressed() {
//   let cs = new CustomShape(xx, yy);
//   polygons.push(cs);
// }
