
import {Card, Row, Col, Button, Spinner, Badge} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {fetchProducts, selectAllProducts, selectStatus} from "../features/product/productSlice";

function ProductCards() {
    //const [error, setError] = useState({message: '', isError: false});

    const dispatch = useDispatch()
    const products = useSelector(state => {
        console.log('State: ', state);
        return state.product.productList
    })
    const error = useSelector(state => state.product.error)
    const productStatus = useSelector(selectStatus)

    useEffect(() => {
        console.log(productStatus)
        if (productStatus === 'idle') {
            dispatch(fetchProducts())

        }
    }, [productStatus, dispatch])


    let content

    if (productStatus === 'loading') {
        console.log("Spinner loading")
        content = <Spinner  animation="border" variant="info" role="status" text="Loading..." />
    } else if (productStatus === 'succeeded') {
        console.log('PRODUCTS: ', products)
        content = products.map((p, idx) => (
            <Col key={idx}>
                <Card className="bg-dark text-white m-2 shadow">
                    <Card.Img variant="top" src={p.imgUrl} />
                    <Card.Body>
                        <Card.Title>{p.productName}</Card.Title>
                        <Card.Text>
                            {p.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  className={"bg-gradient"}>
                        <div className={"d-flex justify-content-between"}>
                            <small className="text-muted me-2">Last updated 3 mins ago</small>
                            <h3><Badge className={"bg-opacity-75"}>{p.basePrice + ' $'}</Badge></h3>
                            <Link className="col-4 ms-2" to={"/login"}>
                                <Button className="container-fluid" variant="outline-success">Bid</Button>
                            </Link>
                        </div>

                    </Card.Footer>
                </Card>
            </Col>
        ))
    } else if (productStatus === 'failed') {
        console.log("Error loading products");
        content = (
            <div className={"justify-content-center text-center"}>
                <h3 sm={12} className={'text-danger'}>{error}</h3>
                <p className={'text-danger'}>The products could not loaded. Sorry :(</p>
                <p className={'text-info text-start'}>
                    You can:
                    <ul>
                        <li>try to refresh the page</li>
                        <li>check your internet connection</li>
                    </ul>
                </p>
            </div>
        );
    }


    return (
        <Row xs={1} md={3} className="justify-content-md-center">
            {content}
        </Row>
    );
}

export default ProductCards;