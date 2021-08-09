import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext} from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';


const ChannelNavBar = () => {
    const chat = useContext(ChatContext);

    return (
        <Container>
            <h1>Channels</h1>
            <div>
                <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="general">General</button></div>
                <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="random">Random</button></div>
                <div> <button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="coding">Coding</button></div>
            </div>
            <br></br>
            <div>
                <h1>Active Users</h1>
                {chat.session.activeUsersList.length > 0 ? chat.session.activeUsersList.map(user => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                    </div>
                )) : (<></>)}
            </div>
        </Container>
    );
};


export default ChannelNavBar;