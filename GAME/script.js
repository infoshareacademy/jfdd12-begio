const WIDTH = 987
const HEIGHT = 673

let backgroundImage
let secondBackgroundImage
let baseImage
let manholl
let dresik
let dresik2
let heroImage
let obstacleNumber
let seagull
let requestAnimationFrameId = 0
let lastTime = 0
let isPlaying = false
let isRankingOpen = false

let backgroundObj = {
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT
}

let secondBackgroundObj = {
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT
}

let baseObj = {
    x: 0,
    y: HEIGHT - 88,
    width: WIDTH,
    height: 88
}

let hero = {
    x: 300,
    y: HEIGHT - 200,
    height: 148,
    width: 144
}

let manhollObj = {
    x: 1100,
    y: HEIGHT - 88,
    width: 70,
    height: 31
}

let dresikObj = {
    x: 1100,
    y: HEIGHT - 138,
    width: 56,
    height: 90
}


let seagullObj = {
    x: 1100,
    y: HEIGHT / 2,
    width: 70,
    height: 40
}

let FRAME_X = 0
let FRAME_Y = 0
let delta = 0
let frameCount = 0

let jumpSpeed = 5
let maxJumpHeight = 300
let currentJumpHeight = 0
let isHeroJumping = false

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

function drawImage(image, x, y, width, height) {
    ctx.drawImage(image, x, y, width, height)
}

const pause = () => (isPlaying = false)




const play = () => (isPlaying = true)
const togglePause = () => {
    isPlaying = !isPlaying
    closeRanking()
}
const openRanking = () => {
    if (!isRankingOpen) {
        closeInstruction()
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
const closeInstruction = () => {
    instruction.style.display = 'none'
    play()
}
const openInstruction = () => {
    button_start.style.display = "none"
    instruction.style.display = 'block'
    closeRanking()
    pause()
}

const startGameButton = () => {

    closeInstruction()
    setTimeout(() => {
        play()
    }, 3000);

    pause();
}

document.getElementById("instruction_button")
instruction_button.addEventListener('click', openInstruction)

document.getElementById("pause_button")
pause_button.addEventListener("click", togglePause)

const closeInstructionButton = document.getElementById("close_instruction")
closeInstructionButton.addEventListener("click", closeInstruction)
const instrucionWindow = document.getElementById('instruction')

const startButton = document.getElementById('button_start')
button_start.addEventListener('click', startGameButton)
document.getElementById("restart_button")
restart_button.addEventListener("click", restartGame)

const ranking = document.getElementById("ranking")
score_button.addEventListener("click", toggleRanking)

document.addEventListener("keydown", userPressedSpace)

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

getRandomNumberForSingleObstacle()

function loop(time) {
    frameCount++
    lastTime = time
    if (isPlaying) {
        drawBackground()
        drawImage(baseImage, baseObj.x, baseObj.y, baseObj.width, baseObj.height)
        animateHero()
        animateBackground(backgroundObj)
        animateBackground(secondBackgroundObj)
        drawSingleObstacle(obstacleNumber)
    }
    requestAnimationFrameId = requestAnimationFrame(loop)
}

function startGame() {
    loop(lastTime)
}

function restartGame() {
    cancelAnimationFrame(requestAnimationFrameId)
    frameCount = 0
    isPlaying = true
    lastTime = 0
    backgroundX = 0
    FRAME_X = 0
    FRAME_Y = 0
    delta = 0
     obstacleX = 1100
    getRandomNumberForSingleObstacle()
    startGame()
}

startGame()

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomNumberForSingleObstacle() {
    obstacleNumber = randomNumber(1, 5)
}

function drawBackground() {
    drawImage(backgroundImage, backgroundObj.x, backgroundObj.y, backgroundObj.width, backgroundObj.height)
    drawImage(secondBackgroundImage, secondBackgroundObj.x + WIDTH, secondBackgroundObj.y, secondBackgroundObj.width, secondBackgroundObj.height)
}

function drawSingleObstacle(obstacleNumber) {
    switch (obstacleNumber) {
        case 1:
            drawImage(manholl, manhollObj.x, manhollObj.y, manhollObj.width, manhollObj.height)
            animateObstacle(manhollObj)
            collision(manhollObj)
            break
        case 2:
            drawImage(dresik, dresikObj.x, dresikObj.y, dresikObj.width, dresikObj.height)
            animateObstacle(dresikObj)
            collision(dresikObj)
            break
        case 3:
            drawImage(dresik2, dresikObj.x, dresikObj.y, dresikObj.width, dresikObj.height)
            animateObstacle(dresikObj)
            collision(dresikObj)
            break
        case 4:
            drawImage(dresik2, dresikObj.x, dresikObj.y, dresikObj.width, dresikObj.height)
            drawImage(manholl, manhollObj.x - 80, manhollObj.y + 20, manhollObj.width, manhollObj.height)
            animateObstacle(dresikObj)
            animateObstacle(manhollObj)
            collision(manhollObj)
            break
        case 5:
            drawImage(seagull, seagullObj.x, seagullObj.y, seagullObj.width, seagullObj.height)
            animateObstacle(seagullObj)
            collision(seagullObj)
            break
        default:
            break
    }
}

function animateBackground(imageObject) {
    imageObject.x -= 3

    if (imageObject.x < -WIDTH) {
        imageObject.x = 0
        imageObject.x -= 1
    }
}

const animationSpeed = 6

function animateObstacle(obstacleObject) {
    obstacleObject.x -= animationSpeed
    console.log(obstacleObject.x)
    if (obstacleObject.x < - obstacleObject.width) {
        obstacleObject.x = 1100
        getRandomNumberForSingleObstacle()
    }
}


function collision(enemy) {

    if (hero.x < (enemy.x + enemy.width) - 25 &&
        (hero.x + hero.width) - 65 > enemy.x &&
        hero.y < enemy.y + enemy.height &&
        hero.y + hero.height > enemy.y){
        pause()
        }

}

