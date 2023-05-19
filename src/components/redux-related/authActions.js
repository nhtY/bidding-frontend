import {LOGIN_REQUEST, FAILURE, SUCCESS, LOGOUT_REQUEST} from './authTypes';

export const authenticateUser = (username, password) => {
    return (dispatch) => {
        dispatch(loginRequest());
        if (username === 'test' && password === 'test') {
            dispatch(success(true));
        } else {
            dispatch(failure());
        }
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        dispatch(success(false));
    }
}

// action creators:

const loginRequest =  () => {
    return {
        type: LOGIN_REQUEST
    };
}

const logoutRequest =  () => {
    return {
        type: LOGOUT_REQUEST
    };
}
const success = (isLoggedIn) => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
}

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
}
