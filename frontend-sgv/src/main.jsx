import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
