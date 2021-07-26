import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ChatMessages from './ChatMessages';
import axios from 'axios';
import { v4 as uuidv4 , parse as uuidParse} from 'uuid';

const ChatScreen = () => {
    const [message , setMessage] = useState([]);

    const postHandler = async (e) => {
        e.preventDefault();
        var item = {
            Id: uuidv4(),
            ChannelId: '495da565-a839-467f-8eb9-ad6f0124bcbd',
            UserId: 'e53e4185-16e9-4c1c-b87e-ad6e0164acb7',
            Date: new Date(),
            Context: message
        }

        var convertData = JSON.stringify(item);

        const data = await axios.get(`/api/user/createmessage/${convertData}`);

        console.log(data);

    }
    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" }}>
                <div style={{backgroundColor: "grey", padding: "10px", fontSize: "25px"}}><strong>Welcome to Coding channel</strong></div>
                <ChatMessages  />
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

                <form onSubmit={ postHandler}>
                    <input type="text" required style={{ width: "80%" }} value={message} onChange={ e => setMessage(e.target.value)}/>
                    <button>Post</button>
                </form>
                </div>
            </Container>
       
    );
}

export default ChatScreen ;