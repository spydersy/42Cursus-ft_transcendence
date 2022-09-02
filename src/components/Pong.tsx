
import  React, { useEffect , useRef , useState ,useLayoutEffect }  from 'react';

import * as ReactDOM from 'react-dom'; 
// import {Draggable} from 'typescript-react-draggable';
import styled from "styled-components"
import axios from 'axios';
import io from 'socket.io-client';
import { AvatarComponent } from './Upperbar';

interface myProps {
  name: string;

}
export default function Pong({name}:myProps ) {
  const tableRef : any= useRef<HTMLHeadingElement>(null);
  const ballRef : any = useRef<SVGCircleElement >(null);
  const playerRef : any = useRef<SVGRectElement >(null);
  const player2Ref : any = useRef<SVGRectElement >(null);
  var player : number;
  const [ready, setReady] = useState(true)
  const [header, setHeader] = useState("waiting")
  const [Player, setPlayer] = useState<any>()
  var UP_KEY = 38;
  var DOWN_KEY = 40;
  
  const ballSpeed : number = 5;
  var [directionX, directionY] = [ballSpeed, ballSpeed];
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
    const cx = parseInt(ballRef.current.getAttribute('cx'));
    const cy = parseInt(ballRef.current.getAttribute('cy'));
    
    const ballRadius = parseInt(ballRef.current.getAttribute('r'));
    const leftLimit = ballRadius;
    const rightLimit = tableRef.current.offsetWidth - ballRadius;
    const topLimit = ballRadius;
    const bottomLimit = tableRef.current.offsetHeight - ballRadius;
    
    const [nextCX, nextCY] = [cx + directionX, cy + directionY];
    if (nextCX > rightLimit) 
    directionX = -directionX;
    if (nextCY < topLimit || nextCY > bottomLimit )
    directionY = -directionY;
    if (nextCY < topLimit) {
      // directionY = -directionY;
    }
    if (detectCollision()) 
    {
      directionX = -directionX  ;
      
      directionX = directionX * 1.2;
    }
    if (detectCollision2()) 
      directionX = -directionX;
    const [xPos, yPos] = [cx + directionX, cy + directionY];
    // console.log(xPos)
    if (xPos <=  ballRadius) { // player lost
      // alert('Ooops');
    } else {
      
      ballRef.current.setAttribute('cx', xPos);
      ballRef.current.setAttribute('cy', yPos);
      requestAnimationFrame(moveBall);
    }
    // requestAnimationFrame(moveBall);
  }
  
  
  function movePlayer1(event :  MouseEvent)
  {
    console.log(player)

    const p = playerRef?.current;
    // console.log(p)
    // const cx = parseInt(p.getAttribute('x'));
    const cy = parseInt(p.getAttribute('y'));
    const h = parseInt(p.getAttribute('height'));
    console.log(event)
    if ( event.offsetY < tableRef.current.offsetHeight - h)
       p.setAttribute('y', event.offsetY)
    else 
        p.setAttribute('y', tableRef.current.offsetHeight  - h)
    // switch( event.keyCode ) {
    //     case 119:
    //       if (cy - 50 >= 0)
    //       p.setAttribute('y', cy - 50);
    //       else
    //       p.setAttribute('y',0);

    //       break;
    //       case 115:
    //           if (cy + 50 <= tableRef.current.offsetHeight - h)
    //             p.setAttribute('y', cy + 50);
    //           else
    //             p.setAttribute('y', tableRef.current.offsetHeight  -h)
    //         break;
    //     default: 
    //         break;
    //     }
      //   const x = parseInt(p.getAttribute('x'));
      // const y = parseInt(p.getAttribute('y'));
      //   socket.emit("player move",x,  y )

    }
  function movePlayer2(event :  MouseEvent)
  {
    console.log(player)

    const p = player2Ref?.current;
    console.log(event)
    // const cx = parseInt(p.getAttribute('x'));
    // const cy = parseInt(p.getAttribute('y'));
    // const h = parseInt(p.getAttribute('height'));
    // // switch( event.keyCode ) {
    // //     case UP_KEY:
    //       // if (cy - 50 >= 0)
    //         p.setAttribute('y',event.screenY);
        //   else
        //     p.setAttribute('y',0);

        //   break;
        //   case DOWN_KEY:
        //       if (cy + 50 <= tableRef.current.offsetHeight - h)
        //         p.setAttribute('y', cy + 50);
        //       else
        //         p.setAttribute('y', tableRef.current.offsetHeight  -h)
        //     break;
        // default: 
        //     break;
        // }
      //   const x = parseInt(p.getAttribute('x'));
      // const y = parseInt(p.getAttribute('y'));
      //   socket.emit("player move",x,  y )

    }

  //   const socket = io('http://localhost:3030');
    useEffect(() => {
      const initData =()=>{
        player2Ref.current.setAttribute('x' , tableRef.current.offsetWidth - 50)
        player2Ref.current.setAttribute('y' , 0)
        playerRef.current.setAttribute('x' ,  30)
        playerRef.current.setAttribute('y' , 0)
      }
      initData()
      moveBall()
      tableRef.current.addEventListener("mousemove", movePlayer1)
      // document.addEventListener("keydown", movePlayer2)
  })
  return (
    <>
      <PlayerStyle>

        <Player1>
        <div style={{width: "50px", height : "50px"}}>

        <AvatarComponent/>
        </div>
        <div className='mesgData'>
            <div className='name'>
              mohamed Elkarmi
            </div>
            <div className='msg'>
             Player 1
            </div>
        </div>
          </Player1>
      </PlayerStyle>
    <Table ref={tableRef} >Pong

      <svg>
          <circle ref={ballRef} id="ball"  cx="110" cy="40" r="12" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC" stroke-dasharray="10" />

          <rect ref={playerRef} rx="10" x="30" y="0" width="20" height="150" fill="#FFF" />
          <rect ref={player2Ref} rx="10 " y="0" width="20" height="150" fill="#FFF" />

        </svg>
    </Table> 
      <PlayerStyle>

        <Player2>
          {/* <div style={{ width: "50px", height: "50px" }}>

            <AvatarComponent />
          </div>
          <div className='mesgData'>
            <div className='name'>
              mehdi Elaazmi
            </div>
            <div className='msg'>
              Player 2
            </div>
          </div> */}
          <Spinner/>
        </Player2>

      </PlayerStyle>
    </>
  )
}


//style 

const PlayerStyle = styled.div`
  display: flex;
  width: 100% ;
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

      }
      .msg{
        font-size: 15px;
        opacity: 0.7;
        color:  ${props => props.theme.colors.seconderyText};
      }
  }}
`;
const Player1 = styled.div`
  margin-right: auto;
  height:70px ;
  display: flex;
  align-items: center;

  `;
const Player2 = styled.div`
margin-left: auto;
  height:70px ;
  display: flex;
  align-items: center;

`;
const Table = styled.div`
cursor: none;
width: 100%;
height: 700px;
position: relative;
background-color: ${props => props.theme.colors.bg};

    border: 1px solid ${props => props.theme.colors.purple};
  > svg{
    position:absolute;
    background:  ${props => props.theme.colors.bg};
    inset: 0 0 0 0;
    z-index:1;
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