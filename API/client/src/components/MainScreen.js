import React, { useState , useEffect} from 'react';
import ChannelNavBar from './ChannelNavBar';
import Container from 'react-bootstrap/Container';
import ChatScreen from './ChatScreen';
import axios from 'axios';



const MainScreen = () => {
    const [channel, setChannel] = useState('general');
    const [user, setUser] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        console.log(`you're in ${channel}`)
        //getChannelMessages(channel);
    }, [channel]);

    //async function getChannelMessages(channel) {
    // const data = await axios.get(`/api/messages/${channel}`);
    // setMessageList([...data]);
    //}

    return (
        <Container fluid className="d-flex flex-column" style={{height: "100vh"}}>
       
            <span style={{ backgroundColor: "purple", width:"100%"}}><h1>Welcome To Twinkle</h1></span>
           
            <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                <span style={{ backgroundColor: "purple", maxWidth: "200px" }}>
                    <ChannelNavBar />
                </span>

                <span style={{ width: "100%" }}>
                   <ChatScreen  />
                </span>
            </span>
        </Container>
    );
}

export default MainScreen;