import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import CustomErrorBoundary from './components/error-boundary/CustomErrorBoundary';
import ErrorFallbackUi from './components/error-boundary/ErrorFallbackUi';
import App from './TodoListApp.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <CustomErrorBoundary fallbackComponent={<ErrorFallbackUi />}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </CustomErrorBoundary>
  </StrictMode>
);
