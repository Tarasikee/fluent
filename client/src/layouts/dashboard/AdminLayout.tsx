import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link, Outlet} from 'react-router-dom';
import {useTypedSelector} from "../../hooks/useRedux";

const AdminLayout = () => {
    const {isAuth} = useTypedSelector(store => store.userSlice);

    return (
        <Container>
            <Row>
                <Col className={"mt-3"}>
                    {!isAuth
                        ? <div>It seems like you are not <Link to={'/guest/login'}>authenticated</Link></div>
                        : <Outlet />}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLayout;
