
import React, { useContext , useState} from 'react';
import { PeopleFill, CaretRightFill, CaretDownFill , CodeSquare, Globe, CollectionFill, PatchQuestionFill} from 'react-bootstrap-icons';
import { ChatContext} from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import UserList from './UserList';
import "./styling/ChannelNavBar.css";

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
        <div className="channel-nav-cont">
               <br></br>
            <div onClick={showChannelHandler} >
                {showChannel ? (<CaretDownFill className="channel-nav-icon-indent" />) : (<CaretRightFill className="channel-nav-icon-indent"/>)}
                <CollectionFill className="channel-nav-icon"/>
                <span><strong className="channel-nav-header">Channels</strong></span>
            </div>
            {showChannel ?
                (<div className="channel-nav-room">
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "general" })} className="channel-nav-space">
                        <Globe className="channel-nav-icon"/>
                        <span>General</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "random" })} className="channel-nav-space">
                        <PatchQuestionFill className="channel-nav-icon"/>
                        <span>Random</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "coding" })} className="channel-nav-space">
                        <CodeSquare className="channel-nav-icon" />
                        <span>Coding</span>
                    </div>
                </div>) : (<></>)}
            <br></br>
            <div onClick={showUsersHandler} >
                {showUsers ? (<CaretDownFill className="channel-nav-icon-indent" />) : (<CaretRightFill className="channel-nav-icon-indent"/>)}
                <PeopleFill className="channel-nav-people"/>
                <strong className="channel-nav-header">Users</strong>
            </div>
            {showUsers ? (<UserList />) : (<></>)}
        </div>
    );
};


export default ChannelNavBar;