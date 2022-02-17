import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useRedux";

const Header = () => {
    const {isAuth, isLoading} = useTypedSelector(store => store.userSlice);

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>Great Thoughts CRM</Navbar.Brand>
                {!isLoading && isAuth && <>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto"/>
                        <Nav className={"bg-white m-2 px-2"}>
                            <Nav.Link className={"text-black"} href="#features">Features</Nav.Link>
                            <Nav.Link className={"text-black"} href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </>}
            </Container>
        </Navbar>
    );
};

export default Header;
