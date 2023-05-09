import {combineReducers} from "redux";
import authReducer from '../components/redux-related/authReducer';

const rootReducer = combineReducers({
        auth: authReducer,
    }
);

export default rootReducer;