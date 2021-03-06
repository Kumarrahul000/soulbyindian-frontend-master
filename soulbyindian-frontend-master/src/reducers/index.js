import { combineReducers } from "redux";

import categoryReducer from "./category.reducer";
import productReducer from './product.reducer';
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import wishlistReducer from "./wishlist.reducer";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({

    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer

});

export default rootReducer;