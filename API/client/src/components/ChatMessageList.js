import React, { useContext, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../App';



const ChatMessageList = () => {
    const chat = useContext(ChatContext);
    //const messageRef = useRef(null);

    return (
        <div className="d-flex flex-column" >
            {chat.session.messageList.length > 0 ? chat.session.messageList.map(message => (
                <div key={message.id}>
                    <div className={message.userId === chat.session.userId ?
                         "d-flex flex-column justify-content-center align-items-end"
                        :"d-flex flex-column justify-content-center align-items-start"} >
                        <div><strong>{message.name}</strong></div>
                        <div>
                            <p>{message.context}</p>
                        </div>
                    </div>
                </div>

            )) : (<></>)}
        </div>
    );
}

export default ChatMessageList;