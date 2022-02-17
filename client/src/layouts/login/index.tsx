import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";

const LoginIndex = () => {

    return (
        <div>
            <Container className={"mt-5"}>
                <Row className={'justify-content-center align-items-center'}>
                    <Col md={6} className={"p-4 border"}>
                        <Routes>
                            <Route path={'/'} element={<Register />} />
                            <Route path={'/login'} element={<Login />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginIndex;
