import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todo from "./components/ToDo";


import PrivateRoute from "./components/PrivateRoute";




function App() {


  return (
    <>
      
        <div className="App">

          

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
