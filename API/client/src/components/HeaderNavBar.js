import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { PersonCircle, Stars } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import UserInfoChangeModal from './UserInfoChangeModal';


const HeaderNavBar = () => {
    const chat = useContext(ChatContext);
    const [modal, setModal] = useState(false);

    const logoutHandler = () => {
        localStorage.clear();
        chat.session.hubConnection.stop();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };

    const modalHandler = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        };
    };

    return (
        <div style={{ minWidth: "100%" }}>
            <Navbar
                collapseOnSelect
                expand="sm"
                variant="dark"
                className="justify-content-around"
                style={{ backgroundColor: "purple", width: "100%" }}
            >
                <div className="d-flex flex-column justify-content-center align-items-start">
                    <PersonCircle style={{ fontSize: "40px" }} />
                    <strong>{chat.session.userName}</strong>
                </div>
                <div>
                    <Stars style={{ fontSize: "25px" }}/>
                    <strong style={{fontSize: "25px"}}>Twinkle</strong>
                </div>
                <div>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        style={{ marginRight: "5%" }}
                    />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto d-flex flex-row justify-content-around">
                            <Button onClick={modalHandler} > Settings </Button>
                            <Button onClick={logoutHandler}> Log Out </Button>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            {modal ? (<UserInfoChangeModal modalHandler={modalHandler} />) : <></>}
       </div>
    );
};


export default HeaderNavBar;