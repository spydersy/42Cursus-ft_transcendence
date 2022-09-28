import React from 'react'
import Pong from '../components/Pong'


interface GameProps {
  theme: any
  
}
export default function Game(props : GameProps) {
  return (
    <div style={{marginTop: "100px"}}className="container">
        
        <Pong themes={props.theme} mode={props.theme.mode}/>
    </div>
  )
}
