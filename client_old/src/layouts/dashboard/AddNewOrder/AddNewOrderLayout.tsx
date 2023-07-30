import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useSearchParams} from 'react-router-dom';
import {Button, Container, Modal} from "react-bootstrap";
import CardContainer from "./Card/CardContainer";
import {useAction, useTypedSelector} from "../../../hooks/useRedux";
import {api} from "../../../store/api";

const AddNewOrderLayout = () => {
    const {search} = useLocation();
    const [createOrder] = api.useCreateOrderMutation();
    const query = new URLSearchParams(search);
    const card = query.get('card');

    const [, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    const {list} = useTypedSelector(store => store.basketSlice);
    const {createPrimary, clearBasket} = useAction();

    useEffect(() => {
        card ? handleShow() : handleClose();
    }, [card]);

    const handleClose = () => {
        setShow(false);
        setSearchParams('');
    };

    const handleShow = () => {
        setShow(true);
    };

    const onOrder = async () => {
        await createOrder(list);
        handleClose();
        createPrimary('Order has been created');
        clearBasket();
    };

    return (
        <>
            <Container fluid>
                <Outlet />
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardContainer />
                </Modal.Body>
                <Modal.Footer className={"d-flex justify-content-start"}>
                    <Button onClick={clearBasket} variant={"outline-danger"}>
                        Clear
                    </Button>
                    <Button onClick={onOrder} disabled={list.length === 0} variant={"outline-success"}>
                        Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddNewOrderLayout;
