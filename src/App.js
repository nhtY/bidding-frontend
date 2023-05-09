
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home"
import Footer from "./components/Footer"
import {Col, Container, Row} from "react-bootstrap";
import LoginForm from "./components/auth/LoginForm";
import RegisterFrom from "./components/auth/RegisterForm";
import MyProducts from "./components/MyProducts";

function App() {

    const customStyle = {
        marginTop: '16px',
    };

  return (
    <Router>
        <NavigationBar />
        <Container style={{marginBottom: 120}}>
            <Row>
                <Col lg={12} style={customStyle}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterFrom />} />
                        <Route path="/user/products" element={<MyProducts />} />
                    </Routes>
                </Col>
            </Row>

        </Container>
        <Footer />
    </Router>
  );
}

export default App;
