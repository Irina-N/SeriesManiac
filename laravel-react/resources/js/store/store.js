import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import{ currentUserReducer } from './reducers/currentUser';
import moviesReducer from './reducers/movies';


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    currentUserReducer,
    moviesReducer,
});

const persistedReducer = persistReducer(persistConfig, currentUserReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const storeForPersist = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(storeForPersist);