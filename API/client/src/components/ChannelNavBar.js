
import React, { useContext , useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { People, CaretRightFill, CaretDownFill , CodeSquare, Globe, CollectionFill, PatchQuestionFill} from 'react-bootstrap-icons';
import { ChatContext} from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import ActiveUserList from './ActiveUserList';

const ChannelNavBar = () => {

    const chat = useContext(ChatContext);
    const [showChannel, setShowChannel] = useState(true);
    const [showUsers, setShowUsers] = useState(true);

    const showChannelHandler = () => {
        if (showChannel) {
            setShowChannel(false);
        } else {
            setShowChannel(true);
        };
    };

    const showUsersHandler = () => {
        if (showUsers) {
            setShowUsers(false);
        } else {
            setShowUsers(true);
        };
    };

    return (
        <div style={{maxHeight: "100vh"}}>
            <hr></hr>
            <CaretRightFill /><CaretDownFill />
            <CollectionFill />
            <p onClick={showChannelHandler}>Channels</p>
            {showChannel ?
                (<div>
                    <hr></hr>
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="general"><Globe />General</button></div>
                    <div><button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="random"><PatchQuestionFill />Random</button></div>
                    <div> <button onClick={e => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: e.target.value })} value="coding"><CodeSquare /> Coding</button></div>
                </div>) : (<></>)}

            <hr></hr>
            <div onClick={showUsersHandler}><People /> <strong>Users</strong></div>
            <hr></hr>
            {showUsers ? (<ActiveUserList />) : (<></>)}
        </div>
    );
};


export default ChannelNavBar;