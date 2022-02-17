import React, {useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAction} from "../../hooks/useRedux";
import {useInput} from "../../hooks/useInput";
import {login} from "../../http/login";

const Login = () => {

    const navigate = useNavigate();
    const {createToast} = useAction();
    const [isLoading, setLoading] = useState(false);

    const email = useInput('');
    const password = useInput('');

    const createError = (message: string) => {
        createToast({bg: 'Danger', title: 'Great thoughts error', message});
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.value) return createError('Email is required');
        if (!password.value) return createError('Password is required');

        try {
            setLoading(true);
            await login(email.value, password.value);
            createToast({bg: 'Primary', title: 'Great thoughts', message: 'Welcome to  CRM!'});
            [email, password].map(f => f.clear());
            navigate('/');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <p className={"display-5"}>Login</p>
        <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Email address" className="mb-3">
                <Form.Control value={email.value} onChange={email.onChange} type="text"
                              placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
                <Form.Control value={password.value} onChange={password.onChange} type="password"
                              placeholder="password" />
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading…' : 'Enter'}
            </Button>

            <div className={"mt-3"}>
                <span>Already have an <Link to="/">account</Link>?</span>
            </div>
        </Form>
    </>);
};

export default Login;
