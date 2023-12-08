// Rectangle Collision (Easy) by: Baaz

let cnv = document.getElementById("game");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;
let img = document.getElementById("flag")

let bombX, bombY, bombX1, bombY1, easy, medium, hard, num;
let bombNumber = 0
let blockNumber = -1

let blocks = []
let bombs = []
let markData = []

document.getElementById("easy").addEventListener("click", easyClicked)

function easyClicked() {

  blocks = []
  bombs = []
  markData = []
  easy = true
  medium = false
  hard = false

  bombNumber = 10
  blockNumber = 80

  determineBombs(10, 7, 9)
  drawBlocks(10, 8)
  initialData(10, 8)
  plantBombs(10, 10, 8)

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
    drawDesign(y, x, 10, 8)
    }
  }
}

document.getElementById("medium").addEventListener("click", mediumClicked)

function mediumClicked() {

  blocks = []
  bombs = []
  markData = []
  easy = false
  medium = true
  hard = false

  bombNumber = 40
  blockNumber = 252

  determineBombs(40, 13, 17)
  drawBlocks(18, 14)
  initialData(18, 14)
  plantBombs(40, 18, 14)


  for (let y = 0; y < 14; y++) {
    for (let x = 0; x < 18; x++) {
      drawDesign(y, x, 18, 14)
    }
  }
}

document.getElementById("hard").addEventListener("click", hardClicked)

function hardClicked() {

  blocks = []
  bombs = []
  markData = []
  easy = false
  medium = false
  hard = true

  bombNumber = 99
  blockNumber = 480

  determineBombs(99, 19,23)
  drawBlocks(24, 20)
  initialData(24, 20)
  plantBombs(99, 24, 20)

for (let y = 0; y < 20; y++) {
  for (let x = 0; x < 24; x++) {
    drawDesign(y, x, 24, 20)
  }
}
}

ctx.fillStyle = "gray"
ctx.fillRect(0, 0, cnv.width, cnv.height)

requestAnimationFrame(loop)

function loop() {

  if (easy) {
    bombs = 10
    } else if (medium) {
    bombs = 40
    } else if (hard) {
    bombs = 99
    }

document.getElementById("mines").innerHTML = `
: ${bombNumber}
`

if (bombNumber == 0 && blockNumber == bombs) {
  location.reload()
  alert("Congradulations!  You won!")
} else {
  requestAnimationFrame(loop)
}
}

function drawBlocks(maxX, maxY) {
  for (let y = 0; y < maxY; y++) {
    blocks.push([])
    for (let x = 0; x < maxX; x++) {
    blocks[y].push(0)
    }
    }
}

function initialData(maxX, maxY) {
  for (let y = 0; y < maxY; y++) {
    markData.push([])
    for (let x = 0; x <maxX; x++) {
    markData[y].push(0)
    }
    }
}

function plantBombs(bomb, maxX, maxY) {
  for(let y = 0; y < maxY; y++) {
    for(let b = 0; b < bomb; b++) {
    for(let x = 0; x < maxX; x++) {
    if (y == bombs[b][0] && x == bombs[b][1]) {
    blocks[y].splice(x, 1)
    blocks[y].splice(x, 0, -1)
    if (blocks[y][x] == -1) {
      blockValue(y, x, maxX - 1, maxY - 1)
    }
  }
  }
  }
  }
}

function drawStuff(y, x, maxWidth, maxHeight) {

  if (markData[y][x] == 0) {

    if ((x + y) % 2 == 1) {
      ctx.fillStyle = "#D8CD97"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    } else if ((x + y) % 2 == 0) {
      ctx.fillStyle = "#EBE0A5"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    }

      if (blocks[y][x] == -1) {
        num = "B"
        ctx.fillStyle = "black"
      } else if (blocks[y][x] == 0){
        num = ""
        ctx.fillStyle = "#9F8C76"
      } else if (blocks[y][x] == 1){
        num = "1"
        ctx.fillStyle = "#00A3FF"
      } else if (blocks[y][x] == 2){
        num = "2"
        ctx.fillStyle = "#32DD23"
      }  else if (blocks[y][x] == 3){
        num = "3"
        ctx.fillStyle = "#EB2323"
      } else if (blocks[y][x] == 4){
        num = "4"
        ctx.fillStyle = "purple"
      } else if (blocks[y][x] == 5){
        num = "5"
        ctx.fillStyle = "#FF9102"
      } else if (blocks[y][x] == 6){
        num = "6"
        ctx.fillStyle = "cyan"
      } else if (blocks[y][x] == 7){
        num = "7"
        ctx.fillStyle = "pink"
      } else if (blocks[y][x] == 8){
        num = "8"
        ctx.fillStyle = "white"
      }

      if (easy) {
      ctx.font = "50px arial"
      minus = 15
      } else if (medium) {
      ctx.font = "40px arial"
      minus = 12
      } else if (hard) {
      ctx.font = "30px arial"
      minus = 10
      }

      ctx.fillText(num, ((cnv.width / maxWidth) * x) + (((cnv.height / maxWidth) / 2) - minus), ((cnv.width / maxHeight) * y) + ((cnv.height / maxHeight) / 2) + minus)
      
      blockNumber--

      if (blocks[y][x] == -1) {
        alert("GAME OVER.  Better luck next time!")
        location.reload()
      }

      markData[y][x] = -1
      
      if (blocks[y][x] == 0) {
        extraBlocks(y, x, maxWidth, maxHeight)
      }
  }
}

