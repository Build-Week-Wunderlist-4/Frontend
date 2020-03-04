import React from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';




const Header = () =>  {
   const history = useHistory();

//     const handleLogout = () => {
//         axios.delete('')
//             .then(res => {
            
//         })
//         localStorage.clear('token');
//         history.push('/');
// }

  return (
    <header>
      <h1>Wunderlist</h1>
      {localStorage.getItem("token") ? (
            <button >
              Log Out
            </button>
          ) : null}
    </header>
  );
}

export default Header;