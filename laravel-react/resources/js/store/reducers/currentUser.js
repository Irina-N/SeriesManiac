import {REQUEST_STARTED, REQUEST_SUCCESS, REQUEST_ERROR, REQUEST_IDLE, CHANGE_CURRENT_USER } from '../actions/currentUser';
import { REQUEST_STATUSES } from '../../common/constants/constants';

const initialState = {
    requestStatus: REQUEST_STATUSES.IDLE,
    requestError: {},
    user: {},
};

export const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case CHANGE_CURRENT_USER:
            return {
                ...state,
                [action.payload.target]: action.payload.data    
            }

        case REQUEST_STARTED:
        case REQUEST_SUCCESS:
        case REQUEST_ERROR:
        case REQUEST_IDLE:
            return {
                ...state,
                requestStatus: action.payload
            }

        default:
            return state;
    }
}



