import React, { useState } from 'react';
import './App.css';
import GeneralChannel from './components/GeneralChannel';
import LoginPage from './components/LoginPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    //useEffect to check for loggedIn or database

  return (
    <div className="App">
          <h1>Hey there Welcome to the start of awesomeness</h1>
          <LoginPage />
          <GeneralChannel />
    </div>
  );
}

export default App;
