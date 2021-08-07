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
                //const authAxios = axios.create({
                //    headers: {
                //        Accept: 'application/json',
                //        Authorization: `Bearer ${data.jwToken}`
                //    }
                //  //const authAxios = axios.create({
                //    headers: {
                //        Accept: 'application/json',
                //        Authorization: `Bearer ${data.jwToken}`
                //    }
                //});
     
                const valid = await axios.get(`/api/login/tokenvalidation/${data.jwToken}`);
                console.log(`valid output: ${valid.data}`);
                if (valid.data) {
                    chat.dispatch({ type: PAGE_CONTROL.LOAD_LOCAL_STORAGE, value: data });
                    console.log("validation accepted");
                } else {
                    localStorage.clear();
                    console.log("storage was cleared");
                }
                  
            }
        };

        testToken();     
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
        const makeAccount = await axios.post(`api/login/signup/${name}/${password}`);

        console.log(`${name}'s ${makeAccount.data}`);
        if (makeAccount.data === "account is created") {
            setFormDisplay('signIn');
        } else {
            setName('');
            setPassword('');
        };
        
    };

    const loginAccount = async ( name, password) => {
        const formSent = await axios.get(`api/login/signin/${name}/${password}`);
        const result = formSent.data;
        if (result) {
            chat.dispatch({type: PAGE_CONTROL.SAVE_USER_INFO , value: result})
            console.log(`user: ${chat.chatRoom.user} with id ${chat.chatRoom.userId}`)
        }
        createToken(result.name, result.id);

    };

    const createToken = async (name, id) => {
        const token = await axios.get(`api/login/newtoken/${name}/${id}`);
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