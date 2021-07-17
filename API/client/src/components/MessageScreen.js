import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

const MessageScreen = () => {
    const [messages, setMessages] = useState([]);
    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
                <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" }}>
                    <div style={{backgroundColor: "grey"}}><strong>Welcome to this channel</strong></div>
                    <br></br>
                    <div>
                        <p>Fritz</p>
                        <p>Saying hello there!</p>
                        <p>Mom</p>
                        <p>Saying hello there!</p>
                        <p>Fritz</p>
                        <p>starting convo</p>
                    </div>
                </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">
                <input type="text" required style={{width: "80%"}}/>
                <button>Post</button>
                </div>
            </Container>
       
    );
}

export default MessageScreen;