import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../App';
import { PAGE_CONTROL } from '../hooks/useSessionData';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import stars from '../images/login_background.jpg';

const LoginPage = () => {
    const chat = useContext(ChatContext);
    const [formType, setFormType] = useState('Sign In');
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
        if (formType === 'Sign Up') {
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
            setOutcome(`${name}'s account was made`);
            setFormType('Sign In');
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
            setOutcome("Sorry user doesn't exist");
            setName('');
            setPassword('');
        };     
    };

    const createToken = async (name, id) => {
        const token = await axios.get(`api/token/newtoken/${name}/${id}`);
        chat.dispatch({ type: PAGE_CONTROL.SAVE_TOKEN, value: token.data });
    };
    const styling = {
        backgroundImage: `url(${stars})`,
        position: "fixed",
        left: "0",
        minWidth: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const inputStyle = {
        borderRadius: "20px",
        maxWidth: "300px",
        width: "300px"
    };

    return (
        <Container style={styling}>
            <div>
                <h1 style={{color: "white"}}>Welcome to Twinkle</h1>
                <div>
                    <Form onSubmit={submitHandler} style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <Form.Group className="mb-3" controlId="usernamel">
                            <Form.Label style={{ color: "white" }}>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" required value={name} onChange={(e) => setName(e.target.value)} style={ inputStyle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label style={{ color: "white" }}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle}/>
                        </Form.Group>
                        <Form.Text style={{ color: "red" }}>{outcome}</Form.Text>
                        <br></br>
                        <Button variant="primary" type="submit" style={inputStyle}>{formType}</Button>
                    </Form>
                </div>
                <br></br>
                <p style={{color: "white"}}>Would you like to?</p>
                    <div >
                        <Button onClick={e => setFormType(e.target.value)} value="Sign In" >Log In</Button>
                        <Button onClick={e => setFormType(e.target.value)} value="Sign Up" >Register</Button>
                </div>
                <p style={{ color: "white" }}>Or</p>
                <Button onClick={guestHandler} style={ inputStyle}>Continue as Guest</Button>
            </div>
        </Container>
    );
}

export default LoginPage;