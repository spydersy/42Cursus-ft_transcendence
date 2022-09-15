
import  React, { useEffect , useRef , useState ,useLayoutEffect }  from 'react';

import * as ReactDOM from 'react-dom'; 
// import {Draggable} from 'typescript-react-draggable';
import styled from "styled-components"
import axios from 'axios';
import io from 'socket.io-client';
import { AvatarComponent } from '../components/PlayerProfile';

import Img from "../assets/imgs/avatar/a1.png";
import Img2 from "../assets/imgs/avatar/a2.png";
import Marin from "../assets/imgs/marinford.png";
import Punk from "../assets/imgs/punkhazard.png";

import AIavatar from "../assets/imgs/avatar/Ai-lwahch.png";
import VegaPunk from "../assets/imgs/vegapunk.png" 


interface GameModalProps {
    
  title: string,
  banner :string 
  
}


interface myProps {
  name: string,
  mode : string,
  theme : {
    map : GameModalProps,
    rounds : number
  }

}
interface ScoreType {
  score1: number,
  score2 : number
}
interface Player2Type {
  name: string,
  avatar : string,
  msg : string
}

const player2 = {
    name: "mehdi elazmi",
    avatar : Img,
    msg : "Player2"
}
const ai1 = {
  name: "Dr VegaPunk",
  avatar : VegaPunk,
  msg : "AI"
}
const ballSpeed : number = 5;
var [directionX, directionY] = [ballSpeed, ballSpeed];
export default function Pong({theme ,name, mode}:myProps ) {
  const tableRef : any= useRef<HTMLHeadingElement>(null);
  const ballRef : any = useRef<SVGCircleElement >(null);
  const playerRef : any = useRef<SVGRectElement >(null);
  const player2Ref : any = useRef<SVGRectElement >(null);
  var player : number;
  const [start, setStart] = useState(false)
  const [header, setHeader] = useState("waiting")
  const [Player2Data, setPlayer2] = useState<Player2Type>(player2)
  const [score, setscore] = useState<ScoreType>({
    score1 : 0,
    score2 : 0,
  })

  var UP_KEY = 38;
  var DOWN_KEY = 40;
  var rew = 0;
  

  function detectCollision() {
    const cx = parseInt(ballRef.current.getAttribute('cx'));
    const cy = parseInt(ballRef.current.getAttribute('cy'));
    const r = parseInt(ballRef.current.getAttribute('r'));
    const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
    const x2 = parseInt(playerRef.current.getAttribute('x'));
    const y2 = parseInt(playerRef.current.getAttribute('y'));
    const w2 = parseInt(playerRef.current.getAttribute('width'));
    const h2 = parseInt(playerRef.current.getAttribute('height'));
    
    
    const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
    y1 < (y2 + h2) && (y1 + h1) > y2;
    return colliding;
  }
  function detectCollision2() {
    const cx = parseInt(ballRef.current.getAttribute('cx'));
    const cy = parseInt(ballRef.current.getAttribute('cy'));
    const r = parseInt(ballRef.current.getAttribute('r'));
    const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
    const x2 = parseInt(player2Ref.current.getAttribute('x'));
    const y2 = parseInt(player2Ref.current.getAttribute('y'));
    const w2 = parseInt(player2Ref.current.getAttribute('width'));
    const h2 = parseInt(player2Ref.current.getAttribute('height'));
    
    const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
    y1 < (y2 + h2) && (y1 + h1) > y2;
    return colliding;
  }
  function moveBall() {
    console.log(start)
    const cx = parseInt(ballRef.current.getAttribute('cx'));
    const cy = parseInt(ballRef.current.getAttribute('cy'));
    
    const ballRadius = parseInt(ballRef.current.getAttribute('r'));
    const leftLimit = ballRadius;
    const rightLimit = tableRef.current.offsetWidth;
    const topLimit = ballRadius;
    const bottomLimit = tableRef.current.offsetHeight - ballRadius;
    
    const [nextCX, nextCY] = [cx + directionX, cy + directionY];
    if (nextCX > rightLimit) 
    directionX = -directionX;
    if (nextCY > bottomLimit || nextCY < topLimit)
    {
      
      directionY = -directionY
    }
    
    if (detectCollision()) 
    {
      directionX = -directionX  ;
      
      directionX = directionX + 1;
    }
    if (detectCollision2()) 
    directionX = -directionX;
    if (directionX  > 0)
    moveAI(cx + directionX ,cy + directionY)
    
    if (nextCX - directionX <  ballRadius) { // player lost
      setStart(false)
      setscore({score1: score.score1  ,score2: score.score2 + 1});
      setTimeout(() => {
        [directionX, directionY] = [ballSpeed, ballSpeed];
        initBall();
        
      }, 3000);
      // return ;
      // requestAnimationFrame(moveBall);
    }
    else if (nextCX - directionX > rightLimit)
    {

      setStart(false)
      setscore({score1: score.score1 + 1 ,score2: score.score2 });
      // return ;
      setTimeout(() => {
        [directionX, directionY] = [ballSpeed, ballSpeed];
        initBall();
        
      }, 3000);

    }
    else {
      // console.log("directionX : " + directionX + "directionY : " + directionY)
      const [xPos, yPos] = [cx + directionX, cy + directionY];
      
      ballRef.current.setAttribute('cx', xPos);
      ballRef.current.setAttribute('cy', yPos);
    }
    
    rew = requestAnimationFrame(moveBall);
    // if (!start)
    // {
    //   console.log(start)

    // }
  }
  
  
  function movePlayer1(event :  MouseEvent)
  {


    const p = playerRef?.current;
    // console.log(p)
    // const cx = parseInt(p.getAttribute('x'));
    const cy = parseInt(p.getAttribute('y'));
    const h = parseInt(p.getAttribute('height'));

    if ( event.offsetY < tableRef.current.offsetHeight - h)
       p.setAttribute('y', event.offsetY)
    else 
        p.setAttribute('y', tableRef.current.offsetHeight  - h)


    }
  function moveAI(xb : number, yb: number )
  {

    const h = parseInt(player2Ref.current.getAttribute('height'));
    const w = parseInt(tableRef.current.getAttribute('width'));
      
    var yp : number ;
    var newyp : number ;
    var xp : number ;
    yp =  parseInt(player2Ref.current.getAttribute('y'));
    xp =  parseInt(player2Ref.current.getAttribute('x'));


    // console.log( tableRef.current.offsetHeight - h)
    if (xb < w / 2)
    {
      console.log(xb)
      player2Ref.current.setAttribute('y', yp + 10)
      
    }
     if (yb + h  <  tableRef.current.offsetHeight  )
      player2Ref.current.setAttribute('y', yb  )
    else 

        player2Ref.current.setAttribute('y', tableRef.current.offsetHeight - h  )

  }
  const  initBall =()=>{
    ballRef.current.setAttribute('cx', tableRef.current.offsetWidth / 2);
    ballRef.current.setAttribute('cy', tableRef.current.offsetHeight / 2);

}
var requestId;

useEffect(() => {
  console.log(theme.map.title)

  const initData =()=>{
    player2Ref.current.setAttribute('x' , tableRef.current.offsetWidth - 100)
    player2Ref.current.setAttribute('y' , 0)
    playerRef.current.setAttribute('x' ,  80)
    playerRef.current.setAttribute('y' , 0)
    
    console.log(mode)
    switch(mode)
    {
      case "AI":
        // alert("AI")
        setPlayer2(ai1)
        break ;
        default:
          setPlayer2(player2)
          
        }
      }
      initBall()
      initData()
      
      
  

        
      console.log("salam")
      tableRef.current.addEventListener("mousemove", movePlayer1)

      // document.addEventListener("keydown", movePlayer2)
  } ,[])
  useEffect(() => {
    if (start)
    {
      // initBall()
      // alert(start)
    console.log("makayna m3na")
      moveBall()
    }
  

  }, [start])
  
  return (
    <>
      <PlayerStyle>

        <Player1>
            <UserComponent Ai={false} data={player2}/>

          </Player1>
          <Score>
            {score.score1} | {score.score2}
          </Score>
      </PlayerStyle>
    <Table bgimg={theme.map.banner} ref={tableRef} >

      <svg>
          <circle ref={ballRef} id="ball"  cx="20" cy="300" r="12" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC" stroke-dasharray="10" />

          <rect ref={playerRef} rx="10" x="30" y="0" width="20" height="150" fill="#FFF" />
          <rect ref={player2Ref} rx="10 " y="0" width="20" height="150" fill="#FFF" />

        </svg>
    </Table> 
      <PlayerStyle>

        <Player2>
        
        <UserComponent Ai={true} data={Player2Data}/>
          {/* <Spinner/> */}
        </Player2>

      </PlayerStyle>
      <button onClick={()=> {
        cancelAnimationFrame(rew)
setStart(!start)

      }}>
        {
          start ? "Pause" : "start"
        }
      
      </button>
    </>
  )
}


