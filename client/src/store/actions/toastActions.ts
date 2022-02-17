import {IToast} from "../../interfaces/IToast";
import {AppDispatch} from "../store";
import {toastSlice} from "../reducers/toastReducer";

export const createToast = (data: IToast) => (dispatch: AppDispatch) => {
    dispatch(toastSlice.actions.addToast(data))
}

