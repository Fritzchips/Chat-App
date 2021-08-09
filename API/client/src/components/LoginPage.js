import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import { v4 as uuidv4 } from 'uuid';


const LoginPage = () => {
    const chat = useContext(ChatContext);
    const [formType, setFormType] = useState('signIn');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [outcome, setOutcome] = useState('');

    useEffect(() => {
        setName('');
        setPassword('');
    }, [formType]);

    const guestHandler = e => {
        e.preventDefault();
        loginAccount('Guest', '0000');
    };

    const submitHandler = e => {
        e.preventDefault();
        if (formType === 'signUp') {
            createAccount(name, password);
        } else {
            loginAccount(name, password);
        };
    };

    useEffect(() => {
        const testToken=async()=> {
            if (localStorage.getItem("chatUser")) {
                const data = JSON.parse(localStorage.getItem("chatUser"));
                const valid = await axios.get(`/api/token/tokenvalidation/${data.jwToken}`);
                console.log(data);
                if (valid.data) {
                    chat.dispatch({ type: PAGE_CONTROL.LOAD_LOCAL_STORAGE, value: data });
                    await createToken(data.userName, data.userId);
                } else {
                    localStorage.clear();
                };
            };
        };

        testToken();
    }, []);

    

    const createAccount = async (name, password) => {
        const checkAccountStatus = await axios.get(`api/login/confirmuser/${name}/${password}`);
        if (checkAccountStatus.data) {
            setOutcome("sorry user exist");
            setName('');
            setPassword('');
        } else {
            const newUserInfo = JSON.stringify({
                Id: uuidv4,
                Name: name,
                password: password
            });
            await axios.post(`api/login/signup/${newUserInfo}`);
            setOutcome(`${name}'s account was made`);
            setFormType('signIn');
        };  
    };

    const loginAccount = async ( name, password) => {
        const checkAccountStatus = await axios.get(`api/login/confirmuser/${name}/${password}`);
        if (checkAccountStatus.data) {
            const loginInfo = await axios.get(`api/login/signin/${name}/${password}`);
            const accountInfo = loginInfo.data;
            chat.dispatch({ type: PAGE_CONTROL.SAVE_USER_INFO, value: accountInfo });
            createToken(accountInfo.name, accountInfo.id);
        } else {
            setOutcome("sorry user doesnt exist");
            setName('');
            setPassword('');
        };     
    };

    const createToken = async (name, id) => {
        const token = await axios.get(`api/token/newtoken/${name}/${id}`);
        chat.dispatch({ type: PAGE_CONTROL.SAVE_TOKEN, value: token.data });
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
                        <Button variant="primary" type="submit">{formType}</Button>
                    </Form>
  
                    <button onClick={e => setFormType(e.target.value)} value="signIn">Log In</button>
                    <button onClick={e => setFormType(e.target.value)} value="signUp">New User</button>
                 </div>
                <button onClick={guestHandler}>Continue as Guest</button>
            </div>
            <p>{ outcome}</p>
        </div>
    );
}

export default LoginPage;