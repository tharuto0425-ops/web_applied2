const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
// ...以下、提示したコードを記述
let x = 100;          // 丸の中心の位置（横）
let y = 80;           // 丸の中心の位置（縦）
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
const r = 14;         // 半径
let last = performance.now();

// dt：前の回からの経過時間（秒）。loop から受け取る
function update(dt) {
  x = x + vx * dt;    // 横の移動：距離 ＝ 速さ × 時間
  y = y + vy * dt;    // 縦の移動：距離 ＝ 速さ × 時間

  // 左右の壁（中心座標 x に対して半径 r を考慮）
  if (x + r > canvas.width) {
    x = canvas.width - r; // 位置を右の端まで戻す
    vx = -vx;             // 横の向きを反転
  }
  if (x - r < 0) {
    x = r;                // 位置を左の端まで戻す
    vx = -vx;             // 横の向きを反転
  }

  // 上下の壁（中心座標 y に対して半径 r を考慮）
  if (y + r > canvas.height) {
    y = canvas.height - r;// 位置を下の端まで戻す
    vy = -vy;             // 縦の向きを反転
  }
  if (y - r < 0) {
    y = r;                // 位置の上の端まで戻す
    vy = -vy;             // 縦の向きを反転
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 黄色い丸（ボール）を描画
  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
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