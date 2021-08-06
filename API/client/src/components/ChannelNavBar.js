import axios from 'axios';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext} from '../App';
import { PAGE_CONTROL } from '../hooks/useData';


const ChannelNavBar = () => {
    const chat = useContext(ChatContext);

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.chatRoom.jwToken}`
        }
    });


    return (

        <>
            <Container>
                <h1>Channels {chat.chatRoom.channel}</h1>
                <div>                   
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value })}  value="general">General</button></div>
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value })} value="random">Random</button></div>
                    <div> <button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANNEL_CHANGE, value: e.target.value })} value="coding">Coding</button></div>
                </div>
                <br></br>
                <div>
                    <h1>Active Users</h1>
                    {chat.chatRoom.activeUsers.length > 0 ? chat.chatRoom.activeUsers.map(user => (
                        <div key={user.id}>
                            <p>{user.name}</p>
                        </div>
                        )) : (<></>)}
                </div>
                
            </Container>
        </>
        )
}


export default ChannelNavBar;