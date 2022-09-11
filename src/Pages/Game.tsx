import React from 'react'
import styled , {css} from "styled-components"
import Pong from '../components/Pong'


interface GameProps {
  theme: any
  
}
export default function Game(props : GameProps) {
  return (
    <div style={{marginTop: "50px"}}className="container">
        
        <Pong theme={props.theme} mode="AI" name="mohamed"/>
    </div>
  )
}
