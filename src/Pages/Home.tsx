import React from 'react'
import Carousel from '../components/Carousel'
import Sidebar from '../components/Sidebar'
import Upperbar from '../components/Upperbar'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"


const player = {
  name: "Melkarmi",
  lvl: "Gold"
}

export default function Home() {
  return (
    <div className='container' >
      <HeadComponent title="Statistic" />
      <Hero>
        <PlayerCard player={player} />
        <Stats player={player} />
    </Hero>
      {/* <Carousel/> */}
    </div>
  )
}


const Hero = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
`;
export interface PlayerCardProps {
  player: {
    name: string;
    lvl: string
  }


}
export function PlayerCard(props: PlayerCardProps) {
  return (
    <PlayerCardStyle  >
      <div className='first'>

      </div>
      <div className='sec'>
        <div className='img'>
          <img src={Tet} alt="test" />
        </div>
        <div className='name'>
          {props.player.name}
        </div>
        <div style={{ color: "#000" }} className='name'>
          lvl :  {props.player.lvl}
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

    display: flex;
    align-items: flex-start;
    /* justify-content: ; */
    flex-direction: column;
    padding-left: 25%;
    .img{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -77.5px;
      width: 155px;
      height: 166px;
      /* img{ //image styling

      } */
    }
    .name{
      font-family: 'Michroma', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: ${props => props.theme.fontSize.l}; 
      line-height: 21px;
      display: flex;
      align-items: center;
      color: ${props => props.theme.colors.primaryText}; 
      margin-top: 50px;
    }
    /* .lvl{

    } */
  }

  `;



export function Stats(props: PlayerCardProps) {
  return (
    <StatsStyle  >
     dd
    </StatsStyle>
  )
}

const StatsStyle = styled.div`
width: 500px;
height: 100%;
 background-color: red;
`;

export interface headProps {
  title: string;
}
export function HeadComponent(props: headProps) {
  return (
    <Head  >
      {props.title}
    </Head>
  )
}

const Head = styled.div`
  width: 100%;
  border-bottom: 6px solid #D8E4ED;
  text-align: start;
  text-transform: uppercase;
  font-family: 'Poppins' , sans-serif;
  font-size:  ${props => props.theme.fontSize.ll};
  color:  ${props => props.theme.colors.seconderyText};;
  padding: 4px 0px;
`;