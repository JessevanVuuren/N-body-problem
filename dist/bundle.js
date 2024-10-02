(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec = require("./vector_math");
const WIDTH = 1280;
const HEIGHT = 720;
const G = 6.67e-11;
const MOVE_SCALER = 1;
const ZOOM_SCALER = 0.1;
const cam = { x: 0, y: 0 };
let current_zoom = 1;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("ERROR: no canvas found");
}
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;
const objects = [];
const add_body = (x, y) => {
    const body = { color: "#ffdd33", pos: { x: x, y: y }, radius: 10, vel: { x: 0, y: 0 }, mass: 10e5 * 10e5 };
    objects.push(body);
    return body;
};
const reset_state = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
canvas.addEventListener("mousedown", (e) => {
    if (e.buttons == 1) {
        add_body(e.offsetX, e.offsetY);
        render_galaxy();
    }
});
canvas.addEventListener("mousemove", (e => {
    if (e.buttons == 2) {
        cam.x += e.movementX * MOVE_SCALER;
        cam.y += e.movementY * MOVE_SCALER;
        reset_state();
        ctx.translate(cam.x, cam.y);
        render_galaxy();
    }
}));
canvas.addEventListener("wheel", (e) => {
    const scale = e.deltaY < 0 ? 1 : -1;
    current_zoom += scale * ZOOM_SCALER;
    reset_state();
    ctx.scale(current_zoom, current_zoom);
    render_galaxy();
});
const update_galaxy = () => {
    for (let i = 0; i < objects.length; i++) {
        const body1 = objects[i];
        for (let j = 0; j < objects.length; j++) {
            const body2 = objects[j];
            if (i == j)
                continue;
            const delta = Vec.vector2_min_vec(body1.pos, body2.pos);
            const dist = Vec.vector2_distance(body1.pos, body2.pos);
            const smoothing = Math.max(dist, 5);
            const force = (G * body1.mass * body2.mass) / Math.pow(smoothing, 2);
            const force_vec = Vec.vector2_scale(delta, force);
            const mass_scaler = Vec.vector2_scale(force_vec, 1 / body1.mass);
            body1.vel = Vec.vector2_add_vec(body1.vel, mass_scaler);
        }
        body1.pos = Vec.vector2_min_vec(body1.pos, body1.vel);
    }
};
const render_galaxy = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < objects.length; i++) {
        const body = objects[i];
        ctx.beginPath();
        ctx.arc(body.pos.x, body.pos.y, body.radius, 0, 2 * Math.PI);
        ctx.fillStyle = body.color;
        ctx.fill();
        ctx.closePath();
    }
};
const start_anim = () => {
    update_galaxy();
    render_galaxy();
    window.requestAnimationFrame(start_anim);
};
const button = document.getElementById('myButton');
if (button) {
    button.onclick = function () {
        start_anim();
    };
}
window.addEventListener(`contextmenu`, (e) => e.preventDefault());

},{"./vector_math":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector2_multiply = exports.vector2_scale = exports.vector2_add_vec = exports.vector2_add_val = exports.vector2_min_vec = exports.vector2_distance = void 0;
const vector2_distance = (vec1, vec2) => {
    return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2));
};
exports.vector2_distance = vector2_distance;
const vector2_min_vec = (vec1, vec2) => {
    return { x: vec1.x - vec2.x, y: vec1.y - vec2.y };
};
exports.vector2_min_vec = vector2_min_vec;
const vector2_add_val = (vec, value) => {
    return { x: vec.x + value, y: vec.y + value };
};
exports.vector2_add_val = vector2_add_val;
const vector2_add_vec = (vec1, vec2) => {
    return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
};
exports.vector2_add_vec = vector2_add_vec;
const vector2_scale = (vec, value) => {
    return { x: vec.x * value, y: vec.y * value };
};
exports.vector2_scale = vector2_scale;
const vector2_multiply = (vec1, vec2) => {
    return { x: vec1.x * vec2.x, y: vec1.y * vec2.y };
};
exports.vector2_multiply = vector2_multiply;

},{}]},{},[1]);
