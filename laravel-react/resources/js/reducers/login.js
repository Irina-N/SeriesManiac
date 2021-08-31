import {LOGIN_LOADING_STARTED, LOGIN_LOADING_SUCCESS, LOGIN_LOADING_ERROR, LOGIN_LOADING_IDLE, CHANGE_REQUEST_ANSWER } from '../actions/login';
import { REQUEST_STATUSES } from '../constants';

const initialState = {
    loginRequestStatus: REQUEST_STATUSES.IDLE,
    loginRequestAnswer: {},
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case CHANGE_REQUEST_ANSWER:
            return {
                ...state,
                loginRequestAnswer: action.payload
            }

        case LOGIN_LOADING_STARTED:
        case LOGIN_LOADING_SUCCESS:
        case LOGIN_LOADING_ERROR:
        case LOGIN_LOADING_IDLE:
            return {
                ...state,
                loginRequestStatus: action.payload
            }

        default:
            return state;
    }
}



