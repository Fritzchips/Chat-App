import React, { useContext, useState } from 'react';
import { PersonCircle, Stars ,List } from 'react-bootstrap-icons';
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import UserInfoChangeModal from '../infoUpdate/UserInfoChangeModal';

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
                style={{ backgroundColor: "#023059", width: "100%" }}
            >
                <div onClick={channelNavHandler} style={{ marginLeft: "15px" , fontSize: "20px"}}>
                    <List style={{ marginRight: "5px", color: "#04B2D9" }}/>
                    <span style={{ color: "white"}}>Menu</span>
                </div>
                <div >
                    <Stars style={{ fontSize: "20px", color: "#04B2D9"}}/>
                    <strong style={{ fontSize: "20px", marginLeft: "10px", marginRight: "10px", color: "white"}}>Twinkle</strong>
                    <Stars style={{ fontSize: "20px", transform: "scale(-1, 1)", color: "#04B2D9"}} />
                </div>

                <div className="d-inline mx-2" style={{ marginRight: "15px" }} >
                    <div id="dropdown-autoclose-true" className="d-flex justify-content-center align-items-center" onClick={userMenuHandler}>
                        <PersonCircle style={{ fontSize: "20px", marginRight: "10px", color: "lightgreen" }} />
                        <strong style={{ fontSize: "20px", color: "white"}}>{chat.session.userName}</strong>
                    </div>
                    {userMenu ?
                        (<div style={{ position: "absolute", backgroundColor: "#023059", right: "0", padding: "10px", borderRadius: "10px"}}>
                            <div onClick={modalHandler} style={{color: "white"}}>Settings</div>
                            <div onClick={logoutHandler} style={{color: "white"}}>Log Out</div>
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