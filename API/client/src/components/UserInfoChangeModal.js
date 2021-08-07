import React, { useState, useContext } from 'react';

const  UserInforChangeModal = () => {
    const chat = useContext(ChatContext);
    const [changeField, setChangeField] = useState("unconfirmed");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const verifyHandler = async (e) => {
        e.preventDefault();
        const checkData = await axios.post(`/api/user/${chat.session.userId}/${name}/${password}`);
        if (checkData.value) {
            setChangeField("confirmed");
            setName('');
            setPassword('');
        } else {
            console.log("invalid username password");
        };
       
    };

    const changeUserInfo = async (e) => {
        e.preventDefault();
        const checkInfo = axios.post(`/api/login/signup/${name}/${password}`);
        if (checkInfo.data) {

        } else {
            console.log("set of credentials is already taken")
        }
        //promp relogin when changes are made
    };

    if (changeField === "unconfirmed") {

        return (

            <Container>
                <h1>Change User Info</h1>

                <form onSubmit={verifyHandler}>
                    <p>Please Enter Your Name and Password</p>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button>Verify</button>
                </form>
            </Container>

        );
    } else {
        return (
            <Container>
                <h1>What Would you like to Change</h1>

                <form onSubmit={changeUserInfo}>
                    <p>Please Enter Your new Name and Password</p>
                    <input type="text" value={checkName} onChange={e => setCheckName(e.target.value)} required />
                    <input type="text" value={checkPassword} onChange={e => setCheckPassword(e.target.value)} required />
                    <button>Verify</button>
                    <button>Change</button>
                </form>
            </Container>
        );
    };


}

export default UserInforChangeModal;