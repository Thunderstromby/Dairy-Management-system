import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './app/AppRouter';
import { PrototypeRoleProvider } from './auth/prototype-role';
import { PrototypeBar } from './components/PrototypeBar';
import { MotionProvider } from './motion/MotionProvider';
import './styles/index.css';
import './styles/stitch-exact.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <MotionProvider>
      <PrototypeRoleProvider>
        <PrototypeBar />
        <AppRouter />
      </PrototypeRoleProvider>
    </MotionProvider>
  </StrictMode>,
);
