const canvas = document.createElement('canvas')
canvas.setAttribute('width', '600px')
canvas.setAttribute('height', '600px')

const body = document.querySelector('body')

body.append(canvas)

const ctx = canvas.getContext('2d')

const image = new Image()

image.src = 'running_man.png'

let FRAME_X = 0
let FRAME_Y = 0

image.onload = function () {
    const IMAGE_WIDTH = 1440
    const IMAGE_HEIGHT = 1480
    const FRAMES = 30
    const FRAME_WIDTH = IMAGE_WIDTH / 6
    const FRAME_HEIGHT = IMAGE_HEIGHT / 5

    setInterval(() => {
        console.log('Hello!')
        ctx.clearRect(0, 0, 600, 600)
        ctx.drawImage(image, FRAME_X * FRAME_WIDTH, FRAME_Y * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
        console.log(FRAME_X)
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
    }, 30);
}