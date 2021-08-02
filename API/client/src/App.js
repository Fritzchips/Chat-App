import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MainScreen from './components/MainScreen';
import useData from './hooks/useData';

export const ChatContext = React.createContext();

function App() {
    const [chatRoom, dispatch] = useData();

  return (
      <div className="App">
          <ChatContext.Provider value={{ chatRoom: chatRoom, dispatch: dispatch }}>

          {chatRoom.loggedIn ? (<MainScreen />) : (<LoginPage />)}

          </ChatContext.Provider >
    </div>
  );
}

export default App;
