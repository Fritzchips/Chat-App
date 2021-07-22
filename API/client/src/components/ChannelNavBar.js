import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';


const ChannelNavBar = () => {

    const [currentChannel, setCurrentChannel] = useState('general')

    const channelHandler = (e) => {
        e.preventDefault();
        setCurrentChannel(e.target.value);
    }

    return (

        <>
            <Container>
                <h1>Channels {currentChannel}</h1>
                <div>                   
                    <div><button onClick={channelHandler}  value="general">General</button></div>                  
                    <div><button onClick={channelHandler} value="random">Random</button></div>
                    <div> <button onClick={channelHandler} value="coding">Coding</button></div>
                </div>
                <br></br>
                <div><h1>Users</h1></div>
                <div>Hello</div>
            </Container>
        </>
        )
}


export default ChannelNavBar;