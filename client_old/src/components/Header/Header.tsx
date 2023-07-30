import React, {FC} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

interface HeaderProps {
    isAuth: boolean;
    links: Array<{ to: string, name: string }>;
    loggerOut: () => void;
}

const Header: FC<HeaderProps> = ({isAuth, links, loggerOut}) => (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand>Great Thoughts CRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            {isAuth && <Navbar.Collapse>
                <Nav className="me-auto" />
                <Nav className={"bg-white m-2 px-2"}>
                    {links.map(({to, name}) => (
                        <NavLink to={to} key={name}
                            className={({isActive}) => isActive ? 'nav-link text-primary' : 'nav-link text-black'}
                        >{name}</NavLink>
                    ))}
                </Nav>
                <Nav className={"m-2"}>
                    <Button onClick={loggerOut}>Exit</Button>
                </Nav>
            </Navbar.Collapse>}
        </Container>
    </Navbar>
);

export default Header;
