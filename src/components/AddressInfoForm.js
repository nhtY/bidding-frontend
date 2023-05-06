import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";


function AddressInfoForm({ currentStep, data, handleChange, handleValid, handlePrev, handleNext }) {

    function  next(){
        handleNext('address');
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else {
            event.preventDefault();
            event.stopPropagation();
            handleNext('address');
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
                                <h2 className="fw-bold mb-0 text-uppercase ">Address Info Form</h2>
                                <p className=" mb-2">Please provide required address information to register.</p>
                                <div className="mb-3">
                                    <Form noValidate validated={true} onSubmit={handleSubmit}>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="houseNumber">
                                                    <Form.Label className="text-center">
                                                        House Number
                                                    </Form.Label>
                                                    <Form.Control name="houseNumber" className="bg-dark text-white" placeholder="3"
                                                                  value={data.houseNumber} onChange={handleChange} required />
                                                </Form.Group>

                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="street">
                                                    <Form.Label className="text-center">
                                                        Street
                                                    </Form.Label>
                                                    <Form.Control name="street" className="bg-dark text-white" placeholder="ex: Baker St."
                                                                  value={data.street}  onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="city">
                                                    <Form.Label className="text-center">
                                                        City
                                                    </Form.Label>
                                                    <Form.Control name="city" className="bg-dark text-white" placeholder="London"
                                                                  value={data.city}  onChange={handleChange} required />
                                                </Form.Group>

                                            </Col>
                                        </Row>

                                        <Row>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="postalCode">
                                                    <Form.Label className="text-center">
                                                        Postal Code
                                                    </Form.Label>
                                                    <Form.Control name="postalCode" className="bg-dark text-white" placeholder="380099"
                                                                  value={data.postalCode}  onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="country">
                                                    <Form.Label className="text-center">
                                                        Country
                                                    </Form.Label>
                                                    <Form.Control name="country" className="bg-dark text-white" placeholder="England"
                                                                  value={data.country}  onChange={handleChange} required />
                                                </Form.Group>
                                            </Col>
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

export default AddressInfoForm;