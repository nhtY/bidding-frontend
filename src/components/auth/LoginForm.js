import {Form, Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import LoginErrorMessage from "./LoginErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser, selectIsLoggedIn, selectLoginStatus} from "../../features/user/userSlice";


const initialState = {
    username: '',
    password: ''
}

function LoginForm() {
    const [credentials, setCredentials] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isShow, setShow] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const error = useSelector(state => state.error);
    const loginStatus = useSelector(selectLoginStatus);

    function handleChange(e) {
        setCredentials(
            { ...credentials, [e.target.name]: e.target.value }
        );
    }

    const handleCloseModal = () => {
        setErrorMessage("");
        setShow(false);
    };
    async function submitForm(event) {
        event.preventDefault();

        console.log(isLoggedIn);

        if (loginStatus === 'idle' || loginStatus === 'failed') {
            try {
                await dispatch(authenticateUser(credentials)).unwrap();
                console.log(isLoggedIn);
                navigate("/");
            } catch (err) {
                console.error('Failed to login: ', err)
                setShow(true);
                setErrorMessage("Invalid username or password. Please try again.");

            }
        }

        // setTimeout(() => {
        //     console.log(isLoggedIn);
        //     if (isLoggedIn) {
        //         navigate("/");
        //     } else if (loginStatus === 'failed') {
        //         setShow(true);
        //         setErrorMessage("Invalid username or password. Please try again.");
        //     }
        // }, 500);

    }

    return (

        <div>
            <Container>
                <Row className="vh-50 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="bg-dark border border-3 border-secondary"></div>
                        <Card className="bg-dark text-white shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">login</h2>
                                    <p className=" mb-5">Please login with your username and password</p>
                                    <div className="mb-3">
                                        <Form id="loginForm" onSubmit={submitForm}>
                                            <Form.Group className="mb-3" controlId="formUsername">
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control type="text" name="username" className="bg-dark text-white"
                                                              onChange={handleChange} placeholder="Enter your username" required />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control name="password" className="bg-dark text-white" type="password"
                                                              onChange={handleChange} placeholder="Enter your password" required />
                                            </Form.Group>

                                            <div className="d-flex justify-content-center">

                                                    <Button className="col-6" variant="success" type="submit"
                                                            disabled={credentials.username.length === 0 || credentials.password.length===0}>
                                                        Login
                                                    </Button>

                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <Link to={"/register"} className="nav-link fw-bold">Sign Up</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <LoginErrorMessage message={errorMessage} isShow={isShow} handleCloseModal={handleCloseModal} />
            </Container>
        </div>
    );
}

export default LoginForm;