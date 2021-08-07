import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../App';



const ChatMessages = () => {
    const chat = useContext(ChatContext);

    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            {chat.session.messageList.length > 0 ? chat.session.messageList.map(message => (
                <div key={message.id}>
                    <p>{message.name} says:</p>
                    <p>{message.context}</p>
                    <p>Created: {message.date}</p>
                </div>
            )) : (<></>)}
        </Container>
    );
}

export default ChatMessages;