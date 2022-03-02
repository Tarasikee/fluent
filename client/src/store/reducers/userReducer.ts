import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {check} from "../actions/userActions";

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
    },
    extraReducers: {
        [check.pending.type]: (state) => {
            state.isLoading = true;
        },
        [check.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
        },
        [check.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isAuth = false;
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default userSlice.reducer;
