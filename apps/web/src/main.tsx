import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicHomeHero } from './features/public/PublicHomeHero';
import { MotionProvider } from './motion/MotionProvider';
import './styles/index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <MotionProvider>
      <div data-app="smartfarm">
        <PublicHomeHero />
      </div>
    </MotionProvider>
  </StrictMode>,
);
