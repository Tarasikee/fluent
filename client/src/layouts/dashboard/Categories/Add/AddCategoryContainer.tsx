import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {api} from "../../../../store/api";
import {useInput} from "../../../../hooks/useInput";
import {useAction} from "../../../../hooks/useRedux";
import AddCategory from "./AddCategory";

const AddCategoryContainer = () => {
    const navigate = useNavigate();
    const reader = new FileReader();

    const {createError, createPrimary} = useAction();
    const [createCategory, {isLoading}] = api.useCreateCategoryMutation();

    const name = useInput('');
    const [image, setImage] = useState<ArrayBuffer | string>('');
    const [file, setFile] = useState<File>();


    const back = () => {
        navigate('/admin/categories');
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;

        setFile(event.currentTarget.files[0]);
        reader.readAsDataURL(event.currentTarget.files[0]);
        reader.addEventListener('load', e => {
            if (e.target && e.target.result) {
                setImage(e.target.result);
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.value) return createError('Name is required');
        if (!file) return createError('Please choose photo');

        await createCategory({name: name.value, image: file});
        createPrimary('Category created');
        back();
    };


    return <AddCategory {...{back, handleSubmit, name, onChange, isLoading, image}} />;
};

export default AddCategoryContainer;
