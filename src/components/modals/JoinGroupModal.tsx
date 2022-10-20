import React from 'react'
import { Button } from '../../Pages/SignIn'
import styled from "styled-components"
import InputComponent from '../Input'

interface RoomProps{
    isLocked : boolean,
    roomBanner?: string,
    roomName ?: string,
    roomMembers ?: number
  }
export default function JoinGroupModal(props :RoomProps ) {
  return (
    <RoomStyle  >
        {
            props.isLocked === true && 
            <InputComponent type='password' placeholder='Enter Password' />
        }
        <div>
        <Button text='Join' />
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