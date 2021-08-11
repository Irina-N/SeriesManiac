require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Layout from './Layout';


ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);



