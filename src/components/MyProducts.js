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
import {
    addProduct, deleteProduct,
    fetchUserProducts,
    handleFormChange,
    resetFormValues, resetUserProducts,
    selectAddError,
    selectAddProductStatus,
    selectAllUserProducts, selectDeleteError, selectDeleteStatus,
    selectNewProduct,
    selectShowForm, selectUpdateStatus,
    selectUserProductStatus,
    toggleShowForm, updateProductLists
} from "../features/product/productSlice";
import React, {useEffect, useState} from "react";
import authService from "../service/authService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus, faFaceSadTear, faTrash } from '@fortawesome/free-solid-svg-icons'


function NewTemporaryProduct(props) {
    const product = useSelector(selectNewProduct);
    const status = useSelector(selectAddProductStatus);
    const error = useSelector(selectAddError);

    const isUpdate = useSelector(selectUpdateStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isUpdate === 'update') {
            dispatch(updateProductLists(product));
            console.log("update works..")
        }
    },[isUpdate])

    async function handleAddProduct() {
        if (status === 'idle' || status === 'failed' || status === 'succeeded') {
            try {
                await dispatch(addProduct(product)).unwrap();

                setTimeout(() => {
                    console.log("RESETTING")
                    //dispatch(resetFormValues());
                    dispatch(toggleShowForm());
                }, 200);
                //dispatch(resetProductAll());

            }catch (e) {
                console.error('Failed to ADD PRODUCT: ', e)
            }
        }
    }

    function handleCancelAddProduct() {
        dispatch(resetFormValues());
        dispatch(toggleShowForm());
    }

    function handleChange(e) {
        const newProductState = { ...product, [e.target.name]: e.target.value }
        dispatch(handleFormChange(newProductState));
    }

    return props.isShow? (
        <ListGroupItem className={'mb-3 bg-dark text-white border-2 rounded-3 shadow'}>
            <Col>
                <Row>
                    <h2>
                        <Form.Control type={"text"} name="productName" className={"bg-dark text-white"}
                                      onChange={handleChange}
                                      placeholder={"Enter Product Name Here"}
                                      value={product.productName}
                        />
                    </h2>

                </Row>
                <Row xs={2} lg={4} >
                    <Col md={6} lg={4} className={'mb-2'}>
                        <Image fluid={true} rounded={true} src={product.imgUrl}>

                        </Image>
                        <Form.Control type={"text"} name="imgUrl" className="bg-dark text-white mt-1"
                                      onChange={handleChange}
                                      placeholder={"Enter Image URL Here"}
                                      value={product.imgUrl}
                        />
                    </Col>
                    <Col lg={3} className={'mb-2'}>
                            <Form.Control name="description" className="bg-dark text-white"
                                          onChange={handleChange} as={"textarea"} rows={10}
                                          placeholder={"You must enter some descriptive statements about the product."}
                                          value={product.description}
                            />
                    </Col>
                    <Col lg={2}>
                        <h4>
                            Base Price <Badge bg="secondary">
                            <Form.Control name="basePrice"
                                          type={"number"}
                                          className={"bg-transparent text-white d-inline"}
                                          onChange={handleChange}
                                          placeholder={"10"}
                                          value={product.basePrice}
                            />
                        </Badge>
                        </h4>

                        <>
                            <Badge text={"dark"} bg="warning">Not sold yet</Badge>
                            <FontAwesomeIcon color={"orange"} className={"ms-2"} icon={faFaceSadTear} size={"2xl"} />
                        </>

                    </Col>
                    <Col lg={3} className="d-flex justify-content-end">
                        <Stack gap={4} className="col-md-10 mx-auto col-lg-8">

                            <Button onClick={handleAddProduct} variant="warning">Save</Button>
                            <Button onClick={handleCancelAddProduct} variant="outline-danger">
                                Cancel
                                <FontAwesomeIcon color={"white"} className={"ms-3"} icon={faTrash}/>
                            </Button>


                        </Stack>
                    </Col>
                </Row>
            </Col>

        </ListGroupItem>
    ) : null;
}

function ProductListItem(props) {
    const [product, setProduct] = useState(props.product);
    const [allowChange, setAllow] = useState(props.allow);

    const deleteStatus = useSelector(selectDeleteStatus);
    const deleteError = useSelector(selectDeleteError);
    const dispatch = useDispatch();

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

    async function handleDelete() {
        if (deleteStatus === 'idle' || deleteStatus === 'succeeded') {
            try {
                await dispatch(deleteProduct(props.product)).unwrap();
            }catch (e) {
                console.log(e);
            }
        }
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
                    <Col lg={2} className={'mb-2'}>
                        {allowChange? (
                            <Form.Control plaintext={!allowChange} name="description" className="bg-dark text-white"
                                          onChange={handleChange} as={"textarea"} rows={10}
                                          value={product.description}
                            />
                        ) : (product.description) }
                    </Col>
                    <Col lg={3}>
                        <Row sm={2}>
                            <Col xs={4} md={4}><h4>Base Price</h4> </Col>
                            <Col xs={8} md={8}>
                                <Badge bg="secondary">
                                    <Row>
                                        <Col xs={8} sm={8}>
                                            <Form.Control name="basePrice" type={"number"}
                                                          className={"bg-transparent text-white p-1"}
                                                          onChange={handleChange} readOnly={!allowChange}
                                                          value={product.basePrice}
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <h4>$</h4>
                                        </Col>
                                    </Row>
                                </Badge>
                            </Col>
                        </Row>

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
                                <Button variant="outline-danger" onClick={handleDelete}>
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

    const dispatch = useDispatch()
    const error = useSelector(state => {
        return state.product.userProductError;
    })
    const products = useSelector(selectAllUserProducts);
    const productStatus = useSelector(selectUserProductStatus);
    const isUpdate = useSelector(selectUpdateStatus);
    //const product = useSelector(selectNewProduct);
    const isShowForm = useSelector(selectShowForm);

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

    function handleShowForm() {
        dispatch(toggleShowForm());
    }


    let content;

    if (productStatus === 'loading') {
        console.log("Spinner loading")
        content = <Spinner  animation="border" variant="info" role="status" text="Loading..." />
    } else if (productStatus === 'succeeded'  || isUpdate === 'update') {
        console.log('USER PRODUCTS: ', products)
        content = products.map((p, idx) => (
            <div key={idx}>
                <ProductListItem product={p} allow={false} ></ProductListItem>
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
                <Button className={"shadow d-flex align-items-center"}
                        variant={"success"} onClick={handleShowForm} disabled={isShowForm}
                >

                    <FontAwesomeIcon color={"orange"} className={"me-2"} icon={faPlus} />
                    <span>New Product</span>
                </Button>
            </Col>
        </Row>
    );

    return (
        <Container className={'text-white'}>
            {upperContent}
            <Row lg={10} className={"bg-body bg-opacity-10 text-white justify-content-center p-3 rounded-1"}>
                <ListGroup>
                    <NewTemporaryProduct isShow={isShowForm} ></NewTemporaryProduct>
                    {content}
                </ListGroup>
            </Row>
        </Container>
    );
}

export default MyProducts;