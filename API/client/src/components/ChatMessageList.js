import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../App';



const ChatMessageList = () => {
    const chat = useContext(ChatContext);
    
    return (
        <div className="d-flex flex-column" >
            {chat.session.messageList.length > 0 ? chat.session.messageList.map(message => (
                <div key={message.id} >
                    <div className="d-flex flex-column justify-content-center align-items-start">
                        <div className="d-flex">
                            <strong>{message.name} says:</strong>
                            <p>Created: {message.date}</p>
                        </div>
                        <div>
                            <p>{message.context}</p>
                        </div>
                    </div>
                    <hr></hr>
                </div>

            )) : (<></>)}
        </div>
    );
}

export default ChatMessageList;