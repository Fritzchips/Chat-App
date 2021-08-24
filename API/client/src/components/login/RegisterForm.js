import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./styling/LoginForm.css";


const RegisterForm = () => {   

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [outcome, setOutcome] = useState('');

    const submitHandler = e => {
        e.preventDefault();
         createAccount(name, password);
    };

    const createAccount = async (name, password) => {
        const checkAccountStatus = await axios.get(`api/login/confirmuser/${name}/${password}`);
        if (checkAccountStatus.data) {
            setOutcome("Sorry User is already taken");
            setName('');
            setPassword('');
        } else {
            const newUserInfo = JSON.stringify({
                Id: uuidv4,
                Name: name,
                password: password
            });
            await axios.post(`api/login/signup/${newUserInfo}`);
            setOutcome(`${name}'s account was made, Please Login`);
        };
    };

    return (
  
        <Form onSubmit={submitHandler} className="login-form-container">
            <h3 >Register New User</h3>
            <Form.Group className="mb-3">
                <Form.Label >User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" required value={name} onChange={(e) => setName(e.target.value)} id="register-input-one" maxLength="10" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} id="register-input-two" maxLength="10"/>
            </Form.Group>
            <Form.Text id={outcome === "Sorry User is already taken" ? "register-fail" : "register-pass"}>{outcome}</Form.Text>
            <br></br>
            <Button variant="primary" type="submit" id="register-submit-btn">Sign Up</Button>
        </Form>

    );
}

export default RegisterForm;