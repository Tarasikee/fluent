import {AppDispatch} from "../store";
import {userSlice} from "../reducers/userReducer";

export const login = (token: string) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.login());
    localStorage.setItem('token', token);
};

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.logout());
    localStorage.removeItem('token');
};
