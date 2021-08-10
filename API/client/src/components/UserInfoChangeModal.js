import React, { useContext, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import useCrendetialManager from '../hooks/useCredentialManager';
import { CRED_CONTROL } from '../hooks/useCredentialManager';

const outerModal = {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100vw"
};

const UserInforChangeModal = ({ modalHandler }) => {
    const chat = useContext(ChatContext);
    const [credentials, setCredentials] = useCrendetialManager();

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async()=> {
        const userData = await authAxios.get(`/api/user/getuser/${chat.session.userId}`);
        const response = userData.data;
        console.log(response);
        setCredentials({ type: CRED_CONTROL.SAVE_USER_INFO, value: response });
    };
        
    const accountUpdateHandler = async (e) => {
        e.preventDefault();

        if (credentials.savedName === credentials.name && credentials.savedPassword === credentials.password) {
            await authAxios.post(`/api/user/updateuser/${credentials.selectedField}/${credentials.updatedUser}`);

            await chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
            localStorage.clear();
            chat.session.hubConnection.stop();
            
            alert("Please Sign In Again with you're new username and password");
        } else {
            setCredentials({ type: CRED_CONTROL.CHANGE_OUTCOME, value: "Invalid Name and/or Password" });
        };
        setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };

    const checkAvailability = async (e) => {
        e.preventDefault();
        let desiredName = credentials.selectedField === "Password" ? credentials.savedName : credentials.name;
        let desiredPassword = credentials.selectedField === "Name" ? credentials.savedPassword : credentials.password;

        const checkAccountStatus = await axios.get(`/api/login/confirmuser/${desiredName}/${desiredPassword}`);
        if (checkAccountStatus.data) {
            setCredentials({ type: CRED_CONTROL.CHANGE_OUTCOME, value: `${desiredName} and ${desiredPassword} combination is already taken` });
        } else {
            setCredentials({type: CRED_CONTROL.CHANGE_FORM, value:"Verification" })
            const updatedAccountInfo = JSON.stringify({
                Id: chat.session.userId,
                Name: desiredName,
                Password: desiredPassword
            });
            setCredentials({ type: CRED_CONTROL.SET_UPDATE_USER, value: updatedAccountInfo });
        };
        setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };

    const inputStyle = {
        borderRadius: "20px",
        width: "100%"

    };

    if (credentials.currentForm === "User Modify") {
        return (
            <Container style={outerModal}>
            <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>What Would you like to Change?  </Modal.Title><Button onClick={ modalHandler}>X</Button>
                </Modal.Header>
                    
                <Modal.Body>
                    <Form onSubmit={checkAvailability}>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Control as="select" onChange={e => setCredentials({ type: CRED_CONTROL.CHANGE_MODIFIEDFIELD, value: e.target.value })} style={{marginBottom: " 20px", width: "200px"}}>
                            <option value="Name">Name</option>
                            <option value="Password">Password</option>
                            <option value="Name and Password">Name and Password</option>
                            </Form.Control>
                        </Form.Group>

                        <p>Please Enter Your Desired {credentials.selectedField}</p>
                        <Form.Group style={{ display: `${credentials.selectedField === "Password" ? "none" : "block"}` }}>
                            <Form.Label>New Name</Form.Label>
                            <Form.Control type="text" style={ inputStyle} value={credentials.name} onChange={e => setCredentials({ type: CRED_CONTROL.NAME_INPUT, value: e.target.value })} required={credentials.selectedField === "Password" ? false : true} />
                        </Form.Group>

                        <Form.Group style={{ display: `${credentials.selectedField === "Name" ? "none" : "block"}` }}>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="text" style={inputStyle} value={credentials.password} onChange={e => setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required={credentials.selectedField === "Name" ? false : true} />
                            </Form.Group>
                            <br></br>
                        <Button type="submit">Verify</Button>
                    </Form>
                </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-center">
                    <p>{credentials.outcome}</p>       
                </Modal.Footer>
            </Modal.Dialog>
            </Container>
        );
    } else {
        return (
            <Container style={outerModal}>
                <Modal.Dialog>
                    <Modal.Header >
                        <Modal.Title>Verify your Name and Password  </Modal.Title><Button onClick={modalHandler}>X</Button>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={accountUpdateHandler}>

                            <p>Please Enter Your Name and Password</p>
                            <Form.Text className="text-muted">Confirm your identity to make to you { credentials.selectedField}</Form.Text>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" style={inputStyle} value={credentials.name} onChange={e => setCredentials({ type: CRED_CONTROL.NAME_INPUT, value: e.target.value })} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" style={inputStyle} value={credentials.password} onChange={e => setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required/>
                            </Form.Group>
                            <br></br>
                            <Button type="submit" >Submit</Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-center">
                        <p>{credentials.outcome}</p>
                    </Modal.Footer>
                </Modal.Dialog>
            </Container>
        );
    };
}

export default UserInforChangeModal;