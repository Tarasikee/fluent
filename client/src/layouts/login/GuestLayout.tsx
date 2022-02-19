import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useTypedSelector} from "../../hooks/useRedux";
import LoginContainer from "./Login/LoginContainer";
import RegisterContainer from "./Register/RegisterContainer";

const Layout = () => {
    const {isAuth} = useTypedSelector(store => store.userSlice);

    if (isAuth) {
        return <Navigate to={'/admin'} />;
    }

    return (
        <Container className={"mt-5"}>
            <Row className={'justify-content-center align-items-center'}>
                <Col md={6} className={"p-4 border"}>
                    <Routes>
                        <Route path={''} element={<RegisterContainer />} />
                        <Route path={'login'} element={<LoginContainer />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
