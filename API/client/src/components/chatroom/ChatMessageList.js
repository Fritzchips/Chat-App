import React, { useContext } from 'react';
import { ChatContext } from '../../App';
import "./styling/ChatMessageList.css";
import ScrollableFeed from "react-scrollable-feed";

const ChatMessageList = () => {
    const chat = useContext(ChatContext);

    return (
        <div className="d-flex flex-column msg-max-height" >
            <ScrollableFeed forceScroll="true">
                {chat.session.messageList.length > 0 ? chat.session.messageList.map((message) => (
                    <div key={message.id} className="msg-spacing">
                    <div className="d-flex flex-column justify-content-center" id={message.userId === chat.session.userId ? "user-flex" : "chat-flex" }  >
                        <div><strong style={{ }}>{message.name}</strong></div>
                        <div id={message.userId === chat.session.userId ? "user-msg-style" : "chat-msg-style"}>
                            <p>{message.context}</p>
                        </div>
                    </div>
                </div>
            )) : (<></>)}
                <br></br>
            </ScrollableFeed>
        </div>
    );
}

export default ChatMessageList;