import React from 'react'
import Carousel from '../components/Carousel'
import Sidebar from '../components/Sidebar'
import Upperbar from '../components/Upperbar'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"

export default function Home() {
  return (
   <div className='container' >
    <Hero>
    <PlayerCard/>
    <Carousel/>
    </Hero>
   </div>
  )
}


const Hero = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;

`;

export  function PlayerCard() {
  return (
   <PlayerCardStyle  >
      <div className='first'>
        
      </div>
      <div className='sec'>
        
      <div>
        <img src={Tet} alt="test" />
      </div>
      </div>
   </PlayerCardStyle>
  )
}
  const PlayerCardStyle = styled.div`
  margin-top: 160px;
  width: 388px;
  height: 243px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .first{
  width: 111px;
  height: 100%;
  background-color: white;
}
.sec{
  width: 277px;
  height: 100%;
    background-color:${props => props.theme.colors.primarybg}; 
    border-radius: 0 20px 20px 0px ;
    position: relative;
    >div{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -77.5px;
      width: 155px;
      height: 166px;
    }
  }
  
  `;