import {LOGIN_REQUEST, FAILURE, SUCCESS, LOGOUT_REQUEST} from './authTypes';
import authService from "../../service/authService";

export const authenticateUser = (username, password) => {
    return (dispatch) => {
        dispatch(loginRequest());
        authService.login(username, password)
            .then(() => {
                console.log("LOGIN SUCCESS")
                dispatch(loginSuccess(true));
            })
            .catch(error => {
                dispatch(loginFailure());
                console.log(error);
            });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem('credentials');
        localStorage.removeItem('userID');
        dispatch(loginSuccess(false)); // islogged in = false
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
const loginSuccess = (isLoggedIn) => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
}

const loginFailure = () => {
    return {
        type: FAILURE,
        payload: false
    };
}
