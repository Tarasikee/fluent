import {AppDispatch} from "../store";
import {basketSlice} from "../reducers/basketReducer";
import {IBasketItem} from "../../interfaces/IBasketItem";

export const addToBasket = (item: IBasketItem) => (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.add(item));
};

export const removeFromBasket = (_id: string) => (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.remove(_id));
};

export const clearBasket = () => (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.clear());
};
