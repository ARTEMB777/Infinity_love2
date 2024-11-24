const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

const SCALE = 400;
const STEP = 0.01;
const FONT_SIZE = "100px Comic Sans MS";
const TEXT_COLOR = "white";
const HEART_COLORS = "red";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let a = 0;

const heartText = [
  { threshold: 15, text: "Найкраща", xOffset: 2000, yOffset: 1000 },
  { threshold: 20, text: "Найдобріша", xOffset: 4700, yOffset: 1000 },
  { threshold: 25, text: "Найкрасивіша", xOffset: 2400, yOffset: 1600 },
  { threshold: 30, text: "Найніжніша", xOffset: 4400, yOffset: 1600 },
  { threshold: 35, text: "Я тебе люблю ♥", xOffset: 3400, yOffset: 2400 },
];

function heartFunction(x, a) {
  const e = Math.E;
  const pi = Math.PI;
  return Math.pow(x, 2 / 3) + (e / 3) * Math.sqrt(pi - Math.pow(x, 2)) * Math.sin(a * pi * x);
}

function drawHeartShape() {
  ctx.beginPath();
  ctx.strokeStyle = HEART_COLORS;
  ctx.lineWidth = 2;

  // Left part (mirrored)
  for (let x = -Math.PI; x <= 0; x += STEP) {
    const y = heartFunction(-x, a);
    drawHeartLine(x, y);
  }

  // Right part
  for (let x = 0; x <= Math.PI; x += STEP) {
    const y = heartFunction(x, a);
    drawHeartLine(x, y);
  }

  ctx.closePath();
  ctx.stroke();
}

function drawHeartLine(x, y) {
  const screenX = centerX + x * SCALE;
  const screenY = centerY - y * SCALE;
  ctx.lineTo(screenX, screenY);
}

function drawText() {
  heartText.forEach(({ threshold, text, xOffset, yOffset }) => {
    if (a >= threshold) {
      ctx.font = FONT_SIZE;
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(text, canvas.width - xOffset, yOffset);
    }
  });
}

function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawHeartShape();
  drawText();

  a += 0.03;
  requestAnimationFrame(drawHeart);
}

drawHeart();
