const WIDTH = 987
const HEIGHT = 673
const BASE_HEIGHT = 88
const BASE_WIDTH = 987
const MANHOLL_WIDTH = 70
const MANHOLL_HEIGHT = 31
const DRESIK_WIDTH = 56
const DRESIK_HEIGHT = 90
const SEAGULL_WIDTH = 70
const SEAGULL_HEIGHT = 40

let backgroundX = 0
let baseX = 0
let seagullX = WIDTH / 2
let seagullY = HEIGHT / 2
let baseY = HEIGHT - BASE_HEIGHT
let dresikY = HEIGHT - BASE_HEIGHT - 50
let obscaleX = 1100
let backgroundImage
let secondBackgroundImage
let baseImage
let manholl
let dresik
let dresik2
let heroImage
let obstacleNumber
let seagull

const canvas = document.createElement("canvas")
canvas.setAttribute("height", `${HEIGHT}px`)
canvas.setAttribute("width", `${WIDTH}px`)
const body = document.querySelector("body")
body.append(canvas)
const ctx = canvas.getContext("2d")

function loadAllImages() {
    Promise.all([
        loadImage("background-day.png"),
        loadImage("background-day.png"),
        loadImage("base.png"),
        loadImage("manholl.png"),
        loadImage("dres2.png"),
        loadImage("dres3.png"),
        loadImage("running_man.png"),
        loadImage("mewa.png")
    ]).then(values => {
        const [
            background,
            secondBackground,
            base,
            manhollLoad,
            dresikLoad,
            dresik2Load,
            hero,
            seagullLoad
        ] = values
        backgroundImage = background
        secondBackgroundImage = secondBackground
        baseImage = base
        manholl = manhollLoad
        dresik = dresikLoad
        dresik2 = dresik2Load
        heroImage = hero
        seagull = seagullLoad
    })
}

loadAllImages()

function loadImage(imageUrl) {
    const image = new Image()
    image.src = `assets/${imageUrl}`
    return image
}

function drawImage(image, x, y, w, h) {
    ctx.drawImage(image, x, y, w, h)
}

let lastTime = 0

let isPlaying = false
let isRankingOpen = false

const pause = () => (isPlaying = false)
const play = () => (isPlaying = true)
const togglePause = () => {
    isPlaying = !isPlaying
    closeRanking()
}
const openRanking = () => {
    if (!isRankingOpen) {
        isRankingOpen = true
        ranking.style.display = "block"
    }
}
const closeRanking = () => {
    if (isRankingOpen) {
        ranking.style.display = "none"
        isRankingOpen = false
    }
}
const toggleRanking = () => {
    if (isRankingOpen) {
        closeRanking()
        play()
    } else {
        openRanking()
        pause()
    }
}

document.getElementById("pause_button")
pause_button.addEventListener("click", togglePause)

document.getElementById("restart_button")
restart_button.addEventListener("click", loop)

const ranking = document.getElementById("ranking")
score_button.addEventListener("click", toggleRanking)

document.addEventListener("keydown", userPressedSpace)

let hero = {
    x: 20,
    y: HEIGHT - 200,
    height: 148,
    width: 144
}

let FRAME_X = 0
let FRAME_Y = 0
let delta = 0
let frameCount = 0

let jumpSpeed = 5
let maxJumpHeight = 300
let currentJumpHeight = 0
let isHeroJumping = false

function heroJump() {
    currentJumpHeight += jumpSpeed
    if (currentJumpHeight > maxJumpHeight) {
        hero.y = hero.y + jumpSpeed
    } else {
        hero.y = hero.y - jumpSpeed
    }

    if (currentJumpHeight > 2 * maxJumpHeight) {
        isHeroJumping = false
        currentJumpHeight = 0
        hero.y = HEIGHT - 200
    }
}

let isOnGround = hero.y >= HEIGHT - 200

function userPressedSpace(event) {
    spacePreesed = event.code === "Space"
    if (spacePreesed && isOnGround) {
        isHeroJumping = true
    }
}

function animateHero() {
    const IMAGE_WIDTH = 720
    const IMAGE_HEIGHT = 740
    const FRAME_WIDTH = IMAGE_WIDTH / 6
    const FRAME_HEIGHT = IMAGE_HEIGHT / 5

    ctx.drawImage(
        heroImage,
        FRAME_X * FRAME_WIDTH,
        FRAME_Y * FRAME_HEIGHT,
        FRAME_WIDTH,
        FRAME_HEIGHT,
        hero.x,
        hero.y,
        FRAME_WIDTH,
        FRAME_HEIGHT
    )
    if (frameCount < 2) {
        return
    }
    if (isHeroJumping) {
        heroJump()
    }
    if (!isHeroJumping) {
        heroMovement()
    }
}

function heroMovement() {
    frameCount = 0
    if (FRAME_X < 5) {
        FRAME_X++
    } else {
        FRAME_X = 0
        if (FRAME_Y < 4) {
            FRAME_Y++
        } else {
            FRAME_Y = 0
        }
    }
}

getRandomNumberForSingleObscale()

function loop(time) {
    frameCount++
    lastTime = time
    if (isPlaying) {
        drawBackground()
        drawImage(baseImage, baseX, baseY, BASE_WIDTH, BASE_HEIGHT)
        animateHero()
        animateBackground()
        drawSingleObstacle(obstacleNumber)
    }
    requestAnimationFrame(loop)
}

loop(lastTime)

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomNumberForSingleObscale(){
   obstacleNumber = randomNumber(1, 5)
}

function drawBackground() {
    drawImage(backgroundImage, backgroundX, 0, WIDTH, HEIGHT)
    drawImage(secondBackgroundImage, backgroundX + WIDTH, 0, WIDTH, HEIGHT)
}

function drawSingleObstacle(obstacleNumber){
  switch (obstacleNumber) {
    case 1:
      drawImage(manholl, obscaleX, baseY, MANHOLL_WIDTH, MANHOLL_HEIGHT)
      animateObscale()
      break;
    case 2:
      drawImage(dresik, obscaleX, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
      animateObscale()
      break;
    case 3:
      drawImage(dresik2, obscaleX, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
      animateObscale()
      break;
    case 4:
      drawImage(manholl, obscaleX - 70, baseY + 10, MANHOLL_WIDTH, MANHOLL_HEIGHT)
      drawImage(dresik2, obscaleX, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
      animateObscale()
      break;
    case 5:
      drawImage(seagull, obscaleX, 100, SEAGULL_WIDTH, SEAGULL_HEIGHT)
      animateObscale()
      break;
    default:
      break;
  }
}

function animateBackground() {
    backgroundX -= 3

    if (backgroundX < -WIDTH) {
        backgroundX = 0
        backgroundX -= 1
    }
}

const animationSpeed = 4

function animateObscale(){
    obscaleX -= animationSpeed
    if (obscaleX < -100) {
        obscaleX = 1100
        getRandomNumberForSingleObscale()
    }
}
