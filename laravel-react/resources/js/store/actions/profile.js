//import { REQUEST_STATUSES } from '../constants.js';

export const CHANGE_PROFILE_DATA = 'PROFILE::CHANGE_PROFILE_DATA';

export const changeProfileInState = (user) => ({
    type: CHANGE_PROFILE_DATA,
    payload: user,
});



