import React, { useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MainScreen from './components/MainScreen';
import useData from './hooks/useData';

export const ChatContext = React.createContext();

function App() {
    const [session, dispatch] = useData();

    useEffect(() => {
        if (session.jwToken !== null) {
            localStorage.setItem("chatUser", JSON.stringify(session));
            console.log("saved to local storage");
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
