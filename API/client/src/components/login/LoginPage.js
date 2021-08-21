import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import Container from 'react-bootstrap/Container';
import { MoonStarsFill } from 'react-bootstrap-icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import "./styling/LoginPage.css";


const LoginPage = () => {
    const chat = useContext(ChatContext);

    const [formType, setFormType] = useState('Sign In');
    const [nextForm, setNextForm] = useState('Register');

    const guestHandler = async () => {
        const loginInfo = await axios.get(`api/login/signin/Guest/0000000000`);
        const accountInfo = loginInfo.data;
        chat.dispatch({ type: PAGE_CONTROL.SAVE_USER_INFO, value: accountInfo });
        createToken(accountInfo.name, accountInfo.id);
        
    };

    useEffect(() => {
        const testToken=async()=> {
            if (localStorage.getItem("chatUser")) {
                const data = JSON.parse(localStorage.getItem("chatUser"));
                const valid = await axios.get(`/api/token/tokenvalidation/${data.jwToken}`);
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


    const createToken = async (name, id) => {
        const token = await axios.get(`api/token/newtoken/${name}/${id}`);
        chat.dispatch({ type: PAGE_CONTROL.SAVE_TOKEN, value: token.data });
    };

    const formChangeHandler = () => {
        if (formType === "Sign In") {
            setFormType("Sign Up");
            setNextForm("Login");
        } else {
            setFormType("Sign In");
            setNextForm("Register");
        };
    };

    return (
        <Container className="login-container">
            <div>
                <h1>Welcome to Twinkle <MoonStarsFill className="moon-icon-style"/> </h1>
                <div>
                    {formType === "Sign In" ? <LoginForm /> : <RegisterForm />}
                </div>
                <br></br>
                <p>Would you like to?</p>
                    <div >
                    <Button onClick={formChangeHandler} id="form-change-btn">{ nextForm}</Button>
                </div>
                <p>Or</p>
                <Button onClick={guestHandler} id="form-change-btn">Continue as Guest</Button>
            </div>
        </Container>
    );
}

export default LoginPage;