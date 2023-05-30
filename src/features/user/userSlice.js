import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "../../service/authService";

const initialState = {
    isLoggedIn: authService.getCredentials() === null? false : true,
    status: 'idle',
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state, action){
            authService.logout();
            console.log('logout..', localStorage.getItem('userID'))
            state.status = 'idle';
            state.isLoggedIn = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authenticateUser.pending, (state, action) => {
                state.status = 'loading'
                console.log('auth login request...');
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.isLoggedIn = true;
                console.log(action.payload);
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log('auth failed');
            })
    }

});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectLoginStatus = (state) => state.user.status;

export const authenticateUser = createAsyncThunk('user/authenticate', async (credentials) => {
    console.log('Credentials => ' + credentials.username + ' ' + credentials.password);
    const response = await authService.login(credentials.username, credentials.password);
    console.log(response.data)
    return response.data
})