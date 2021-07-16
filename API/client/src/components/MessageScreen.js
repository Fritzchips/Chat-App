import React, { useState } from 'react';

const MessageScreen = () => {
    const [messages, setMessages] = useState([]);
    return (
        <div>
            <div>
                <p>Fritz</p>
                <p>Saying hello there!</p>
                <p>Mom</p>
                <p>Saying hello there!</p>
                <p>Fritz</p>
                <p>starting convo</p>


            </div>



        </div>
    );
}

export default MessageScreen;