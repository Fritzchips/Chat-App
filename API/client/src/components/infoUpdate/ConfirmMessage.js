import React, { useContext } from 'react';
import { FormChangeContext } from './UserInfoChangeModal';
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./styling/ModifyUser.css";


const ConfirmMessage = () => {
    const chat = useContext(ChatContext);
    const client = useContext(FormChangeContext);

    const logoutHandler = async () => {
        localStorage.clear();
        chat.session.hubConnection.stop();
        chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
    };

    return (
        <>
            <Modal.Dialog>
                <Modal.Header className="modal-head-foot">
                    <Modal.Title className="modal-title-color">Identity Confirmed!</Modal.Title>
                    <Button onClick={logoutHandler} id="modal-exit-btn2">X</Button>
                </Modal.Header>

                <Modal.Body>
                        <p><strong>{client.credentials.selectedField}</strong> has been updated</p>
                        <p className="text-muted">Please sign in again with your new name and password</p>
                        <br></br>
                        <Button type="submit" onClick={ logoutHandler}>Log Out</Button>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center modal-head-foot">
                </Modal.Footer>
            </Modal.Dialog>
        </>
    );
}

export default ConfirmMessage;