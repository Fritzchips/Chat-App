import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
    const [formDisplay, setFormDisplay] = useState('signIn')

    const requestHandler = (e) => {
        setFormDisplay(e.target.value);
        console.log('you are', formDisplay);
    }

    const guestHandler = (e) => {
        e.preventDefault();
        console.log("you signed in as guest");
    }

    const formHandler = (e) => {
        e.preventDefault();
        console.log(`you ${formDisplay}`)
    }

    return (
        <div>
            <h1>Wecome to Twinkle</h1>
            <div style={{maxWidth: "80%"}}>
                <div>

                    <Form onSubmit={formHandler}>
                        <Form.Group className="mb-3" controlId="usernamel">
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" required />
                            <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">{formDisplay}</Button>
                    </Form>

            
                    <button onClick={requestHandler} value="Sign In">Log In</button>
                        <button onClick={requestHandler} value="Sign Up">New User</button>
                 </div>
           
            

                <button onClick={guestHandler}>Continue as Guest</button>
            </div>
        </div>
    );
}

export default LoginPage;