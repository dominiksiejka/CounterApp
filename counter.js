window.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector(".play");
  const pouseBtn = document.querySelector(".pouse");
  const input = document.querySelector("input");
  const circle = document.querySelector("circle");
  const resetBtn = document.querySelector(".reset");

  const perimiter = circle.getAttribute("r") * 2 * Math.PI;
  circle.setAttribute("stroke-dasharray", perimiter);

  class Timer {
    constructor() {}
  }
});
