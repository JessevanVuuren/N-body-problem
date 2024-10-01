import { Body } from "./interface";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")

if (!ctx) { throw new Error("ERROR: no canvas found") }

const WIDTH = 1280
const HEIGHT = 720

ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT


const render_body = (body: Body) => {
  ctx.beginPath()
  ctx.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
  ctx.fillStyle = body.color
  ctx.fill()
}

const sun: Body = { color: "#ffdd33", radius: 10, x: WIDTH / 2, y: HEIGHT / 2 }



render_body(sun);