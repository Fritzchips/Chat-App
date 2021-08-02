import React, { useEffect, useContext} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { v4 as uuidv4 } from 'uuid';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useData';

const MainScreen = () => {

    const chat = useContext(ChatContext);

    useEffect(async () => {
        if (chat.chatRoom.hubConnection != null) {
            await chat.chatRoom.hubConnection.stop();
        };
        const channelInfo = await axios.get(`/api/user/getchannel/${chat.chatRoom.channel}`);
        const result = channelInfo.data;
        chat.dispatch({ type: PAGE_CONTROL.CHANNEL_ID, value: result.id });
      
        try {
            const connection = new HubConnectionBuilder().withUrl(`/${chat.chatRoom.channel}`)
                .configureLogging(LogLevel.Information).build();

            chat.dispatch({ type: PAGE_CONTROL.CONNECTION, value: connection });

            connection.on("ReceiveGreeting", function (repliedMsg) {
                console.log(`greetings ${repliedMsg}`);
            });

            connection.on("ReceiveMessage", function (allMessage) {
                chat.dispatch({ type: PAGE_CONTROL.SUBMIT, value: allMessage });
            });

            connection.on("DataReceived", function (messageTable) {
                chat.dispatch({ type: PAGE_CONTROL.CHANNEL_DATA, value: messageTable });
            });

            await connection.start();

            await connection.invoke("JoinRoom", chat.chatRoom.user, chat.chatRoom.channelId).catch(function (err) {
                console.error(err);

            });

        } catch (e) {
            console.error(e);
        }
    }, [chat.chatRoom.channel]);


    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            <h1>Welcome {chat.chatRoom.user}, with the Id of { chat.chatRoom.userId}</h1>
                <span style={{ backgroundColor: "purple", width:"100%"}}><h1>Welcome To Twinkle</h1></span>
           
                <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                    <span style={{ backgroundColor: "purple", maxWidth: "200px" }}>
                        <ChannelNavBar />
                    </span>

                    <span style={{ width: "100%" }}>
                        <ChatScreen  />
                    </span>
                </span>
            </Container>        
    );
}

export default MainScreen;