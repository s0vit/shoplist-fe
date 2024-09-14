import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';
import './shared/api/i18nConfig';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
);
