import React, { useState } from 'react';
import CodingChannel from './CodingChannel';
import GeneralChannel from './GeneralChannel';
import RandomChannel from './RandomChannel';


const ChannelNavBar = () => {

    const [currentChannel, setCurrentChannel] = useState('general')

    const channelHandler = (e) => {
        e.preventDefault();
        setCurrentChannel(e.target.value);
    }

     //make the words into links
    return (
        <div>
            <button>Drop Down</button>
            <button onClick={channelHandler} value="general">General</button>
            <button onClick={channelHandler} value="random">Random</button>
            <button onClick={channelHandler} value="coding">Coding</button>

            {currentChannel === 'coding' ? (<CodingChannel />) : currentChannel === 'random' ? (<RandomChannel />) : (<GeneralChannel />)}

        </div>
    );
}

export default ChannelNavBar;