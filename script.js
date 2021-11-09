import { Vec2, getRandom, $ } from './utils.js'
const { PI } = Math

const W = 400
    , H = 400
    , R = (Math.min(W, H) - 200) / 2
    , origin = new Vec2(W/2, H/2)

    , FPS = 1000 // (0 < FPS <= 1000)
    , TIME = 1000 / FPS

    , WHITE = '#dfdfdf'
    , RED   = '#ef6f6f'
    , BLUE  = '#6f6fef'

function init(ctx) {
  ctx.fillStyle = WHITE
  ctx.strokeStyle = WHITE
  ctx.font = '20px serif'

  // x-axis
  ctx.beginPath()
  ctx.moveTo(0, H/2)
  ctx.lineTo(W, H/2)
  ctx.stroke()

  // y-axis
  ctx.beginPath()
  ctx.moveTo(W/2, 0)
  ctx.lineTo(W/2, H)
  ctx.stroke()

  // label
  ctx.fillText('O', W/2 + 6, H/2 + 20)
  ctx.fillText('x', W - 15, H/2 + 20)
  ctx.fillText('y', W/2 + 6, 15)

  // Rectangle
  ctx.strokeRect(W * 1/4, H * 1/4, 2*R, 2*R)

  // Circle
  ctx.beginPath()
  ctx.arc(...origin, R, 0, 2*PI)
  ctx.closePath()
  ctx.stroke()
  
  const count = {
    total: 0,
    inCircle: 0,
  }
  
  setInterval(draw({ ctx, count }), TIME)
}


const draw = ({ ctx, count }) => () => {
  const newPointOffs = new Vec2(
    2 * getRandom(R) - R,
    2 * getRandom(R) - R,
  )

  const isInCircle = (newPointOffs.x ** 2) + (newPointOffs.y ** 2) < (R ** 2)
  ctx.fillStyle    = isInCircle ? BLUE : RED
  count.total     += 1
  count.inCircle  += isInCircle

  const newPoint = Vec2.add(origin, newPointOffs)
  const pi = 4 * count.inCircle / count.total

  ctx.beginPath()
  ctx.arc(...newPoint, 0.75, 0, 2*PI)
  ctx.closePath()
  ctx.fill()

  piValue.innerHTML = pi
  pointsInCircle.innerHTML = count.inCircle
  pointsInTotal.innerHTML = count.total
}


$(() => {
  if (!canvas.getContext) return

  const ctx = canvas.getContext('2d')
  canvas.width = W
  canvas.height = H

  init(ctx)
})

