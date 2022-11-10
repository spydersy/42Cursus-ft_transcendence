import React, {useRef, useContext} from 'react'
import { Button } from '../../Pages/SignIn'
import styled from "styled-components"
import InputComponent from '../Input'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { UserProp } from '../game/types'
import axios from 'axios'


interface RoomProps{
    isLocked : boolean,
    roomBanner?: string,
    roomName ?: string,
    roomMembers ?: number
    link?: number 
    id?: number
  }
export default function JoinGroupModal(props :RoomProps ) {
  const reff = useRef<HTMLInputElement>(null)
  const user = useContext(UserContext)
  const addMember = () =>{
    alert(props.id)
    var v = reff.current?.value
    if (v)
    {
      user.then(async(data: UserProp | "{}")=>{
        if (data != "{}")
        {
          const obj = { channelId: props.id,
            user: data.login,
            password: v,
          }
          console.log(obj)
        await axios.post( process.env.REACT_APP_BACKEND_URL+"/chat/joinChannel/", obj, {withCredentials: true}).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        }
      })
    }
  }

  return (
    <RoomStyle  >
        {
            props.isLocked === true && 
            <InputComponent refs={reff} type='password' placeholder='Enter Password' />
        }
        <div>
          {/* <Link to={"/chat/" + props.link}> */}
        <Button onClick={addMember} text='Join' />
          {/* </Link> */}
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