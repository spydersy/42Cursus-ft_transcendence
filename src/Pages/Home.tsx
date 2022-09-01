import React from 'react'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"
import 'react-circular-progressbar/dist/styles.css';
import GameModes from '../components/GameModes'
import Slider from '../components/Slider'

export default function Home() {
  // const [index, setindex] = useState(1)
  return (
    <div className='container' style={{width: "1500px" }} >
      <Hero>
        <HeadComponent title="Live Games"/>
        <Slider/>
      </Hero>
      <GameModes/>
      <Hero style={{marginTop : "40px" , flexDirection: "column"}}>
        <HeadComponent title="History"/>
      </Hero> 
    </div>
  )
}

const Hero = styled.div`
width: 100%;
height: auto;
padding: 20px 0;
margin-top: 100px;
display: flex;
align-items: center;
justify-content: space-around;
border-radius: 5px;
flex-direction: column;
border: 2px solid  ${props => props.theme.colors.border};
background-color: ${props => props.theme.colors.primarybg};
@media  only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    
}
`;
export interface PlayerCardProps {
  player: {
    name: string;
    login: string,

    lvl: string,
    gamePlayed : number,
    lost : number,
    won : number
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
  background-color: #E4ECF2;
   border-radius: 20px 0px 0px 0px ;
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
/* margin-top: 50px; */
  width: 90%;
  /* border-bottom: 3px solid ${props => props.theme.colors.border}; */
  text-align: start;
  /* text-transform: uppercase; */
  /* font-family: 'Poppins' , sans-serif; */
  font-family: 'Michroma', sans-serif;

  font-size:  ${props => props.theme.fontSize.ll};
  color:  ${props => props.theme.colors.seconderyText};;
  padding: 4px 0px;
`;

