import React from 'react'
import styled , {css} from "styled-components"
import Pong from '../components/Pong'

export default function Game() {
  return (
    <div style={{marginTop: "50px"}}className="container">
        
        <Pong mode="AI" name="mohamed"/>
    </div>
  )
}
