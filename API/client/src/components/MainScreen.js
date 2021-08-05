import React, { useEffect, useContext} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useData';



const MainScreen = () => {

    const chat = useContext(ChatContext);

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.chatRoom.jwToken}`
        }
    });


    useEffect(async () => {
        if (chat.chatRoom.hubConnection != null) {
            await chat.chatRoom.hubConnection.stop();
        };
        const channelInfo = await authAxios.get(`/api/channel/getchannel/${chat.chatRoom.channel}`);
        const result = channelInfo.data;
        chat.dispatch({ type: PAGE_CONTROL.CHANNEL_ID, value: result.id });
      
        try {
            const connection = new HubConnectionBuilder().withUrl(`/chatbox/${chat.chatRoom.channel}`)
                .build();

            chat.dispatch({ type: PAGE_CONTROL.CONNECTION, value: connection });

             connection.on("ReceiveGreeting", function (repliedMsg) {
                console.log(`greetings ${repliedMsg}`);
            });

            connection.on("ReceiveMessage", function (response, user) {
                const allMessage = { ...response, name: user };
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
            console.erro(e);
        }
    }, [chat.chatRoom.channel]);

    const logoutHandler = () => {
        localStorage.clear();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };


    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            <span style={{ backgroundColor: "purple", width: "100%" }}><h1>Welcome To Twinkle</h1><button onClick={ logoutHandler}>Log Out</button></span>
           
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