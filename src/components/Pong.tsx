import React  from 'react'
import styled from "styled-components"
import { useEffect } from "react"

export default function Pong() {


  const ballSpeed = 11; 
  var [directionX, directionY] = [ballSpeed, ballSpeed];
  useEffect(() => {
    const table : any = document.querySelector('#table');
    const ball : any = document.querySelector('#table #ball');
    const ballRadius = parseInt(ball.getAttribute('r'));

    // console.log(table)
    // console.log(ball)
    // console.log(ballRadius)
    // console.log(ballSpeed)
    function moveBall(timestam : any) {
      const cx = parseInt(ball.getAttribute('cx'));
      const cy = parseInt(ball.getAttribute('cy'));
      const leftLimit = ballRadius;
      const rightLimit = table.offsetWidth - ballRadius;
      console.log(table.offsetWidth )
      console.log(table.offsetHeight )
      const topLimit = ballRadius;
      const bottomLimit = table.offsetHeight - ballRadius;
      const [nextCX, nextCY] = [cx + directionX, cy + directionY];
      if (nextCX < leftLimit || nextCX > rightLimit) {
        directionX = -directionX;
        console.log("X " + directionX)
      }
      if (nextCY < topLimit || nextCY > bottomLimit ) {

        directionY = -directionY;
        console.log("Y " + directionY)
        console.log( cy + directionY)

      }
      const [xPos, yPos] = [cx + directionX, cy + directionY];
      ball.setAttribute('cx', xPos);
      ball.setAttribute('cy', yPos);

      requestAnimationFrame(moveBall);

    
    }
    requestAnimationFrame(moveBall);
    return () => {
      
      
    }
  })
  
  return (
    <Table id="table" >Pong

<svg>
    <circle id="ball"  cx="0" cy="0" r="10" fill="yellow"/>
    {/* <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#CCC" stroke-dasharray="8" /> */}
  </svg>
    </Table>
  )
}


//style 
const Table = styled.div`

    height: calc(90vh - 50px);
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
