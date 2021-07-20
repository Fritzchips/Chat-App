import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const GeneralChannel = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    const messageHandler = (e) => {
        e.preventDefault();
        console.log(`Your name is ${name} and password is ${password}`);
        sendToDB(name, password);
    }

    function sendToDB(name, password) {
        axios.get(`generalchannel/user/${name}/${password}`);
    }

    return (

        <Container className="d-flex flex-column " style={{ minHeight: "100%" }} >
            <div style={{ width: "100%", height: "80vh", border: "3px solid black", borderRadius: "5px" }}>
                <div style={{ backgroundColor: "grey", padding: "10px", fontSize: "25px" }}><strong>Welcome to General channel</strong></div>
                <br></br>
                <div style={{ textAlign: "start" }}>
                    <p>Fritz</p>

                </div>
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">

                {/*<InputGroup className="mb-3">*/}
                {/*    <FormControl*/}
                {/*        placeholder="Comments"*/}
                {/*        aria-label="Recipient's username"*/}
                {/*        aria-describedby="basic-addon2"*/}
                {/*    />*/}
                {/*    <Button variant="outline-secondary" id="button-addon2">Post</Button>*/}
                {/*</InputGroup>*/}
                <form onSubmit={messageHandler}>
                    <input type="text" required style={{ width: "80%" }} onChange={(e) => setName([e.target.value])} />
                    <input type="text" required style={{ width: "80%" }} onChange={(e) => setPassword([e.target.value])} />
                <button>Post</button>
                </form>
            </div>
        </Container>

    );
}

export default GeneralChannel;