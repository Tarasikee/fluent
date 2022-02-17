import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../../http";
import {AppDispatch} from "../store";
import {userSlice} from "../reducers/userReducer";

export const login = () => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.login())
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.logout())
}

export const check = createAsyncThunk(
    'user/check',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }

        try {
            const response = await $api.post('auth/check');
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }
    }
);
