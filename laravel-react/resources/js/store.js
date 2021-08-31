import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import { signUpReducer } from './reducers/signUp';
import { loginReducer } from './reducers/login';
import { profileReducer } from './reducers/profile';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);