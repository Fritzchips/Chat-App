import React, { useContext } from 'react';
import { ChatContext } from '../../App';
import { FormChangeContext } from './UserInfoChangeModal';
import { CRED_CONTROL } from '../../hooks/useCredentialManager';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalContext } from '../navigation/HeaderNavBar';


const UserModifyForm = ({modalHandler }) => {
    const chat = useContext(ChatContext);
    const client = useContext(FormChangeContext);
    const popup = useContext(ModalContext);
    const inputStyle = {
        borderRadius: "20px",
        width: "100%"

    };

    const checkAvailability = async (e) => {
        e.preventDefault();
        let desiredName = client.credentials.selectedField === "Password" ? client.credentials.savedName : client.credentials.name;
        let desiredPassword = client.credentials.selectedField === "Name" ? client.credentials.savedPassword : client.credentials.password;

        const checkAccountStatus = await axios.get(`/api/login/confirmuser/${desiredName}/${desiredPassword}`);
        if (checkAccountStatus.data) {
            client.setCredentials({ type: CRED_CONTROL.CHANGE_OUTCOME, value: `${desiredName} and ${desiredPassword} combination is already taken` });
        } else {
            client.setCredentials({ type: CRED_CONTROL.CHANGE_FORM, value: "Verification" })
            const updatedAccountInfo = JSON.stringify({
                Id: chat.session.userId,
                Name: desiredName,
                Password: desiredPassword
            });
            client.setCredentials({ type: CRED_CONTROL.SET_UPDATE_USER, value: updatedAccountInfo });
        };
        client.setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };

    return (
        <>
            <Modal.Dialog>
                <Modal.Header style={{ backgroundColor: "#023059" }}>
                    <Modal.Title style={{ color: "white" }}>What Would you like to Change?  </Modal.Title><Button onClick={popup.modalHandler} style={{ marginLeft: "10px", backgroundColor: "#023059", border: "#023059" }}>X</Button>
                    
                </Modal.Header>

                <Modal.Body >
                    <Form onSubmit={checkAvailability}>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Control as="select" onChange={e => client.setCredentials({ type: CRED_CONTROL.CHANGE_MODIFIEDFIELD, value: e.target.value })} style={{ marginBottom: " 20px", width: "200px" }}>
                                <option value="Name">Name</option>
                                <option value="Password">Password</option>
                                <option value="Name and Password">Name and Password</option>
                            </Form.Control>
                        </Form.Group>

                        <p>Please Enter Your Desired <strong>{client.credentials.selectedField}</strong></p>
                        <Form.Group style={{ display: `${client.credentials.selectedField === "Password" ? "none" : "block"}` }}>
                            <Form.Label>New Name</Form.Label>
                            <Form.Control type="text" style={inputStyle} value={client.credentials.name} onChange={e => client.setCredentials({ type: CRED_CONTROL.NAME_INPUT, value: e.target.value })} required={client.credentials.selectedField === "Password" ? false : true} />
                        </Form.Group>

                        <Form.Group style={{ display: `${client.credentials.selectedField === "Name" ? "none" : "block"}` }}>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="text" style={inputStyle} value={client.credentials.password} onChange={e => client.setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required={client.credentials.selectedField === "Name" ? false : true} />
                        </Form.Group>
                        <br></br>
                        <Button type="submit" style={{ borderRadius: "10px", backgroundColor: "#04B2D9", border: "#04B2D9" }}>Verify</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center" style={{ backgroundColor: "#023059" }}>
                    <p>{client.credentials.outcome}</p>
                </Modal.Footer>
            </Modal.Dialog>
        </>
    );
}

export default UserModifyForm;