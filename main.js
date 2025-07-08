import './style.css';

const textInput = document.getElementById('text-input');
const speedInput = document.getElementById('speed-input');
const mirrorCheckbox = document.getElementById('mirror-checkbox');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const prompter = document.getElementById('prompter');

let scrollInterval = null;

startBtn.onclick = () => {
  if (scrollInterval) return;
  prompter.innerText = textInput.value;
  prompter.scrollTop = 0;
  scrollInterval = setInterval(() => {
    prompter.scrollTop += parseInt(speedInput.value, 10);
  }, 30);
};

stopBtn.onclick = () => {
  clearInterval(scrollInterval);
  scrollInterval = null;
};

mirrorCheckbox.onchange = () => {
  prompter.style.transform = mirrorCheckbox.checked ? 'scaleX(-1)' : 'none';
};
