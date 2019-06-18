const canvas = document.createElement("canvas")
canvas.setAttribute("width", "600px")
canvas.setAttribute("height", "600px")

const body = document.querySelector("body")

body.append(canvas)

const ctx = canvas.getContext("2d")

document.addEventListener("keydown", userPressedSpace)

const heroImage = new Image()

heroImage.src = "assets/running_man.png"

let hero = {
    x: 20,
    y: canvas.height - 148,
    height: 148,
    width: 144
}

let FRAME_X = 0
let FRAME_Y = 0
let lastTime = 0
let delta = 0
let frameCount = 0

let jumpSpeed = 10
let maxJumpHeight = 200
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
        hero.y = canvas.height - 148
    }
}

let isOnGround = hero.y >= canvas.height - hero.height

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

    ctx.clearRect(0, 0, 600, 600)
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

heroImage.onload = function() {
    loop(0)
}

function loop(time) {
    frameCount += 1
    delta = time - lastTime
    lastTime = time
    animateHero()
    requestAnimationFrame(loop)
}
