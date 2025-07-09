import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Autocue</h1>
    <div style="margin:2em auto; max-width:1200px;">
      <textarea id="teleprompter-input" style="width:100%; min-height:80px; font-size:1.2em; margin-bottom:1em;">Enter your teleprompter text here...</textarea>
      <button id="start-teleprompter">Start Teleprompter</button>
      <button id="fullscreen-btn" style="margin-left:1em;">Full Screen</button>
      <div id="teleprompter-container" style="min-height:300px; background:#111; color:#fff; font-size:2em; padding:1em; border-radius:8px; margin-top:1em; overflow:hidden; position:relative; width:100%;"></div>
    </div>
  </div>
`

// Simple teleprompter scroll implementation
let scrollInterval = null;
let isPaused = false;
let lastText = '';

function startScroll() {
  const container = document.getElementById('teleprompter-container');
  if (scrollInterval) clearInterval(scrollInterval);
  const speed = 1; // px per frame
  scrollInterval = setInterval(() => {
    if (!isPaused) {
      container.scrollTop += speed;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        clearInterval(scrollInterval);
      }
    }
  }, 20); // 50fps
}

document.getElementById('start-teleprompter').onclick = function() {
  const text = document.getElementById('teleprompter-input').value;
  const container = document.getElementById('teleprompter-container');
  container.innerHTML = `<div id="teleprompter-text" style="white-space:pre-line;">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  container.scrollTop = 0;
  lastText = text;
  isPaused = false;
  startScroll();
};

// Add fullscreen functionality
const fullscreenBtn = document.getElementById('fullscreen-btn');
const teleprompterContainer = document.getElementById('teleprompter-container');
fullscreenBtn.onclick = function() {
  if (teleprompterContainer.requestFullscreen) {
    teleprompterContainer.requestFullscreen();
  } else if (teleprompterContainer.webkitRequestFullscreen) {
    teleprompterContainer.webkitRequestFullscreen();
  } else if (teleprompterContainer.msRequestFullscreen) {
    teleprompterContainer.msRequestFullscreen();
  }
};

// Listen for presenter remote (space/arrow keys) to toggle pause/resume
window.addEventListener('keydown', (e) => {
  // Common presenter remotes send 'Space', 'ArrowRight', or 'ArrowDown' as key events
  if ([" ", "Spacebar", "Space", "ArrowRight", "ArrowDown"].includes(e.key)) {
    // Only act if teleprompter is running
    const container = document.getElementById('teleprompter-container');
    if (!container.innerHTML) return;
    isPaused = !isPaused;
    // If resuming and scrollInterval was cleared (at end), restart from current position
    if (!isPaused && (!scrollInterval || container.scrollTop + container.clientHeight >= container.scrollHeight)) {
      startScroll();
    }
    e.preventDefault();
  }
});

// Allow space key in textarea to insert a space and not trigger pause/resume
const teleprompterInput = document.getElementById('teleprompter-input');
teleprompterInput.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
    // Let the space key insert a space as normal
    // Prevent the global handler from pausing/resuming
    e.stopPropagation();
  }
});

// Placeholder clear-on-focus for textarea
teleprompterInput.addEventListener('focus', function handler() {
  if (teleprompterInput.value === 'Enter your teleprompter text here...') {
    teleprompterInput.value = '';
  }
  // Remove this handler after first use
  teleprompterInput.removeEventListener('focus', handler);
});
