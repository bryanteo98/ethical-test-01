import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Fit-to-viewport scaler for the 1440x900 stage
function fitScaler() {
  const scaler = document.getElementById('scaler');
  if (!scaler) return;
  const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  scaler.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fitScaler);

// Wrap the app in a stage/scaler before rendering
const stageEl = document.createElement('div');
stageEl.id = 'stage';
const scalerEl = document.createElement('div');
scalerEl.id = 'scaler';
const rootEl = document.createElement('div');
rootEl.id = 'app-root';
scalerEl.appendChild(rootEl);
stageEl.appendChild(scalerEl);

const originalRoot = document.getElementById('root');
originalRoot.replaceWith(stageEl);

fitScaler();

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
