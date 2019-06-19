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
let secondBackgroundImage
let baseImage
let messageImage
let manholl
let dresik
let dresik2

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
        loadImage("message.png"),
        loadImage("manholl.png"),
        loadImage("dres2.png"),
        loadImage("dres3.png"),
    ]).then(values => {
        const [
            background,
            secondBackground,
            base,
            message,
            manhollLoad,
            dresikLoad,
            dresik2Load
        ] = values;
        backgroundImage = background;
        secondBackgroundImage = secondBackground;
        baseImage = base;
        messageImage = message;
        manholl = manhollLoad;
        dresik = dresikLoad;
        dresik2 = dresik2Load;
    });
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
        drawImage(baseImage, baseX, baseY, BASE_WIDTH, BASE_HEIGHT)
        drawImage(manholl, manhollX, baseY, MANHOLL_WIDTH, MANHOLL_HEIGHT)
        drawImage(dresik, dresikX, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
        drawImage(dresik2, dresikX2, dresikY, DRESIK_WIDTH, DRESIK_HEIGHT)
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