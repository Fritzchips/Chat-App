import React, { useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MainScreen from './components/MainScreen';
import useData from './hooks/useData';

export const ChatContext = React.createContext();

function App() {
    const [chatRoom, dispatch] = useData();

    useEffect(() => {
        if (chatRoom.jwToken !== null) {
            localStorage.setItem("chatUser", JSON.stringify(chatRoom));
            console.log("saved to local storage");
        }
        
    }, [chatRoom.loggedIn]);

  return (
      <div className="App">
          <ChatContext.Provider value={{ chatRoom: chatRoom, dispatch: dispatch }}>

          {chatRoom.loggedIn ? (<MainScreen />) : (<LoginPage />)}

          </ChatContext.Provider >
    </div>
  );
}

export default App;
