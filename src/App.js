import React, {useState} from 'react';
import './App.css';
import AxiosWithAuth from './utils/AxiosWithAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Test from './components/Test';


// import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState({});
  const history = useHistory();
  console.log('user!', user)
 
  const login = (data) => {
    
     axios
      .post("https://wunderlistbuild.herokuapp.com/api/auth/login", user)
       .then(res => {
         localStorage.setItem('token', res.data.getToken);
         setUser(user.username);
         history.push('/test')
      })
      .catch(error => {
        console.error(error);
      });
    
  }


  return (
    <div className="App">
      
 
    <Route exact path="/">
      <Login login={login} />
    </Route>
     
    <Route path="/signUp">
      <SignUp />
    </Route>
        
    <Route path="/test">
     <Test />
    </Route>
      </div>
  );
}

export default App;
