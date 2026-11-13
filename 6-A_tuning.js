const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

// 調整する数（「1. もっとふわっと浮くようにして」の修正）
const CONFIG = {
  GRAVITY: 500,           // 1200 -> 500 に下げて重力を弱くする（ふわっと浮く）
  JUMP_SPEED: 450,        // 重力が弱くなった分、ジャンプ速度も調整
  MOVE_SPEED: 220,        
  DASH_SPEED: 440,        
  MAX_JUMPS: 1,           
  FALL_GRAVITY_RATE: 1.0, // 1.4 -> 1.0 にして落下時もふわっと落とす
};

const player = { x: 80, y: 20, w: 32, h: 32, vy: 0, isGrounded: false, jumpsLeft: CONFIG.MAX_JUMPS };
const floor = { x: 0, y: 320, w: 640, h: 40 };

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space" && player.vy < 0) {
    player.vy = player.vy * 0.5;
  }
  keys[e.code] = false;
});

function collideWithFloor() {
  if (player.y + player.h > floor.y) {
    player.y = floor.y - player.h;
    player.vy = 0;
    player.isGrounded = true;
    player.jumpsLeft = CONFIG.MAX_JUMPS;
  } else {
    player.isGrounded = false;
  }
}

function update(dt) {
  if (keys["Space"] && player.jumpsLeft > 0) {
    player.vy = -CONFIG.JUMP_SPEED;
    player.jumpsLeft = player.jumpsLeft - 1;
    player.isGrounded = false;
  }

  const currentSpeed = keys["ShiftLeft"] ? CONFIG.DASH_SPEED : CONFIG.MOVE_SPEED;

  if (keys["ArrowRight"]) {
    player.x = player.x + currentSpeed * dt;
  }
  if (keys["ArrowLeft"]) {
    player.x = player.x - currentSpeed * dt;
  }

  const g = player.vy > 0 ? CONFIG.GRAVITY * CONFIG.FALL_GRAVITY_RATE : CONFIG.GRAVITY;
  player.vy = player.vy + g * dt;
  player.y = player.y + player.vy * dt;

  collideWithFloor();

  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x > canvas.width - player.w) {
    player.x = canvas.width - player.w;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#203060";
  ctx.fillRect(floor.x, floor.y, floor.w, floor.h);

  ctx.strokeStyle = "#ff4444";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, floor.y - 64);
  ctx.lineTo(canvas.width, floor.y - 64);
  ctx.stroke();

  ctx.fillStyle = player.isGrounded ? "#7ef5e1" : "#ffd166";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#e8eeff";
  ctx.font = "14px monospace";
  ctx.fillText("vy = " + player.vy.toFixed(0) + "   jumpsLeft = " + player.jumpsLeft + "   Dash = " + (keys["ShiftLeft"] ? "ON" : "OFF"), 10, 20);
}

let last = performance.now();

function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.033);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);