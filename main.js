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
/**
 * It takes two arguments, volume and range, and sets the volume of the video to the volume argument
 * and the value of the volume range to the range argument
 * @param {number} volume  - The volume of the video.
 * @param {number} range  - The value of the range input.
 *
 */
const setVolume = (volume, range) => {
  video.volume = volume;
  volumeRange.value = range;
};
/**
 * It removes the class "padd__body" from the body element, removes the class "fullscreen" from the
 * container element, and replaces the class "fa-compress" with the class "fa-expand" on the fullscreen
 * element
 */
/**
 * It removes the class "padd__body" from the body element, removes the class "fullscreen" from the
 * container element, and replaces the class "fa-compress" with the class "fa-expand" on the fullscreen
 * element
 */
const classForExitFullscreen = () => {
  body.classList.remove("padd__body");
  container.classList.remove("fullscreen");
  fullscreen.classList.replace("fa-compress", "fa-expand");
};

//functions

/**
 * It adds the full duration of the video to the videoLength element.
 */
const addVideoFullDuration = () => {
  videoLength.innerText = formatTimer(video.duration);
};
/**
 * When the user clicks on the play button, the playBack div will toggle the class of show.
 */
const showPlayBack = () => {
  playBack.classList.toggle("show");
};
/**
 * The function takes an event as an argument, and sets the playback rate of the video to the value of
 * the data-speed attribute of the element that triggered the event
 * @param {Event} event - event
 */
const playBackSpeed = (e) => {
  video.playbackRate = e.target.dataset.speed;
};
/**
 * It takes the currentTime and duration of the video and calculates the percentage of the progress bar
 * that should be filled
 * @param {Event} e - This is the event object that is passed to the function.
 */
const updateProgressAndCurrentTime = (e) => {
  const { currentTime, duration } = e.target;
  let totalWidthPer = (currentTime / duration) * 100;
  progressBar.style.width = `${totalWidthPer}%`;
  crtTime.innerText = formatTimer(currentTime);
};
/**
 * If the video is paused, play it, otherwise pause it
 */
const videoPlayOrPaused = () => {
  video.paused ? video.play() : video.pause();
};
/**
 * It replaces the class "fa-play" with the class "fa-pause" on the element with the id "play"
 * @returns The play button is being replaced with the pause button.
 */
const changeplay = () => {
  return play.classList.replace("fa-play", "fa-pause");
};
/**
 * It replaces the pause icon with the play icon
 * @returns the play.classList.replace method.
 */
const changePauseIcon = () => {
  return play.classList.replace("fa-pause", "fa-play");
};
/**
 * Increase the current time of the video by 5 seconds.
 */
const increaseCurrentTime = () => {
  video.currentTime += 5;
};
/**
 * Decrease the current time of the video by 5 seconds.
 */
const decreaseCurrentTime = () => {
  video.currentTime -= 5;
};
/**
 * If the volume is muted, unmute it, and if the volume is unmuted, mute it
 */
const videoVolumeMuted = () => {
  setVolume(0, 0);
  if (muted.classList.contains("fa-volume-high") && video.volume == 0) {
    muted.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    muted.classList.replace("fa-volume-xmark", "fa-volume-high");
    setVolume(0.5, 0.5);
  }
};
/**
 * It adds a class to the body and container elements, and if the document is in fullscreen mode, it
 * calls the classForExitFullscreen function and exits fullscreen mode. Otherwise, it replaces the icon
 * with the fullscreen icon and enters fullscreen mode
 * @returns the exitFullscreen method.
 */
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
/**
 * If the video is in picture-in-picture mode, exit picture-in-picture mode. If the video is in
 * fullscreen mode, exit fullscreen mode. If the video is not in picture-in-picture mode or fullscreen
 * mode, enter picture-in-picture mode.
 * @returns The video is being returned to the picture in picture mode.
 */
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
/**
 * It changes the volume of the video by the value of the range input
 */
const changeVideoVlumeByRange = () => {
  video.volume = e.target.value;
  video.volume === 0
    ? muted.classList.replace("fa-volume-high", "fa-volume-xmark")
    : muted.classList.replace("fa-volume-xmark", "fa-volume-high");
};

/**
 * We're taking the width of the progress bar, dividing it by the x-coordinate of the mouse click, and
 * then multiplying that by the duration of the video
 * @param {Event} e - the event object
 */
const moveProgress = (e) => {
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
};
/**
 * When the user clicks on the progress bar, the video's current time is set to the percentage of the
 * progress bar that was clicked.
 * @param  {Event} e - the event object
 */
const changeProgressBarByClick = (e) => {
  let timelineWidth = progress.clientWidth;
  let time = (e.offsetX / timelineWidth) * video.duration;
  video.currentTime = time;
};

//events

/* Adding an event listener to the video element. for showing duration */
eventPlayed(video, "loadeddata", addVideoFullDuration);
/* Adding an event listener to the playBack element. */
eventPlayed(playBack, "click", showPlayBack);
/* Adding an event listener to each element in the playOption array. */
playOption.forEach((el) => {
  eventPlayed(el, "click", playBackSpeed);
});
/* Adding an event listener to the video element. for update progressbar and time */
eventPlayed(video, "timeupdate", updateProgressAndCurrentTime);
/* Adding an event listener to the play element. */
eventPlayed(play, "click", videoPlayOrPaused);
/* Adding an event listener to the video element. for changing play icon */
eventPlayed(video, "play", changeplay);
/* Adding an event listener to the video element. for changing pause icon */
eventPlayed(video, "pause", changePauseIcon);
/* Adding an event listener to the forward element. */
eventPlayed(forward, "click", increaseCurrentTime);
/* Adding an event listener to the backward element. */
eventPlayed(backward, "click", decreaseCurrentTime);
/* Adding an event listener to the muted element. */
eventPlayed(muted, "click", videoVolumeMuted);
/* Adding an event listener to the fullscreen element.for video fullscreen mode */
eventPlayed(fullscreen, "click", videoFullScreen);
/* Adding an event listener to the pictureInMode element. */
eventPlayed(pictureInMode, "click", videoPictureInMode);
/* Adding an event for Changing the volume of the video by the value of the range input. */
eventPlayed(volumeRange, "input", changeVideoVlumeByRange);
/* Adding an event listener to the progress element. */
progress.addEventListener("mousedown", function () {
  eventPlayed(
    progress,
    "mousemove",
    moveProgress
  ); /*Adding mousemove event when mousedown */
});
/* Removing the event listener from the progress element. */
progress.addEventListener("mouseup", function () {
  removeEventPlayed(
    progress,
    "mousemove",
    moveProgress
  ); /*remove mousemove event when mousedown */
});
/* Adding an event listener to the progress element. */
eventPlayed(progress, "click", changeProgressBarByClick);
