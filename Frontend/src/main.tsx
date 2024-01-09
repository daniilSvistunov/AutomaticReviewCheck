import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import CustomErrorBoundary from './components/error-boundary/CustomErrorBoundary';
import ErrorFallbackUi from './components/error-boundary/ErrorFallbackUi';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <CustomErrorBoundary fallbackComponent={<ErrorFallbackUi />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomErrorBoundary>
  </StrictMode>
);
