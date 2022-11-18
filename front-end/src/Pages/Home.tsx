import React from 'react'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"
import { ReactComponent as Penta} from "../assets/imgs/penta.svg"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GameModes from '../components/GameModes'
import History from '../components/History'

import Slider from '../components/Slider'

interface HomeProps {
    
  settheme?: (e : any)=> void,
  // banner :string 
  
}


export default function Home(props: HomeProps) {
  // const [index, setindex] = useState(1)
  return (
    <div className='container'  >
      <Hero>
        <HeadComponent title="Live Games"/>
        <Slider/>
      </Hero>
      <GameModes  />
      <Hero style={{marginTop : "40px"  }}>
        <HeadComponent title="History"/>
        <History />
      </Hero> 
      
      {/* <Hero style={{marginTop : "40px" }}>
        <HeadComponent title="History"/>
      </Hero>  */}
    </div>
  )
}


const Hero = styled.div`
width: 100%;
height: auto;
padding: 10px 0;
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

export function Stats(props: PlayerCardProps) {
  return (
    <StatsStyle  >
     {/* <HeadComponent title="Stats"/> */}
     <Data>
      
     <div className='progessCont' style={{ width: "140px", height: "140px" }}>
      <CircularProgressbar  styles={{
          path: {
            stroke: `#F13950`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 1s ease 0s',
            transformOrigin: 'center center',
          },
          trail: {
            stroke: '#0E1117',
            strokeLinecap: 'round',

          },
          text: {
            fill: '#000',
            fontSize: '16px',
          },
      }} value={15}  text={`${15}%`} />
      <div className='circularLabel'>
      {props.player.lost} <span style={{color: "#F13950"}}>Lost </span>
      </div>
    </div>
    <div id="pentagon">
      <div>
        <div id="played">
            {props.player.gamePlayed}
        </div>
        <div id="label">
          PLAYED GAMES
        </div>
      </div>
     <Penta/>
    </div>
     <div className='progessCont' style={{ width: "140px", height: "140px" }}>
      <CircularProgressbar  styles={{
          path: {
            stroke: `#3CC592`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 1s ease 0s',
            transformOrigin: 'center center',
          },
          trail: {
            stroke: '#0E1117',
            strokeLinecap: 'round',

          },
          text: {
            fill: '#000',
            fontSize: '16px',
          },
      }}
      value={66}  text={`${66}%`} />
      <div className='circularLabel'>
      {props.player.won} <span style={{color: "#3CC592"}}> Won </span>
      </div>
    </div>
     </Data>
     <ProgressBar>
      
  <div >
    <div className='lvl'>
      level 8 - 36%
    </div>
  </div>
     </ProgressBar>
    </StatsStyle>
  )
}

const StatsStyle = styled.div`
  width: 100%;
  min-height: 243px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`
const Data = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-around;

  .progessCont{
    font-family: 'Poppins' , sans-serif;
    font-size:  ${props => props.theme.fontSize.l}; 
    text-transform: uppercase;
    font-weight: 600;
    width: 100%;
    .circularLabel{
      text-align: center;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 20px;
      color : ${props => props.theme.colors.primaryText};
 
}
      
   }
  }

  #pentagon {
  position: relative;
  width: 247px;
  height: 191px;
  > div{
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 50px;
    font-family: 'Poppins' , sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    #played{
      font-style: normal;
      font-weight: 700;
      font-size:  ${props => props.theme.fontSize.ll}; 
      line-height: 30px;
      color:  ${props => props.theme.colors.seconderyText}; 
    }
    #label{
      /* width: ; */
      display: inline-block;
    overflow: hidden;
    white-space: nowrap;
      font-style: normal;
      font-weight: 600;
      font-size:  ${props => props.theme.fontSize.l}; 
      line-height: 22px;
      text-transform: uppercase;
      color:  ${props => props.theme.colors.primaryText}; 
      -webkit-text-stroke: 1px #000;
    }
  }
  > svg {
    width: 100%;
    height: 100%;
    /* display: none; */
    /* svg{ */
 
 path{
     stroke: ${props => props.theme.colors.purple}
 } 
} 
  

`
const ProgressBar = styled.div`
  width: 90%;
  height: 27px;
  background-color: ${props => props.theme.colors.bg};
  border-radius: 12.3071px;
  display: flex;
  align-items: center;
  > div{
    /* padding-right: 3px; */
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 36%;
    background-color: ${props => props.theme.colors.purple};
    border-radius: 12.3071px;
    .lvl{
      margin-right: 10px;
      font-size: ${props => props.theme.fontSize.s};
      color: white;
    }
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
/* margin-top: 50px; */
  width: 90%;
  /* border-bottom: 3px solid ${props => props.theme.colors.border}; */
  text-align: start;
  /* text-transform: uppercase; */
  /* font-family: 'Poppins' , sans-serif; */
  font-family: 'Poppins', sans-serif;
  font-weight : 600;
  font-size:  ${props => props.theme.fontSize.ll};
  color:  ${props => props.theme.colors.purple};
  
  padding: 4px 0px;
`;

