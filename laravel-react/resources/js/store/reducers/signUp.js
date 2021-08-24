import {SIGN_UP_LOADING_STARTED, SIGN_UP_LOADING_SUCCESS, SIGN_UP_LOADING_ERROR, SIGN_UP_LOADING_IDLE } from '../actions/signUp';
import { REQUEST_STATUSES } from '../../constants';

const initialState = {
    signUpRequestStatus: REQUEST_STATUSES.IDLE,
};

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        

        case SIGN_UP_LOADING_STARTED:
        case SIGN_UP_LOADING_SUCCESS:
        case SIGN_UP_LOADING_ERROR:
        case SIGN_UP_LOADING_IDLE:
            return {
                ...state,
                signUpRequestStatus: action.payload
            }

        default:
            return state;
    }
}



