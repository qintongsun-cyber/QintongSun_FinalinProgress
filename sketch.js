let noiseLayer; 

let fish = [
  [0,0,0,0,0,1,0,0,0],
  [1,0,0,0,1,1,1,0,0],
  [1,1,0,1,1,1,1,1,0],
  [1,1,1,1,1,1,2,1,1],
  [1,1,0,1,1,1,1,1,0],
  [1,0,0,0,1,1,1,0,0],
  [0,0,0,0,0,1,0,0,0]
];

let fishX = 0;
let fishY;
let fishSize = 8;
let t = 0;

let fishSpeed = 2;
let fishSpeedX = 2;
let fishSpeedY = 1.5;
let fishDirX = 1;
let fishDirY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  noiseLayer = createGraphics(windowWidth, windowHeight);
  noiseLayer.noStroke();

  fishY = height / 2;
}

function draw() {
  background(0);

  let rectW = min(width * 0.8, height * 0.8 * 4 / 3);
  let rectH = rectW * 3 / 4;

  rectMode(CENTER);

  fill(128);
  rect(width / 2, height / 2, rectW, rectH);

  let TVminus = rectW * 0.1;
  let TVW = rectW - TVminus * 2;
  let TVH = rectH - TVminus * 2;

  fill(60);
  rect(width / 2, height / 2, TVW, TVH);

  let edge = TVW * 0.05;
  fill(255);
  rect(width / 2, height / 2, TVW - edge * 2, TVH - edge * 2);

  let white = edge * 1.2;
  fill(0, 0, 255);
  rect(width / 2, height / 2, TVW - white * 2, TVH - white * 2);

fishX += fishSpeedX * fishDirX;
fishY += fishSpeedY * fishDirY;

if (fishX > (TVW - white * 2) - 80) fishDirX = -1;
if (fishX < -20) fishDirX = 1;

if (fishY > (TVH - white * 2) / 2 - 40) fishDirY = -1;
if (fishY < -(TVH - white * 2) / 2 + 40) fishDirY = 1;

drawFish(
  fishX + width / 2 - (TVW - white * 2) / 2 + 40,
  fishY + height / 2 - fish.length * fishSize / 2
);
  for (let i = 0; i < 120; i++) {
    let px = random(width / 2 - (TVW - white * 2) / 2, width / 2 + (TVW - white * 2) / 2);
    let py = random(height / 2 - (TVH - white * 2) / 2, height / 2 + (TVH - white * 2) / 2);

    fill(255, random(50, 150));
    rect(px, py, 4, 4);
  }
}

function drawFish(baseX, baseY) {
  noStroke();
  t += 0.12;

  

  for (let r = 0; r < fish.length; r++) {
    for (let c = 0; c < fish[r].length; c++) {
      if (fish[r][c] === 0) continue;

      let wave = sin((r * 0.4) + t) * 3;

      if (fish[r][c] === 1) fill(255, 47, 0);
      if (fish[r][c] === 2) fill(156,250,255);

      rect(
        baseX + c * fishSize,
        baseY + r * fishSize + wave,
        fishSize, fishSize
      );
    }
  }
}
