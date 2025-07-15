import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';
import './shared/api/i18nConfig';
import { Suspense } from 'react';
import './shared/themes/colors.css';
import './shared/themes/typography.css';
import './shared/themes/spacing.css';
import './shared/themes/lightTheme.css';
import './shared/themes/darkTheme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
);
