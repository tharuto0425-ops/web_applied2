const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

const floor = { x: 0, y: 320, w: 640, h: 40 };

function drawStage() {
  ctx.fillStyle = "#203060";
  ctx.fillRect(floor.x, floor.y, floor.w, floor.h);
}