import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = { details: { username: '', photoUrl: '', summary: '', phoneNumber: '', mail: '' }, };

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {
        addDetails(state, action) {
            state.details = action.payload;
        },
    },
});

export default profileSlice;