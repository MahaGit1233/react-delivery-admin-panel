import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import itemsSlice from "./Items";
import cartSlice from "./cart";
import profileSlice from "./Profile";
import menuSlice from "./Menu";

const store = configureStore({
    reducer: { auth: authSlice.reducer, items: itemsSlice.reducer, cart: cartSlice.reducer, profile: profileSlice.reducer, menu: menuSlice.reducer }
});

export const authActions = authSlice.actions;
export const itemsActions = itemsSlice.actions;
export const cartActions = cartSlice.actions;
export const profileActions = profileSlice.actions;
export const menuActions = menuSlice.actions;

export default store;