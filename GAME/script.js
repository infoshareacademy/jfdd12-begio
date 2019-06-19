const WIDTH = 987
const HEIGHT = 673
const BASE_HEIGHT = 88
const BASE_WIDTH = 987
const MANHOLL_WIDTH = 100
const MANHOLL_HEIGHT = 44
const DRESIK_WIDTH = 100
const DRESIK_HEIGHT = 144

let backgroundX = 0
let baseX = 0
let baseY = HEIGHT - BASE_HEIGHT
let manhollX = 400
let dresikX = 300
let dresikX2 = 800
let dresikY = HEIGHT - BASE_HEIGHT - 120
let backgroundImage
let secondBackgroundImage
let baseImage
let manholl
let dresik
let dresik2
let heroImage

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
        loadImage("running_man.png")
    ]).then(values => {
        const [
            background,
            secondBackground,
            base,
            manhollLoad,
            dresikLoad,
            dresik2Load,
            hero
        ] = values
        backgroundImage = background
        secondBackgroundImage = secondBackground
        baseImage = base
        manholl = manhollLoad
        dresik = dresikLoad
        dresik2 = dresik2Load
        heroImage = hero
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

function loop(time) {
    frameCount++
    lastTime = time
    if (isPlaying) {
        drawBackground()
        drawImage(baseImage, baseX, baseY, BASE_WIDTH, BASE_HEIGHT)
        drawImage(manholl, manhollX, baseY, MANHOLL_WIDTH, MANHOLL_HEIGHT)
        drawImage(dresik, dresikX, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
        drawImage(dresik2, dresikX2, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
        animateHero()
        animateBackground()
        animatemanholl()
        animateDresik()
        animateDresik2()
    }
    requestAnimationFrame(loop)
}

loop(lastTime)

function drawBackground() {
    drawImage(backgroundImage, backgroundX, 0, WIDTH, HEIGHT)
    drawImage(secondBackgroundImage, backgroundX + WIDTH, 0, WIDTH, HEIGHT)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function animateBackground() {
    backgroundX -= 1

    if (backgroundX < -WIDTH) {
        backgroundX = 0
        backgroundX -= 1
    }
}

function animatemanholl() {
    manhollX -= 4

    if (manhollX < -100) {
        manhollX = 1000
    }
}

function animateDresik() {
    dresikX -= 4

    if (dresikX < -100) {
        dresikX = 1000
    }
}

function animateDresik2() {
    dresikX2 -= 4

    if (dresikX2 < -100) {
        dresikX2 = 1000
    }
}
