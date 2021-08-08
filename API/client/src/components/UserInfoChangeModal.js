import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useData';

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
}



const UserInforChangeModal = ({ modalHandler }) => {
    const chat = useContext(ChatContext);

    const [changeForm, setChangeForm] = useState("unconfirmed");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [outcome, setOutcome] = useState('');
    const [changeField, setChangeField] = useState('Name');
    const [item, setItem] = useState('');

    useEffect(() => {
        async function grabUser() {
            const userData = await axios.get(`/api/user/getuser/${chat.session.userId}`);
            const response = userData.data;
            setName(response.name);
            setPassword(response.password);
        };
        grabUser();
    }, []);

    useEffect(() => {
        console.log(`changefield value: ${changeField}`);
    }, [changeField]);

    const accountUpdateHandler = async (e) => {
        e.preventDefault();

        if (name === newName && password === newPassword) {
            const changeData = await axios.post(`/api/user/updateuser/${changeField}/${item}`);
            console.log(changeData.data);
            localStorage.clear();
            chat.dispatch({ type: PAGE_CONTROL.LOG_OUT });
            alert("Please Sign In Again with you're new username and password");
        } else {
            setOutcome("Invalid Name and/or Password");
        };
        setNewName("");
        setNewPassword("");
    };

    const checkAvailability = async (e) => {
        e.preventDefault();
        let desiredName = name;
        let desiredPassword = password;
        if (changeField === "Name") {
            desiredName = newName;
        } else if (changeField === "Password") {
            desiredPassword = newPassword;
        } else {
            desiredName = newName;
            desiredPassword = newPassword;
        };
        const checkInfo = await axios.get(`/api/login/checkuser/${desiredName}/${desiredPassword}`);
        if (checkInfo.data) {
            setOutcome("Name and Password combination is already taken");
        } else {
            setChangeForm("confirmed");
            const newItem = JSON.stringify({
                Id: chat.session.userId,
                Name: desiredName,
                Password: desiredPassword
            });
            setItem(newItem);
            setOutcome("");
        };
        setNewName("");
        setNewPassword("");
    };

    if (changeForm === "unconfirmed") {

        return (

            <Container style={outerModal}>
                <div style={{width: "500px", backgroundColor: "white", border: "4px solid black", borderRadius: "10px"}}>
                <header><button onClick={ modalHandler}>X</button></header>
                <h1>What Would you like to Change</h1>
                <select onChange={ e => setChangeField(e.target.value)}>
                <option value="Name">Name</option>
                <option value="Password">Password</option>
                <option value="Both">Name and Password</option>
                </select>

                <form onSubmit={ checkAvailability}>
                    <p>Please Enter Your new Name and Password</p>
                    <div style={{ display: `${changeField === "Password" ? "none" : "block"}` }}>
                        <label>New Name</label>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required={changeField === "Password" ? false : true}  />
                    </div>
                    <div style={{ display: `${changeField === "Name" ? "none" : "block"}` }}>
                        <label>New Password</label>
                        <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} required={changeField === "Name" ? false : true}  />
                    </div>
                    <p>{ outcome }</p>
                    <button>Verify</button>
                    </form>
                    </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <h1>Change User Info</h1>
                <form onSubmit={ accountUpdateHandler}>
                    <p>Please Enter Your Name and Password</p>
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required />
                    <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    <p>{ outcome}</p>
                    <button>Submit</button>
                    </form>

            </Container>
        );
    };
}

export default UserInforChangeModal;