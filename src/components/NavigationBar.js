
import React from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../images/icon.jpg'
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn, userLogout} from "../features/user/userSlice";

function NavigationBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    function logout() {
       dispatch(userLogout());
    }

    const notLoggedInLinks = (
        <>
            <Link to={"login"} className="nav-link">Login</Link>
            <Link to={"register"} className="nav-link">Register</Link>
        </>
    );

    const loggedInLinks = (
        <>
            <Link to={"logout"} onClick={logout} className="nav-link">Logout</Link>
        </>
    );

    // const loggedIn = props.loggedIn !== false ? true : false;
    // console.log("is logged in: ", props.loggedIn);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to={""} className="navbar-brand">
                    <img src={logo} alt="brand_image" width="45" height="25" className="rounded-1 img-fluid m-1" />
                    Bidding
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={""} className="nav-link">Home</Link>
                        <Link to={"/user/products"} className="nav-link">My Products</Link>
                    </Nav>
                    <Nav className={"navbar-right"}>
                        {isLoggedIn? loggedInLinks : notLoggedInLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavigationBar;