const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settings");
const muteBtn = document.getElementById("muteBtn");
const volumeSlider = document.getElementById("volume");
const aspectButtons = document.querySelectorAll(".aspect-btn");

function togglePlay() {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "❚❚";
    } else {
        video.pause();
        playPauseBtn.textContent = "▶";
    }
}

function rewind() {
    video.currentTime -= 10;
}

function forward() {
    video.currentTime += 10;
}

function seek(event) {
    const percent = event.offsetX / progressContainer.offsetWidth;
    video.currentTime = percent * video.duration;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function toggleMute() {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
}

function changeVolume(value) {
    video.volume = value;
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeDisplay.textContent = formatTime(video.currentTime);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function toggleSettings() {
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
}

function changeAspect(event) {
    const ratio = event.target.dataset.ratio;
    video.style.objectFit = ratio === "16:9" ? "contain" : "fill";
}

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(video.duration);
});

playPauseBtn.addEventListener("click", togglePlay);
rewindBtn.addEventListener("click", rewind);
forwardBtn.addEventListener("click", forward);
progressContainer.addEventListener("click", seek);
fullScreenBtn.addEventListener("click", toggleFullScreen);
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => changeVolume(e.target.value));
settingsBtn.addEventListener("click", toggleSettings);
aspectButtons.forEach(button => button.addEventListener("click", changeAspect));