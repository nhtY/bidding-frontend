

import axios from 'axios';

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


export default { fetchAllProducts };
