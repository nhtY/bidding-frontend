import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";


function PaymentInfoForm({ currentStep, data, handleChange, handleValid, handlePrev, handleNext}) {

    let validation = {
        cc_number: data.paymentInfo.ccNumber.length >= 10 && isNumeric(data.paymentInfo.ccNumber),
        expiration: data.paymentInfo.ccExpiration.length >= 3,
        cvv: data.paymentInfo.ccCVV.length >= 3 && isNumeric(data.paymentInfo.ccCVV)
    }

    function  next(){
        console.log(checkValid());
        if (checkValid()){
            handleNext();
        }
    }

    function checkValid() {
        return data.paymentInfo.ccNumber.length >= 10 && isNumeric(data.paymentInfo.ccNumber)
            && data.paymentInfo.ccExpiration.length >= 3
            && data.paymentInfo.ccCVV.length >= 3 && isNumeric(data.paymentInfo.ccCVV);
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }
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
                                    <Form noValidate>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="ccNumber">
                                                <Form.Label className="text-center">
                                                    Credit Card Number
                                                </Form.Label>
                                                <Form.Control name="ccNumber" className="bg-dark text-white"
                                                              value={data.paymentInfo.ccNumber} onChange={handleChange} required
                                                              isValid={validation.cc_number}
                                                              isInvalid={!validation.cc_number}
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="ccExpiration">
                                                <Form.Label className="text-center">
                                                    Expiration Date (MM/YY)
                                                </Form.Label>
                                                <Form.Control name="ccExpiration" className="bg-dark text-white" placeholder="ex: 04/25"
                                                              value={data.paymentInfo.ccExpiration} onChange={handleChange} required
                                                              isValid={validation.expiration}
                                                              isInvalid={!validation.expiration}
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="CVV">
                                                <Form.Label className="text-center">
                                                    CVV
                                                </Form.Label>
                                                <Form.Control name="ccCVV" className="bg-dark text-white" placeholder="ex: 123"
                                                              value={data.paymentInfo.ccCVV} onChange={handleChange} required
                                                              isValid={validation.cvv}
                                                              isInvalid={!validation.cvv}
                                                />
                                            </Form.Group>
                                        </Row>


                                        <div className="d-flex justify-content-between">
                                            <Button className="col-md-4 col-sm-3" variant="outline-info" onClick={handlePrev}>
                                                Previous
                                            </Button>
                                            <Button className="col-md-4 col-sm-3" variant="success" onClick={next}>
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