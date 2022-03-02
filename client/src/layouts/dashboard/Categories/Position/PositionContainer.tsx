import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useAction} from "../../../../hooks/useRedux";
import {api} from "../../../../store/api";
import Loader from "../../../../components/Loader";
import Position from "./Position";

const PositionContainer = () => {
    const params = useParams();
    const {createError, createPrimary} = useAction();
    const {data: positions, isLoading} = api.useFetchPositionsByCategoryQuery(params.id as string);
    const [createPosition] = api.useCreatePositionMutation();

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const onCostChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCost(+event.target.value);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createPosition({name, cost, category: params.id as string});
            createPrimary('Position has been added');
        } catch (e: any) {
            createError(e.response.data.message);
        } finally {
            handleClose();
            setName('');
            setCost(1);
        }
    };

    if (isLoading) {
        return <Loader />;
    } else {
        return <Position {...{
            handleShow, positions, show, handleClose,
            onSubmit, name, onNameChange, cost, onCostChange
        }} />;
    }
};

export default PositionContainer;
