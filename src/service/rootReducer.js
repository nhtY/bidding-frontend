import {combineReducers} from "redux";
import authReducer from '../components/redux-related/authReducer';
import productReducer from "../components/redux-related/productReducer";

const rootReducer = combineReducers({
        auth: authReducer,
        product: productReducer,
    }
);

export default rootReducer;