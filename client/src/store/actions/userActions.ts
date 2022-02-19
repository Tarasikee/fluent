import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../../http";

export const check = createAsyncThunk(
    'user/check',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Unauthorized');
            }
            const response = await $api.post('auth/check');
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }
    }
);
