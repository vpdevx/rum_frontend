import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
    color: 'inherit',
    textDecoration: 'none'
  }
});

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);