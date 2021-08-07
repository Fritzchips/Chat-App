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
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    useEffect(() => {
        async function connectToChat() {
            if (chat.session.hubConnection !== null) {
                await chat.session.hubConnection.invoke("LeaveRoom", chat.session.previousChannel);
                console.log(`leaving channel ${chat.session.previousChannel}`)
            };

            const channelInfo = await authAxios.get(`/api/channel/getchannel/${chat.session.currentChannel}`);
            const result = channelInfo.data;
            chat.dispatch({ type: PAGE_CONTROL.SAVE_CHANNEL_ID, value: result.id });

            if (chat.session.hubConnection === null) {
                await startConnection();
            } else {
                await chat.session.hubConnection.invoke("JoinRoom", chat.session.currentChannel, chat.session.channelId);
            }
           
        };

        connectToChat();
    }, [chat.session.currentChannel]);

    const logoutHandler = () => {
        localStorage.clear();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };

    const startConnection = async() => {
        try {
            const connection = new HubConnectionBuilder().withUrl(`/chatbox/chat`).build();

            chat.dispatch({ type: PAGE_CONTROL.SAVE_HUB_CONNECTION, value: connection });

            connection.on("ReceiveMessage", (message, user) => {
                const newMessage = { ...message, name: user };
                chat.dispatch({ type: PAGE_CONTROL.ADD_NEW_MESSAGE, value: newMessage });
            });

            connection.on("DataReceived", channelMessages => {
                chat.dispatch({ type: PAGE_CONTROL.LOAD_CHANNEL_MESSAGES, value: channelMessages });
            });

            connection.on("UsersReceived", activeUserList => {
                chat.dispatch({ type: PAGE_CONTROL.LOAD_ACTIVE_USERS, value: activeUserList });
            });

            await connection.start();

            await connection.invoke("JoinChat", chat.session.user);
            await connection.invoke("JoinRoom", chat.session.channel, chat.session.channelId)

        } catch (e) {
            console.error(e);
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