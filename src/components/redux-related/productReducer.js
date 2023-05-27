import * as types from './productTypes';

const initialState = {
    products : '',
}
function reducer(state=initialState, action) {
    switch (action.type) {
        case types.P_FETCH_ALL_REQUEST:
            return {...state};
        case types.P_SUCCESS:
            console.log("here is products: ", action.payload);
            return {...state, products: action.payload};
        case types.P_FAILURE:
            return {...state};
        default:
            return state;

    }
}

export default reducer;