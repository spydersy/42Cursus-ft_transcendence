import React from 'react'
import Carousel from '../components/Carousel'
import Sidebar from '../components/Sidebar'
import Upperbar from '../components/Upperbar'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"
import Penta from "../assets/imgs/penta.svg"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const player = {
  name: "Melkarmi",
  lvl: "Gold"
}

export default function Home() {
  return (
    <div className='container' >
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
margin-top: 100px;
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
     <HeadComponent title="Stats"/>
     <Data>
      
     <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar  styles={{
          path: {
            stroke: `#F13950`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 1s ease 0s',
            transformOrigin: 'center center',
          },
          trail: {
            stroke: '#ACCBDE',
            strokeLinecap: 'round',

          },
          text: {
            fill: '#000',
            fontSize: '16px',
          },
      }} value={15}  text={`${15}%`} />
    </div>
    <div id="pentagon">
      <img src={Penta} alt="penta" />
    </div>
     <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar  styles={{
          path: {
            stroke: `#3CC592`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 1s ease 0s',
            transformOrigin: 'center center',
          },
          trail: {
            stroke: '#ACCBDE',
            strokeLinecap: 'round',

          },
          text: {
            fill: '#000',
            fontSize: '16px',
          },
      }}
      value={66}  text={`${66}%`} />
    </div>
    {/* {\*
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar value={66} />
    </div>
  </div>
</div>  */}
     </Data>
     <ProgressBar>
  <div>
    d
  </div>
     </ProgressBar>
    </StatsStyle>
  )
}

const StatsStyle = styled.div`
  width: 500px;
  height: 243px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`
const Data = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  #pentagon {
  position: relative;
}
`
const ProgressBar = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.seconderybg};
  border-radius: 12.3071px;
  display: flex;
  div{
    align-items: flex-start;  
    height: 100%;
    width: 30%;
    background-color: ${props => props.theme.colors.primarybg};
    border-radius: 12.3071px;
  }

`
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

