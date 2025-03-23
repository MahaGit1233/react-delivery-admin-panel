import { createSlice } from "@reduxjs/toolkit";

const initialItemsState = { items: [] };

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItemsState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
        },
        setItem(state, action) {
            state.items = action.payload;
        },
        deleteItem(state, action) {
            state.items = state.items.filter(item => item.name !== action.payload);
        },
    },
});

export default itemsSlice;