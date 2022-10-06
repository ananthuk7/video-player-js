import { eventPlayed } from "./globalEvent";
const container = document.querySelector(".video");
const video = container.querySelector("video");
let timer;
export function hideControls() {
  if (video.paused) return;
  timer = setTimeout(() => {
    container.classList.remove("show-controls");
  }, 3000);
}
hideControls();
eventPlayed(container, "mousemove", () => {
  container.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

export function formatTimer(time) {
  let seconds = Math.floor(time % 60),
    miniutes = Math.floor((time / 60) % 60),
    hours = Math.floor(time / 3600);
  seconds = seconds > 10 ? seconds : `0${seconds}`;
  miniutes = miniutes > 10 ? miniutes : `0${miniutes}`;
  hours = hours > 10 ? hours : `0${hours}`;
  if (hours == 0) return `${miniutes} : ${seconds}`;
  return `${hours} : ${miniutes}: ${seconds}`;
}
