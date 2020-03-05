import React from "react";
import { useHistory } from "react-router-dom";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const Header = () => {
  const history = useHistory();

  const handleLogout = () => {
    // AxiosWithAuth()
    //   .delete("/api/user")
    //   .then(res => {
    //     localStorage.clear("token");
    //     history.push("/");
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  return (
    <header>
      <h1>Wunderlist</h1>
      {/* {localStorage.getItem("token") ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : null} */}
    </header>
  );
};

export default Header;
