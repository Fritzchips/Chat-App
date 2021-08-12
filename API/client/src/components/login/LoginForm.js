import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import "./styling/LoginForm.css";



const LoginForm = () => {
    const chat = useContext(ChatContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [outcome, setOutcome] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        loginAccount(name, password);
    };

    const loginAccount = async (name, password) => {
        const checkAccountStatus = await axios.get(`api/login/confirmuser/${name}/${password}`);
        if (checkAccountStatus.data) {
            const loginInfo = await axios.get(`api/login/signin/${name}/${password}`);
            const accountInfo = loginInfo.data;
            chat.dispatch({ type: PAGE_CONTROL.SAVE_USER_INFO, value: accountInfo });
            createToken(accountInfo.name, accountInfo.id);
        } else {
            setOutcome("Sorry user doesn't exist");
            setName('');
            setPassword('');
        };
    };

    const createToken = async (name, id) => {
        const token = await axios.get(`api/token/newtoken/${name}/${id}`);
        chat.dispatch({ type: PAGE_CONTROL.SAVE_TOKEN, value: token.data });
    };

    return (
        <Form onSubmit={submitHandler} className="login-form-container">
            <h3>Login To Account</h3>
            <Form.Group className="mb-3" >
                <Form.Label >User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" required value={name} onChange={(e) => setName(e.target.value)} id="login-input-one" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} id="login-input-two" />
            </Form.Group>
            <Form.Text style={{ color: "red" }}>{outcome}</Form.Text>
            <br></br>
            <Button variant="primary" type="submit" id="login-submit-btn" >Sign In</Button>
        </Form>
    );
}

export default LoginForm;