import React from 'react'
import { Button } from '../../Pages/SignIn'
import styled from "styled-components"
import InputComponent from '../Input'
import { Link } from 'react-router-dom'

interface RoomProps{
    isLocked : boolean,
    roomBanner?: string,
    roomName ?: string,
    roomMembers ?: number
    link?: number 
  }
export default function JoinGroupModal(props :RoomProps ) {
  return (
    <RoomStyle  >
        {
            props.isLocked === true && 
            <InputComponent type='password' placeholder='Enter Password' />
        }
        <div>
          <Link to={"/chat/" + props.link}>
        <Button text='Join' />
          </Link>
        <Button type='secondary' text='Cancel' />

        </div>
    </RoomStyle>
  )
}

const RoomStyle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    >div{

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > button {
            width: 40%;
        }
    }
`;