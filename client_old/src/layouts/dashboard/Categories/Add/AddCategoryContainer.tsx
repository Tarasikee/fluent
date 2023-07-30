import React from 'react';
import AddCategory from "./AddCategory";
import {withFormik} from "formik";
import {initialAddCategoriesProps} from "../../../../interfaces/IFormikProps";
import {useAction} from "../../../../hooks/useRedux";
import {api} from "../../../../store/api";
import {useNavigate} from "react-router-dom";

const FormikWrapper = withFormik<{
    createCategory: any,
    back: () => void,
    createError: (message: string) => void,
    createPrimary: (message: string) => void,
}, initialAddCategoriesProps>({
    mapPropsToValues: () => ({
        file: null,
        name: ''
    }),

    handleSubmit: async (values, {
        props
    }) => {
        if (!values.name) {
            return props.createError('Name is required');
        }

        if (!values.file) {
            return props.createError('Image is required');
        }

        await props.createCategory({name: values.name, image: values.file as any});
        props.createPrimary('Category created');
        props.back();
    }
})(AddCategory)

const AddCategoryContainer = () => {
    const navigate = useNavigate();
    const [createCategory] = api.useCreateCategoryMutation();
    const {createError, createPrimary} = useAction();

    const back = () => navigate('/admin/categories');

    return (
        <FormikWrapper {...{createError, createPrimary, createCategory, back}}/>
    );
}

export default AddCategoryContainer;
