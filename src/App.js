import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todo from "./components/ToDo";
import Header from "./components/Header";
import UpdateTodo from "./components/UpdateTodo";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
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
  );
}

export default App;
