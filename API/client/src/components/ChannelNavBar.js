import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const ChannelNavBar = () => {

    const [currentChannel, setCurrentChannel] = useState('general')

    const channelHandler = (e) => {
        e.preventDefault();
        setCurrentChannel(e.target.value);
    }

    //make the words into links
    //http request with axios when state changes
    //state goes directly into messages
    //request goes to controller that gets request 
    return (
        <>
            <Container>
                <h1>Channels {currentChannel}</h1>
                <div>
                    <Link to="/" >general </Link>
                    <Link to="/" ><div><button onClick={channelHandler}  value="general">General</button></div></Link>
                    <Link to="/random" >random</Link>
                    <Link to="/random" ><div><button onClick={channelHandler} value="random">Random</button></div></Link>
                    <Link to="/coding" >coding</Link>
                    <Link to="/coding" ><div> <button onClick={channelHandler} value="coding">Coding</button></div></Link>
                </div>
                <br></br>
                <div><h1>Users</h1></div>
                <div>Hello</div>
            </Container>
        </>
        )
}


export default ChannelNavBar;