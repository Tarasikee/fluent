import React, {FC} from 'react';
import {Button, ButtonGroup, FloatingLabel, Form, ListGroup, Modal} from "react-bootstrap";
import {IPosition} from "../../../../interfaces/IPosition";

interface PositionItemProps {
    position: IPosition;
    show: boolean;
    handleShow: () => void;
    handleClose: () => void;
    onDelete: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    cost: number;
    onCostChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PositionItem: FC<PositionItemProps> = (
    {
        position, show, handleClose, handleShow, onDelete,
        onSubmit, name, onNameChange, cost, onCostChange
    }
) => (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
            <div className="fw-bold">{position.name}</div>
            {position.cost}$
        </div>
        <ButtonGroup>
            <Button variant={"outline-secondary"} onClick={handleShow}>Edit</Button>
            <Button variant={"outline-danger"} onClick={onDelete}>Delete</Button>
        </ButtonGroup>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create position</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FloatingLabel label="Name" className="mb-3">
                        <Form.Control value={name} onChange={onNameChange} required
                                      type="text" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel label="Cost" className="mb-3">
                        <Form.Control value={cost} onChange={onCostChange} required min={1}
                                      type="number" placeholder="password" />
                    </FloatingLabel>

                    <Button variant="primary" type={"submit"}>
                        Edit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </ListGroup.Item>
);

export default PositionItem;
