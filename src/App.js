import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import Login from "./components/Login"
import SignUp from "./components/SignUp"
function App() {
  return (
    <div className="App">
      <>
    <Route exact path="/">
    <Login/>
    </Route>
    
    <Route path="/signUp">
      <SignUp/>
    </Route>
  </>
    </div>
  );
}

export default App;
