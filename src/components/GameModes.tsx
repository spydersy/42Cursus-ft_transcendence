import React from 'react'
import { HeadComponent } from '../Pages/Home'
import Carousel from './Carousel'
import styled from "styled-components"

export default function GameModes() {
  return (
    <Game>
        <HeadComponent title="Game modes"/>
        <Carousel/>
        {/* s */}
    </Game>
  )
}


const Game = styled.div`
width: 100%;
padding: 20px 0;

height: 400px;
margin-top: 20px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
background-color:  ${props => props.theme.colors.primarybg};
border-radius: 5px;
border: 2px solid  ${props => props.theme.colors.border};

@media  only screen and (max-width: 768px) {

    
}
`;