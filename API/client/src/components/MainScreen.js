import React, { useEffect, useReducer} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { v4 as uuidv4 } from 'uuid';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';



export const ChatContext = React.createContext();

export const PAGE_CONTROL = {
    INPUT: "input",
    SUBMIT: "submit",
    CHANNEL_CHANGE: "channel change",
    CONNECTION: "hub connection",
    CHANNEL_DATA: "database messages",
    USER_DATA: "database users",
    ACTIVE_USERS: "active users"

};

const initialState = {
    channel: 'general',
    user: 'John',
    userId: 'e53e4185-16e9-4c1c-b87e-ad6e0164acb7',
    channelId: '495da565-a839-467f-8eb9-ad6f0124bcbd',
    message: '',
    messageList: [],
    activeUsers: [],
    hubConnection: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case PAGE_CONTROL.INPUT:
            return (state = { ...state, message: action.value });
        case PAGE_CONTROL.SUBMIT:
            state.messageList.push(action.value);
            return (state = {...state, message: ''});
        case PAGE_CONTROL.CHANNEL_CHANGE:
            return (state = { ...state, channel: action.value });

        case PAGE_CONTROL.CONNECTION:
            state.hubConnection = action.value;
            return state;
        case PAGE_CONTROL.CHANNEL_DATA:
            state.messageList = [...action.value];
            return (state = { ...state });
        case PAGE_CONTROL.USER_DATA:
            state.activeUsers = [...action.value];
            return (state = { ...state });
        case PAGE_CONTROL.ACTIVE_USERS:
            state.activeUsers.push(action.value);
            return (state = { ...state });

        default:
            return state;
    };
};


const MainScreen = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);

    useEffect(async () => {

        try {
            const connection = new HubConnectionBuilder().withUrl("/general")
                .configureLogging(LogLevel.Information).build();

            dispatch({ type: PAGE_CONTROL.CONNECTION, value: connection });

            connection.on("ReceiveGreeting", function (repliedMsg) {
                console.log(`${repliedMsg}`);
                dispatch({ type: PAGE_CONTROL.ACTIVE_USERS, value: repliedMsg });
            });

            connection.on("ReceiveMessage", function (allMessage) {
                dispatch({ type: PAGE_CONTROL.SUBMIT, value: allMessage });
            });

            connection.on("DataReceived", function (messageTable, listOfUsers) {
                dispatch({ type: PAGE_CONTROL.CHANNEL_DATA, value: messageTable });
                //dispatch({ type: PAGE_CONTROL.USER_DATA, value: listOfUsers });
                console.log(chatRoom.messageList);
                console.log(`this is the list of users ${listOfUsers}`);
            });

            await connection.start();

            await connection.invoke("JoinRoom", chatRoom.user, chatRoom.channelId).catch(function (err) {
                console.error(err);

            });

        } catch (e) {
            console.error(e);
        }

    }, []);


    return (
        <ChatContext.Provider value={{chatRoom: chatRoom, dispatch: dispatch }}>
            <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
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
         </ChatContext.Provider>
    );
}

export default MainScreen;