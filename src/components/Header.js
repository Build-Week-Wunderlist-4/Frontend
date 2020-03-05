import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


const Title =styled.h1`
color:black;
font-size:300%;
text-align:center;
font-family: 'Lobster', cursive;
`
const Header = () => {
  const history = useHistory();


  return (
    <header>
      <Title>Wunderlist</Title>
      {localStorage.getItem("token") ? (
            <button >
              Log Out
            </button>
          ) : null}
    </header>
  );
};

export default Header;
