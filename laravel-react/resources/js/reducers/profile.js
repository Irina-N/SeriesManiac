import { CHANGE_PROFILE_DATA } from '../actions/profile';

const initialState = {
    user: {},
    
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case CHANGE_PROFILE_DATA:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}



