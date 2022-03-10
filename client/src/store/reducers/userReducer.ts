import {createSlice} from "@reduxjs/toolkit";

interface initialState {
    isAuth: boolean;
    isLoading: boolean;
    error: null | string;
}

const initialState: initialState = {
    isAuth: false,
    isLoading: false,
    error: null
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        }
    }
});

export default userSlice.reducer;
