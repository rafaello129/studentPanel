import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {  HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { AuthProvider } from './context/AuthProvider.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AuthProvider>
        <HashRouter>
          <App />
        </ HashRouter>
      </AuthProvider>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

