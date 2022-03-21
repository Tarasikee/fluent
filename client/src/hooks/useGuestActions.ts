import {useAction} from "./useRedux";
import {useNavigate} from "react-router-dom";
import {initialLoginProps} from "../interfaces/IFormikProps";
import axios from "axios";
import {useDispatch} from "react-redux";
import {userSlice} from "../store/reducers/userReducer";

export function useGuestActions() {
    const baseURL = 'http://localhost:3400/api/';
    const {createError, createPrimary} = useAction();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return {
        register, login,
        check, logout
    };

    async function register(data: initialLoginProps) {
        try {
            await axios.post(baseURL + 'auth/register', data);
            createPrimary('Successful registered');
            navigate('login');
        } catch (e: any) {
            createError(e.response.data.message);
        }
    }

    async function login(data: initialLoginProps) {
        try {
            const response = await axios.post<{ token: string }>(baseURL + 'auth/login', data);
            createPrimary('Welcome to CRM!');
            dispatch(userSlice.actions.login());
            localStorage.setItem('token', response.data.token);
            navigate('/admin', {replace: true});
        } catch (e: any) {
            createError(e.response.data.message);
        }
    }

    function logout() {
        dispatch(userSlice.actions.logout());
        localStorage.removeItem('token');
    }

    async function check() {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return logout();
            }

            await axios.post(baseURL + 'auth/check', undefined, {
                headers: {authorization: token}
            });
            dispatch(userSlice.actions.login());
        } catch (e) {
            return logout();
        }
    }
}
