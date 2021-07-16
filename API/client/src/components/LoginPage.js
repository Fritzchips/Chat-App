import React from 'react';
import NewUser from './NewUser';
import UserSignIn from './UserSignIn';

const LoginPage=()=> {
    const guestHandler = (e) => {
        e.preventDefault();
        console.log("you signed in as guest");
    }

    return (
        <div>
            <div>Wecome to Login page</div>
            <NewUser />
            {/*Make into a component*/}
            
            <br></br>
            <UserSignIn />

            {/*Make into a component*/}
            

            <button onClick={ guestHandler}>Continue as Guest</button>
        </div>
    );
}

export default LoginPage;