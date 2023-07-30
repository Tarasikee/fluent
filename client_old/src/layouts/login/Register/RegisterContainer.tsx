import React, {FC} from 'react';
import Register from "./Register";
import * as yup from "yup";
import {withFormik} from "formik";
import {initialLoginProps, initialRegisterProps} from "../../../interfaces/IFormikProps";
import {useGuestActions} from "../../../hooks/useGuestActions";

const FormikWrapper = withFormik<{
    register: (data: initialLoginProps) => Promise<void>
}, initialRegisterProps>({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        repeat_password: '',
    }),
    validationSchema: yup.object().shape({
        email: yup.string()
            .email('Email must be valid!')
            .required('Email is required!'),
        password: yup.string()
            .min(6, "Minimum password length is 6 symbols!")
            .required('Password is required!'),
        repeat_password: yup.string()
            .required('Password is required!')
            .oneOf([yup.ref('password'), null], 'Passwords must match!')
    }),

    handleSubmit: async (values, {props}) => {
        await props.register(values);
    },
})(Register);

const RegisterContainer: FC = () => {
    const {register} = useGuestActions();
    return <FormikWrapper register={register} />;
};

export default RegisterContainer;
