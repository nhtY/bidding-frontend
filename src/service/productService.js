

import axios from 'axios';
import authService from "./authService";

const BASE_URL = 'http://localhost:8080/api/';
const END_POINT = 'products';

const fetchAllProducts = () => {

    return axios.get(`${BASE_URL}${END_POINT}`)
        .then(response => {
            console.log("FETCH PRODUCTS RESPONSE DATA: ", response)
            return response; //response.data;
        })
        .catch(error => {
            console.log("FETCH PRODUCTS ERROR DATA: ", error.message)
            let errorMessage = '';

            errorMessage = error.message; // if error

            throw Error(errorMessage);
        });
};

// http://localhost:8080/api/products/list-my-products?username=david
const fetchUserProducts = (username, password) => {

    const  basicAuth = 'Basic ' + btoa(username + ':' + password);

    console.log(basicAuth)

    return axios.get(`${BASE_URL}${END_POINT}` + '/list-my-products?username=' + username,
         {
            headers : {'Authorization' : basicAuth}
        })
        .then(response => {
            console.log(`products of ${username}:\n ${response.data}`);
            return response;
        })
        .catch(error => {
            console.log('FETCH USER PRODUCTS ERROR: ', error);
            let errorMessage = '';

            errorMessage = error.message; // if error

            throw Error(errorMessage);
        })
}

const addNewProduct = (product) => {
    const credentials = authService.getCredentials();
    const  basicAuth = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
    console.log(basicAuth);

    return axios.post(`${BASE_URL}${END_POINT}` + '/add-product', product,
        {
            headers : {'Authorization' : basicAuth}
        })
        .then(response => {
            console.log(`ADDED PRODUCT:\n ${response.data}`);
            return response;
        })
        .catch(error => {
            console.log('ADD PRODUCT ERROR: ', error);
            let errorMessage = '';

            errorMessage = error.message; // if error

            throw Error(errorMessage);
        });
}

const deleteProduct = (product) => {
    const credentials = authService.getCredentials();
    const  basicAuth = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
    console.log(basicAuth);

    return axios.delete(`${BASE_URL}${END_POINT}/${product.id}`,
        {
            headers : {'Authorization' : basicAuth}
        })
        .then(response => {
            console.log(`DELETE response:\n ${response.data}`);
            return response;
        })
        .catch(error => {
            console.log('DELETE ERROR: ', error);
            let errorMessage = '';

            errorMessage = error.message; // if error

            throw Error(errorMessage);
        });
}


export default { fetchAllProducts, fetchUserProducts, addNewProduct, deleteProduct };
