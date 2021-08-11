import React, { useEffect, useContext, useState} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ChatScreen from './ChatScreen';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import UserInfoChangeModal from './UserInfoChangeModal';
import HeaderNavBar from './HeaderNavBar';



const MainScreen = () => {
    const chat = useContext(ChatContext);
    const [channelNav, setChannelNav] = useState(true);

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    useEffect(() => {
        const connectToChat = async()=> {
            if (chat.session.hubConnection !== null) {
                await chat.session.hubConnection.invoke("LeaveRoom", chat.session.previousChannel);
            };
            const channelInfo = await authAxios.get(`/api/channel/getchannel/${chat.session.currentChannel}`);
            const result = channelInfo.data;
            await chat.dispatch({ type: PAGE_CONTROL.SAVE_CHANNEL_ID, value: result.id });

            if (chat.session.hubConnection === null) {
                startConnection();
            } else {
                await chat.session.hubConnection.invoke("JoinRoom", chat.session.currentChannel, chat.session.channelId);
            };
        };
        connectToChat();
    }, [chat.session.currentChannel]);

    

    const startConnection = async () => {
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

            await connection.invoke("JoinChat", chat.session.userName, chat.session.userId);

            await connection.invoke("JoinRoom", chat.session.currentChannel, chat.session.channelId);

        } catch (e) {
            console.error(e);
        }
    };

    const channelNavHandler = () => {
        if (channelNav) {
            setChannelNav(false);
        } else {
            setChannelNav(true);
        };
    };

    return (
        <div className="d-flex flex-column" style={{ height: "100vh",width: "100vw", position: "fixed", left: "0"}}>
            <HeaderNavBar channelNavHandler={ channelNavHandler}/>
            <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                {channelNav ?
                    (<span style={{ backgroundColor: "purple", width: "150px" }}>
                     <ChannelNavBar />
                    </span>) : <></>}

                <span style={{ width: "100%", height: "100vh" }}>
                    <ChatScreen  />
                </span>
            </span>
        </div>        
    );
}

export default MainScreen;