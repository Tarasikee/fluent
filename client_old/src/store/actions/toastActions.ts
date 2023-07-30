import {IToast} from "../../interfaces/IToast";
import {AppDispatch} from "../store";
import {toastSlice} from "../reducers/toastReducer";

export const createToast = (data: IToast) => (dispatch: AppDispatch) => {
    dispatch(toastSlice.actions.addToast(data));
};

export const createSuccess = (message: string) => createToast({
    bg: 'success', title: 'Success thoughts', message
});

export const createWarn = (message: string) => createToast({
    bg: 'warning', title: 'Great thoughts warning', message
});

export const createError = (message: string) => createToast({
    bg: 'danger', title: 'Great thoughts error', message
});

export const createPrimary = (message: string) => createToast({
    bg: 'primary', title: 'Great thoughts', message
});

