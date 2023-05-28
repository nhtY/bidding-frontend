import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productService from "../../service/productService";

const initialState = {
    productList: [],
    status: 'idle',
    error: null
};
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
                console.log('loading');
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.productList = state.productList.concat(action.payload)
                console.log(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log('failed');
            })
    }
});

export default productSlice.reducer
export const selectAllProducts = (state) => state.product.productList
export const selectStatus = (state) => state.product.status;
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await productService.fetchAllProducts();
    console.log(response.data)
    return response.data
})