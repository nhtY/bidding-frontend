import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import React from "react";


function ConfirmRegister({currentStep, data, handlePrev, handleRegister}) {

    const formFields = Object.keys(data);

    const items = formFields.map((field) =>
        field !== 'passwordRepeat'?
            <ListGroup.Item className="bg-dark text-white mb-2" key={formFields.indexOf(field)} as="li" disabled>
                <Row>
                    <Col> {field}</Col>
                    <Col>{data[field]}</Col>
                </Row>
            </ListGroup.Item>
            : <></>

    );

    return (
        <Container className="justify-content-centers">
                <Col className="justify-content-center col-md-6 m-auto ">
                    <ListGroup  as="ul">
                        <ListGroup.Item className="bg-dark text-white mb-2" as="li" disabled>
                            <Row>
                                <Col> Field</Col>
                                <Col>Value</Col>
                            </Row>
                        </ListGroup.Item>
                        {items}
                    </ListGroup>
                    <Row className="justify-content-between">
                        <Button className="col-md-4 m-2" variant="outline-info" onClick={handlePrev}>
                            Previous
                        </Button>
                        <Button className="col-md-4 m-2" variant="success" onClick={handleRegister}>
                            Confirm
                        </Button>
                    </Row>
                </Col>
        </Container>
    );
}
export default ConfirmRegister;