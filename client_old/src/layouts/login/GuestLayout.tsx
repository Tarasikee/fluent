import React, {useMemo} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Outlet, useLocation} from 'react-router-dom';

const GuestLayout = () => {

    const location = useLocation();
    const pathname = useMemo(() => {
        const p = location.pathname;
        return p.substring(p.lastIndexOf('/') + 1);
    }, [location]);

    return <Container className={"mt-5"}>
        <Row className={'justify-content-center align-items-center'}>
            <Col md={6} className={"p-4 border"}>
                <p className={"display-5 text-capitalize"}>{pathname}</p>
                <Outlet />
            </Col>
        </Row>
    </Container>;
};

export default GuestLayout;
