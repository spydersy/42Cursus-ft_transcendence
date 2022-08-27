import React from 'react'
import { HeadComponent } from '../Pages/Home'
import Carousel from './Carousel'
import styled from "styled-components"

export default function GameModes() {
  return (
    <Game>
        <HeadComponent title="Game modes"/>
        <Carousel/>
    </Game>
  )
}


const Game = styled.div`
width: 100%;
height: auto;
height: 400px;
/* margin-top: 100px; */
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
@media  only screen and (max-width: 768px) {

    
}
`;