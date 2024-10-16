import { Body, Vector2 } from "./interface";
import * as Vec from "./vector_math"

const WIDTH = 1280
const HEIGHT = 720
const G = 6.67e-11

const ZOOM_SCALER = 0.1

const cam: Vector2 = { x: 0, y: 0 }
let current_zoom = 1


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
if (!ctx) { throw new Error("ERROR: no canvas found") }


ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

const objects: Body[] = []

const add_body = (x: number, y: number): Body => {
  const body: Body = { color: "#ffdd33", pos: { x: x, y: y }, radius: 10, vel: { x: 0, y: 0 }, mass: 10e5 * 10e5 }
  objects.push(body)
  return body
}



const reset_state = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", (e: MouseEvent) => {
  if (e.buttons == 1) {
    add_body(e.offsetX, e.offsetY)
    render_galaxy()
  }
})

canvas.addEventListener("mousemove", (e => {
  if (e.buttons == 2) {
    cam.x += e.movementX
    cam.y += e.movementY

    reset_state()
    ctx.translate(cam.x, cam.y)
    render_galaxy()
  }
}))



canvas.addEventListener("wheel", (e: WheelEvent) => {
  const scale = e.deltaY < 0 ? 1 : -1
  current_zoom += scale * ZOOM_SCALER

  reset_state()
  ctx.scale(current_zoom, current_zoom)
  render_galaxy()
})


const update_galaxy = () => {
  for (let i = 0; i < objects.length; i++) {
    const body1 = objects[i];
    for (let j = 0; j < objects.length; j++) {
      const body2 = objects[j];
      if (i == j) continue

      const delta = Vec.vector2_min_vec(body1.pos, body2.pos)
      const dist = Vec.vector2_distance(body1.pos, body2.pos)
      const smoothing = Math.max(dist, 5)

      const force = (G * body1.mass * body2.mass) / Math.pow(smoothing, 2)
      const force_vec = Vec.vector2_scale(delta, force)

      const mass_scaler = Vec.vector2_scale(force_vec, 1 / body1.mass)
      body1.vel = Vec.vector2_add_vec(body1.vel, mass_scaler)
    }

    body1.pos = Vec.vector2_min_vec(body1.pos, body1.vel)
  }
}

const render_galaxy = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < objects.length; i++) {
    const body = objects[i]
    ctx.beginPath()
    ctx.arc(body.pos.x, body.pos.y, body.radius, 0, 2 * Math.PI);
    ctx.fillStyle = body.color
    ctx.fill()
    ctx.closePath()
  }
}

const body_collision = () => {

  for (let i = 0; i < objects.length; i++) {
    const body1 = objects[i];
    for (let j = 0; j < objects.length; j++) {
      const body2 = objects[j];
      if (i == j) continue


      const delta = Vec.vector2_min_vec(body1.pos, body2.pos)
      const dist = Vec.vector2_distance(body1.pos, body2.pos)

      if (dist < body1.radius + body2.radius) {

        const norm = Vec.vector2_scale(delta, 1 / dist)
        const diff = body1.radius + body2.radius - dist


        const nudge = Vec.vector2_scale(norm, diff / 2)
        body1.pos = Vec.vector2_min_vec(body1.pos, nudge)
        body2.pos = Vec.vector2_add_vec(body2.pos, nudge)
      }
    }
  }
}

const start_anim = () => {
  update_galaxy()
  body_collision()
  render_galaxy()

  window.requestAnimationFrame(start_anim)
}


const button = document.getElementById('myButton')
if (button) {
  button.onclick = function () {
    start_anim()
  };
}

window.addEventListener(`contextmenu`, (e) => e.preventDefault());


const body1: Body = { color: "#ffdd33", pos: { x: WIDTH/2 - 50, y: HEIGHT /2 }, radius: 10, vel: { x: 0, y: 10 }, mass: 10e5 * 10e5 }
const body2: Body = { color: "#ffdd33", pos: { x: WIDTH/2 + 50, y: HEIGHT /2 }, radius: 10, vel: { x: 0, y: -10 }, mass: 10e5 * 10e5 }
objects.push(body1)
objects.push(body2)
render_galaxy()