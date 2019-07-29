let fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

let points = []

let fireHeight = 70;
let fireWidth = 70;

let canvasFactor = 10;

let canvasHeight = fireHeight * canvasFactor;
let canvasWidth = fireWidth * canvasFactor;

let fireMultiplicationFactor = 2;
let fireSubtractionFactor = 0.5;
let fireIntensity = 35;


function createFirePoints(matrix, mHeight, mWidth) {
  // Just creates an empty matrix
  for (let i = 0; i < mHeight; i++) {
    matrix[i] = [];
    for (let j = 0; j < mWidth; j++) {
      matrix[i][j] = 0;
    }
  }
}

function initFire(matrix, mHeight, mWidth) {
  // Assign all bottom values to max fireIntensity
  for (let i = 0; i < mWidth; i++) {
    matrix[mHeight - 1][i] = fireIntensity;
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  createFirePoints(points, fireHeight, fireWidth);
  initFire(points, fireHeight, fireWidth);
}

function getRandomInt(upperBound, lowerBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
}

function updateFireMatrix(matrix, mHeight, mWidth) {
  // Update fire intensity of each point according to point bellow
  // and a random decay factor
  for (let j = 0; j < mWidth; j++) {
    for (let i = 0; i< mHeight - 1; i++) {

      let decayFactor = getRandomInt(fireMultiplicationFactor, fireSubtractionFactor);
      let lowerPoint = matrix[i + 1][j];
      let resultPoint = lowerPoint - decayFactor;

      // Fire intensity can never go below zero
      matrix[i][j] = resultPoint > 0 ? resultPoint : 0;

      // Draw fire according to each point
      drawFire(matrix, i, j);
    }
  }
}

function drawFire(matrix, i, j) {
  
  // Gets point intensity and get color according
  // to that intensity
  let pointIntensity = matrix[i][j];
  let color = fireColorsPalette[pointIntensity];

  fill(color.r, color.g, color.b);

  // Creates a rectangle that is a fire pixel
  let x = j * canvasFactor;
  let y = i * canvasFactor;
  let side = canvasFactor;

  rect(x, y, side, side);
}

function draw() {
  background(51);

  updateFireMatrix(points, fireHeight, fireWidth);
} 
