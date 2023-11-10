import { startButton, stopButton } from "./refs";

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let colorChanger = null;

function onStartClick() {
  colorChanger = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
}

function onStopClick() {
  clearInterval(colorChanger);
  
  startButton.disabled = false;
  stopButton.disabled = true;
}
