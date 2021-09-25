/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router/Router';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


if (document.getElementById('app')) {
    ReactDOM.render((
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    ), document.getElementById('app'));
}
