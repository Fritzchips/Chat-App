import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../../App';
import { PersonFill } from 'react-bootstrap-icons';
import "./styling/UserList.css";



const UserList = () => {
    const chat = useContext(ChatContext);

    return (
        <Container fluid className="d-flex flex-column users-container" >
            {chat.session.activeUsersList.length > 0 ? chat.session.activeUsersList.map(user => (
                <div key={user.id} className="users-row">
                    <PersonFill className="users-icon"/>
                    <span><strong className="users-name">{user.name}</strong></span>
                </div>
            )) : (<></>)}
        </Container>
    );
}

export default UserList;