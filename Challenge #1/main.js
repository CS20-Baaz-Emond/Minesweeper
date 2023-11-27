// Rectangle Collision (Easy) by: Baaz

let cnv = document.getElementById("game");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;

let bombX, bombY, bombX1, bombY1, easy, medium, hard;

let blocks = []
let bombs = []

document.getElementById("easy").addEventListener("click", easyClicked)

function easyClicked() {

  blocks = []
  bombs = []
  easy = true
  medium = false
  hard = false

  determineBombs(10, 7, 9)

  for (let c = 0; c < 8; c++) {
  blocks.push([])
  for (let y = 0; y < 10; y++) {
  blocks[c].push(0)
  }
  }

  for(let c = 0; c < 8; c++) {
  for(let x = 0; x < 10; x++) {
  for(let y = 0; y < 10; y++) {
  if (c == bombs[x][0] && y == bombs[x][1]) {
  blocks[c].splice(y, 1)
  blocks[c].splice(y, 0, -1)
  if (blocks[c][y] == -1) {
    blockValue(c, y, 9, 7)
  }
  }
  }
  }
  }

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
    drawStuff(y, x, 10, 8)
    }
  }
}

document.getElementById("medium").addEventListener("click", mediumClicked)

function mediumClicked() {

  blocks = []
  bombs = []
  easy = false
  medium = true
  hard = false

  determineBombs(40, 13, 17)

  for (let c = 0; c < 14; c++) {
  blocks.push([])
  for (let y = 0; y < 18; y++) {
  blocks[c].push(0)
  }
  }

  for(let c = 0; c < 14; c++) {
  for(let x = 0; x < 40; x++) {
  for(let y = 0; y < 18; y++) {
    if (c == bombs[x][0] && y == bombs[x][1]) {
    blocks[c].splice(y, 1)
    blocks[c].splice(y, 0, -1)
    if (blocks[c][y] == -1) {
      blockValue(c, y, 17, 13)
    }
  }
  }
  }
}

  for (let y = 0; y < 14; y++) {
    for (let x = 0; x < 18; x++) {
      drawStuff(y, x, 18, 14)
    }
  }
}

document.getElementById("hard").addEventListener("click", hardClicked)

function hardClicked() {

  blocks = []
  bombs = []
  easy = false
  medium = false
  hard = true

  determineBombs(99, 19,23)

  for (let c = 0; c < 20; c++) {
  blocks.push([])
  for (let y = 0; y < 24; y++) {
  blocks[c].push(0)
  }
  }

  for(let c = 0; c < 20; c++) {
  for(let x = 0; x < 99; x++) {
  for(let y = 0; y < 24; y++) {
  if (c == bombs[x][0] && y == bombs[x][1]) {
  blocks[c].splice(y, 1)
  blocks[c].splice(y, 0, -1)
  if (blocks[c][y] == -1) {
    blockValue(c, y, 23, 19)
  }
}
}
}
}

for (let y = 0; y < 20; y++) {
  for (let x = 0; x < 24; x++) {
    drawStuff(y, x, 24, 20)
  }
}
}

ctx.fillStyle = "black"
ctx.fillRect(0, 0, cnv.width, cnv.height)

function drawStuff(y, x, maxWidth, maxHeight) {
  if (blocks[y][x] == -1) {
    ctx.fillStyle = "black"
  } else if (blocks[y][x] == 0){
    ctx.fillStyle = "#9F8C76"
  } else if (blocks[y][x] == 1){
    ctx.fillStyle = "blue"
  } else if (blocks[y][x] == 2){
    ctx.fillStyle = "lime"
  }  else if (blocks[y][x] == 3){
    ctx.fillStyle = "red"
  } else if (blocks[y][x] == 4){
    ctx.fillStyle = "purple"
  } else if (blocks[y][x] == 5){
    ctx.fillStyle = "yellow"
  } else if (blocks[y][x] == 6){
    ctx.fillStyle = "cyan"
  } else if (blocks[y][x] == 7){
    ctx.fillStyle = "pink"
  } else if (blocks[y][x] == 8){
    ctx.fillStyle = "white"
  } 
  ctx.fillRect(((800 / maxWidth) * x), ((800 / maxHeight) * y), (800 / maxWidth), (800 / maxHeight))

  ctx.strokeStyle = "white"
  ctx.strokeRect(((800 / maxWidth) * x), ((800 / maxHeight) * y), (800 / maxWidth), (800 / maxHeight))
}

