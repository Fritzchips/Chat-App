import React, { useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import ChatMessageList from './ChatMessageList';
import { ChatContext } from '../../App';
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
        <div className="d-flex flex-column " style={{
            background: "#023059"}}>
            
            <div style={{ backgroundColor: "#04B2D9", padding: "10px", fontSize: "25px", }}><strong style={{color: "white" }}># {chat.session.currentChannel} channel</strong></div>
            <div style={{ width: "100%", height: "70vh", overflow: "auto", backgroundColor: "#5CD6FF"}}>
                <ChatMessageList />     
            </div>

            <div style={{ width: "100%", height: "20vh", marginTop: "15px"}} className="align-self-baseline">
                <form  onSubmit={postHandler} >
                    <input type="text" required style={{ width: "80%" , height: "34px", borderRadius: "10px"}} value={message} onChange={e => setMessage(e.target.value)}/>
                    <button type="submit" style={{backgroundColor: "lightblue", borderRadius: "10px",}} >Post</button>
                </form>
                </div>
            </div>      
    );
}

export default ChatScreen ;