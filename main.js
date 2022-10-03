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
const progressBar = document.querySelector(".progress__bar");

video.addEventListener("timeupdate", function (e) {
  const { currentTime, duration } = e.target;
  let totalWidthPer = (currentTime / duration) * 100;
  progressBar.style.width = `${totalWidthPer}%`;
});
play.addEventListener("click", function () {
  video.paused ? video.play() : video.pause();
});
video.addEventListener("play", (e) => {
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
  video.muted;
  mutedIcon.classList.contains("fa-volume-high")
    ? mutedIcon.classList.replace("fa-volume-high", "fa-volume-xmark")
    : mutedIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
});

fullscreen.addEventListener("click", () => {
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
