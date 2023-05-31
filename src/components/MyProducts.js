import {
    Badge,
    Button,
    Col,
    Container, Form,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    Spinner,
    Stack
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProducts, selectAllUserProducts, selectUserProductStatus} from "../features/product/userProductSlice";
import React, {useEffect, useState} from "react";
import authService from "../service/authService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus, faFaceSadTear, faTrash } from '@fortawesome/free-solid-svg-icons'

const newProductInitial = {
    productOwner: "",
    productName: "",
    description: "",
    basePrice: 0,
    imgUrl: ""
}

function ProductListItem(props) {
    const [product, setProduct] = useState(props.product);
    const [allowChange, setAllow] = useState(props.allow);

    // in case update is cancelled before submitting the values..
    const [prev, setPrev] = useState(props.product);

    useEffect(() => {
        if(allowChange === true) {
            setPrev(product);
        }else { // cancel update
            setProduct(prev);
        }
    },[allowChange]);

    function allowToggle() {
        // toggle
        setAllow(!allowChange);
    }

    function handleChange(e) {
        setProduct(
            { ...product, [e.target.name]: e.target.value }
        );
    }

    return (
        <ListGroupItem className={'mb-3 bg-dark text-white border-2 rounded-3 shadow'}>
            <Col>
                <Row>
                    <h2>
                        <Form.Control plaintext={!allowChange} readOnly={!allowChange} name="productName" className="bg-dark text-white"
                                      onChange={handleChange} disabled={!allowChange}
                                      value={product.productName}
                        />
                    </h2>

                </Row>
                <Row xs={2} lg={4} >
                    <Col md={6} lg={4} className={'mb-2'}>
                        <Image fluid={true} rounded={true} src={product.imgUrl}>

                        </Image>
                    </Col>
                    <Col lg={3} className={'mb-2'}>
                        {allowChange? (
                            <Form.Control plaintext={!allowChange} name="description" className="bg-dark text-white"
                                          onChange={handleChange} as={"textarea"} rows={10}
                                          value={product.description}
                            />
                        ) : (product.description) }
                    </Col>
                    <Col lg={2}>
                        <h4>
                            Base Price <Badge bg="secondary">
                            <Form.Control name="basePrice"
                                          className={"bg-transparent text-white d-inline"}
                                          onChange={handleChange} readOnly={!allowChange}
                                          value={product.basePrice + (!allowChange? '$': '')}
                            />
                            </Badge>
                        </h4>

                        {product.isSold? (
                            <h4>
                                Sold Price <Badge bg="success">{product.soldPrice}$</Badge>
                            </h4>
                        ) : (
                            <>
                                <Badge text={"dark"} bg="warning">Not sold yet</Badge>
                                <FontAwesomeIcon color={"orange"} className={"ms-2"} icon={faFaceSadTear} size={"2xl"} />
                            </>
                        )}
                    </Col>
                    <Col lg={3} className="d-flex justify-content-end">
                        <Stack gap={4} className="col-md-10 mx-auto col-lg-8">
                            <Button onClick={allowToggle} variant="warning">{allowChange? "Cancel Update" : "Update"}</Button>
                            {allowChange? (
                                <Button variant="outline-primary">OK</Button>
                            ) : (
                                <Button variant="outline-danger">
                                    Delete
                                    <FontAwesomeIcon color={"white"} className={"ms-3"} icon={faTrash}/>
                                </Button>
                            )}

                        </Stack>
                    </Col>
                </Row>
            </Col>

        </ListGroupItem>
    );
}

function MyProducts() {

    const credentials = authService.getCredentials();

    const [newProduct, setNewProduct] = useState(newProductInitial)

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

    function handleAdd() {

    }

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
                        <ProductListItem product={p} allow={false} ></ProductListItem>
                    </ListGroup>
                </Row>
            </div>
        ))
    } else if (productStatus === 'failed') {
        content = <div className={'text-danger'}>{error}</div>
    }

    let upperContent = credentials === null? (
        <>
            <h2>Redirecting home...</h2>
            <Spinner animation="border" variant="info" role="status" text="Loading..." />
        </>
    ) : (
        <Row className={"m-2 p-1"} sm={1} md={3}>
            <Col sm={10} md={8}><h2>HERE You can make CRUD operations</h2></Col>
            <Col className="d-flex justify-content-sm-end">
                <Button className={"shadow d-flex align-items-center"} variant={"success"} onClick={handleAdd}>
                    <FontAwesomeIcon color={"orange"} className={"me-2"} icon={faPlus} />
                    <span>New Product</span>
                </Button>
            </Col>
        </Row>
    );

    return (
        <Container className={'text-white'}>
            {upperContent}
            {content}
        </Container>
    );
}

export default MyProducts;