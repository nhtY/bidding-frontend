import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import userProduct from "../features/product/userProductSlice"
export default configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        userProduct
    }
});