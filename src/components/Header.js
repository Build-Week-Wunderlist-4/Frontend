import React from "react";
import styled from "styled-components";


const Title =styled.h1`
color:black;
font-size:300%;
text-align:center;
font-family: 'Lobster', cursive;
`
const Header = () => {
  return (
    <header>
      <Title>Wunderlist</Title>
      
    </header>
  );
};

export default Header;
