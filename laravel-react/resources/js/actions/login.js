import { REQUEST_STATUSES } from '../constants.js';

export const LOGIN_LOADING_STARTED = 'LOGIN::LOGIN_LOADING_STARTED';
export const LOGIN_LOADING_SUCCESS = 'LOGIN::LOGIN_LOADING_SUCCESS';
export const LOGIN_LOADING_ERROR = 'LOGIN::LOGIN_LOADING_ERROR';
export const LOGIN_LOADING_IDLE = 'LOGIN::LOGIN_LOADING_IDLE';

export const setLoginRequestStatusStarted = () => ({
    type: LOGIN_LOADING_STARTED,
    payload: REQUEST_STATUSES.STARTED,
});

export const setLoginRequestStatusSuccess = () => ({
    type: LOGIN_LOADING_SUCCESS,
    payload: REQUEST_STATUSES.SUCCESS,
});

export const setLoginRequestStatusError = () => ({
    type: LOGIN_LOADING_ERROR,
    payload: REQUEST_STATUSES.ERROR,
});

export const setLoginRequestStatusIdle = () => ({
    type: LOGIN_LOADING_IDLE,
    payload: REQUEST_STATUSES.IDLE,
});

export const fetchLogin = (user) => (dispatch) => {
    dispatch(setLoginRequestStatusStarted());
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
        })
    .then(response => {
        return response.json()
    })
    .then(answer => {
        console.log(answer);
        dispatch(setLoginRequestStatusSuccess());
    })
    .catch(err => {
        console.log('Something wrong', err);
        dispatch(setLoginRequestStatusError());
    })    
}

