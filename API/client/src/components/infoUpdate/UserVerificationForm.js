import React, { useContext } from 'react';
import { FormChangeContext } from './UserInfoChangeModal';
import { ChatContext } from '../../App';
import { CRED_CONTROL } from '../../hooks/useCredentialManager';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalContext } from '../navigation/HeaderNavBar';
import "./styling/ModifyUser.css";


const UserVerificationForm = () => {
    const chat = useContext(ChatContext);
    const client = useContext(FormChangeContext);
    const popup = useContext(ModalContext);

    const inputStyle = {
        borderRadius: "20px",
        width: "100%"

    };
    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    const accountUpdateHandler = async (e) => {
        e.preventDefault();

        if (client.credentials.savedName === client.credentials.name && client.credentials.savedPassword === client.credentials.password) {
            await authAxios.post(`/api/user/updateuser/${client.credentials.selectedField}/${client.credentials.updatedUser}`);

            await chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
            localStorage.clear();
            await chat.session.hubConnection.stop();

            alert("Please Sign In Again with your new username and password");
        } else {
            client.setCredentials({ type: CRED_CONTROL.CHANGE_OUTCOME, value: "Invalid Name and/or Password" });
        };
        client.setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };


    return (
        <>
            <Modal.Dialog>
                <Modal.Header className="modal-head-foot">
                    <Modal.Title className="modal-title-color">Verify your Name and Password  </Modal.Title>
                    <Button onClick={popup.modalHandler} id="modal-exit-btn2">X</Button>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={accountUpdateHandler}>

                        <p>Please Enter Your Name and Password</p>
                        <Form.Text className="text-muted">Confirm your identity to make changes your account</Form.Text>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" style={inputStyle} value={client.credentials.name} onChange={e => client.setCredentials({ type: CRED_CONTROL.NAME_INPUT, value: e.target.value })} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" style={inputStyle} value={client.credentials.password} onChange={e => client.setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required />
                        </Form.Group>
                        <br></br>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center modal-head-foot">
                    <p>{client.credentials.outcome}</p>
                </Modal.Footer>
            </Modal.Dialog>
        </>
    );
}

export default UserVerificationForm;