const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

let x = 100;          // 丸の中心の位置（横）
let y = 80;           // 丸の中心の位置（縦）
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
let r = 14;           // 半径（キーで変えるため let にする）
let color = "#ffd166"; // ボールの初期色
let bounceCount = 0;  // 壁に当たった回数
let last = performance.now();

// キーボードを押したときの処理
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;     // 上矢印：速さを1.2倍
    vy = vy * 1.2;
  }
  if (e.code === "ArrowDown") {
    vx = vx * 0.8;     // 下矢印：速さを0.8倍
    vy = vy * 0.8;
  }
  if (e.code === "ArrowRight") {
    r = r + 2;         // 右矢印：半径を大きく
  }
  if (e.code === "ArrowLeft") {
    r = Math.max(2, r - 2); // 左矢印：半径を小さく
  }
  if (e.code === "KeyC") {
    color = "#ef476f"; // Cキー：色を変更
  }
});

// dt：前の回からの経過時間（秒）。loop から受け取る
function update(dt) {
  x = x + vx * dt;    // 横の移動：距離 ＝ 速さ × 時間
  y = y + vy * dt;    // 縦の移動：距離 ＝ 速さ × 時間

  // 左右の壁
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
    bounceCount++;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
    bounceCount++;
  }

  // 上下の壁
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
    bounceCount++;
  }
  if (y - r < 0) {
    y = r;
    vy = -vy;
    bounceCount++;
  }
}

function draw() {
  // 残像をつける処理：完全消去せず、透明度0.2の黒で全体を薄く塗る
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ボールを描画
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // カウント表示を描画
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px sans-serif";
  ctx.fillText("壁に当たった回数: " + bounceCount, 16, 32);
}

function loop() {
  const now = performance.now();
  const dt = (now - last) / 1000; // 経過時間を秒単位に変換
  last = now;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

loop();