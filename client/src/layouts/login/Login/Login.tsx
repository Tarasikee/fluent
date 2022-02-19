import React, {FC} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {hookedInput} from "../../../hooks/useInput";

interface LoginProps {
    email: hookedInput;
    password: hookedInput;
    isLoading: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Login: FC<LoginProps> = ({email, password, isLoading, handleSubmit}) => (<>
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
            <span>Already have an <Link to="/guest">account</Link>?</span>
        </div>
    </Form>
</>);

export default Login;
