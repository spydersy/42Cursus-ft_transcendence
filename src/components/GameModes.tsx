import React from 'react'
import { HeadComponent } from '../Pages/Home'
import Carousel from './Carousel'
import History from './History'

export default function GameModes() {
  return (
    <div>
        <HeadComponent title="Game modes"/>
        <Carousel/>
        <History />
    </div>
  )
}
