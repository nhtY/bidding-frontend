import {Form, Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import React, {useState} from "react";

function LoginForm() {
    const [username, setUsername] = useState(''); // username = '' initially
    const [password, setPassword] = useState(''); // password = '' initially

    function submitForm() {

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
                                                <Form.Control type="text" name="username" className="bg-dark text-white" placeholder="Enter your username" required />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control name="password" className="bg-dark text-white" type="password" placeholder="Enter your password" required />
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
            </Container>
        </div>
    );
}

export default LoginForm;