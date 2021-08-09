import React, { useContext, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
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
    const [credentials, setCredentials] = useCrendetialManager;

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

        if (credentials.name === credentials.newName && credentials.password === credentials.newPassword) {
            await axios.post(`/api/user/updateuser/${credentials.changeField}/${credentials.item}`);
            localStorage.clear();
            chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
            alert("Please Sign In Again with you're new username and password");
        } else {
            setCredentials({ type: CRED_CONTROL.CHANGE_OUTCOME, value: "Invalid Name and/or Password" });
        };
        setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };

    const checkAvailability = async (e) => {
        e.preventDefault();
        let desiredName = credentials.changeField === "Password" ? credentials.name : credentials.newName;
        let desiredPassword = credentials.changeField === "Name" ? credentials.password : credentials.newPassword;

        const checkAccountStatus = await axios.get(`/api/login/checkuser/${desiredName}/${desiredPassword}`);
        if (checkAccountStatus.data) {
            setCredentials({ type: 'SetOutcome', value: `${desiredName} and ${desiredPassword} combination is already taken` });
        } else {
            setCredentials({type: CRED_CONTROL.CHANGE_FORM, value:"confirmed" })
            const updatedAccountInfo = JSON.stringify({
                Id: chat.session.userId,
                Name: desiredName,
                Password: desiredPassword
            });
            setCredentials({ type: CRED_CONTROL.SET_UPDATE_USER, value: updatedAccountInfo });
        };
        setCredentials({ type: CRED_CONTROL.CLEAR_INPUT, value: '' });
    };

    if (credentials.changeForm === "unconfirmed") {
        return (
            <Container style={outerModal}>
                <div style={{width: "500px", backgroundColor: "white", border: "4px solid black", borderRadius: "10px"}}>
                <header><button onClick={ modalHandler}>X</button></header>
                    <h1>What Would you like to Change</h1>
                    //
                <select onChange={e => setCredentials({ type: CRED_CONTROL.CHANGE_MODIFIEDFIELD, value: e.target.value })}>
                <option value="Name">Name</option>
                <option value="Password">Password</option>
                <option value="Both">Name and Password</option>
                </select>

                <form onSubmit={ checkAvailability}>
                    <p>Please Enter Your new Name and Password</p>
                        <div style={{ display: `${credentials.changeField === "Password" ? "none" : "block"}` }}>
                        <label>New Name</label>
                        <input type="text" value={credentials.newName} onChange={e => setCredentials({ type: CRED_CONTROL.NAME_INPUT,value: e.target.value })} required={credentials.changeField === "Password" ? false : true}  />
                    </div>
                    <div style={{ display: `${credentials.changeField === "Name" ? "none" : "block"}` }}>
                        <label>New Password</label>
                        <input type="text" value={credentials.newPassword} onChange={e => setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required={credentials.changeField === "Name" ? false : true}  />
                    </div>
                    <p>{ credentials.outcome }</p>
                    <button>Verify</button>
                    </form>
                    </div>
            </Container>
        );
    } else {
        return (
            <Container style={outerModal}>
                <div style={{ width: "500px", backgroundColor: "white", border: "4px solid black", borderRadius: "10px" }}>
                <header><button onClick={modalHandler}>X</button></header>
                <h1>Change User Info</h1>
                <form onSubmit={ accountUpdateHandler}>
                    <p>Please Enter Your Name and Password</p>
                    <input type="text" value={credentials.newName} onChange={e => setCredentials({ type: CRED_CONTROL.NAME_INPUT, value: e.target.value })} required />
                    <input type="text" value={credentials.newPassword} onChange={e => setCredentials({ type: CRED_CONTROL.PASSWORD_INPUT, value: e.target.value })} required />
                    <p>{ credentials.outcome}</p>
                    <button>Submit</button>
                    </form>
                </div>
            </Container>
        );
    };
}

export default UserInforChangeModal;