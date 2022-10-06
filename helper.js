import { eventPlayed } from "./globalEvent";
const container = document.querySelector(".video");
const video = container.querySelector("video");
let timer;
const FUNCTION_INTERVAL = 3000;
const TIME_IN_SECONDS = 60;
const MILLI_SECONDS_IN_HOUR = 3600;
const ZERO = 0;
const TIME_IN_TEN = 10;

/**
 * If the video is paused, return; otherwise, after 3 seconds, remove the class 'show-controls' from
 * the container element.
 * @returns the function.
 */
export function hideControls() {
  if (video.paused) return;
  timer = setTimeout(() => {
    container.classList.remove("show-controls");
  }, FUNCTION_INTERVAL);
}
hideControls();
/* A function that takes three arguments: the first is the element, the second is the event, and the
third is the callback function for adding video controls. */
eventPlayed(container, "mousemove", () => {
  container.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

/**
 * It takes a number of seconds and returns a string in the format of hours:minutes:seconds.
 * @param {number} time - the time in seconds
 * @return time in 'HH:MM:SS' when hour is not zero else return 'MM:SS'
 */
export function formatTimer(time) {
  let seconds = Math.floor(time % TIME_IN_SECONDS),
    miniutes = Math.floor((time / TIME_IN_SECONDS) % TIME_IN_SECONDS),
    hours = Math.floor(time / MILLI_SECONDS_IN_HOUR);
  seconds = seconds > TIME_IN_TEN ? seconds : `0${seconds}`;
  miniutes = miniutes > TIME_IN_TEN ? miniutes : `0${miniutes}`;
  hours = hours > TIME_IN_TEN ? hours : `0${hours}`;
  console.log(typeof hours);
  if (+hours === ZERO) return `${miniutes} : ${seconds}`;
  return `${hours} : ${miniutes}: ${seconds}`;
}
