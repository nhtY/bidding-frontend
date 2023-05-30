import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productService from "../../service/productService";

const initialState = {
    userProductList: [],
    status: 'idle',
    error: null
};
export const userProductSlice = createSlice({
    name: 'userProduct',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserProducts.pending, (state, action) => {
                state.status = 'loading'
                console.log('loading');
            })
            .addCase(fetchUserProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.userProductList = state.userProductList.concat(action.payload)
                console.log(action.payload);
            })
            .addCase(fetchUserProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log('failed');
            })
    }
});

export default userProductSlice.reducer
export const selectAllUserProducts = (state) => state.userProduct.userProductList
export const selectUserProductStatus = (state) => state.userProduct.status;
export const fetchUserProducts = createAsyncThunk('products/fetchUserProducts', async (credentials) => {
    const response = await productService.fetchUserProducts(credentials.username, credentials.password);
    console.log(response.data)
    return response.data
})