function blockValue(c, y, maxWidth, maxHeight) {
  if (c > 0 && y > 0 && blocks[c - 1][y - 1] > -1) {
    blocks[c - 1][y - 1] += 1
  }
  if (c > 0 && blocks[c - 1][y] > -1) {
    blocks[c - 1][y] += 1
  }
  if (c > 0 && y < maxWidth && blocks[c - 1][y + 1] > -1) {
    blocks[c - 1][y + 1] += 1
  }
  if (y > 0 && blocks[c][y - 1] > -1) {
    blocks[c][y - 1] += 1
  }
  if (y < maxWidth && blocks[c][y + 1] > -1) {
    blocks[c][y + 1] += 1
  }
  if (c < maxHeight && y > 0 && blocks[c + 1][y - 1] > -1) {
    blocks[c + 1][y - 1] += 1
  }
  if (c < maxHeight && blocks[c + 1][y] > -1) {
    blocks[c + 1][y] += 1
  }
  if (c < maxHeight && y < maxWidth && blocks[c + 1][y + 1] > -1) {
    blocks[c + 1][y + 1] += 1
  }
}

function determineBombs(maxBombs, maxBombX, maxBombY) {
  let reload = false
  console.log(maxBombs, maxBombX, maxBombY)
  for (let x = 0; x < maxBombs; x++) {
    bombX = Math.round(Math.random() * maxBombX)
    bombY = Math.round(Math.random() * maxBombY)
    bombs.splice(x, 0, [bombX, bombY])
    for (let b = 0; b < bombs.length; b++) {
      if (bombs[x][0] == bombs[b][0] && bombs[x][1] == bombs[b][1] && (easy || medium)) {
        if (x !== b) {
          reload = true
        }
      } else if (bombs[x][0] == bombs[b][0] && bombs[x][1] == bombs[b][1] && (hard)) {
        if (x !== b) {
          bombs[x] = []
          bombX = Math.round(Math.random * maxBombX)
          bombY = Math.round(Math.random * maxBombY)
          bombs[x] = [bombX, bombY]
          if (bombs[x][0] == bombs[b][0] && bombs[x][1] == bombs[b][1] && (hard)) {
            reload = true
          }
        }
      }
  }
}
if (reload) {
  bombs = []
  determineBombs(maxBombs, maxBombX, maxBombY)
}
}

document.addEventListener("click", mouseDown);

function mouseDown(e, maxX, maxY) {

let cnvRect = cnv.getBoundingClientRect();

if (easy) {
maxY = 8
maxX = 10
} else if (medium) {
maxY = 14
maxX = 18
} else if (hard) {
maxY = 20
maxX = 24
}

  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);

  for (let c = 0; c < maxY; c++) {
    for (let y = 0; y < maxX; y++) {
      mouseInSquare(c, y, maxX, maxY, mouseX, mouseY)
      }
    }
}

function mouseInSquare(c, y, maxWidth, maxHeight, mouseX, mouseY) {
  if (mouseX > ((800 / maxWidth) * y) && mouseY > ((800 / maxHeight) * c) && mouseX < ((800 / maxWidth) * y) + (800 / maxWidth) && mouseY < ((800 / maxHeight) * c) + (800 / maxHeight)) {
    console.log(y, c, blocks[c][y])
  }
}
