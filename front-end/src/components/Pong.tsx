
import  React, { useEffect , useRef , useState , useContext, RefObject }  from 'react';

import styled from "styled-components"

import { AvatarComponent } from '../components/PlayerProfile';

import Img from "../assets/imgs/avatar/a1.png";

import VegaPunk from "../assets/imgs/vegapunk.png" 
import { SocketContext } from '../context/Socket';
import axios from 'axios';


interface GameProps {
  ballcolor : string,
  paddlecolor : string,
  mode : string
}

interface GameModalProps {
    
  title: string,
  banner :string 
  
}


interface myProps {
  mode : string,
  themes : {
  mode : string,
    theme: {
      map : GameModalProps,
      rounds : number

    }
  }

}
interface UserProp {
  defaultAvatar: string,
  login : string
}
interface Player2Type {
  name: string,
  avatar : string,
  // msg : string
}

const player2 = {
    name: "mehdi elazmi",
    avatar : Img,
    // msg : "Player2"
}
const ai1 = {
  login: "Dr VegaPunk",
  defaultAvatar  : VegaPunk,
  // msg : "AI"
}
var ballSpeed : number = 5;

var [directionX, directionY] = [ballSpeed, ballSpeed];
export default function Pong({themes , mode}:myProps ) {

  const tableRef : any= useRef<HTMLHeadingElement>(null);
  const ballRef : any = useRef<SVGCircleElement >(null);
  const playerRef : any = useRef<SVGRectElement >(null);
  // const lineRef : any = useRef<SVGLineElement >(null);
  const player2Ref : any = useRef<SVGRectElement >(null);
  const player : any = useRef<SVGRectElement >(null);
  const otherplayer : any = useRef<SVGRectElement >(null);
  const requestRef = React.useRef(0)
  const score1Ref = React.useRef(0)
  const score2Ref = React.useRef(0)
  const [start, setStart] = useState(true)
  const [user, setUser] = useState<UserProp>({
    login : "ss",
    defaultAvatar : "sss"

  })

  const [Player2Data, setPlayer2Data] = useState<UserProp | null>(
    null
  )



  const gamesocket = useContext(SocketContext)

  var Predect = 0;
  

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


  const pointScored = (side :  string)=>{
      initBall()
      if (side  === "right")
      {
        score1Ref.current += 1; 
      }
      else if (side  === "left")
      {
        score2Ref.current += 1; 
      }
  
  }
  function moveBall() {
    
    const Px =  parseInt(player2Ref.current.getAttribute('x'));

    const cx = parseInt(ballRef.current.getAttribute('cx'));
    const cy = parseInt(ballRef.current.getAttribute('cy'));
    const ballRadius = parseInt(ballRef.current.getAttribute('r'));
    const rightLimit = tableRef.current.offsetWidth;
    const topLimit = ballRadius;
    const bottomLimit = tableRef.current.offsetHeight - ballRadius;
    const [nextCX, nextCY] = [cx + directionX, cy + directionY];

    if (nextCX > rightLimit) 
      directionX = -directionX;
    else if (nextCY > bottomLimit || nextCY < topLimit)
      directionY = -directionY
    if (detectCollision()) 
    {
      directionX = -directionX  ;
      directionX = directionX + 1;
    }
    if (detectCollision2()) 
      directionX = -directionX;
    if (directionX > 0)
      moveAI(cx + directionX ,cy + directionY) 
    if (nextCX - directionX <  ballRadius)
      pointScored("left")
    else if (nextCX - directionX > rightLimit -  ballRadius)
    {
      pointScored("right")
    }
    else {
      const [xPos, yPos] = [cx + directionX, cy + directionY];
      setBall(xPos, yPos)
      Predect = (Px - xPos) / directionX
    }
    requestRef.current = requestAnimationFrame(moveBall);
  


  }
  
  
  function movePlayer1(event :  MouseEvent)
  {

    const p = player.current;
    const h = parseInt(p.getAttribute('height'));
    var nextY;

    if (event.offsetY < 0)
      nextY = 0;   
    else if ( event.offsetY > tableRef.current.offsetHeight - h)
    {
      nextY = tableRef.current.offsetHeight  - h ;
    }
    else
    {
      nextY = event.offsetY;   
    }
    p.setAttribute('y', nextY)
    // if (p.getAttribute('x') === '80')
    //   gamesocket.emit("player1move" , nextY)
    // else
    //   gamesocket.emit("player2move" , nextY)

  }

  function moveAI(xb : number, yb: number )
  {
    const h = parseInt(player2Ref.current.getAttribute('height'));
    var yp : number ;
    yp =  parseInt(player2Ref.current.getAttribute('y'));
    var PreditctY : number =  yb +( directionY * Predect) -( h / 2);
    var TableH : number =   tableRef.current.offsetHeight;

        if (PreditctY > 0 && PreditctY < TableH)
        { 
          if (PreditctY >  yb && PreditctY < yb  + h)
            return ;
          else if (yp  > PreditctY)
            player2Ref.current.setAttribute('y', yp - 10)
          else if (yp + (h / 2) < PreditctY)
            player2Ref.current.setAttribute('y', yp + 10)
       
        }
        else if (PreditctY < TableH + (TableH / 2)  &&  PreditctY > TableH)
        {
            if (yp  + h < TableH)
              player2Ref.current.setAttribute('y', yp + 10)

        }
        else if (PreditctY < 0  &&  PreditctY > - (TableH / 2))
        {
            if (yp  > 0)
              player2Ref.current.setAttribute('y', yp - 10)
        }

  }


  var defaultProp = {
    ballcolor : "#000",
    paddlecolor : "#000",
    mode : "classic"
  }
  const  setBall =(x : number , y : number)=>{
    ballRef.current.setAttribute('cx', x);
    ballRef.current.setAttribute('cy', y);
  }
  const  setPlayer1 =(x : number , y : number)=>{
    playerRef.current.setAttribute('x', x);
    playerRef.current.setAttribute('y', y);
  }
  const  setPlayer2 =(x : number , y : number)=>{
    player2Ref.current.setAttribute('x', x);
    player2Ref.current.setAttribute('y', y);
  }
  // const  setLine =(x1 : number , y1 : number , x2 : number , y2 : number)=>{
  //   lineRef.current.setAttribute('x1', x1);
  //   lineRef.current.setAttribute('y1', y1);
  //   lineRef.current.setAttribute('x2', x2);
  //   lineRef.current.setAttribute('y2', y2);
  // }
  function randomIntFromInterval(min : number, max : number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const   initBall =()=>{
    ballSpeed =randomIntFromInterval(-5 , 5);
    var ballSpeed2 =randomIntFromInterval(-5 , 5);
    [directionX, directionY] = [ballSpeed, ballSpeed2];
    setBall(tableRef.current.offsetWidth / 2 , tableRef.current.offsetHeight / 2)
  }

  const [gameData, setgameData] = useState<GameProps>(defaultProp)


useEffect(() => {
  var  data : UserProp ;
  var s : string | null = localStorage.getItem('user');
  var gameData : string | null = localStorage.getItem('gameData');
  if (s)
  {
     data =  JSON.parse(s || '{}');
    setUser(data)
    gamesocket.emit("playerConnect" , data.login)
  }
  if (gameData)
  {
    const gamedatao : GameProps =  JSON.parse(gameData || '{}');
    setgameData(gamedatao)

  }
  const initData =()=>{
    setPlayer1(80, 0)
    setPlayer2(tableRef.current.offsetWidth - 100,0 )
   
    switch(mode)
    {
      
      case "AI":
        setPlayer2Data(ai1)
        break ;
        case "classic":
          gamesocket.on("player1moved" , (datatmp)=>{
            playerRef.current.setAttribute('y' , datatmp)
          })
          gamesocket.on("player2moved" , (datatmp)=>{
            // otherplayer.setAttribute('y' , datatmp)
            player2Ref.current.setAttribute('y' , datatmp)

          })
          break ;
          default:

            
          }
        }
        
        setBall(tableRef.current.offsetWidth / 2 , tableRef.current.offsetHeight / 2)

        initData()
        tableRef.current.addEventListener("mousemove", movePlayer1)



        gamesocket.on("startGame" , (datatmp)=>{
          
          if (datatmp.player1 === data.login)
          {
                   player.current = playerRef.current
                   otherplayer.current = player2Ref.current

            axios.get(process.env.REACT_APP_BACKEND_URL + "/users/" + datatmp.player2, 
            {withCredentials: true} 
             ).then((res)=>{
              setPlayer2Data(
                res.data
              )
          }).catch((err)=>{
            })
          }
          else
          {
            player.current = player2Ref.current
            otherplayer.current = playerRef.current
            axios.get(process.env.REACT_APP_BACKEND_URL + "/users/" + datatmp.player1, 
            {withCredentials: true} 
             ).then((res)=>{
              setUser(res.data)
          }).catch((err)=>{
              
            })
              setPlayer2Data(data)
            
          }

        })
        gamesocket.on("endGame" , ()=>{
        })
      } ,[mode])
      
      
  
  return (
    <>
      <PlayerStyle>

        <Player1>
          <UserComponent Ai={false} data={user}/>
          </Player1>
          <Score>
            {score1Ref.current} | {score2Ref.current}
          </Score>
          <Player2>
            {Player2Data === null ?   <Spinner/>  : <UserComponent Ai={true} data={Player2Data}/>  }
        </Player2>
      </PlayerStyle>
    <Table bgimg={""} ref={tableRef} >

      <svg>
          <circle ref={ballRef} id="ball"  cx="20" cy="300" r="12" fill={gameData.ballcolor} />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC"  />
          {/* <line ref={lineRef} x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC" /> */}
          <rect ref={playerRef} rx="10" x="30" y="0" width="20" height="150" fill={gameData.paddlecolor} />
          <rect ref={player2Ref} rx="10 " y="0" width="20" height="150" fill={gameData.paddlecolor} />

        </svg>
    </Table> 
      <PlayerStyle>

        

      </PlayerStyle>
      <button style={{background: "#fff"}} onClick={()=> {
        setStart(!start)
        if (start === true)
          cancelAnimationFrame(requestRef.current)
        else
          moveBall()
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
  gap: 20px;

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
  flex-direction: row-reverse;
  gap: 20px;
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
      z-index: 8;
    }
    >rect{

    }
    >line{
      stroke: ${props => props.theme.colors.purple};
      z-index: 2;

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





interface UserComponetProps {
  data : UserProp
  Ai : boolean
}
      


      export  function UserComponent(props: UserComponetProps) {
        return (
          <>
              <div style={{ width: "100px", height: "100px" }}>
            {props.Ai === false ? <AvatarComponent img={props.data.defaultAvatar} /> : <AIstyle img={props.data.defaultAvatar} ></AIstyle>}
            
          </div>
          <div className='mesgData'>
            <div className='name'>
             {props.data.login}
            </div>
            <div className='msg'>
            {/* {props.data.msg} */}
            ghadi tslkh
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