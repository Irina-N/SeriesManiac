import { REQUEST_STATUSES, FETCH_URL } from '../../common/constants/constants.js';

export const REQUEST_STARTED = 'CURRENT_USER::REQUEST_STARTED';
export const REQUEST_SUCCESS = 'CURRENT_USER::REQUEST_SUCCESS';
export const REQUEST_ERROR = 'CURRENT_USER::REQUEST_ERROR';
export const REQUEST_IDLE = 'CURRENT_USER::REQUEST_IDLE';
export const CHANGE_CURRENT_USER = 'CURRENT_USER::CHANGE';

export const setRequestStatusStarted = () => ({
    type: REQUEST_STARTED,
    payload: REQUEST_STATUSES.STARTED,
});

export const setRequestStatusSuccess = () => ({
    type: REQUEST_SUCCESS,
    payload: REQUEST_STATUSES.SUCCESS,
});

export const setRequestStatusError = () => ({
    type: REQUEST_ERROR,
    payload: REQUEST_STATUSES.ERROR,
});

export const setRequestStatusIdle = () => ({
    type: REQUEST_IDLE,
    payload: REQUEST_STATUSES.IDLE,
});

export const changeCurrentUser = (data, target) => ({
    type: CHANGE_CURRENT_USER,
    payload: {data, target}
});

export const fetchUser = (formData, url) => {
    return async (dispatch) => {
        dispatch(changeCurrentUser({}, 'requestError')); 
        dispatch(setRequestStatusStarted());
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const user = await response.json();
                dispatch(changeCurrentUser(user, 'user'));
                dispatch(setRequestStatusIdle()); 

            } else if (response.status === 400) {
                const errors = await response.json();
                let errorsTextArr = Object.keys(errors).map((fieldName) => errors[fieldName]);
                throw {errorCode: 400, errorDescription: errorsTextArr}

            } else {
                const errorText = 'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
                throw {errorCode: response.status, errorDescription: [errorText]}
            }
            
        } catch (err) {
            dispatch(changeCurrentUser(err, 'requestError'));
            dispatch(setRequestStatusError());
            dispatch(setRequestStatusIdle()); 
        }
    }
}

//TODO 

export const fetchRegister = (formData, url) => {
    return async (dispatch) => {
        dispatch(changeCurrentUser({}, 'requestError')); 
        dispatch(setRequestStatusStarted());
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const user = await response.json();
                dispatch(changeCurrentUser(user, 'user'));
                dispatch(setRequestStatusIdle()); 

            } else if (response.status === 400) {
                const errors = await response.json();
                let errorsTextArr = Object.keys(errors).map((fieldName) => errors[fieldName].join(', '));
                throw {errorCode: 400, errorDescription: errorsTextArr}

            } else {
                const errorText = 'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
                throw {errorCode: response.status, errorDescription: [errorText]}
            }
            
        } catch (err) {
            console.log('Something wrong', err);
            dispatch(changeCurrentUser(err, 'requestError'));
            dispatch(setRequestStatusError());
            dispatch(setRequestStatusIdle()); 
        }
    }
}

export const fetchLogout = () => {
    return async (dispatch) => {
        dispatch(setRequestStatusStarted());
        
        try {
            const response = await fetch(FETCH_URL.LOGOUT);
            if (response.ok) {
                dispatch(changeCurrentUser({}, 'user')); 
                dispatch(setRequestStatusIdle());           
            }            
        } catch (err) {
            console.log('Logout error:', err);
            dispatch(setRequestStatusError());
            dispatch(setRequestStatusIdle()); 
        } 
    }   
} 
