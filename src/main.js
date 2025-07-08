import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import Teleprompter from 'teleprompter';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div style="margin:2em auto; max-width:600px;">
      <textarea id="teleprompter-input" style="width:100%; min-height:80px; font-size:1.2em; margin-bottom:1em;">Enter your teleprompter text here...</textarea>
      <button id="start-teleprompter">Start Teleprompter</button>
      <div id="teleprompter-container" style="min-height:200px; background:#111; color:#fff; font-size:2em; padding:1em; border-radius:8px; margin-top:1em;"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'));

// Teleprompter integration
let teleprompterInstance = null;
document.getElementById('start-teleprompter').onclick = function() {
  const text = document.getElementById('teleprompter-input').value;
  const container = document.getElementById('teleprompter-container');
  container.innerHTML = '';
  if (teleprompterInstance) teleprompterInstance.destroy();
  teleprompterInstance = new Teleprompter(container, { text });
  teleprompterInstance.start();
};
