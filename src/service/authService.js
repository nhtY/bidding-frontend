
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

// check for HTTP basic: https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios

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

    const  basicAuth = 'Basic ' + btoa(username + ':' + password);

    console.log(basicAuth)

    return axios.post(`${BASE_URL}/login`, {}, {
        headers : {'Authorization' : basicAuth}
        })
        .then(response => {
            // If login is successful, store the user ID in local storage
            localStorage.setItem('credentials', JSON.stringify({username: username, password: password}));
            localStorage.setItem('userID', response.data.userID);
            return response;
        })
        .catch(error => {
            console.log('Login error: ', error);
            throw error;
        });
}

function logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('userID');
}


export default { register, login, logout };