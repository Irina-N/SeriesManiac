import {LOGIN_LOADING_STARTED, LOGIN_LOADING_SUCCESS, LOGIN_LOADING_ERROR, LOGIN_LOADING_IDLE } from '../actions/login';
import { REQUEST_STATUSES } from '../../constants';

const initialState = {
    loginRequestStatus: REQUEST_STATUSES.IDLE,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        

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



