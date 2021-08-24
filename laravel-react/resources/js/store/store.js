import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { signUpReducer } from './reducers/signUp';
import { loginReducer } from './reducers/login';
import moviesReducer from './reducers/movies'


const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    moviesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)