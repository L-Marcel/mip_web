import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { AppProvider } from './context/AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './css/custom-bootstrap.css';
import './css/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router/>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);