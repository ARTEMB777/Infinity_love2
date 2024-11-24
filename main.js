const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

const SCALE = 150;
const STEP = 0.01;
const FONT_SIZE = "100px Comic Sans MS";
const TEXT_COLOR = "white";
const HEART_COLORS = "red";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let a = 0;

const heartTextElements = [
  { threshold: 15, id: "text1" },
  { threshold: 20, id: "text2" },
  { threshold: 25, id: "text3" },
  { threshold: 30, id: "text4" },
  { threshold: 35, id: "text5" },
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
  heartTextElements.forEach(({ threshold, id }) => {
    const textElement = document.getElementById(id);
    if (a >= threshold && textElement) {
      textElement.style.visibility = "visible";
    } else if (textElement) {
      textElement.style.visibility = "hidden";
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
