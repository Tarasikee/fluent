import React, {useState} from 'react';
import Register from "./Register";
import {useNavigate} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import {passwordMinLength, validateEmail} from "../../../utils/validators";
import {AuthService} from "../../../services/AuthService";
import {useAction} from "../../../hooks/useRedux";

const RegisterContainer = () => {
    const {createError, createPrimary} = useAction();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const email = useInput('');
    const password = useInput('');
    const rep_password = useInput('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.value) return createError('Email is required');
        if (!validateEmail(email.value)) return createError('Email is isn\'t valid');
        if (!password.value) return createError('Password is required');
        if (!passwordMinLength(password.value)) return createError('Password iss too short');
        if (!rep_password.value) return createError('Repeat password');
        if (password.value !== rep_password.value) return createError('Passwords must be same');

        try {
            setLoading(true);
            await AuthService.register(email.value, password.value);
            createPrimary('Successful registered');
            navigate('login');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return <Register {...{isLoading, email, password, rep_password, handleSubmit}} />;
};

export default RegisterContainer;
