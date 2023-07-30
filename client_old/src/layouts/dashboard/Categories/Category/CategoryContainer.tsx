import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../../../components/Loader";
import {api} from "../../../../store/api";
import {useAction} from "../../../../hooks/useRedux";
import Category from "./Category";

const CategoryContainer = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {createError, createPrimary} = useAction();
    const {data: category, isLoading} = api.useFetchSingleCategoryQuery(params.id as string);
    const [updateCategory] = api.useUpdateCategoryMutation();
    const [deleteCategory] = api.useDeleteCategoryMutation();

    const [name, setName] = useState('');
    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setName(category?.name || '');
            setImagePreview('http://localhost:3400/' + category?.imageSrc);
        }
    }, [isLoading]);

    useEffect(() => {
        name !== category?.name
            ? setChanged(true)
            : setChanged(false);
    }, [name]);

    const onDelete = async () => {
        const sure = window.confirm('Are you sure? All positions will be deleted also!');
        if (sure) {
            await deleteCategory({id: params.id as string});
            createPrimary('Categories and positions has been deleted!');
            back();
        }
    };

    const back = () => {
        navigate('/admin/categories');
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        const newFile = event.currentTarget.files[0];
        setImage(newFile);
        setChanged(true);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as any);
        };
        reader.readAsDataURL(newFile);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name) return createError('Name can\'t be blank');

        await updateCategory({id: params.id as string, name, image});
        createPrimary('Successfully updated!');
        event.currentTarget.reset();
        setChanged(false);
    };

    if (isLoading) {
        return <Loader />;
    } else {
        return <Category {...{
            category, name, back, onDelete, onInputChange,
            onFileChange, handleSubmit, isLoading, changed, imagePreview
        }} />;
    }
};

export default CategoryContainer;
