
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

const register = (user) => {
    return axios.post(`${BASE_URL}/register`, user)
        .then(response => {
            console.log("REGISTER RESPONSE DATA: ", response)
            return response.data;
        })
        .catch(error => {
            console.log("REGISTER ERROR DATA: ", error.response.data)
            let errorMessage = '';

            if ("errors" in error.response.data) { // if we have an array of errors (validation)
                const errors = error.response.data.errors
                errors.forEach(e => errorMessage += "Error: " + e + "\n")
                throw Error(errorMessage);
            }

            errorMessage = error.response.data.message; // if auth error

            throw Error(errorMessage);
        });
};

function login(username, password) {
    return axios.post(`${BASE_URL}/login`, {}, {
        auth: {
            username: username,
            password: password
        }
    })
        .then(response => {
            // If login is successful, store the user ID in local storage
            localStorage.setItem('userID', response.data.userID);
            return response.data;
        })
        .catch(error => {
            throw error.response.data;
        });
}

export default { register, login };