function drawFlag(y, x, maxWidth, maxHeight) {
  if (markData[y][x] == 0) {
    ctx.drawImage(img, ((cnv.width / maxWidth) * x) + 10, ((cnv.height / maxHeight) * y) + 10, (cnv.width / maxWidth) - 20, (cnv.height / maxHeight) - 20)
    markData[y][x] = 1
    bombNumber--
  } else if (markData[y][x] == 1) {
    if ((y + x) % 2 == 1) {
      ctx.fillStyle = "#90D485"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    } else if ((y + x) % 2 == 0) {
      ctx.fillStyle = "#66AC64"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    }
    markData[y][x] = 0
    bombNumber++
  }
}

function drawDesign(y, x, maxWidth, maxHeight) {
    if ((y + x) % 2 == 1) {
      ctx.fillStyle = "#90D485"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    } else if ((y + x) % 2 == 0) {
      ctx.fillStyle = "#66AC64"
      ctx.fillRect(((cnv.width / maxWidth) * x), ((cnv.height / maxHeight) * y), (cnv.width / maxWidth), (cnv.height / maxHeight))
    }
}

function extraBlocks(y, x, maxWidth, maxHeight) {
if (y > 0 && x > 0) {
  drawStuff(y - 1, x - 1, maxWidth, maxHeight)
}
if (y > 0) {
  drawStuff(y - 1, x, maxWidth, maxHeight)
}
if (y > 0 && x < maxWidth - 1) {
  drawStuff(y - 1, x + 1, maxWidth, maxHeight)
}
if (x > 0) {
  drawStuff(y, x - 1, maxWidth, maxHeight)
}
if (x < maxWidth - 1) {
  drawStuff(y, x + 1, maxWidth, maxHeight)
}
if (y < maxHeight - 1 && x > 0) {
  drawStuff(y + 1, x - 1, maxWidth, maxHeight)
}
if (y < maxHeight - 1) {
  drawStuff(y + 1, x, maxWidth, maxHeight)
}
if (y < maxHeight - 1 && x < maxWidth - 1) {
  drawStuff(y + 1, x + 1, maxWidth, maxHeight)
}
}

function blockValue(y, x, maxWidth, maxHeight) {
  if (y > 0 && x > 0 && blocks[y - 1][x - 1] > -1) {
    blocks[y - 1][x - 1] += 1
  }
  if (y > 0 && blocks[y - 1][x] > -1) {
    blocks[y - 1][x] += 1
  }
  if (y > 0 && x < maxWidth && blocks[y - 1][x + 1] > -1) {
    blocks[y - 1][x + 1] += 1
  }
  if (x > 0 && blocks[y][x - 1] > -1) {
    blocks[y][x - 1] += 1
  }
  if (x < maxWidth && blocks[y][x + 1] > -1) {
    blocks[y][x + 1] += 1
  }
  if (y < maxHeight && x > 0 && blocks[y + 1][x - 1] > -1) {
    blocks[y + 1][x - 1] += 1
  }
  if (y < maxHeight && blocks[y + 1][x] > -1) {
    blocks[y + 1][x] += 1
  }
  if (y < maxHeight && x < maxWidth && blocks[y + 1][x + 1] > -1) {
    blocks[y + 1][x + 1] += 1
  }
}

function determineBombs(maxBombs, maxWidth, maxHeight) {
  let reload = false
  for (let x = 0; x < maxBombs; x++) {
    bombX = Math.round(Math.random() * maxWidth)
    bombY = Math.round(Math.random() * maxHeight)
    bombs.splice(x, 0, [bombX, bombY])
    for (let b = 0; b < bombs.length; b++) {
      if (bombs[x][0] == bombs[b][0] && bombs[x][1] == bombs[b][1] && (easy || medium)) {
        if (x !== b) {
          reload = true
        }
      } else if (bombs[x][0] == bombs[b][0] && bombs[x][1] == bombs[b][1] && (hard)) {
        if (x !== b) {
          bombs[x] = []
          bombX = Math.round(Math.random * maxWidth)
          bombY = Math.round(Math.random * maxHeight)
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
  determineBombs(maxBombs, maxWidth, maxHeight)
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

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      mouseInSquare(x, y, maxX, maxY, mouseX, mouseY)
      }
    }
}

function mouseInSquare(x, y, maxWidth, maxHeight, mouseX, mouseY) {
  if (mouseX > ((cnv.width / maxWidth) * x) && mouseY > ((cnv.height / maxHeight) * y) && mouseX < ((cnv.width / maxWidth) * x) + (cnv.width / maxWidth) && mouseY < ((cnv.height / maxHeight) * y) + (cnv.height / maxHeight)) {
    drawStuff(y, x, maxWidth, maxHeight)
  }
}

document.addEventListener('contextmenu', (e, maxX, maxY) => {
  e.preventDefault();
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

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      rightMouseInSquare(y, x, maxX, maxY, mouseX, mouseY)
      }
    }
});

function rightMouseInSquare(y, x, maxWidth, maxHeight, mouseX, mouseY) {
  if (mouseX > ((cnv.width / maxWidth) * x) && mouseY > ((cnv.height / maxHeight) * y) && mouseX < ((cnv.width / maxWidth) * x) + (cnv.width / maxWidth) && mouseY < ((cnv.height / maxHeight) * y) + (cnv.height / maxHeight)) {
    drawFlag(y, x, maxWidth, maxHeight)
  }
}