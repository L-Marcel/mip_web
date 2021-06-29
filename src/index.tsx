import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { AppProvider } from './context/AppContext';

import './css/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router/>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);