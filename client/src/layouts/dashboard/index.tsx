import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useRoutes} from 'react-router-dom';
import Overview from "./Overview";
import Analytics from "./Analytics";
import History from "./History";
import AddNewOrder from "./AddNewOrder";
import Orders from "./Orders";

const AdminIndex = () => {
    const router = useRoutes([
        {path: '/', element: <Overview />},
        {path: '/analytics', element: <Analytics />},
        {path: '/history', element: <History />},
        {path: '/add-new-order', element: <AddNewOrder />},
        {path: '/orders', element: <Orders />},
    ]);

    return (
        <Container>
            <Row>
                <Col className={"mt-2"}>
                    {router}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminIndex;
