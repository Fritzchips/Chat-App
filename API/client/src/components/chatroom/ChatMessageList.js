import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../App';

const meHandler = {
    alignItems: "flex-end",
    marginRight: "10%"
};

const themHandler = {
    alignItems: "flex-start",
    marginLeft: "10%"
};

const themMsg = {
    backgroundColor: "#92E5EB", borderRadius: "10px", padding: "5px", maxWidth: "80%"
}

const meMsg = {
    backgroundColor: "#F2D57E", borderRadius: "10px", padding: "5px", maxWidth: "80%"
}
const ChatMessageList = () => {
    const chat = useContext(ChatContext);
   // const messageRef = useRef(null);

    return (
        <div className="d-flex flex-column " >
            {chat.session.messageList.length > 0 ? chat.session.messageList.map(message => (
                <div key={message.id}>
                    <div className="d-flex flex-column justify-content-center" style={message.userId === chat.session.userId ? meHandler : themHandler}  >

                        <div><strong style={{ }}>{message.name}</strong></div>
                        <div style={message.userId === chat.session.userId ? meMsg : themMsg}>
                            <p>{message.context}</p>
                        </div>
                    </div>
                </div>
                
            )) : (<></>)}
            <br></br>
            {/*<div ref={messageRef }></div>*/}
        </div>
    );
}

export default ChatMessageList;