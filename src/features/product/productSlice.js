import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productService from "../../service/productService";
import authService from "../../service/authService";

const owner = authService.getCredentials().username;

const newProductInitialState = {
    productOwner: owner,
    productName: "",
    description: "",
    basePrice: 0,
    imgUrl: "https://placehold.co/600x400"
}

const initialState = {
    productList: [],
    status: 'idle',
    error: null,

    userProductList: [],
    userProductStatus: 'idle',
    userProductError: null,

    newProduct: newProductInitialState,
    addProductStatus: 'idle',
    addError: null,
    showForm: false,

    updateListsStatus: 'idle',

    deleteStatus: 'idle',
    deleteError: null
};
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        toggleShowForm: state => {
            state.showForm = !state.showForm;
        },
        handleFormChange: (state, action) => {
            state.newProduct = action.payload;
        },
        resetFormValues: state => {
            state.newProduct = newProductInitialState;
        },
        resetUserProducts: state => {
           state.userProductStatus = 'idle';
           state.userProductList = [];
        },
        updateProductLists: (state, action) => {
            state.userProductList = [action.payload].concat(state.userProductList);
            state.productList.unshift(action.payload);

            state.updateListsStatus = 'idle';
        }
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
            .addCase(fetchUserProducts.pending, (state, action) => {
                state.userProductStatus = 'loading'
                console.log('loading');
            })
            .addCase(fetchUserProducts.fulfilled, (state, action) => {
                state.userProductStatus = 'succeeded'
                // Add any fetched posts to the array
                state.userProductList = state.userProductList.concat(action.payload)
                console.log(action.payload);
            })
            .addCase(fetchUserProducts.rejected, (state, action) => {
                state.userProductStatus = 'failed'
                state.userProductError = action.error.message
                console.log('failed');
            })
            .addCase(addProduct.pending, (state, action) => {
                state.addProductStatus = 'loading'
                console.log('loading');
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addProductStatus = 'succeeded'
                console.log("Product is added successfully")
                // Trigger update events
                state.updateListsStatus = 'update';

            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProductStatus = 'failed'
                state.addError = action.error.message
                console.log('failed');
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.deleteStatus = 'deleting'
                console.log('deleting');
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded'
                console.log("Product is deleted successfully")
                // Trigger update events
                state.userProductList = state.userProductList.filter(p => p.id != action.payload.id);

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.error.message
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

export const selectAllUserProducts = (state) => state.product.userProductList
export const selectUserProductStatus = (state) => state.product.userProductStatus;
export const fetchUserProducts = createAsyncThunk('products/fetchUserProducts', async (credentials) => {
    const response = await productService.fetchUserProducts(credentials.username, credentials.password);
    console.log(response.data)
    return response.data
})


export const selectNewProduct = (state) => state.product.newProduct;
export const selectAddProductStatus = (state) => state.product.addProductStatus;
export const selectAddError = (state) => state.product.addError;

export const selectShowForm = (state) => state.product.showForm;
export const selectUpdateStatus = (state) => state.product.updateListsStatus
export const addProduct = createAsyncThunk('products/addNewProduct', async (product) => {
    const response = await productService.addNewProduct(product);
    console.log(response.data)
    return response.data
})


export const selectDeleteStatus = (state) => state.product.deleteStatus;
export const selectDeleteError = (state) => state.product.deleteError;

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (product) => {
    const response = await productService.deleteProduct(product);
    console.log(response.data)
    return response.data
})

export const { toggleShowForm, handleFormChange, resetFormValues,
    resetUserProducts, updateProductLists } = productSlice.actions;