//style 

const PlayerStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100% ;
  height: auto;
  position: relative;
  margin: 10px 0;
  >div{
     .mesgData{
      margin-left: 12px;
      height: 40px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
      .name{
        color:  ${props => props.theme.colors.primaryText};
        font-size:  ${props=> props.theme.fontSize.xl};

      }
      .msg{
        font-size: 15px;
        font-size:  ${props=> props.theme.fontSize.ll};

        opacity: 0.7;
        color:  ${props => props.theme.colors.seconderyText};
      }
  }}
`;
const Player1 = styled.div`
  margin-right: auto;
  height:auto ;
  display: flex;
  align-items: center;

  `;
const Score = styled.div`
  position: absolute;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);

        color:  ${props => props.theme.colors.primaryText};
  display: flex;
  align-items: center;
  font-family: "Poppins" , sans-serif;
  font-size: ${props=> props.theme.fontSize.xl};

  `;
const Player2 = styled.div`
margin-left: auto;
  height:auto ;
  display: flex;
  align-items: center;

`;
interface Tableprops {
    
  bgimg : string
  
}
const Table = styled.div<Tableprops>`
cursor: none;
background-image: url(${props => props.bgimg});
background-size: contain;
/* background-repeat: no-repeat; */
width: 100%;
height: 700px;
position: relative;
background-color: ${props => props.theme.colors.bg};

    border: 1px solid ${props => props.theme.colors.purple};
  > svg{
    position:absolute;
    /* background:  ${props => props.theme.colors.bg}; */
    inset: 0 0 0 0;
    width: 100%;
    height: 100%;
    >circle{
      fill: ${props => props.theme.colors.purple};
    }
    >rect{
      fill: ${props => props.theme.colors.bg};
      stroke: ${props => props.theme.colors.purple};
    }
    >line{
      stroke: ${props => props.theme.colors.purple};
    }
  }
  >div{
    width: 100%;
    height: auto ;
  }
`;

export function Spinner() {
  return (
    <SpinnerStyle className="lds-facebook"><div></div><div></div><div></div></SpinnerStyle>
  )
}
const SpinnerStyle = styled.div`

  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

> div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: ${props => props.theme.colors.primaryText};
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  &:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
&:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
&:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

      
      `;





interface UserProps {
  data : {

    name: string,
    msg : string,
    avatar : string
  }
  Ai : boolean
}
      


      export  function UserComponent(props: UserProps) {
        return (
          <>
              <div style={{ width: "100px", height: "100px" }}>
            {props.Ai == false ? <AvatarComponent img={props.data.avatar} /> : <AIstyle img={props.data.avatar} ></AIstyle>}
            
          </div>
          <div className='mesgData'>
            <div className='name'>
             {props.data.name}
            </div>
            <div className='msg'>
            {props.data.msg}
            </div>
          </div>

          </>
        )
      }
      const AIstyle = styled(AvatarComponent)`
      display: none;
        > img{
          display: none;
        }
  `