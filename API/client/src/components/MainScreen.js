import React from 'react';
import ChannelNavBar from './ChannelNavBar';
import CodingChannel from './CodingChannel';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import RandomChannel from './RandomChannel';
import GeneralChannel from './GeneralChannel';



const MainScreen = () => {
    return (
        <Container fluid className="d-flex flex-column" style={{height: "100vh"}}>
       
            <span style={{ backgroundColor: "purple", width:"100%"}}><h1>Welcome To Twinkle</h1></span>
           
            <span className="d-flex justify-content-between align-items-stretch" style={{height: "100vh"}}>
                <span style={{ backgroundColor: "purple", maxWidth: "200px" }}>
                    <ChannelNavBar />
                </span>

                <span style={{ width: "100%" }}>
                    <Switch>
                        <Route exact path="/" component={GeneralChannel} />
                        <Route exact path="/random" component={RandomChannel} />
                        <Route exact path="/coding" component={CodingChannel} />
                    </Switch>
                </span>
            </span>
        </Container>
    );
}

export default MainScreen;