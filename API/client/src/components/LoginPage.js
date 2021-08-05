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

    useEffect(() => {
        async function testToken() {
            if (localStorage.getItem("chatUser")) {
                const data = JSON.parse(localStorage.getItem("chatUser"));
                console.log(data);
                const authAxios = axios.create({
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${data.jwToken}`
                    }
                });

                try {
                    const valid = await authAxios.get(`/api/user/getchannel/general`);
                    chat.dispatch({ type: PAGE_CONTROL.LOCAL_STORAGE, value: data });
                    console.log("validation accepted");
                } catch (e) {
                    localStorage.clear();
                    console.log(`local storage was cleared`);
                }
                
            }
        };

        testToken();
       //if localstorage exist
        //load it up
        //take state token
        // authenticate(token);
        //if response is good to go
        // refesh token
        //log in by setting the state

        //const boolean = authenticateToken(data.jwToken);
        //if(boolean) ? createToken(data.user, data.userId) : delete local storage

        //if token is expired
        //delete local storage
        // nothing happens

        //signing in
        // verify credentials get user object
        //set state
        // create authentication token
        //save loading and token to state
        //save to localhost
        
    }, []);

    const guestHandler = e => {
        e.preventDefault();
        loginAccount('Guest', "0000");
    };

    const submitHandler = e => {
        e.preventDefault();
        if (formDisplay === 'signUp') {
            createAccount(name, password);
        } else {
            loginAccount(name, password);
        }  
    };

    const createAccount = async (name, password) => {
        console.log(`creating account with ${name} and ${password}`);
        await axios.post(`api/login/signup/${name}/${password}`);
        setFormDisplay('signIn');
    };

    const loginAccount = async ( name, password) => {
        const formSent = await axios.get(`api/login/signin/${name}/${password}`);
        const result = formSent.data;
        if (result) {
            chat.dispatch({type: PAGE_CONTROL.LOGIN , value: result})
            console.log(`user: ${chat.chatRoom.user} with id ${chat.chatRoom.userId}`)
        }
        createToken(result.name, result.id);

    };

    const createToken = async (name, id) => {
        const token = await axios.get(`api/login/newtoken/${name}/${id}`);
        chat.dispatch({ type: PAGE_CONTROL.TOKEN_CREATION, value: token.data });
        
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

            
                    <button onClick={e => setFormDisplay(e.target.value)} value="signIn">Log In</button>
                    <button onClick={e => setFormDisplay(e.target.value)} value="signUp">New User</button>
                 </div>
                <button onClick={guestHandler}>Continue as Guest</button>
            </div>
        </div>
    );
}

export default LoginPage;