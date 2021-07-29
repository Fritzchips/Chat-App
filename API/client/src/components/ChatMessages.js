import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from './MainScreen'



const ChatMessages = () => {
    const chat = useContext(ChatContext);

    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            {chat.chatRoom.messageList.length > 0 ? chat.chatRoom.messageList.map(message => (
                <div key={message.id}>
                    <p>{message.channelId} says:</p>
                    <p>{message.context}</p>
                    <p>Created: {message.date}</p>
                </div>
            )) : (<></>)}
        </Container>
    );
}

export default ChatMessages;