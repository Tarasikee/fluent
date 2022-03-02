import React, {FC} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {hookedInput} from "../../../hooks/useInput";

interface RegisterProps {
    email: hookedInput;
    password: hookedInput;
    rep_password: hookedInput;
    isLoading: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Register: FC<RegisterProps> = ({email, password, rep_password, isLoading, handleSubmit}) => (<>
    <p className={"display-5"}>Register</p>
    <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Email address" className="mb-3">
            <Form.Control {...email} type="text" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3">
            <Form.Control {...password} type="password" placeholder="password" />
        </FloatingLabel>

        <FloatingLabel label="Repeat password" className="mb-3">
            <Form.Control {...rep_password} type="password" placeholder="repeat password" />
        </FloatingLabel>

        <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading…' : 'Submit'}
        </Button>

        <div className={"mt-3"}>
            <span>Already have an <Link to="/guest/login">account</Link>?</span>
        </div>
    </Form>
</>);

export default Register;
