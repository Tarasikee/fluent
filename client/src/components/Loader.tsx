import React from 'react';
import {Container, Row, Spinner} from "react-bootstrap";

const Loader = () => (
    <Container>
        <Row className={"h-100 justify-content-center align-items-center"}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Row>
    </Container>
);

export default Loader;
