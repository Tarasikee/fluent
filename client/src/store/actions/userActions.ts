import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/AuthService";

export const check = createAsyncThunk(
    'user/check',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return thunkAPI.rejectWithValue('Unauthorized');
            }
            await AuthService.check(token);
        } catch (e) {
            return thunkAPI.rejectWithValue('Unauthorized');
        }
    }
);
