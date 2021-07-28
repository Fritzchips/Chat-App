import React, { useEffect, useReducer} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import { v4 as uuidv4 } from 'uuid';
import * as signalR from '@microsoft/signalr';

export const ChatContext = React.createContext();

export const PAGE_CONTROL = {
    INPUT,
    SUBMIT
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
            return (state = { ...action.value });
        case PAGE_CONTROL.SUBMIT:
            chatHandler();





        default:
            return state;
    };
};



const MainScreen = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);


    const connection = new signalR.HubConnectionBuilder().withUrl("/general").build();

    connection.start().catch(function (err) {
        return console.error(err);
    });

    connection.on("ReceiveMessage", function (repliedMsg) {
        console.log(`${repliedMsg} was received from server`);
    });

        
    const chatHandler = (e) => {
        e.preventDefault();
        if (message) {

            var message = JSON.stringify({
                    Id: uuidv4(),
                    ChannelId: channelId,
                    UserId: userId,
                    Date: new Date(),
                    Context: message
                });

            connection.invoke("SendMessageAll", message).catch(function (err) {
                console.error(err);
            });

            //    /*const data = await axios.get(`/api/user/createmessage/${message.data}`);*/

        }

    }


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

                {/*<form onSubmit={ chatHandler}>*/}
                {/*    <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />*/}
                {/*    <button>submit</button>*/}
                {/*</form>*/}
            </Container>
         </ChatContext.Provider>
    );
}

export default MainScreen;