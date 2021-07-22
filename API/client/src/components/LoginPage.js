import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const LoginPage = () => {
    const [formDisplay, setFormDisplay] = useState('signIn');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setName('');
        setPassword('');
    }, [formDisplay]);

    const formChangeHandler = (e) => {
        setFormDisplay(e.target.value);
    };

    const guestHandler = (e) => {
        e.preventDefault();
        verifyDataWithServer('guest', 'Guest', "0000");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        verifyDataWithServer(formDisplay, name, password);
    };

    const verifyDataWithServer = (formDisplay, name, password) => {
        console.log(`you are ${formDisplay} with user: ${name} , password: ${password}  `);
        //change to async
        //await axios get("`/api/${formDisplay}/${name}/${password}`)
        //controller will control from here
    };

    return (
        <div>
            <h1>Wecome to Twinkle</h1>
            <div style={{maxWidth: "80%"}}>
                <div>

                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="usernamel">
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" required value={name} onChange={(e)=> setName(e.target.value) }/>
                            <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">{formDisplay}</Button>
                    </Form>

            
                    <button onClick={formChangeHandler} value="Sign In">Log In</button>
                    <button onClick={formChangeHandler} value="Sign Up">New User</button>
                 </div>
           
            

                <button onClick={guestHandler}>Continue as Guest</button>
            </div>
        </div>
    );
}

export default LoginPage;