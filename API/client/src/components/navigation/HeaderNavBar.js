import React, { useContext, useState } from 'react';
import { PersonCircle, Stars ,List } from 'react-bootstrap-icons';
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import UserInfoChangeModal from '../infoUpdate/UserInfoChangeModal';
import "./styling/HeaderNavBar.css";
import { ModalContext } from '../chatroom/MainScreen';



const HeaderNavBar = ({ channelNavHandler}) => {
    const chat = useContext(ChatContext);
    
    const [userMenu, setUserMenu] = useState(false);
    const popup = useContext(ModalContext);

    const logoutHandler = () => {
        localStorage.clear();
        chat.session.hubConnection.stop();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };

    const userMenuHandler = () => {
        if (userMenu) {
            setUserMenu(false);
        } else {
            setUserMenu(true);
        };
    };

    return (
        <div className="head-nav-cont">
            <Navbar className="justify-content-between head-nav-style">
                <div onClick={channelNavHandler} className="head-nav-left">
                    <List className="head-nav-list"/>
                    <span>Menu</span>
                </div>
                <div >
                    <Stars className="head-nav-stars"/>
                    <strong className="head-nav-title">Twinkle</strong>
                    <Stars className="head-nav-stars-invert"/>
                </div>

                <div className="d-inline mx-2 head-nav-right" >
                    <div className="d-flex justify-content-center align-items-center" onClick={userMenuHandler}>
                        <PersonCircle className="head-nav-person" />
                        <strong className="head-nav-name">{chat.session.userName}</strong>
                    </div>
                    {userMenu ?
                        (<div className="head-nav-dropdown">
                            {chat.session.userId !== "5bad7a56-3d70-4439-814f-5db0f39966f0" && chat.session.userName !== "Guest" ?
                                (<div onClick={popup.modalHandler} className="head-nav-drop-item">Settings</div>)
                                : <></>}

                            <div onClick={logoutHandler} className="head-nav-drop-item" >Log Out</div>

                        </div>) : <></>}
                </div>
            </Navbar>
            
            {popup.modal ? (<UserInfoChangeModal />) : <></>}
            
       </div>
    );
};


export default HeaderNavBar;