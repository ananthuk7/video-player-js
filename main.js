import "./style.scss";
import { formatTimer, hideControls } from "./helper";
import { eventPlayed, removeEventPlayed } from "./globalEvent";

const body = document.querySelector("body");
const container = document.querySelector(".video");
const video = container.querySelector("video");
const play = document.querySelector(".video__play i");
const fullscreen = document.querySelector(".video__fullscreen i");
const forward = document.querySelector(".video__forward i");
const backward = document.querySelector(".video__backward i");
const pictureInMode = document.querySelector(".video__picture i");
const muted = document.querySelector(".sound i");
const volumeRange = document.querySelector(".video__volume");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__bar");
const crtTime = document.querySelector(".current-time");
const videoLength = document.querySelector(".total-duration");
const playBack = document.querySelector(".playback__speed");
const playOption = document.querySelectorAll(".play-back");

//initail functions

hideControls();
const setVolume = (volume, range) => {
  video.volume = volume;
  volumeRange.value = range;
};
const classForExitFullscreen = () => {
  body.classList.remove("padd__body");
  container.classList.remove("fullscreen");
  fullscreen.classList.replace("fa-compress", "fa-expand");
};



//functions

const addVideoFullDuration = () => {
  videoLength.innerText = formatTimer(video.duration);
};
const showPlayBack = () => {
  playBack.classList.toggle("show");
};
const playBackSpeed = (e) => {
  video.playbackRate = e.target.dataset.speed;
};
const updateProgressAndCurrentTime = (e) => {
  const { currentTime, duration } = e.target;
  let totalWidthPer = (currentTime / duration) * 100;
  progressBar.style.width = `${totalWidthPer}%`;
  crtTime.innerText = formatTimer(currentTime);
};
const videoPlayOrPaused = () => {
  video.paused ? video.play() : video.pause();
};
const changeplay = () => {
  return play.classList.replace("fa-play", "fa-pause");
};
const changePauseIcon = () => {
  return play.classList.replace("fa-pause", "fa-play");
};
const increaseCurrentTime = () => {
  video.currentTime += 5;
};
const decreaseCurrentTime = () => {
  video.currentTime -= 5;
};
const videoVolumeMuted = () => {
  setVolume(0, 0);
  if (muted.classList.contains("fa-volume-high") && video.volume == 0) {
    muted.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    muted.classList.replace("fa-volume-xmark", "fa-volume-high");
    setVolume(0.5, 0.5);
  }
};
const videoFullScreen = () => {
  body.classList.add("padd__body");
  container.classList.add("fullscreen");
  if (document.fullscreenElement) {
    classForExitFullscreen();
    return document.exitFullscreen();
  }
  fullscreen.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
};
const videoPictureInMode = () => {
  if (document.pictureInPictureElement) {
    return document.exitPictureInPicture();
  }
  if (document.fullscreenElement) {
    classForExitFullscreen();
    document.exitFullscreen();
  }
  video.requestPictureInPicture();
};
const changeVideoVlumeByRange = () => {
  video.volume = e.target.value;
  video.volume === 0
    ? muted.classList.replace("fa-volume-high", "fa-volume-xmark")
    : muted.classList.replace("fa-volume-xmark", "fa-volume-high");
};

const moveProgress = (e) => {
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
};
const changeProgressBarByClick = (e) => {
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
};



//events

eventPlayed(video, "loadeddata", addVideoFullDuration);
eventPlayed(playBack, "click", showPlayBack);
playOption.forEach((el) => {
  eventPlayed(el, "click", playBackSpeed);
});
eventPlayed(video, "timeupdate", updateProgressAndCurrentTime);
eventPlayed(play, "click", videoPlayOrPaused);
eventPlayed(video, "play", changeplay);
eventPlayed(video, "pause", changePauseIcon);
eventPlayed(forward, "click", increaseCurrentTime);
eventPlayed(backward, "click", decreaseCurrentTime);
eventPlayed(muted, "click", videoVolumeMuted);
eventPlayed(fullscreen, "click", videoFullScreen);
eventPlayed(pictureInMode, "click", videoPictureInMode);
eventPlayed(volumeRange, "input", changeVideoVlumeByRange);
progress.addEventListener("mousedown", function () {
  eventPlayed(progress, "mousemove", moveProgress);
});
progress.addEventListener("mouseup", function () {
  removeEventPlayed(progress, "mousemove", moveProgress);
});
eventPlayed(progress, "click", changeProgressBarByClick);
