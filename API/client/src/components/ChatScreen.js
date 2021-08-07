import React, { useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import ChatMessages from './ChatMessages';
import { ChatContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

const ChatScreen = () => {
    const chat = useContext(ChatContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('');
    }, [chat.session.currentChannel]);
        
    const postHandler = async(e) => {
        e.preventDefault();
        var newMessage = JSON.stringify({
            Id: uuidv4(),
            ChannelId: chat.session.channelId,
            UserId: chat.session.userId,
            Date: new Date(),
            Context: message,
        });

        await chat.session.hubConnection.invoke("SendMessageRoom", newMessage, chat.session.userName, chat.session.currentChannel);

        setMessage('');
    };

    return (

        <Container className="d-flex flex-column " style={{minHeight: "100%"}} >
            <div style={{ width: "100%", height: "80vh",  border: "3px solid black", borderRadius: "5px" , overflow: "scroll"}}>
                <div style={{ backgroundColor: "grey", padding: "10px", fontSize: "25px" }}><strong>Welcome to { chat.session.currentChannel} channel</strong></div>
                <ChatMessages />     
            </div>

            <div style={{ height: "10vh", width: "100%", marginTop: "20px" }} className="align-self-baseline">

                <form onSubmit={postHandler}>
                    <input type="text" required style={{ width: "80%" }} value={message} onChange={e => setMessage(e.target.value)}/>
                    <button>Post</button>
                </form>
                </div>
            </Container>
       
    );
}

export default ChatScreen ;