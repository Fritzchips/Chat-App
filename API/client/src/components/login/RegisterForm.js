import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


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
            setOutcome("Sorry user already exist");
            setName('');
            setPassword('');
        } else {
            const newUserInfo = JSON.stringify({
                Id: uuidv4,
                Name: name,
                password: password
            });
            await axios.post(`api/login/signup/${newUserInfo}`);
            setOutcome(`${name}'s account was made, Please Sign In`);
        };
    };

    const inputStyle = {
        borderRadius: "20px",
        maxWidth: "300px",
        width: "300px"
    };

    return (
  
        <Form onSubmit={submitHandler} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <h3 style={{color: "white"}}>Register New User</h3>
            <Form.Group className="mb-3" controlId="usernamel">
                <Form.Label style={{ color: "white" }}>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label style={{ color: "white" }}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </Form.Group>
            <Form.Text style={{ color: "red" }}>{outcome}</Form.Text>
            <br></br>
            <Button variant="primary" type="submit" style={inputStyle}>Sign Up</Button>
        </Form>

    );
}

export default RegisterForm;