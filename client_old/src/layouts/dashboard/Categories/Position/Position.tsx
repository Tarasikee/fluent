import React, {FC} from 'react';
import {Button, Col, Container, FloatingLabel, Form, ListGroup, Modal, Row} from "react-bootstrap";
import PositionItemContainer from "./PositionItemContainer";
import {IPosition} from "../../../../interfaces/IPosition";

interface PositionProps {
    handleShow: () => void;
    positions?: IPosition[];
    show: boolean;
    handleClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    cost: number;
    onCostChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Position: FC<PositionProps> = ({
                                         handleShow,
                                         positions,
                                         show,
                                         handleClose,
                                         onSubmit,
                                         name,
                                         onNameChange,
                                         cost,
                                         onCostChange
                                     }) => (
    <Row>
        <Col md={12} className={"d-flex align-items-center justify-content-between border-top mt-3 pt-2"}>
            <p className="fs-4">Positions</p>
            <Button onClick={handleShow}>Create</Button>
        </Col>
        <Col md={12} className={"mt-3 mb-5"}>
            <Container>
                <Row>
                    {positions && positions.length !== 0
                        ? <ListGroup as={"ol"} numbered>
                            {positions
                                .slice()
                                .sort((a, b) => a.name < b.name ? -1 : 1)
                                .map(pos => <PositionItemContainer key={pos._id} {...pos} />)}
                        </ListGroup>
                        : <p>There are no positions^(</p>}
                </Row>
            </Container>
        </Col>

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
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </Row>
);

export default Position;
