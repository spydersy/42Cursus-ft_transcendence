
import  React, { useEffect , useRef , useState ,useLayoutEffect }  from 'react';

import * as ReactDOM from 'react-dom'; 
// import {Draggable} from 'typescript-react-draggable';
import styled from "styled-components"
import axios from 'axios';
import io from 'socket.io-client';

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
  
  const ballSpeed : number = 11;
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
    directionX = -directionX;
    const [xPos, yPos] = [cx + directionX, cy + directionY];
    console.log(xPos)
    if (xPos <=  ballRadius) { // player lost
      alert('Ooops');
    } else {
      
      ballRef.current.setAttribute('cx', xPos);
      ballRef.current.setAttribute('cy', yPos);
      requestAnimationFrame(moveBall);
    }
    // requestAnimationFrame(moveBall);
  }
  
  
  function movePlayer(event :  KeyboardEvent)
  {
    console.log(player)
    
    const p = Player?.current;
    console.log(p)
    // const cx = parseInt(p.getAttribute('x'));
    // const cy = parseInt(p.getAttribute('y'));
    // const h = parseInt(p.getAttribute('height'));
    
    
    
    
    // switch( event.keyCode ) {
      //   case UP_KEY:
      //     if (cy - 100 >= 0)
      //     p.setAttribute('y', cy - 100);
      //     else
      //     p.setAttribute('y',0);
      
      //     break;
      //     case DOWN_KEY:
      //         if (cy + 100 <= tableRef.current.offsetHeight - h)
      //           p.setAttribute('y', cy + 100);
      //         else
      //           p.setAttribute('y', tableRef.current.offsetHeight  -h)
      //       break;
      //   default: 
      //       break;
      //   }
      //   const x = parseInt(p.getAttribute('x'));
      // const y = parseInt(p.getAttribute('y'));
      //   socket.emit("player move",x,  y )
      
    }
  //   const socket = io('http://localhost:3030');
  //   useEffect(() => {
    
  //     var args = {
  //       name : name,
  //       room : "room1"
  //     }
  //     socket.emit("joinRoom", args)
 
  //     socket.on('RoomJoined', (id : number ) => {
  //       console.log(id)
  //         setHeader( name +" joined room Player " + id )
  //         if (id === 1)
  //         {
  //           player = 1

  //           }
  //           else
  //           {
  //             player = 2
  //         }
  //         console.log(player)

  //     });
  //     socket.on('roomFilled', (id : number ) => {
  //         setHeader(name +" joined room Watcher  " + id )
  //     });
  //     socket.on('StartGame', (id : number ) => {
  //         setReady(true)
  //     });
  //     socket.on('disconnected', function() {

  //       socket.emit('leaveRoom', args);

  //   });
  //    if (ready)
  //    {
  //     const wp2 = parseInt(player2Ref.current.getAttribute('width'));
  //     player2Ref.current.setAttribute('x' , tableRef.current.offsetWidth - 50)
  //     player2Ref.current.setAttribute('y' , 0)
  //     playerRef.current.setAttribute('x' ,  50)
  //     playerRef.current.setAttribute('y' , 0)
  //     console.log("Player : " + player)
      
  //     document.addEventListener("keydown", movePlayer);

     

  //    }
     
  //   return () => {
  //   }
  // })
  

  return (
    <>

    <div>
      Status : {header}
    </div>
   {ready ?  <Table ref={tableRef} >Pong

      <svg>
          <circle ref={ballRef} id="ball"  cx="110" cy="40" r="20" fill="yellow"/>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC"  />

          <rect ref={playerRef} x="50" y="0" width="33" height="180" fill="#FFF" />
          <rect ref={player2Ref}    y="0" width="33" height="180" fill="#FFF" />

        </svg>
    </Table> :
    <div>
      QUEUE
    </div>
    }


    </>
  )
}


//style 
const Table = styled.div`

    width: 1000px;
    height: 700px;
    position: relative;
    background-color: gray;
  svg{
    position:absolute;
    background: #666;
    inset: 0 0 0 0;
    z-index:1;
    width: 100%;
    height: 100%;
  }
`;
