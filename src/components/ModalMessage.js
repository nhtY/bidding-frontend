import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

function ModalMessage({message, isShow, handleCloseModal}) {

    return (
        <Modal show={isShow} onHide={handleCloseModal}>
            <Modal.Header className={"bg-warning bg-opacity-50 bg"} closeButton>
                <Modal.Title>Registration Status</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-dark text-white bg-opacity-75"} >{message}</Modal.Body>
            <Modal.Footer className={"bg-dark text-white bg-opacity-75"}>
                {message === "Registration successful!" ? (
                    <Link to={"/login"} className="nav-link fw-bold">
                        <Button variant="success">
                            OK
                        </Button>
                    </Link>
                ) : (
                    <Button variant="warning" onClick={handleCloseModal}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalMessage;