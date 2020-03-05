import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BackgroundImage from "./components/pins.jpg"
import styled from "styled-components";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todo from './components/ToDo'
import Header from './components/Header';

import PrivateRoute from './components/PrivateRoute';

      
//background Styles
const Background = styled.div`
  background-image: url(${BackgroundImage}) 
  background-size: cover;     
  `
function App() {


  return (
    <>
      <Background>
        <div className="App">

          <Header />

          <Router>

            <Route exact path="/">
              <Login />
            </Route>


            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>

              <PrivateRoute path="/todo">
                <Todo />
              </PrivateRoute>

            </Switch>
          </Router>
        </div>
      </Background>
    </>
  );
}

export default App;

  // const login = () => {

  //    axios
  //     .post("https://cors-anywhere.herokuapp.com/https://wunderlistbuild.herokuapp.com/api/auth/login", user, {
  //       headers: { "Access-Control-Allow-Origin": "*" }
  //     })
  //      .then(res => {
  //        localStorage.setItem('token', res.data.getToken);
  //        setUser(user.username);
  //        history.push('/todo')
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }
