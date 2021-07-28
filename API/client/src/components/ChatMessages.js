import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from './MainScreen'



const ChatMessages = () => {
    const chat = useContext(ChatContext);

    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            {chat.messageList > 0 ? chat.messageList.map(message => (
                <div key={message.Id}>
                    <h1>{message.ChannelId}</h1>
                    <p>{message.Context}</p>
                </div>
            )) : (<></>)};
        </Container>
    );
}

export default ChatMessages;