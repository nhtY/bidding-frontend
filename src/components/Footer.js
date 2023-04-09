

import {Navbar, Container, Col} from "react-bootstrap";

function Footer () {

    const fullYear = new Date().getFullYear();
    return (
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Col md={12} lg={12} className="text-center text-muted">
                    <div>{fullYear}-{fullYear+1}, developed by Nihat Yalçın</div>
                </Col>
            </Container>
        </Navbar>
    );
}

export default Footer;