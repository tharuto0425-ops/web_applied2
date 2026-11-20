function update(dt) {
  updatePlayer(dt);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStage();
  drawPlayer();
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