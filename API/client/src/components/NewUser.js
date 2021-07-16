import React from 'react';

const NewUser = () => {
    const newUserHandler = (e) => {
        e.preventDefault();
        console.log("Thanks for signing up");
    }
    return (
        <div>
            <form onSubmit={newUserHandler}>
                <label>User Name:</label><br></br>
                <input type="text" /><br></br>

                <label>Password:</label><br></br>
                <input type="text" /><br></br>

                <button >Sign Up</button>
            </form>
        </div>
    );
}

export default NewUser;