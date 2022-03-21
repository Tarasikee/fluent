import React from 'react';
import {useGuestActions} from "../../../hooks/useGuestActions";
import {withFormik} from "formik";
import {initialLoginProps} from "../../../interfaces/IFormikProps";
import * as yup from "yup";
import Login from "./Login";

const FormikWrapper = withFormik<{
    login: (data: initialLoginProps) => Promise<void>
}, initialLoginProps>({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Email is required!'),
        password: yup.string().required('Password is required!')
    }),

    handleSubmit: async (values, {props}) => {
        await props.login(values);
    },
})(Login);


const LoginContainer = () => {
    const {login} = useGuestActions();
    return <FormikWrapper login={login} />;
};

export default LoginContainer;
