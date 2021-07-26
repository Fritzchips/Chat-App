import React, { useState , useEffect} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:5000/ws');



const MainScreen = () => {
    const [channel, setChannel] = useState('general');
    const [user, setUser] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(`got reply ${dataFromServer}`);
        };

        console.log(`you're in ${channel}`)
        //getChannelMessages(channel);
    },);

    const chatHandler = (e) => {
        e.preventDefault();
        if (user) {
            client.send(JSON.stringify({
                type: "message",
                msg: user
            }));
        }
        
    }

    //async function getChannelMessages(channel) {
    // const data = await axios.get(`/api/messages/${channel}`);
    // setMessageList([...data]);
    //}

    return (
        <Container fluid className="d-flex flex-column" style={{height: "100vh"}}>
       
            <span style={{ backgroundColor: "purple", width:"100%"}}><h1>Welcome To Twinkle</h1></span>
           
            <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                <span style={{ backgroundColor: "purple", maxWidth: "200px" }}>
                    <ChannelNavBar />
                </span>

                <span style={{ width: "100%" }}>
                   <ChatScreen  />
                </span>
            </span>

            <form onSubmit={ chatHandler}>
                <input type="text" value={user} onChange={e => setUser(e.target.value)} />
                <button>submit</button>
            </form>
        </Container>
    );
}

export default MainScreen;