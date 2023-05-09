import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import React from "react";
import ModalMessage from "../ModalMessage";


function ConfirmRegister({currentStep, data, handlePrev, handleRegister, isShow, modalMessage, handleCloseModal}) {


    const formFields = Object.keys(data);
    const addressFields = Object.keys(data.deliveryAddress);
    const paymentFields = Object.keys(data.paymentInfo);

    const personalInfo = formFields.map((field) =>
        field !== 'passwordRepeat' && field !== 'deliveryAddress' && field !== 'paymentInfo'?
            <ListGroup.Item key={formFields.indexOf(field)} className="bg-dark text-white mb-2" as="li" disabled>
                <Row>
                    <Col>{field}</Col>
                    <Col>{data[field]}</Col>
                </Row>
            </ListGroup.Item>
            : <></>);

    const addressInfo = addressFields.map((field) =>
        <ListGroup.Item key={addressFields.indexOf(field) + 5} className="bg-dark text-white mb-2" as="li" disabled>
            <Row>
                <Col>{field}</Col>
                <Col>{data.deliveryAddress[field]}</Col>
            </Row>
        </ListGroup.Item>);

    const paymentInfo = paymentFields.map((field) =>
        <ListGroup.Item key={paymentFields.indexOf(field) + 10} className="bg-dark text-white mb-2" as="li" disabled>
            <Row>
                <Col>{field}</Col>
                <Col>{data.paymentInfo[field]}</Col>
            </Row>
        </ListGroup.Item>);

    return (
        <Container className="justify-content-centers">
            <Col className="justify-content-center col-md-6 m-auto ">
                <ListGroup  as="ul">
                    <ListGroup.Item className="bg-dark text-white mb-2" as="li" disabled>
                        <Row>
                            <Col>Field</Col>
                            <Col>Value</Col>
                        </Row>
                    </ListGroup.Item>
                    {personalInfo}
                    {addressInfo}
                    {paymentInfo}
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
            <ModalMessage message={modalMessage} isShow={isShow} handleCloseModal={handleCloseModal} />
        </Container>
    );
}
export default ConfirmRegister;