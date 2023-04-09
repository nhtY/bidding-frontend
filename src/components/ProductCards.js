
import {Card, Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

function ProductCards() {
    const img_url = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    const product_title = "Product Title";

    return (
        <Row xs={1} md={3} className="justify-content-md-center">

            {Array.from({ length: 4 }).map((_, idx) => (
                <Col>
                    <Card className="bg-dark text-white m-2 shadow">
                        <Card.Img variant="top" src={img_url} />
                        <Card.Body>
                            <Card.Title>{product_title + " " + idx}</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to
                                additional content.{' '}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div className={"d-flex justify-content-between"}>
                                <small className="text-muted">Last updated 3 mins ago</small>
                                <Link className="col-4" to={"/login"}>
                                    <Button className="container-fluid" variant="outline-success">Bid</Button>
                                </Link>
                            </div>

                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ProductCards;