import "./style.scss";

const body = document.querySelector("body");
const container = document.querySelector(".video");
const video = container.querySelector("video");
const play = document.querySelector(".video__play");
const playicon = document.querySelector(".play-button");
const fullscreen = document.querySelector(".video__fullscreen");
const shrinkIcon = document.querySelector(".video__fullscreen i");
const forward = document.querySelector(".video__forward");
const backward = document.querySelector(".video__backward");
const pictureInMode = document.querySelector(".video__picture");
const muted = document.querySelector(".sound");
const mutedIcon = muted.querySelector("i");
const volumeRange = document.querySelector(".video__volume");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__bar");
const crtTime = document.querySelector(".current-time");
const videoLength = document.querySelector(".total-duration");
const playBack = document.querySelector(".playback__speed");
const playOption = document.querySelectorAll(".play-back");
let timer;
const formatTimer = (time) => {
  let seconds = Math.floor(time % 60),
    miniutes = Math.floor((time / 60) % 60),
    hours = Math.floor(time / 3600);
  seconds = seconds > 10 ? seconds : `0${seconds}`;
  miniutes = miniutes > 10 ? miniutes : `0${miniutes}`;
  hours = hours > 10 ? hours : `0${hours}`;
  if (hours == 0) return `${miniutes} : ${seconds}`;
  return `${hours} : ${miniutes}: ${seconds}`;
};
const init = () => {
  videoLength.innerText = formatTimer(video.duration);
};
init();
const hideControls = () => {
  if (video.paused) return;
  timer = setTimeout(() => {
    container.classList.remove("show-controls");
  }, 3000);
};
hideControls();
container.addEventListener("mousemove", () => {
  container.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

// video.addEventListener("loadeddata",(e) => {
//   console.log(e.target.duration);
// });
playBack.addEventListener("click", (e) => {
  playBack.classList.toggle("show");
});

playOption.forEach((el) => {
  el.addEventListener("click", (e) => {
    video.playbackRate = e.target.dataset.speed;
  });
});

video.addEventListener("timeupdate", function (e) {
  const { currentTime, duration } = e.target;
  let totalWidthPer = (currentTime / duration) * 100;
  progressBar.style.width = `${totalWidthPer}%`;
  crtTime.innerText = formatTimer(currentTime);
});
play.addEventListener("click", function () {
  video.paused ? video.play() : video.pause();
});
video.addEventListener("play", () => {
  progressBar.style.width = playicon.classList.replace("fa-play", "fa-pause");
});
video.addEventListener("pause", () => {
  playicon.classList.replace("fa-pause", "fa-play");
});

forward.addEventListener("click", function () {
  video.currentTime += 5;
});
backward.addEventListener("click", function () {
  video.currentTime -= 5;
});
muted.addEventListener("click", function () {
  video.volume = 0;
  volumeRange.value = 0;
  if (mutedIcon.classList.contains("fa-volume-high") && video.volume == 0) {
    mutedIcon.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    mutedIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
    volumeRange.value = 0.5;
    video.volume = 0.5;
  }
});

fullscreen.addEventListener("click", () => {
  /* Adding a class to the body and container. */
  body.classList.add("padd__body");
  container.classList.add("fullscreen");
  if (document.fullscreenElement) {
    body.classList.remove("padd__body");
    container.classList.remove("fullscreen");
    shrinkIcon.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  shrinkIcon.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
});

pictureInMode.addEventListener("click", function () {
  video.requestPictureInPicture();
});

volumeRange.addEventListener("input", function (e) {
  video.volume = e.target.value;
  video.volume === 0
    ? mutedIcon.classList.replace("fa-volume-high", "fa-volume-xmark")
    : mutedIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
});

function moveProgress(e) {
  console.log("event activated");
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
}

progress.addEventListener("mousedown", function () {
  progress.addEventListener("mousemove", moveProgress);
});
progress.addEventListener("mouseup", function () {
  progress.removeEventListener("mousemove", moveProgress);
});

progress.addEventListener("click", function (e) {
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
});
