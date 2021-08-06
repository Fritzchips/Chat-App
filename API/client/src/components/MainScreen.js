import React, { useEffect, useContext} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { HubConnectionBuilder } from '@microsoft/signalr';
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

    useEffect(() => {
        async function connectToChat() {
            if (chat.chatRoom.hubConnection !== null) {
                await chat.chatRoom.hubConnection.invoke("LeaveRoom", chat.chatRoom.prevChannel);
                console.log(`leaving channel ${chat.chatRoom.prevChannel}`)
            };

            const channelInfo = await authAxios.get(`/api/channel/getchannel/${chat.chatRoom.channel}`);
            const result = channelInfo.data;
            chat.dispatch({ type: PAGE_CONTROL.CHANNEL_ID, value: result.id });

            if (chat.chatRoom.hubConnection === null) {
                await startConnection();
            } else {
                await chat.chatRoom.hubConnection.invoke("JoinRoom", chat.chatRoom.channel, chat.chatRoom.channelId);
            }
           
        };

        connectToChat();
    }, [chat.chatRoom.channel]);

    const logoutHandler = () => {
        localStorage.clear();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };

    const startConnection = async() => {
        try {
            const connection = new HubConnectionBuilder().withUrl(`/chatbox/chat`).build();

            chat.dispatch({ type: PAGE_CONTROL.CONNECTION, value: connection });

            connection.on("ReceiveMessage", (response, user) => {
                const allMessage = { ...response, name: user };
                chat.dispatch({ type: PAGE_CONTROL.SUBMIT, value: allMessage });
            });

            connection.on("DataReceived", messageTable => {
                chat.dispatch({ type: PAGE_CONTROL.CHANNEL_DATA, value: messageTable });
            });

            connection.on("UsersReceived", userTable => {
                chat.dispatch({ type: PAGE_CONTROL.ACTIVE_USERS, value: userTable });
            });

            await connection.start();

            await connection.invoke("JoinChat", chat.chatRoom.user);
            await connection.invoke("JoinRoom", chat.chatRoom.channel, chat.chatRoom.channelId)

        } catch (e) {
            console.erro(e);
        }
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