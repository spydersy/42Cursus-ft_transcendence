import React, { useRef, useContext } from 'react'
import { Button } from '../../Pages/SignIn'
import styled from "styled-components"
import InputComponent from '../Input'
import { UserContext } from '../../context/UserContext'
import { UserProp } from '../game/types'
import axios from 'axios'
import { toast } from 'react-toastify';
import { MutedToast } from '../Toasts/MsgToast';
import { SocketContext } from '../../context/Socket'
import { useNavigate } from 'react-router-dom'


interface RoomProps {
  isLocked: boolean,
  roomBanner?: string,
  roomName?: string,
  roomMembers?: number
  link?: number
  id?: number
  closeModal: () => void,
}

const CustomToastMesg = (msg: string) => (
  <div style={{ width: "100%", height: "100%" }}>
    <MutedToast mesg={msg} />
  </div>
);
export default function JoinGroupModal(props: RoomProps) {
  const socket = useContext(SocketContext)
  const reffo = useRef<HTMLInputElement>(null)
  const user = useContext(UserContext)
  const navigate = useNavigate();

  const cancelreq = ()=> {
    props.closeModal()
  }
  let joinChannels = async () => {

    let userLogin : string;
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/profile/me", 
    {withCredentials: true} 
    ).then((res)=>{
      userLogin = res.data.login
    }).catch((err)=>{
      console.log(err)
    })
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
    {withCredentials: true} 
    ).then((res)=>{
      var myChannels : Array<string> = [];
      for (let index = 0; index < res.data.length; index++) {
        myChannels.push(res.data[index].channelId);
      }
      myChannels.push(userLogin);
      // mychannels.pushback(userlogin)
      socket.emit('joinRoom', myChannels)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const addMember = () => {
    // alert(props.id)
    // console.log("_____ADD MEMEBER____")
    var v = reffo.current?.value
    if (v) {
      user.then(async (data: UserProp | "{}") => {
        if (data !== "{}") {
          const obj = {
            channelId: props.id,
            user: data.login,
            password: v,
          }
          // console.log(obj)
          await axios.post(process.env.REACT_APP_BACKEND_URL + "/chat/joinChannel/", obj, { withCredentials: true }).then(async(res) => {
            console.log(res.data.message)
            if (res.data.message === "User Added") {
              console.log("joined succesfully!")
              const toasty = () => toast(CustomToastMesg("Group joined succefully"), {
                className: "toast",
                progressClassName: "toastProgress",
                autoClose: 2000,
                hideProgressBar: true,
              })
              toasty()
              await joinChannels()
              navigate("/chat/" + props.id)
            }
            // if joined 
          }).catch((err) => {
            // console.log(err)
            // console.log("haaaaaaaa")
            const toasty = () => toast(CustomToastMesg("Ouups, reye7 mea kerek!"), {
              className: "toast",
              progressClassName: "toastProgress",
              autoClose: 2000,
              hideProgressBar: true,
            })
            toasty()
          })
        }
      })
    }
    else
    {
      // console.log("_____Hnaaaaa____")
      user.then(async (data: UserProp | "{}") => {
        if (data !== "{}") {
          const obj = {
            channelId: props.id,
            user: data.login,
            password: "whatever",
          }
          // console.log(obj)
          await axios.post(process.env.REACT_APP_BACKEND_URL + "/chat/joinChannel/", obj, { withCredentials: true }).then(async (res) => {
            // console.log(res.data.message)
            if (res.data.message === "User Added") {
              // console.log("joined succesfully!")
              const toasty = () => toast(CustomToastMesg("Ooopaa, Channel joined succefully"), {
                className: "toast",
                progressClassName: "toastProgress",
                autoClose: 2000,
                hideProgressBar: true,
              })
              toasty()
              await joinChannels()
              navigate("/chat/" + props.id)

            }
            // if joined 
            props.closeModal()
          }).catch((err) => {
            // console.log(err)
          })
        }
      })
    }
    props.closeModal()
  }

  return (
    <RoomStyle  >
      {
        props.isLocked === true &&
        <InputComponent refs={reffo} type='password' placeholder='Enter Password' />
      }
      <div>
        {/* <Link to={"/chat/" + props.link}> */}
        <Button onClick={addMember} text='Join' />
        {/* </Link> */}
        <Button type='secondary' onClick={cancelreq} text='Cancel' />

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