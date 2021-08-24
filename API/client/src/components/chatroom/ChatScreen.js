import React, { useContext, useEffect, useState} from 'react';
import ChatMessageList from './ChatMessageList';
import { ChatContext } from '../../App';
import { v4 as uuidv4 } from 'uuid';
import "./styling/ChatScreen.css";
import { ModalContext } from './MainScreen';

const ChatScreen = () => {
    const chat = useContext(ChatContext);
    const [message, setMessage] = useState('');
    const popup = useContext(ModalContext);


    useEffect(() => {
        setMessage('');
    }, [chat.session.currentChannel]);
        
    const postHandler = async(e) => {
        e.preventDefault();
        const newMessage = JSON.stringify({
            Id: uuidv4(),
            ChannelId: chat.session.channelId,
            UserId: chat.session.userId,
            Date: new Date(),
            Context: message,
        });

        await chat.session.hubConnection.invoke("SendMessage", newMessage, chat.session.userName, chat.session.currentChannel);
        setMessage('');
    };

    return (
        <div>
            <div className="d-flex flex-column  chat-background">
            
                <div className="chat-header">
                    <strong className="chat-room-name"># {chat.session.currentChannel} channel</strong>
                </div>

                <div className="chat-message-list">
                    <ChatMessageList /> 
                </div>
            </div>

            <form onSubmit={postHandler} className="chat-inputfield" style={{display: popup.modal ? "none" : "block"}}>
                    <input type="text" required  value={message} onChange={e => setMessage(e.target.value)} className="chat-input-style" maxLength="200"/>
                    <button type="submit" className="chat-button-style" >Post</button>
                </form>
        </div>      
    );
}

export default ChatScreen ;