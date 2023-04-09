import {Row} from "react-bootstrap";


function Welcome () {
    const username = "..USERNAME.."
    return (
        <Row className="bg-dark text-white mt-1 rounded-3 text-center p-3" >
            <h1>Welcome {username}</h1>
            <p>This is <b>Kartaca Bidding App</b>. Take a look at the products and start to give offers.</p>
        </Row>
    );
}

export default Welcome;
