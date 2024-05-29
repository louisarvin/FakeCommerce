import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const selectCartIndex = state.cartItems.findIndex(product => product.id === newItem.id);

            if (selectCartIndex !== -1) {
              state.cartItems[selectCartIndex].quantity += 1;
              state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * state.cartItems[selectCartIndex].price
            } else {
              state.cartItems.push({
                ...newItem,
                quantity: 1,
                totalPrice: newItem.price
              });
            }
        },
        removeItemFromCart: (state, action) => {
          const itemId = action.payload;
          const index = state.cartItems.findIndex(item => item.id === itemId.id);
        
          if (index === -1) {
            // Item does not exist in cart, do nothing
            return;
          }
        
          const item = state.cartItems[index];
          if (item.quantity <= 1) {
            // If quantity is 1, remove the item from the cart
            state.cartItems.splice(index, 1);
          } else {
            // Decrement the quantity
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.price;
          }
        }
    }
})

export const {addItemToCart, removeItemFromCart} = cartSlice.actions;

export default cartSlice;

// Selector Function (callback buat ke useSelector)
export const selectCartItems = state => state.cart.cartItems;
export const selectCartTotalItems = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrices = state => state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0)