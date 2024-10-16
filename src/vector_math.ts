import { Vector2 } from "./interface";

export const vector2_distance = (vec1: Vector2, vec2: Vector2): number => {
  return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2))
}
export const vector2_min_vec = (vec1: Vector2, vec2: Vector2): Vector2 => {
  return { x: vec1.x - vec2.x, y: vec1.y - vec2.y };
}
export const vector2_min_val = (vec: Vector2, value: number): Vector2 => {
  return { x: vec.x - value, y: vec.y - value }
}
export const vector2_add_val = (vec: Vector2, value: number): Vector2 => {
  return { x: vec.x + value, y: vec.y + value }
}
export const vector2_add_vec = (vec1: Vector2, vec2: Vector2): Vector2 => {
  return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
}
export const vector2_scale = (vec: Vector2, value: number): Vector2 => {
  return { x: vec.x * value, y: vec.y * value }
}
export const vector2_multiply = (vec1: Vector2, vec2: Vector2): Vector2 => {
  return { x: vec1.x * vec2.x, y: vec1.y * vec2.y }
}

