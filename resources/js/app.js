require('./bootstrap');

/* require('./components/Example'); */

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Layout from './components/Layout';


ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('app')
);