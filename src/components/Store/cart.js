import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItems: [], quantity: 0, showCart: false, notification: null, cartFetched: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action) {
            state.cartItems = action.payload;
            state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        clearCart(state) {
            state.cartItems = [];
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.name === newItem.name);
            state.cartFetched = true;
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total = existingItem.price * existingItem.quantity;
            }
            else {
                state.cartItems.push({
                    name: newItem.name,
                    ingredients: newItem.ingredients,
                    price: newItem.price,
                    quantity: 1,
                    total: newItem.price,
                });
            }
            state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

        },
        plus(state, action) {
            const item = state.cartItems.find(item => item.name === action.payload);
            if (item) {
                item.quantity += 1;
                item.total = item.price * item.quantity;

                fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/cart/${item.name}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(item),
                }).catch(err => console.log(err));
            }
        },
        minus(state, action) {
            const item = state.cartItems.find(item => item.name === action.payload);
            state.cartFetched = true;
            if (item) {
                item.quantity -= 1;
                item.total = item.price * item.quantity;
            }
            if (item.quantity === 0) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem.name !== action.payload);

                fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/cart/${item.name}.json`, {
                    method: 'DELETE',
                }).catch(err => console.log(err));
            } else {
                fetch(`https://restaurant-delivery-app-10419-default-rtdb.firebaseio.com/cart/${item.name}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(item),
                }).catch(err => console.log(err));
            }
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export default cartSlice;