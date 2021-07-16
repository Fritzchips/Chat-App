import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MainScreen from './components/MainScreen';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    //useEffect to check for loggedIn or database

    const loginHandler = (e) => {
        e.preventDefault();
        if (loggedIn) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }

  return (
    <div className="App">
          <h1>Hey there Welcome to the start of awesomeness</h1>
          {loggedIn ? (<MainScreen  />) : (<LoginPage />)}
          <button onClick={ loginHandler}>Change Screen</button>
    </div>
  );
}

export default App;
