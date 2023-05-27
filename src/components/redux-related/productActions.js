import {P_FAILURE, P_FETCH_ALL_REQUEST, P_SUCCESS} from "./productTypes";
import productService from "../../service/productService";

export const fetchAllProducts = () => {
    return  async (dispatch) => {
        dispatch(fetchAllRequest());
        productService.fetchAllProducts()
        .then(response => {
            console.log("Fetched the products...", response)
            return response;
        }).then(data => {
            console.log("dispatch success");
            dispatch(success(data));
        }).catch(error => {
                dispatch(failure());
                console.log(error);
        });
    }
}


const fetchAllRequest = () => {
    return {
      type: P_FETCH_ALL_REQUEST,
    };
}

const success = (products) => {
    console.log("success actions..", products)
    return {
        type: P_SUCCESS,
        payload: products
    };
}

const failure = () => {
    return {
        type: P_FAILURE,
        payload: []
    };
}