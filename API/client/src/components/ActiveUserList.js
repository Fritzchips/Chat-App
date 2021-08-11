import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../App';
import { PersonFill } from 'react-bootstrap-icons';



const ActiveUserList = () => {
    const chat = useContext(ChatContext);

    return (
        <Container fluid className="d-flex flex-column" style={{ height: "100vh" }}>
            {chat.session.activeUsersList.length > 0 ? chat.session.activeUsersList.map(user => (
                <div key={user.id}>
                    <PersonFill style={{color: "green"}}/>
                    <span><strong>{user.name}</strong></span>
                </div>
            )) : (<></>)}
        </Container>
    );
}

export default ActiveUserList;