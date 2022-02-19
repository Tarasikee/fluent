import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useAction, useTypedSelector} from "../hooks/useRedux";
import {NavLink, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const {isAuth} = useTypedSelector(store => store.userSlice);
    const {logout} = useAction();

    const loggerOut = () => {
        logout();
        navigate('/guest/login');
    };

    return <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand>Great Thoughts CRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            {isAuth && <Navbar.Collapse>
                <Nav className="me-auto" />
                <Nav className={"bg-white m-2 px-2"}>
                    <NavLink to={'/admin/'} className={({isActive}) => isActive ?
                        'nav-link text-primary' : 'nav-link text-black'}>Overview</NavLink>
                    <NavLink to={'/admin/analytics'} className={({isActive}) => isActive ?
                        'nav-link text-primary' : 'nav-link text-black'}>Analytics</NavLink>
                    <NavLink to={'/admin/history'} className={({isActive}) => isActive ?
                        'nav-link text-primary' : 'nav-link text-black'}>History</NavLink>
                    <NavLink to={'/admin/add-new-order'} className={({isActive}) => isActive ?
                        'nav-link text-primary' : 'nav-link text-black'}>Add New Order</NavLink>
                    <NavLink to={'/admin/categories'} className={({isActive}) => isActive ?
                        'nav-link text-primary' : 'nav-link text-black'}>Categories</NavLink>
                </Nav>
                <Nav className={"m-2"}>
                    <Button onClick={loggerOut}>Exit</Button>
                </Nav>
            </Navbar.Collapse>}
        </Container>
    </Navbar>;
};

export default Header;
