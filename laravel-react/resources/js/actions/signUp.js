import { REQUEST_STATUSES } from '../constants.js';

export const SIGN_UP_LOADING_STARTED = 'SIGN_UP::SIGN_UP_LOADING_STARTED';
export const SIGN_UP_LOADING_SUCCESS = 'SIGN_UP::SIGN_UP_LOADING_SUCCESS';
export const SIGN_UP_LOADING_ERROR = 'SIGN_UP::SIGN_UP_LOADING_ERROR';
export const SIGN_UP_LOADING_IDLE = 'SIGN_UP::SIGN_UP_LOADING_IDLE';

export const setSignUpRequestStatusStarted = () => ({
    type: SIGN_UP_LOADING_STARTED,
    payload: REQUEST_STATUSES.STARTED,
});

export const setSignUpRequestStatusSuccess = () => ({
    type: SIGN_UP_LOADING_SUCCESS,
    payload: REQUEST_STATUSES.SUCCESS,
});

export const setSignUpRequestStatusError = () => ({
    type: SIGN_UP_LOADING_ERROR,
    payload: REQUEST_STATUSES.ERROR,
});

export const setSignUpRequestStatusIdle = () => ({
    type: SIGN_UP_LOADING_IDLE,
    payload: REQUEST_STATUSES.IDLE,
});

export const fetchSignUp = (newUser) => (dispatch) => {
    dispatch(setSignUpRequestStatusStarted());
    fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
        })
    .then(response => {
        if (!response.ok) {
            throw 'Response status is not ok';
        }
        return response.json()
    })
    .then(answer => {
        console.log(answer);
        dispatch(setSignUpRequestStatusSuccess());
    })
    .catch(err => {
        console.log('Something wrong', err);
        dispatch(setSignUpRequestStatusError());
    })    
}



