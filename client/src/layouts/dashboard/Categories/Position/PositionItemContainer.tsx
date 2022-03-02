import React, {FC, useState} from 'react';
import {IPosition} from "../../../../interfaces/IPosition";
import {api} from "../../../../store/api";
import {useAction} from "../../../../hooks/useRedux";
import PositionItem from "./PositionItem";

const PositionItemContainer: FC<IPosition> = (position) => {
    const {createError, createPrimary} = useAction();
    const [updateCategory] = api.useUpdatePositionMutation();
    const [deletePosition] = api.useDeletePositionMutation();

    const [name, setName] = useState(position.name);
    const [cost, setCost] = useState(position.cost);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const onCostChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCost(+event.target.value);
    };

    const onDelete = () => {
        const sure = window.confirm('Are you sure?');
        if (sure) {
            deletePosition({_id: position._id});
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await updateCategory({_id: position._id, name, cost, category: position.category});
            createPrimary('Position has been updated');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            handleClose();
        }
    };

    return <PositionItem {...{
        position, show, handleClose, handleShow, onDelete,
        onSubmit, name, onNameChange, cost, onCostChange
    }} />;
};

export default PositionItemContainer;
