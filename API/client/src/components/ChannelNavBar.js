
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
  
            <div onClick={showChannelHandler}>
                {showChannel ? (<CaretDownFill />) : (<CaretRightFill/>)}
                <CollectionFill />
                <span>Channels</span>
            </div>
            {showChannel ?
                (<div>
                    <hr></hr>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "general"})} >
                        <Globe />
                        <span>General</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "random"})} >
                        <PatchQuestionFill />
                        <span>Random</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "coding" })} >
                        <CodeSquare />
                        <span>Coding</span>
                    </div>
                </div>) : (<></>)}

            <hr></hr>
            <div onClick={showUsersHandler}>
                {showUsers ? (<CaretDownFill />) : (<CaretRightFill />)}
                <People />
                <strong>Users</strong>
            </div>
            <hr></hr>
            {showUsers ? (<ActiveUserList />) : (<></>)}
        </div>
    );
};


export default ChannelNavBar;