const canvas = document.createElement('canvas')
canvas.setAttribute('width', '600px')
canvas.setAttribute('height', '600px')

const body = document.querySelector('body')

body.append(canvas)

const ctx = canvas.getContext('2d')

document.addEventListener('keydown', heroJump)

const image = new Image()

image.src = 'running_man.png'

let spacePreesed = false

function heroJump(event) {
    spacePreesed = event.code === "Space"
    console.log(spacePreesed)
}

let FRAME_X = 0
let FRAME_Y = 0
let lastTime = 0
let delta = 0

let frameCount = 0

function animateHero() {
    const IMAGE_WIDTH = 1440
    const IMAGE_HEIGHT = 1480
    const FRAME_WIDTH = IMAGE_WIDTH / 6
    const FRAME_HEIGHT = IMAGE_HEIGHT / 5

    ctx.clearRect(0, 0, 600, 600)
    ctx.drawImage(image, FRAME_X * FRAME_WIDTH, FRAME_Y * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
    if (spacePreesed) {
        ctx.clearRect(0, 0, 600, 600)
        ctx.drawImage(image, FRAME_WIDTH * 2, FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
        setTimeout(() => spacePreesed = false, 1000)
    } else {
        if (frameCount < 2) {
            return
        }
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
}

image.onload = function () {
    loop(0)
}


function loop(time) {
    frameCount += 1
    delta = time - lastTime
    lastTime = time
    animateHero()
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