import React, { useContext, useState } from 'react';
import { PersonCircle, Stars ,List } from 'react-bootstrap-icons';
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import UserInfoChangeModal from '../infoUpdate/UserInfoChangeModal';
import "./styling/HeaderNavBar.css";

export const ModalContext = React.createContext();

const HeaderNavBar = ({ channelNavHandler}) => {
    const chat = useContext(ChatContext);
    const [modal, setModal] = useState(false);
    const [userMenu, setUserMenu] = useState(false);

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
                            {chat.session.userId !== "f6bfbe52-8768-4f94-97d4-7c38aa338fc4" && chat.session.userName !== "Guest" ?
                                (<div onClick={modalHandler} className="head-nav-drop-item">Settings</div>)
                                : <></>}

                            <div onClick={logoutHandler} className="head-nav-drop-item" >Log Out</div>

                        </div>) : <></>}
                </div>
            </Navbar>
            <ModalContext.Provider value={{ modalHandler: modalHandler }}>
                {modal ? (<UserInfoChangeModal />) : <></>}
            </ModalContext.Provider>
       </div>
    );
};


export default HeaderNavBar;