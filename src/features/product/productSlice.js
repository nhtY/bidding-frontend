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
    deleteError: null,

    updateProductStatus: 'idle',
    updateError: null,

    updateList: 'idle'
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
        changeProductLists: (state, action) => {
            state.updateListsStatus = 'idle';
            state.addProductStatus = 'idle';
            state.deleteStatus = 'idle';
            state.updateProductStatus = 'idle';
        },
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
                console.log('fetch all failed');
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
                console.log('fetch failed');
            })
            .addCase(addProduct.pending, (state, action) => {
                state.addProductStatus = 'loading'
                console.log('loading');
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addProductStatus = 'succeeded'
                console.log("Product is added successfully")
                // Trigger update events
                const newUserProducts = [...state.userProductList, action.payload];
                state.userProductList = newUserProducts

                const newAllProducts = [...state.productList, action.payload];
                state.productList = newAllProducts;

                state.updateListsStatus = 'update';

            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProductStatus = 'failed'
                state.addError = action.error.message
                console.log('add failed');
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.deleteStatus = 'deleting'
                console.log('deleting');
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded'
                console.log("Product is deleted successfully")

                console.log("payload deleteion: ", action)
                // Trigger update events
                const userProductsAfterDeletion = [...state.userProductList.filter(p => p.id != action.payload.id)];
                state.userProductList = userProductsAfterDeletion;

                const allProductsAfterDelete = [...state.productList.filter(p => p.id != action.payload.id)];
                state.productList = allProductsAfterDelete;

                console.log(userProductsAfterDeletion)

                state.updateListsStatus = 'update';

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.error.message
                console.log('delete failed');
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.updateProductStatus = 'updating'
                console.log('loading');
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateProductStatus = 'succeeded'
                console.log("Product is updated successfully")

                const updated = action.payload;
                // update list:
                const allProductsAfterUpdate = [...state.productList.map(p =>
                    p.id != action.payload.id? p : updated
                )];
                state.productList = allProductsAfterUpdate;

                const userProductsAfterUpdate = [...state.userProductList.map(p =>
                    p.id != action.payload.id? p : updated
                )];

                state.userProductList = userProductsAfterUpdate;

                state.updateListsStatus = 'update';

            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateProductStatus = 'failed'
                state.updatError = action.error.message
                console.log('update failed');
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

export const selectUpdateListStatus = (state) => state.product.updateList;
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
    const deletionResponse = {
        data: response.data,
        id: product.id
    }
    return deletionResponse;
})

export const selectUpdateProductStatus = (state) => state.product.updateProductStatus;
export const selectUpdateError = (state) => state.product.updateError;
export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    const response = await productService.updateProduct(product);
    console.log(response.data)
    return response.data
})

export const { toggleShowForm, handleFormChange, resetFormValues,
    resetUserProducts, changeProductLists } = productSlice.actions;