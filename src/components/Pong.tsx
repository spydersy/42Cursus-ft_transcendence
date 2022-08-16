
import  React, { useEffect , useRef , useState  }  from 'react';

import * as ReactDOM from 'react-dom'; 
// import {Draggable} from 'typescript-react-draggable';
import styled from "styled-components"
import io from 'socket.io-client';

const socket = io('http://localhost:3030');
export default function Pong() {
  const tableRef : any= useRef<HTMLHeadingElement>(null);
  const ballRef : any = useRef<SVGCircleElement >(null);
  const playerRef : any = useRef<SVGRectElement >(null);
  const player2Ref : any = useRef<SVGRectElement >(null);
  var player : any = useRef<SVGRectElement >(null);
  const [ready, setReady] = useState(false)
  const [header, setHeader] = useState("waiting")
  const [Player, setPlayer] = useState<SVGRectElement | string>()
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
      const cx = parseInt(player.current.getAttribute('x'));
      const cy = parseInt(player.current.getAttribute('y'));
      const h = parseInt(player.current.getAttribute('height'));
      // console.log(event.keyCode )
      switch( event.keyCode ) {
        case UP_KEY:
          if (cy - 100 >= 0)
          player.current.setAttribute('y', cy - 100);
          else
          player.current.setAttribute('y',0);
          
          break;
          case DOWN_KEY:
              if (cy + 100 <= tableRef.current.offsetHeight - h)
                player.current.setAttribute('y', cy + 100);
              else
                player.current.setAttribute('y', tableRef.current.offsetHeight  -h)
            break;
        default: 
            break;
        }
        const x = parseInt(player.current.getAttribute('x'));
      const y = parseInt(player.current.getAttribute('y'));
        socket.emit("player move",x,  y )
        // if (move != 0)
            // movePlayer(event)
    // console.log(playerRef.current.getAttribute('y'))
    }
    useEffect(() => {

      socket.emit("joinRoom", "room1")
      console.log("join room")
      socket.on('RoomJoined', (id : number ) => {
        console.log(id)
          setHeader("joined room Player " + id )
          if (id === 0)
          {
            player = 1

            }
            else
            {
              player = 2
          }


      });
      socket.on('roomFilled', (id : number ) => {
          setHeader("joined room Watcher  " + id )
      });
      socket.on('StartGame', (id : number ) => {
          setReady(true)
      });

     if (ready)
     {
      const wp2 = parseInt(player2Ref.current.getAttribute('width'));

      player2Ref.current.setAttribute('x' , tableRef.current.offsetWidth - 50)
      player2Ref.current.setAttribute('y' , 0)
      playerRef.current.setAttribute('x' ,  50)
      playerRef.current.setAttribute('y' , 0)
      console.log(player)
      if (player === 1)
        player = playerRef
      else
        player = player2Ref
      document.addEventListener("keydown", movePlayer);

      
      socket.on('msgToClient', (x : any , y : any) => {
        playerRef.current.setAttribute('x', x[0]);
        playerRef.current.setAttribute('y', x[1]);
        console.log(x[0])
        console.log(x[1])
        // console.log(y)


       })
      socket.on('observer', (ms : any) => {
          console.log("just watchh")
       })
      socket.on('joined Room', (ms : any) => {
          console.log("playerr")
          // console.log(ms)
       })
     }
     
    return () => {
      
    }
  })
  
  return (
    <>

    <div>
      Status : {header}
    </div>
   {ready ?  <Table ref={tableRef} >Pong

      <svg>
          <circle ref={ballRef} id="ball"  cx="110" cy="40" r="20" fill="yellow"/>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC" stroke-dasharray="8" />

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
