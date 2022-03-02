import React, {useEffect} from 'react';
import {useAction} from "../hooks/useRedux";
import {Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFound = () => {
    const {createWarn} = useAction();

    useEffect(() => {
        createWarn('Can\'t find route');
    }, []);

    return (
        <Container>
            <Row>
                There is no such route^(<br />
                <span>Try <Link to={'guest/login'}>this one:)</Link></span>
            </Row>
        </Container>
    );
};

export default NotFound;
