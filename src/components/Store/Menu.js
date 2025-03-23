import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
    items: [],
    isLoading: false,
    error: null
};

const menuSlice = createSlice({
    name: "menu",
    initialState: initialMenuState,
    reducers: {
        setMenuItems(state, action) {
            state.items = action.payload;
        },
        addMenuItem(state, action) {
            state.items.push(action.payload);
        },
        removeMenuItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export default menuSlice;
