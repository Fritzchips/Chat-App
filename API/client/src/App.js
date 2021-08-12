import React, { useEffect } from 'react';
import './App.css';
import MainScreen from './components/chatroom/MainScreen';
import LoginPage from './components/login/LoginPage';
import useSessionData from './hooks/useSessionData';

export const ChatContext = React.createContext();

function App() {
    const [session, dispatch] = useSessionData();

    useEffect(() => {
        if (session.jwToken !== null) {
            localStorage.setItem("chatUser", JSON.stringify(session));
        };
        
    }, [session.loggedIn]);

  return (
      <div className="App">
          <ChatContext.Provider value={{ session: session, dispatch: dispatch }}>

          {session.loggedIn ? (<MainScreen />) : (<LoginPage />)}

          </ChatContext.Provider >
    </div>
  );
};

export default App;
