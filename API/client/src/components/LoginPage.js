import React, { useState } from 'react';
import NewUser from './NewUser';
import UserSignIn from './UserSignIn';

const LoginPage = () => {
    const [formDisplay, setFormDisplay] = useState('signIn')

    const formHandler = (e) => {
        setFormDisplay(e.target.value);
        console.log('you are', formDisplay);
    }

    const guestHandler = (e) => {
        e.preventDefault();
        console.log("you signed in as guest");
    }

    return (
        <div>
            <div>Wecome to Login page</div>
            <div>
                {formDisplay === "signIn" ? (<UserSignIn />) : (<NewUser />)}            
            </div>
            <button onClick={formHandler} value="signIn">Log In</button>
            <button onClick={formHandler} value="signUp">Sign Up</button>
           
            

            <button onClick={ guestHandler}>Continue as Guest</button>
        </div>
    );
}

export default LoginPage;