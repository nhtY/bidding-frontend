import {Form, Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import authService from "../service/authService";
import LoginErrorMessage from "./LoginErrorMessage";
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isShow, setShow] = useState(false);

    function handleChange(e) {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        }

        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const handleCloseModal = () => {
        setErrorMessage("");
        setShow(false);
    };
    function submitForm(event) {
        event.preventDefault();

        authService.login(username, password)
            .then(response => {
                console.log("Login successful. User ID:", response.userID);

                // Get the history object from react-router-dom
                const history = useHistory();

                // Navigate to the home page
                history.push('/');
            })
            .catch(error => {
                console.error("Login failed with status code:", error.status);
                // Display an error message to the user using a modal or another UI element
                setShow(true);
                setErrorMessage("Invalid username or password. Please try again.");
            });
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

                                                    <Button className="col-6" variant="success" type="submit">
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