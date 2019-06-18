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

let backgroundX = 0
let baseX = 0
let baseY = HEIGHT - BASE_HEIGHT
let manhollX = 400
let dresikX = 300
let dresikX2 = 800
let dresikY = HEIGHT - BASE_HEIGHT - 120
let backgroundImage
let baseImage
let messageImage

const canvas = document.createElement("canvas")
canvas.setAttribute("height", `${HEIGHT}px`)
canvas.setAttribute("width", `${WIDTH}px`)
const body = document.querySelector("body")
body.append(canvas)
const ctx = canvas.getContext("2d")

backgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT, () => {
    baseImage = drawImage(
        "base.png",
        0,
        HEIGHT - BASE_HEIGHT,
        BASE_WIDTH,
        BASE_HEIGHT,
        () => {
            messageImage = drawImage(
                "message.png",
                (WIDTH - MESSAGE_WIDTH) / 2,
                (HEIGHT - MESSAGE_HEIGHT) / 2,
                MESSAGE_WIDTH,
                MESSAGE_HEIGHT
            )
        }
    )
})

let secondBackgroundImage = drawImage("background-day.png", 0, 0, WIDTH, HEIGHT)
let manholl = drawImage(
    "manholl.png",
    WIDTH / 2,
    (HEIGHT - BASE_HEIGHT) / 2,
    MANHOLL_WIDTH,
    MANHOLL_HEIGHT
)
let dresik = drawImage(
    "dres2.png",
    WIDTH / 2,
    (HEIGHT - BASE_HEIGHT) / 2,
    DRESIK_WIDTH,
    DRESIK_HEIGHT
)
let dresik2 = drawImage(
    "dres3.png",
    WIDTH / 2,
    (HEIGHT - BASE_HEIGHT) / 2,
    DRESIK_WIDTH,
    DRESIK_HEIGHT
)

function drawImage(imageUrl, x, y, w, h, onload = () => {}) {
    const image = new Image()
    image.src = `assets/${imageUrl}`
    image.onload = function () {
        ctx.drawImage(image, x, y, w, h)
        onload()
    }
    return image
}

let lastTime = 0
//rozpoczęcie gry
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
        ranking.style.display = "block";
    }
}
const closeRanking = () => {
    if (isRankingOpen) {
        ranking.style.display = 'none'
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
score_button.addEventListener('click', toggleRanking)


function loop(time) {
    lastTime = time
    if (isPlaying) {
        drawBackground()
        drawSingleObject(baseImage, baseX, baseY)
        drawSingleObject(manholl, manhollX, baseY)
        drawSingleObject(dresik, dresikX, dresikY)
        drawSingleObject(dresik2, dresikX2, dresikY)
        animateBackground()
        animatemanholl()
        animateDresik()
        animateDresik2()
    }
    requestAnimationFrame(loop)
}
loop(lastTime)

function drawBackground() {
    ctx.drawImage(backgroundImage, backgroundX, 0)
    ctx.drawImage(secondBackgroundImage, backgroundX + WIDTH, 0)
}

function drawSingleObject(image, x, y) {
    ctx.drawImage(image, x, y)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function animateBackground() {
    if (backgroundX < -WIDTH) {
        backgroundX = 0
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

    if (dresikX2 < -100) {
        dresikX2 = 1000
    }
}