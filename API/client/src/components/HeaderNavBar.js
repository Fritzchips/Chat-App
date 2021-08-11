import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { PersonCircle, Stars ,List } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import UserInfoChangeModal from './UserInfoChangeModal';

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
        <div style={{ minWidth: "100%" }}>
            <Navbar
                collapseOnSelect
                expand="sm"
                variant="dark"
                className="justify-content-between"
                style={{ backgroundColor: "purple", width: "100%" }}
            >
                <div onClick={channelNavHandler} style={{ marginLeft: "10px" , fontSize: "20px"}}>
                    <List />
                    <span>Menu</span>
                </div>
                <div >
                    <Stars style={{ fontSize: "20px" }}/>
                    <strong style={{ fontSize: "20px", marginLeft: "10px" , marginRight: "10px"}}>Twinkle</strong>
                    <Stars style={{ fontSize: "20px" ,transform: "scale(-1, 1)"}} />
                </div>

                <div className="d-inline mx-2" style={{ marginRight: "10px" }} >
                    <div id="dropdown-autoclose-true" className="d-flex justify-content-center align-items-center" onClick={userMenuHandler}>
                        <PersonCircle style={{ fontSize: "20px", marginRight: "10px" }} />
                        <strong style={{ fontSize: "20px" }}>{chat.session.userName}</strong>
                    </div>
                    {userMenu ?
                        (<div style={{position: "absolute", backgroundColor: "white"}}>
                            <div onClick={modalHandler}>Settings</div>
                            <div onClick={logoutHandler}>Log Out</div>
                        </div>) : <></>}
                </div>
                {/*<Dropdown className="d-inline mx-2" style={{ marginRight: "10px" }} >*/}
                {/*    <Dropdown.Toggle id="dropdown-autoclose-true" className="d-flex justify-content-center align-items-center">*/}
                {/*        <PersonCircle style={{ fontSize: "20px", marginRight: "10px" }} />*/}
                {/*        <strong style={{ fontSize: "20px" }}>{chat.session.userName}</strong>*/}
                {/*    </Dropdown.Toggle>*/}

                {/*    <Dropdown.Menu>*/}
                {/*        <Dropdown.Item onClick={modalHandler}>Modify User</Dropdown.Item>*/}
                {/*        <Dropdown.Item onClick={logoutHandler}>Log Out</Dropdown.Item>*/}
                {/*    </Dropdown.Menu>*/}
                {/*</Dropdown>*/}

            </Navbar>
            <ModalContext.Provider value={{ modalHandler: modalHandler }}>
                {modal ? (<UserInfoChangeModal />) : <></>}
            </ModalContext.Provider>
       </div>
    );
};


export default HeaderNavBar;