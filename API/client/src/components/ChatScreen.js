import React, { useContext, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import ChatMessageList from './ChatMessageList';
import { ChatContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

const ChatScreen = () => {
    const chat = useContext(ChatContext);
    const [message, setMessage] = useState('');

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
        <div className="d-flex flex-column " style={{minHeight: "80vh"}} >
            
            <div style={{ backgroundColor: "grey", padding: "10px", fontSize: "25px" }}><strong>Welcome to {chat.session.currentChannel} channel</strong></div>
            <div style={{ width: "100%", height: "75vh", overflow: "auto"}}>
                <ChatMessageList />     
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px", paddingTop: "20px"}} className="align-self-baseline">

                <form onSubmit={postHandler}>
                    <input type="text" required style={{ width: "80%" }} value={message} onChange={e => setMessage(e.target.value)}/>
                    <button>Post</button>
                </form>
                </div>
            </div>      
    );
}

export default ChatScreen ;