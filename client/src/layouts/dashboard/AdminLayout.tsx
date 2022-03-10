import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Outlet} from 'react-router-dom';

const AdminLayout = () => (
    <Container>
        <Row>
            <Col className={"mt-3"}>
                <Outlet />
            </Col>
        </Row>
    </Container>
);

export default AdminLayout;
