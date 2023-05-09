import {Container, ListGroup, ListGroupItem} from "react-bootstrap";

function MyProducts() {
    return (
        <Container className={"bg-dark text-white"}>
            <h2>HERE we make CRUD for the products of the user.</h2>
            <ListGroup>
                <ListGroupItem>
                    <p>Product 1</p>
                </ListGroupItem>
                <ListGroupItem>
                    <p>Product 2</p>
                </ListGroupItem>
            </ListGroup>
        </Container>
    );
}

export default MyProducts;