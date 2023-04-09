
import React from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../images/icon.jpg'

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to={""} className="navbar-brand">
                    <img src={logo} alt="brand_image" width="45" height="25" className="rounded-1 img-fluid" />
                    Kartaca Bidding
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={""} className="nav-link">Home</Link>
                        <Link to={"login"} className="nav-link">Login</Link>
                        <Link to={"register"} className="nav-link">Register</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;