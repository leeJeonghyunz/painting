const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorPalette = document.querySelectorAll(".colorPalette div");
const erase = document.getElementById("erase");
const download = document.getElementById("download");
const toolBox = document.querySelectorAll(".toolBox div");
const fill = document.getElementById("fill");

let isDrawing = false;
let isErase = false;
let currentColor = "";

ctx.lineWidth = 2;
ctx.strokeStyle = "black";

const startDrawing = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const drawing = (e) => {
  if (!isDrawing) {
    return;
  } else if (isErase) {
    ctx.clearRect(e.offsetX, e.offsetY, 20, 20);
  } else {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
};

const stopDrawing = () => {
  isDrawing = false;
  ctx.closePath();
};

const changeColor = (e) => {
  isErase = false;
  ctx.strokeStyle = e.currentTarget.id;
  currentColor = e.currentTarget.id;
  colorPalette.forEach((el) => {
    if (el === e.target) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });
  toolBox.forEach((el) => el.classList.remove("selected"));
};

const onClickErase = () => {
  isErase = true;
  colorPalette.forEach((el) => el.classList.remove("selected"));
  toolBox.forEach((el) => el.classList.remove("selected"));
  erase.classList.add("selected");
};

const onClickDownload = () => {
  const data = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = data;
  link.download = "canvas";
  link.click();
};

const onClickFill = () => {
  colorPalette.forEach((el) => el.classList.remove("selected"));
  toolBox.forEach((el) => el.classList.remove("selected"));
  fill.classList.add("selected");
  ctx.fillStyle = currentColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
erase.addEventListener("click", onClickErase);
colorPalette.forEach((el) => el.addEventListener("click", changeColor));
download.addEventListener("click", onClickDownload);
fill.addEventListener("click", onClickFill);
