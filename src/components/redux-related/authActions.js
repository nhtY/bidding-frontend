import {LOGIN_REQUEST, FAILURE, SUCCESS} from './authTypes';

export const authenticateUser = (username, password) => {
    return function(dispatch) {
        dispatch(loginRequest());
        if (username === 'test' && password === 'test') {
            dispatch(success());
        } else {
            dispatch(failure());
        }
    }
};

// action creators:

const loginRequest =  () => {
    return {
        type: LOGIN_REQUEST
    };
}

const success = () => {
    return {
        type: SUCCESS,
        payload: true
    };
}

const failure = () => {
    return {
        type: FAILURE,
        payload: true
    };
}
