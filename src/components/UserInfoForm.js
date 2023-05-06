import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";


function UserInfoForm({ currentStep, data,  handleChange, handleValid, handleNext }) {

    let validation = {
        first_name: data.firstName.length > 3,
        last_name: data.lastName.length > 3,
    }
    function  next(){
        console.log(checkValid());
        if (checkValid()){
            handleNext();
        }
    }

    function checkValid() {
        return data.firstName.length >= 3 && data.lastName >= 3 && data.username >= 3
            && data.password >= 3 && data.password === data.passwordRepeat;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("NOT valid")
            event.preventDefault();
            event.stopPropagation();
        }else {
            console.log("valid")
            event.preventDefault();
            event.stopPropagation();
            //handleValid('personal');
            handleNext('personal');
        }
    }
    return (
        <Container>
            <Row className="vh-50 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="bg-dark border border-3 border-secondary"></div>
                    <Card className="bg-dark text-white shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-0 text-uppercase ">Personal Info Form</h2>
                                <p className=" mb-2">Please provide required personal information to register.</p>
                                <div className="mb-3">
                                    <Form noValidate>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="firstName">
                                                    <Form.Label className="text-center">
                                                        First Name
                                                    </Form.Label>
                                                    <Form.Control name="firstName" className="bg-dark text-white" placeholder="Enter your first name"
                                                                  value={data.firstName}  onChange={handleChange} required
                                                                  isValid={validation.first_name}
                                                                  isInvalid={!validation.first_name}
                                                    />
                                                </Form.Group>

                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="lastName">
                                                    <Form.Label className="text-center">
                                                        Last Name
                                                    </Form.Label>
                                                    <Form.Control name="lastName" className="bg-dark text-white" placeholder="Enter your last name"
                                                                  value={data.lastName} onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label className="text-center">
                                                Username
                                            </Form.Label>
                                            <Form.Control name="username" className="bg-dark text-white" placeholder="Enter your username"
                                                          value={data.username} onChange={handleChange} required />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="password"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="password" className="bg-dark text-white" type="password" placeholder="Enter a password"
                                                          value={data.password} onChange={handleChange} required />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="passwordRepeat"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="passwordRepeat" className="bg-dark text-white" type="password" placeholder="Enter the password again"
                                                          value={data.passwordRepeat} onChange={handleChange} required />
                                        </Form.Group>

                                        <div className="d-flex justify-content-end">
                                            <Button className="col-6" variant="success" onClick={next}>
                                                Next
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
    );
}

export default UserInfoForm;