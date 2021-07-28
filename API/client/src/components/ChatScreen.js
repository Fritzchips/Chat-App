import React, { useContext} from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ChatMessages from './ChatMessages';
import {ChatContext, PAGE_CONTROL} from './MainScreen'

const ChatScreen = () => {
    const chat = useContext(ChatContext);

    //const postHandler = async (e) => {
    //    e.preventDefault();
    //    var item = {
    //        Id: uuidv4(),
    //        ChannelId: '495da565-a839-467f-8eb9-ad6f0124bcbd',
    //        UserId: 'e53e4185-16e9-4c1c-b87e-ad6e0164acb7',
    //        Date: new Date(),
    //        Context: message
    //    }

    //    var convertData = JSON.stringify(item);

    //    const data = await axios.get(`/api/user/createmessage/${convertData}`);
    //    setMessage('');
    //    setDatabase({ ...data.data } );
    //    console.log(data.data);
    //    console.log(database);

    //}
    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" }}>
                <div style={{backgroundColor: "grey", padding: "10px", fontSize: "25px"}}><strong>Welcome to Coding channel</strong></div>
                <ChatMessages />
                {/*<p>{database.context }</p>*/}
                
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">

                <form onSubmit={(e) => chat.dispatch({ type: PAGE_CONTROL.SUBMIT, value: ''})}>
                    <input type="text" required style={{ width: "80%" }} value={chat.message} onChange={e => chat.dispatch({ type: PAGE_CONTROL.INPUT , value: e.target.value})}/>
                    <button>Post</button>
                </form>
                </div>
            </Container>
       
    );
}

export default ChatScreen ;