import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MessageScreen = () => {
    const [messages, setMessages] = useState([]);
    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" }}>
                <div style={{backgroundColor: "grey", padding: "10px", fontSize: "25px"}}><strong>Welcome to this channel</strong></div>
                <br></br>
                <div style={{textAlign: "start"}}>
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

                <input type="text" required style={{width: "80%"}}/>
                <button>Post</button>
                </div>
            </Container>
       
    );
}

export default MessageScreen;