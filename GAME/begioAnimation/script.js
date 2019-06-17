const canvas = document.createElement("canvas")
canvas.setAttribute("width", "600px")
canvas.setAttribute("height", "600px")

const body = document.querySelector("body")

body.append(canvas)

const ctx = canvas.getContext("2d")

document.addEventListener("keydown", userPressedSpace)

const image = new Image()

image.src = "running_man.png"

// let spacePreesed = false

let FRAME_X = 0
let FRAME_Y = 0
let lastTime = 0
let delta = 0
let gravity = 0

let frameCount = 0

let hero = {
    x: 0,
    y: canvas.height - 148,
    height: 148,
    width: 144
}

jumpSpeed = 10
let maxJumpHeight = 100
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

function inGameGravity() {
    hero.y = hero.y + gravity
}

let isOnGround = hero.y >= canvas.height - hero.height

function userPressedSpace(event) {
    spacePreesed = event.code === "Space"
    if (spacePreesed && isOnGround) {
        isHeroJumping = true
        console.log(hero.y)
        console.log(isOnGround)
    }
}

function animateHero() {
    const IMAGE_WIDTH = 720
    const IMAGE_HEIGHT = 740
    const FRAME_WIDTH = IMAGE_WIDTH / 6
    const FRAME_HEIGHT = IMAGE_HEIGHT / 5

    ctx.clearRect(0, 0, 600, 600)
    ctx.drawImage(
        image,
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

image.onload = function() {
    loop(0)
}

function loop(time) {
    frameCount += 1
    delta = time - lastTime
    lastTime = time
    // inGameGravity()
    animateHero()
    if (isOnGround) {
        gravity = 0
    } else {
        gravity = 10
    }
    requestAnimationFrame(loop)
}

// let lTime = 0

// function f(time) {
//     console.log(lTime - time)
//     lTime = time
//     console.log(time)
//     requestAnimationFrame(f)
// }

// f(0)
