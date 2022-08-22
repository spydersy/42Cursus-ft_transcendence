import React from 'react'
import styled from "styled-components"

export default function Upperbar() {
  return (
    <Wrraper>
        <LogoComponent/>
    </Wrraper>
  )
}

const Wrraper = styled.div`

   width: 100vw;
   height: 60px;
   background-color: ${props => props.theme.colors.primarybg};;
   display: flex;
   align-items:center;
   flex-direction: row;
    
`;

export  function LogoComponent() {
    return (
      <Logo>
          PingPong  Time 
      </Logo>
    )
  }
    const Logo = styled.div`
    font-family: 'Michroma', sans-serif;
       color:  ${props => props.theme.colors.primaryText};;
       font-size:  ${props => props.theme.fontSize.l}; 
    
       /* object-fit : contain; */
    `;