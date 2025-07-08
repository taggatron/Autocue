import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div style="margin:2em auto; max-width:600px;">
      <textarea id="teleprompter-input" style="width:100%; min-height:80px; font-size:1.2em; margin-bottom:1em;">Enter your teleprompter text here...</textarea>
      <button id="start-teleprompter">Start Teleprompter</button>
      <div id="teleprompter-container" style="min-height:200px; background:#111; color:#fff; font-size:2em; padding:1em; border-radius:8px; margin-top:1em; overflow:hidden; position:relative;"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// Simple teleprompter scroll implementation
let scrollInterval = null;
document.getElementById('start-teleprompter').onclick = function() {
  const text = document.getElementById('teleprompter-input').value;
  const container = document.getElementById('teleprompter-container');
  container.innerHTML = `<div id="teleprompter-text" style="white-space:pre-line;">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  container.scrollTop = 0;
  if (scrollInterval) clearInterval(scrollInterval);
  const speed = 1; // px per frame
  scrollInterval = setInterval(() => {
    container.scrollTop += speed;
    // Stop scrolling if reached bottom
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      clearInterval(scrollInterval);
    }
  }, 20); // 50fps
};
