import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();


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
};

export default Header;
