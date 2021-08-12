import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ChatContext } from '../../App';
import { PAGE_CONTROL } from '../../hooks/useSessionData';
import Container from 'react-bootstrap/Container';
import stars from '../../images/login_background.jpg';
import { MoonStarsFill } from 'react-bootstrap-icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const LoginPage = () => {
    const chat = useContext(ChatContext);

    const [formType, setFormType] = useState('Sign In');
    const [nextForm, setNextForm] = useState('Register');


    const guestHandler = async() => {
        const loginInfo = await axios.get(`api/login/signin/Guest/00000000`);
        const accountInfo = loginInfo.data;
        chat.dispatch({ type: PAGE_CONTROL.SAVE_USER_INFO, value: accountInfo });
        createToken(accountInfo.name, accountInfo.id);
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
        width: "200px",
        backgroundColor: "#023059"
    };

    const formChangeHandler = () => {
        if (formType == "Sign In") {
            setFormType("Sign Up");
            setNextForm("Log In");
        } else {
            setFormType("Sign In");
            setNextForm("Register");
        };
    };

    return (
        <Container style={styling}>
            <div>
                <h1 style={{ color: "white" }}>Welcome to Twinkle<MoonStarsFill style={{ marginLeft: "10px", color: "#04B2D9" }}/></h1>
                <div>
                    {formType === "Sign In" ? <LoginForm /> : <RegisterForm />}
                </div>
                <br></br>
                <p style={{color: "white"}}>Would you like to?</p>
                    <div >
                    <Button onClick={formChangeHandler} style={ inputStyle}>{ nextForm}</Button>
                </div>
                <p style={{ color: "white" }}>Or</p>
                <Button onClick={guestHandler} style={ inputStyle}>Continue as Guest</Button>
            </div>
        </Container>
    );
}

export default LoginPage;