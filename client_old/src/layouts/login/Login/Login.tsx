import React, {FC} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormikProps} from "formik";
import {initialLoginProps} from "../../../interfaces/IFormikProps";
import Loader from "../../../components/Loader";

const Login: FC<FormikProps<initialLoginProps>> = (
    {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting
    }
) => (<Form onSubmit={handleSubmit} noValidate>

    <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={values.email} onChange={handleChange}
                      isInvalid={touched.password && Boolean(errors.email)}
                      name={'email'} type="text" autoComplete={"email"} />
        <Form.Control.Feedback type="invalid">
            {errors.email}
        </Form.Control.Feedback>
    </Form.Group>


    <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control value={values.password} onChange={handleChange}
                      isInvalid={touched.password && Boolean(errors.password)}
                      name={'password'} type="password" autoComplete={"password"} />
        <Form.Control.Feedback type="invalid">
            {errors.password}
        </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader /> : 'Submit'}
    </Button>

    <div className={"mt-3"}>
        <span>Don't have an <Link to="/guest/register">account</Link>?</span>
    </div>
</Form>);

export default Login;
