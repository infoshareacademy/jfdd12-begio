//wymiary
const WIDTH = 987

const HEIGHT = 673
const BASE_HEIGHT = 88
const BASE_WIDTH = 987
const MESSAGE_WIDTH = 300
const MESSAGE_HEIGHT = 267
const MANHOLL_WIDTH = 100
const MANHOLL_HEIGHT = 44

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
let backgroundX = 0


//pozycja, wymiary 3 obrazków-> definiuje kolejność
backgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT, () => {
  secondBackgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT, () => {
    baseImage = drawImage("base.png", 0, (HEIGHT - BASE_HEIGHT), BASE_WIDTH, BASE_HEIGHT, () => {
      secondBaseImage = drawImage("base.png", 0, (HEIGHT - BASE_HEIGHT), BASE_WIDTH, BASE_HEIGHT, () => {
        messageImage = drawImage("message.png", (WIDTH - MESSAGE_WIDTH) / 2, (HEIGHT - MESSAGE_HEIGHT) / 2, MESSAGE_WIDTH, MESSAGE_HEIGHT, () => {
          manholl = drawImage("manholl.png", WIDTH / 2, (HEIGHT - BASE_HEIGHT) / 2, MANHOLL_WIDTH, MANHOLL_HEIGHT)
        }) //wyrzucic manholl z messageImage
      })
    })
  })
})
//

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
    if (backgroundX < -WIDTH) { // gdy całe pierwsze tło jest poza ekranem x= -601, zerujemy
      backgroundX = 0
      backgroundX -= 1
    } else { //gdy gra jest uruchomiona, zmniejsza przesunięcie o 1
      backgroundX -= 1
    }

  }
  requestAnimationFrame(loop)
}

function drawBackground() {
  ctx.drawImage(backgroundImage, backgroundX, 0)
  ctx.drawImage(secondBackgroundImage, backgroundX + WIDTH, 0)
}

function drawBase() {
  ctx.drawImage(baseImage, backgroundX, HEIGHT - BASE_HEIGHT)
  ctx.drawImage(secondBaseImage, backgroundX + WIDTH, HEIGHT - BASE_HEIGHT)
}

function drawManholl() {
  ctx.drawImage(manholl, backgroundX, HEIGHT - BASE_HEIGHT - 10) //do poprawy wyswietla sie zle
}