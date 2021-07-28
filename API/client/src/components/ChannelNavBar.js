import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext, PAGE_CONTROL } from './MainScreen'


const ChannelNavBar = () => {
    const chat = useContext(ChatContext);

    return (

        <>
            <Container>
                <h1>Channels {chat.chatRoom.channel}</h1>
                <div>                   
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value})}  value="general">General</button></div>
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value })} value="random">Random</button></div>
                    <div> <button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value })} value="coding">Coding</button></div>
                </div>
                <br></br>
                <div><h1>Users</h1></div>
                <div>Hello</div>
            </Container>
        </>
        )
}


export default ChannelNavBar;