import React from 'react';
import ChannelNavBar from './ChannelNavBar';
import MessageScreen from './MessageScreen';
import Container from 'react-bootstrap/Container';



const MainScreen = () => {
    return (
        <Container fluid className="d-flex flex-column" style={{height: "100vh"}}>
       
            <span style={{ backgroundColor: "purple", width:"100%"}}><h1>Welcome To Twinkle</h1></span>
           
            <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                <span style={{ backgroundColor: "purple", maxWidth: "200px" }}>
                    <ChannelNavBar />
                </span>

                <span style={{width: "100%"}}>
                    <MessageScreen />
                </span>
            </span>
        </Container>
    );
}

export default MainScreen;