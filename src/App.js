import React, {useState} from 'react';
import './App.css';
// import AxiosWithAuth from './utils/AxiosWithAuth';
import axios from 'axios';
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todo from './components/ToDo'

// import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState({});
  // const history = useHistory();
  console.log('user!', user)
 

  
  return (
    <div className="App">
      <Router>
 
    <Route exact path="/">
      <Login />
    </Route>
     
        
      <Switch>
    <Route path="/signup">
      <SignUp />
    </Route>
        
    <Route path="/todo">
     <Todo />
        </Route>
          
        </Switch>
        </Router>
      </div>
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
