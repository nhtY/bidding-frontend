import {Row} from "react-bootstrap";


function Welcome () {
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    const username = credentials === null ? '' : credentials.username;

    return (
        <Row className="bg-dark text-white mt-1 rounded-3 text-center p-3" >
            <h1>WELCOME {username}</h1>
            <p>This is <b>Bidding App</b>. Take a look at the products and start to give offers.</p>
        </Row>
    );
}

export default Welcome;
