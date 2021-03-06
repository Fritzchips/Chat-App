import React, { useEffect, useContext, useState} from 'react';
import ChannelNavBar from '../navigation/ChannelNavBar';
import ChatScreen from './ChatScreen';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import HeaderNavBar from '../navigation/HeaderNavBar';
import "./styling/MainScreen.css";

export const ModalContext = React.createContext();

const MainScreen = () => {
    const chat = useContext(ChatContext);
    const [channelNav, setChannelNav] = useState(true);
    const [modal, setModal] = useState(false);

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
            chat.dispatch({ type: PAGE_CONTROL.SAVE_CHANNEL_ID, value: result.id });

            if (chat.session.hubConnection === null) {
                startConnection();
            } else {
                await chat.session.hubConnection.invoke("JoinRoom", chat.session.currentChannel, chat.session.channelId);
            };
        };
        connectToChat();
    }, [chat.session.currentChannel]);

    const modalHandler = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        };
    };

    const startConnection = async () => {
        try {
            const connection = new HubConnectionBuilder().withUrl(`/chatbox/chat`).build();
            chat.dispatch({ type: PAGE_CONTROL.SAVE_HUB_CONNECTION, value: connection });

            connection.on("ReceiveMessage", (message, user) => {
                const roomMessage = { ...message, name: user };
                chat.dispatch({ type: PAGE_CONTROL.ADD_NEW_MESSAGE, value: roomMessage });
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
        <div className="d-flex flex-column main-page-container" >
            <ModalContext.Provider value={{ modal: modal, modalHandler: modalHandler }}>
                <HeaderNavBar channelNavHandler={channelNavHandler} />

                <span className="d-flex justify-content-between align-items-stretch main-nav-height">
                {channelNav ?
                    (<span className="main-channel-nav">
                     <ChannelNavBar />
                        </span>) : <></>}

                <span className="main-chatscreen">
                    <ChatScreen />                            
                </span>

            </span>
            </ModalContext.Provider>
        </div>        
    );
}

export default MainScreen;