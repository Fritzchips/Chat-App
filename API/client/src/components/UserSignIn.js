import React from 'react';

const UserSignIn = () => {
    const signInHandler = (e) => {
        e.preventDefault();
        console.log("Thanks for signing up");
    }
    return (
        <div>
            <form onSubmit={signInHandler}>
                <label>User Name:</label><br></br>
                <input type="text" required /><br></br>

                <label>Password:</label><br></br>
                <input type="text" required /><br></br>

                <button >Submit</button>
            </form>
        </div>
    );
}

export default UserSignIn;