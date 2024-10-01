(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("ERROR: no canvas found");
}
const WIDTH = 1280;
const HEIGHT = 720;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;
const render_body = (body) => {
    ctx.beginPath();
    ctx.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
    ctx.fillStyle = body.color;
    ctx.fill();
};
const sun = { color: "#ffdd33", radius: 10, x: WIDTH / 2, y: HEIGHT / 2 };
render_body(sun);

},{}]},{},[1]);
