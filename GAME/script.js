//wymiary
const WIDTH = 987

const HEIGHT = 673
const BASE_HEIGHT = 88
const BASE_WIDTH = 987
const MESSAGE_WIDTH = 300
const MESSAGE_HEIGHT = 267
const MANHOLL_WIDTH = 100
const MANHOLL_HEIGHT = 44
const DRESIK_WIDTH = 100
const DRESIK_HEIGHT = 144

//canvas
const canvas = document.createElement('canvas')
canvas.setAttribute('height', `${HEIGHT}px`)
canvas.setAttribute('width', `${WIDTH}px`)
const body = document.querySelector('body')
body.append(canvas)
const ctx = canvas.getContext('2d')
//

let backgroundImage
let baseImage
let secondBaseImage
let messageImage
let secondBackgroundImage
let manholl
let dresik

let backgroundX = 0
let baseX = 0
let manhollX = 200
let dresikX = 100
let dresikX2 = 100


//pozycja, wymiary 3 obrazków-> definiuje kolejność
backgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT, () => {
  secondBackgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT, () => {
    baseImage = drawImage("base.png", 0, (HEIGHT - BASE_HEIGHT), BASE_WIDTH, BASE_HEIGHT, () => {
      secondBaseImage = drawImage("base.png", 0, (HEIGHT - BASE_HEIGHT), BASE_WIDTH, BASE_HEIGHT, () => {
        messageImage = drawImage("message.png", (WIDTH - MESSAGE_WIDTH) / 2, (HEIGHT - MESSAGE_HEIGHT) / 2, MESSAGE_WIDTH, MESSAGE_HEIGHT)
          
      })
    })
  })
})
//
manholl = drawImage("manholl.png", WIDTH / 2, (HEIGHT - BASE_HEIGHT) / 2, MANHOLL_WIDTH, MANHOLL_HEIGHT)
dresik = drawImage("dres2.png", WIDTH / 2, (HEIGHT - BASE_HEIGHT) / 2, DRESIK_WIDTH, DRESIK_HEIGHT)
dresik2 = drawImage("dres3.png", WIDTH / 2, (HEIGHT - BASE_HEIGHT) / 2, DRESIK_WIDTH, DRESIK_HEIGHT)

//draw image dla 3 obrazków:
function drawImage(imageUrl, x, y, w, h, onload = () => {}) {
  const image = new Image()
  image.src = `assets/sprites/${imageUrl}`
  image.onload = function () {
    ctx.drawImage(image, x, y, w, h)
    onload()
  }
  return image
}

//rozpoczęcie gry
let isPlaying = false

canvas.addEventListener('click', () => {
  if (!isPlaying) {
    isPlaying = true
    loop(0)
  } else {

  }
})


//let secondBackgroundImage = drawImage('background-day.png')


//------------------------------------------

let lastTime = 0 // need to count delta
let delta = 0 // lastTime - time -> should be delta

function loop() { // 300


  if (isPlaying) {
    drawBackground()
    drawBase()
    drawManholl()
    drawDresik()
    drawDresik2()
    animateBackground()
    animateBase()
    animatemanholl()
    animateDresik()
    animateDresik2()
  }
  requestAnimationFrame(loop)
}

function drawBackground() {
  ctx.drawImage(backgroundImage, backgroundX, 0)
  ctx.drawImage(secondBackgroundImage, backgroundX + WIDTH, 0)
}

function drawBase() {
  ctx.drawImage(baseImage, baseX, HEIGHT - BASE_HEIGHT)
  ctx.drawImage(secondBaseImage, baseX + WIDTH, HEIGHT - BASE_HEIGHT)
}

function drawManholl() {
  ctx.drawImage(manholl, manhollX, HEIGHT - BASE_HEIGHT) //do poprawy wyswietla sie zle
}
function drawDresik() {
  ctx.drawImage(dresik, dresikX, HEIGHT - BASE_HEIGHT - 120) //do poprawy wyswietla sie zle
}

function drawDresik2() {
  ctx.drawImage(dresik2, dresikX2 + 400, HEIGHT - BASE_HEIGHT - 120) //do poprawy wyswietla sie zle
}

function randomNumber(min, max) {
  return Math.round((Math.random() * (max-min) + min))
}


function animateBackground () {
  if (backgroundX < -WIDTH) {
    backgroundX =0
    backgroundX -= 1
  } else {
    backgroundX -= 1
  }
}

function animatemanholl() {
  manhollX -= 2

    if (manhollX < -100) {
      manhollX = 1000
    }
}

function animateDresik() {
  dresikX -= 2

    if (dresikX < -100) {
      dresikX = 1000
    }
}
function animateDresik2() {
  dresikX2 -= 2

    if (dresikX2 < -500) {
      dresikX2 = 600
    }
}

function animateBase() {
  if (baseX < -WIDTH) {
    baseX = 0
    baseX -= 2
  }  else {
    baseX -= 2
  }
}