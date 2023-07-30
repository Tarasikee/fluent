import React, {FC, useState} from 'react';
import {IOrder} from "../../../interfaces/IOrder";
import {Button, ListGroup, Modal, Table} from "react-bootstrap";
import {ThreeDots, Trash} from "react-bootstrap-icons";

const HistoryItem: FC<IOrder> = (order) => {

    const [show, setShow] = useState(false);


    const defs = new Date(order.date).toISOString().split('T');
    const date = defs[0];
    const time = defs[1].substring(0, defs[1].indexOf('.'));
    const totalPrice = order.list
        .map(({cost, quantity}) => ({cost: +cost, quantity: +quantity}))
        .reduce((acc, {cost, quantity}) => acc + cost * quantity, 0);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Order#{order.order} - {totalPrice}$</div>
                    {date} - {time}
                </div>
                <div>
                    <Button onClick={handleShow}><ThreeDots /></Button>
                </div>
            </ListGroup.Item>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{maxHeight: '350px', overflow: 'auto'}}>
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {order.list.map(l => <tr key={l._id}>
                                <td>{l.name}</td>
                                <td>{l.quantity}</td>
                                <td>{l.cost}$</td>
                            </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <p>Total price: {totalPrice}$</p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HistoryItem;
