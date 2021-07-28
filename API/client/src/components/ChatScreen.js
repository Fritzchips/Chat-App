import React, { useContext} from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ChatMessages from './ChatMessages';
import { ChatContext, PAGE_CONTROL } from './MainScreen'
import * as signalR from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ChatScreen = () => {
    const chat = useContext(ChatContext);

    const connection = new signalR.HubConnectionBuilder().withUrl("/general").build();

    connection.start().catch(function (err) {
        return console.error(err);
    });

    connection.on("ReceiveMessage", function (repliedMsg) {
        console.log(`${repliedMsg} was received from server`);
    });

    const postHandler = (e) => {
        e.preventDefault();
        var message = JSON.stringify({
            Id: uuidv4(),
            ChannelId: chat.chatRoom.channelId,
            UserId: chat.chatRoom.userId,
            Date: new Date(),
            Context: chat.chatRoom.message
        });

        connection.invoke("SendMessageAll", message).catch(function (err) {
            console.error(err);
        });

        chatDispatch( { type: PAGE_CONTROL.SUBMIT, value: message } );

        //    /*const data = await axios.get(`/api/user/createmessage/${message.data}`);*/
    };

    //const postHandler = async (e) => {
    //    e.preventDefault();
    //    var item = {
    //        Id: uuidv4(),
    //        ChannelId: chat.chatRoom.channelId,
    //        UserId: chat.chatRoom.userId,
    //        Date: new Date(),
    //        Context: chat.chatRoom.message
    //    }
    

    //    var convertData = JSON.stringify(item);

    //    const data = await axios.get(`/api/user/createmessage/${convertData}`);
    //    //setMessage('');
    //    //setDatabase({ ...data.data } );
    //    console.log(data.data);
    //    //console.log(database);
    //};


//(e) => chat.dispatch({ type: PAGE_CONTROL.SUBMIT, value: ''})
    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" }}>
                <div style={{ backgroundColor: "grey", padding: "10px", fontSize: "25px" }}><strong>Welcome to { chat.chatRoom.channel} channel</strong></div>
                <ChatMessages />
                {/*<p>{database.context }</p>*/}
                
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">

                <form onSubmit={postHandler}>
                    <input type="text" required style={{ width: "80%" }} value={chat.message} onChange={e => chat.dispatch({ type: PAGE_CONTROL.INPUT , value: e.target.value})}/>
                    <button>Post</button>
                </form>
                </div>
            </Container>
       
    );
}

export default ChatScreen ;