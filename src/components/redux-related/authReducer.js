import {LOGIN_REQUEST, FAILURE, SUCCESS} from './authTypes';

const initialState = {
    isLoggedIn: ''
}

// Reducer function
function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {...state};
        case SUCCESS:
            return {...state, isLoggedIn: action.payload};
        case FAILURE:
            return {...state, isLoggedIn: action.payload};
        default:
            return state;
    }
}

export default reducer;