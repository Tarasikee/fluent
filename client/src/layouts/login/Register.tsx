import React, {useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useInput} from "../../hooks/useInput";
import {passwordMinLength, validateEmail} from "../../utils/validators";
import {register} from "../../http/register";
import {useAction} from "../../hooks/useRedux";

const Register = () => {

    const navigate = useNavigate();
    const {createToast} = useAction();
    const [isLoading, setLoading] = useState(false);

    const email = useInput('');
    const password = useInput('');
    const rep_password = useInput('');

    const createError = (message: string) => {
        createToast({bg: 'Danger', title: 'Great thoughts error', message});
    };

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
            await register(email.value, password.value);
            createToast({bg: 'Primary', title: 'Great thoughts', message: 'Successful registered'});
            [email, password, rep_password].map(f => f.clear());
            navigate('login');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };


    return (<>
        <p className={"display-5"}>Register</p>
        <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Email address" className="mb-3">
                <Form.Control value={email.value} onChange={email.onChange} type="text"
                              placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
                <Form.Control value={password.value} onChange={password.onChange} type="password"
                              placeholder="password" />
            </FloatingLabel>

            <FloatingLabel label="Repeat password" className="mb-3">
                <Form.Control value={rep_password.value} onChange={rep_password.onChange} type="password"
                              placeholder="repeat password" />
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading…' : 'Submit'}
            </Button>

            <div className={"mt-3"}>
                <span>Already have an <Link to="/login">account</Link>?</span>
            </div>
        </Form>
    </>);
};

export default Register;
