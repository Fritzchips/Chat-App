import React, { useContext, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ChatMessages from './ChatMessages';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useData';
import { v4 as uuidv4 } from 'uuid';

const ChatScreen = () => {
    const chat = useContext(ChatContext);
        
    const postHandler = async(e) => {
        e.preventDefault();
        var message = JSON.stringify({
            Id: uuidv4(),
            ChannelId: chat.chatRoom.channelId,
            UserId: chat.chatRoom.userId,
            Date: new Date(),
            Context: chat.chatRoom.message,
        });

        await chat.chatRoom.hubConnection.invoke("SendMessageAll", message, chat.chatRoom.user).catch(function (err) {
            console.error(err);
        });
    };

    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" , overflow: "scroll"}}>
                <div style={{ backgroundColor: "grey", padding: "10px", fontSize: "25px" }}><strong>Welcome to { chat.chatRoom.channel} channel</strong></div>
                <ChatMessages />     
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">

                <form onSubmit={postHandler}>
                    <input type="text" required style={{ width: "80%" }} value={chat.chatRoom.message} onChange={e => chat.dispatch({ type: PAGE_CONTROL.INPUT , value: e.target.value})}/>
                    <button>Post</button>
                </form>
                </div>
            </Container>
       
    );
}

export default ChatScreen ;