
import React, { useContext , useState} from 'react';
import { PeopleFill, CaretRightFill, CaretDownFill , CodeSquare, Globe, CollectionFill, PatchQuestionFill} from 'react-bootstrap-icons';
import { ChatContext} from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
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
               <br></br>
            <div onClick={showChannelHandler} >
                {showChannel ? (<CaretDownFill style={{ marginRight: "5px" }} />) : (<CaretRightFill style={{ marginRight: "5px" }}/>)}
                <CollectionFill style={{ marginRight: "5px", color: "#5CD6FF"}}/>
                <span><strong style={{fontSize: "18px", color: "white"}}>Channels</strong></span>
            </div>
            {showChannel ?
                (<div>
                    <hr></hr>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "general" })} >
                        <Globe style={{ marginRight: "5px", color: "#5CD6FF"}}/>
                        <span style={{ color: "white" }}>General</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "random" })} style={{ marginTop: "5px" }}>
                        <PatchQuestionFill style={{ marginRight: "5px", color: "#5CD6FF"}}/>
                        <span style={{ color: "white" }}>Random</span>
                    </div>
                    <div onClick={() => chat.dispatch({ type: PAGE_CONTROL.CHANGE_CHANNEL, value: "coding" })} style={{ marginTop: "5px" }}>
                        <CodeSquare style={{ marginRight: "5px", color: "#5CD6FF"}} />
                        <span style={{ color: "white" }}>Coding</span>
                    </div>
                </div>) : (<></>)}

            <hr></hr>
            <div onClick={showUsersHandler} >
                {showUsers ? (<CaretDownFill style={{ marginRight: "5px" }} />) : (<CaretRightFill style={{ marginRight: "5px" }}/>)}
                <PeopleFill style={{ marginRight: "5px" , color: "lightgreen"}}/>
                <strong style={{ fontSize: "18px", color: "white" }}>Users</strong>
            </div>
            <hr></hr>
            {showUsers ? (<ActiveUserList />) : (<></>)}
        </div>
    );
};


export default ChannelNavBar;