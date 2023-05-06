import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";


function PaymentInfoForm({ currentStep, data, handleChange, handleValid, handlePrev, handleNext}) {

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            event.stopPropagation();
            handleValid('payment').then(handleNext);
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
                                <h2 className="fw-bold mb-0 text-uppercase ">Payment Info Form</h2>
                                <p className=" mb-2">Please provide required payment information to register.</p>
                                <div className="mb-3">
                                    <Form noValidate validated={true} onSubmit={handleSubmit}>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="ccNumber">
                                                <Form.Label className="text-center">
                                                    Credit Card Number
                                                </Form.Label>
                                                <Form.Control name="ccNumber" className="bg-dark text-white"
                                                              value={data.ccNumber} onChange={handleChange} required />
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="ccExpiration">
                                                <Form.Label className="text-center">
                                                    Expiration Date (MM/YY)
                                                </Form.Label>
                                                <Form.Control name="ccExpiration" className="bg-dark text-white" placeholder="ex: 04/25"
                                                              value={data.ccExpiration} onChange={handleChange} required />
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="CVV">
                                                <Form.Label className="text-center">
                                                    CVV
                                                </Form.Label>
                                                <Form.Control name="CVV" className="bg-dark text-white" placeholder="ex: 123"
                                                              value={data.CVV} onChange={handleChange} required />
                                            </Form.Group>
                                        </Row>


                                        <div className="d-flex justify-content-between">
                                            <Button className="col-md-4 col-sm-3" variant="outline-info" onClick={handlePrev}>
                                                Previous
                                            </Button>
                                            <Button className="col-md-4 col-sm-3" variant="success" type="submit">
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

export default PaymentInfoForm;