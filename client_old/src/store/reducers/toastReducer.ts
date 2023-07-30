import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IToast} from "../../interfaces/IToast";


interface initialState {
    toasts: Array<IToast>;
}

const initialState: initialState = {
    toasts: []
};


export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast(state, action: PayloadAction<IToast>) {
            state.toasts.push(action.payload);
        }
    },
});

export default toastSlice.reducer;
