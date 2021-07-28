import React, { useEffect, useReducer} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { v4 as uuidv4 } from 'uuid';


export const ChatContext = React.createContext();

export const PAGE_CONTROL = {
    INPUT: "input",
    SUBMIT: "submit",
    CHANNEL_CHANGE: "channel change"
};

const initialState = {
    channel: 'general',
    userId: 'e53e4185-16e9-4c1c-b87e-ad6e0164acb7',
    channelId: '495da565-a839-467f-8eb9-ad6f0124bcbd',
    message: '',
    messageList: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case PAGE_CONTROL.INPUT:
            return (state = { ...state, message: action.value });
        case PAGE_CONTROL.SUBMIT:
            messageList.push(action.value);
            message = '';
            return state;
        case PAGE_CONTROL.CHANNEL_CHANGE:
            return (state = { ...state, channel: action.value });





        default:
            return state;
    };
};


const MainScreen = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log(chatRoom);
    }, [chatRoom]);

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