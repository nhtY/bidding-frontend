import {
    Badge,
    Button,
    Col,
    Container,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    Spinner,
    Stack
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProducts, selectAllUserProducts, selectUserProductStatus} from "../features/product/userProductSlice";
import {useEffect} from "react";
import authService from "../service/authService";
import {Link, Route} from "react-router-dom";
import Home from "./Home";

function ProductListItem(props) {
    const product = props.product;
    return (
        <ListGroupItem className={'mb-3 bg-dark text-white border-2 rounded-3 shadow'}>
            <Col>
                <Row>
                    <h2>{product.productName}</h2>
                </Row>
                <Row xs={2} lg={4} >
                    <Col md={6} lg={4} className={'mb-2'}>
                        <Image fluid={true} rounded={true} src={product.imgUrl}>

                        </Image>
                    </Col>
                    <Col lg={3} className={'mb-2'}>
                        {product.description}
                    </Col>
                    <Col lg={2}>
                        <h4>
                            Base Price <Badge bg="secondary">{product.basePrice}$</Badge>
                        </h4>
                        {product.isSold? (
                            <h4>
                                Sold Price <Badge bg="success">{product.soldPrice}$</Badge>
                            </h4>
                        ) : (
                            <Badge bg="warning">Not sold yet</Badge>
                        )}
                    </Col>
                    <Col lg={3} className={'align-items-end'}>
                        <Stack gap={4} className="col-md-10 mx-auto col-lg-8">
                            <Button variant="warning">Update</Button>
                            <Button variant="outline-danger">Delete</Button>
                        </Stack>
                    </Col>
                </Row>
            </Col>

        </ListGroupItem>
    );
}
function MyProducts() {

    const credentials = authService.getCredentials();

    const dispatch = useDispatch()
    const error = useSelector(state => {
        return state.error;
    })
    const products = useSelector(selectAllUserProducts);
    const productStatus = useSelector(selectUserProductStatus);

    useEffect(() => {

        if(credentials===null) { // redirect unauthorized browsing
            const timeout = setTimeout(() => {
                // 👇️ redirects to an external URL
                window.location.replace('http://localhost:3000');
            }, 2000);

            return () => clearTimeout(timeout);
        }

        console.log(productStatus)
        if (productStatus === 'idle') {
            dispatch(fetchUserProducts(credentials))

        }
    }, [productStatus, dispatch]);

    let content;

    if (productStatus === 'loading') {
        console.log("Spinner loading")
        content = <Spinner  animation="border" variant="info" role="status" text="Loading..." />
    } else if (productStatus === 'succeeded') {
        console.log('USER PRODUCTS: ', products)
        content = products.map((p, idx) => (
            <div key={idx}>
                <Row lg={10} className={"bg-body bg-opacity-10 text-white justify-content-center p-3 rounded-1"}>
                    <ListGroup>
                        <ProductListItem product={p} ></ProductListItem>
                    </ListGroup>
                </Row>
            </div>
        ))
    } else if (productStatus === 'failed') {
        content = <div className={'text-danger'}>{error}</div>
    }

    return (
        <Container className={'text-white'}>
            <h2>HERE You can make CRUD operations</h2>
            {content}
        </Container>
    );
}

export default MyProducts;