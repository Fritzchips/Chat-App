import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';



const ChatMessages = () => {
    const [messageList, setMessageList] = useState([]);


    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            {/*{messageList.map(message => (*/}
            {/*    <div key={message.key}>*/}
            {/*        <h1>{ message.name}</h1>*/}
            {/*        <p>{ message.text}</p>*/}
            {/*    </div>*/}
            {/*    )}*/}
        </Container>
    );
}

export default ChatMessages;