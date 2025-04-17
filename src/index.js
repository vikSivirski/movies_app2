import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { MoviesServiceProvider } from './MoviesServiseContext/MoviesServiseContext';
import App from './Components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoviesServiceProvider>
    <App />
  </MoviesServiceProvider>
);
