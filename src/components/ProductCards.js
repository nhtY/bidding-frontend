
import {Card, Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {fetchAllProducts} from '../service/index';

function ProductCards(props) {
    const [productList, setProducts] = useState([]); // initially empty
    const [error, setError] = useState({message: '', isError: false});

    useEffect(() => {
        fetchProducts();
    }, []);

    function fetchProducts() {
        props.fetchProductsAtHome();
        console.log(props.product);

        setTimeout(() => {
            if(props.product != '') {
                setProducts(props.product);
            }
            console.log(props.product)
        }, 500);

        // bookService.fetchAllProducts()
        //     .then(response => {
        //         console.log("FETCH PRODUCTS ==> ", response)
        //         setProducts(response);
        //     })
        //     .catch(error => {
        //         console.log("FETCH PRODUCT ERROR message: ", error.message);
        //         setError({...error, ['message']: error.message, ['isError']: true});
        //     })
    }

    const productCards = (
        <>
            {productList.map((p, idx) => (
                <Col key={idx}>
                    <Card className="bg-dark text-white m-2 shadow">
                        <Card.Img className={''} variant="top" src={p.imgUrl} />
                        <Card.Body>
                            <Card.Title>{p.productName}</Card.Title>
                            <Card.Text>
                                {p.description}
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
        </>
    );

    const errorComponent = (
        <div className={'text-danger'}>
            <h3>{error.message}</h3>
            <p>Something went wrong while fetching product data...</p>
        </div>
    );

    return (
        <Row xs={1} md={3} className="justify-content-md-center">
            {error.isError? errorComponent : productCards}
        </Row>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsAtHome: () => dispatch(fetchAllProducts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCards);