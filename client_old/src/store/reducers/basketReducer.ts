import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBasketItem} from "../../interfaces/IBasketItem";

interface initialState {
    list: Array<IBasketItem>;
}

const initialState: initialState = {
    list: []
};


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        add(state, action: PayloadAction<IBasketItem>) {
            const candidate = state.list.find(el => el._id === action.payload._id);

            if (candidate) {
                candidate.quantity += action.payload.quantity;
            } else {
                state.list.push(action.payload);
            }
        },
        remove(state, action: PayloadAction<string>) {
            state.list = state.list.filter(el => el._id !== action.payload);
        },
        clear(state) {
            state.list = [];
        },
    },
});

export default basketSlice.reducer;
