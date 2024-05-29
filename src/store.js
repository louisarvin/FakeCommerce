import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import { SortProduct } from "./features/sorting/sortProduct.js";
import { searchBar } from './features/search/searchQuery.js';

export default configureStore({
    reducer: {
        cart: cartSlice.reducer,
        sort: SortProduct.reducer,
        search: searchBar.reducer,
    }
});