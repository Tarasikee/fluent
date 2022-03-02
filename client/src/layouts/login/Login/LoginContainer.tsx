import React, {useState} from 'react';
import {useAction} from "../../../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import {AuthService} from "../../../services/AuthService";
import Login from "./Login";

const LoginContainer = () => {

    const {createError, createPrimary, login} = useAction();
    const navigate = useNavigate();
    const email = useInput('');
    const password = useInput('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.value) return createError('Email is required');
        if (!password.value) return createError('Password is required');

        setLoading(true);
        try {
            const response = await AuthService.login(email.value, password.value);
            createPrimary('Welcome to CRM!');
            login(response.data.token);
            navigate('admin');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return <Login {...{email, password, isLoading, handleSubmit}} />;
};

export default LoginContainer;
