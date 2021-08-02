import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useData';

const LoginPage = () => {
    const chat = useContext(ChatContext);
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
        //verifyDataWithServer('signIn', 'Guest', "0000");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        verifyDataWithServer(formDisplay, name, password);
    };

    const verifyDataWithServer = async (formDisplay, name, password) => {
        console.log(`you are ${formDisplay} with user: ${name} , password: ${password}  `);
      
        const formSent = await axios.get(`api/login/${formDisplay}/${name}/${password}`);
        const result = formSent.data;
        if (result) {
            chat.dispatch({type: PAGE_CONTROL.LOGIN , value: result})
            console.log(`user: ${chat.chatRoom.user} with id ${chat.chatRoom.userId}`)
        }
      
       
        //redirect
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

            
                    <button onClick={formChangeHandler} value="signIn">Log In</button>
                    <button onClick={formChangeHandler} value="signUp">New User</button>
                 </div>
           
            

                <button onClick={guestHandler}>Continue as Guest</button>
            </div>
        </div>
    );
}

export default LoginPage;