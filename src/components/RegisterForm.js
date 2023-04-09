import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

function RegisterFrom() {
    return (

        <div>
            <Container>
                <Row className="vh-50 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="bg-dark border border-3 border-secondary"></div>
                        <Card className="bg-dark text-white shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-0 text-uppercase ">Register</h2>
                                    <p className=" mb-2">Please provide required information to register.</p>
                                    <div className="mb-3">
                                        <Form>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formFirstName">
                                                        <Form.Label className="text-center">
                                                            Username
                                                        </Form.Label>
                                                        <Form.Control className="bg-dark text-white" placeholder="Enter your first name" required />
                                                    </Form.Group>

                                                </Col>

                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formLastName">
                                                        <Form.Label className="text-center">
                                                            Username
                                                        </Form.Label>
                                                        <Form.Control className="bg-dark text-white" placeholder="Enter your last name" required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3" controlId="formUsername">
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control className="bg-dark text-white" placeholder="Enter your username" required />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control className="bg-dark text-white" type="password" placeholder="Enter a password" required />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPasswordAgain"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control className="bg-dark text-white" type="password" placeholder="Enter the password again" required />
                                            </Form.Group>

                                            <div className="d-flex justify-content-center">
                                                <Button className="col-6" variant="success" type="submit">
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Do you have an account?{" "}
                                                <Link to={"/login"} className="nav-link fw-bold">Sign In</Link>
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

export default RegisterFrom;