
import axios from 'axios'
import React , {useEffect , useState , useContext} from 'react'
import styled from "styled-components"
import { AvatarComponent } from '../PlayerProfile'
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";
import { Button } from '../../Pages/SignIn';
import { ReactComponent as CheckIcon } from "../../assets/imgs/check.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-icon.svg";

import { SocketGameContext } from '../../context/Socket'
import { SocketContext } from '../../context/Socket'

import {
Link
} from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { userInfo } from 'os';
import { alterHsl } from 'tsparticles-engine';
interface msgType {
  channelId : string,
  content : string, 
  date : string, 
  displayName : string, 
  id : number,
  senderId : number
}

interface ssss {
  accepter: string,
  reciever: string,
  status: boolean
}
interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
}
export  function MutedToast() {
  return (
    <ToastStyle to="">

        <div className='data'>
            <div className='msg'>
              Please ! Take a break,  You are Muted for a while
            </div>
        </div>
    </ToastStyle>
  )
}

export  function AcceptToast(props: {data : ssss}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })

  useEffect(() => {
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data.accepter  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)

            }).catch((error)=>{ 
             
              } 
   )


        
  }, [])
  
  return (
    <ToastStyle to="">
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {props.data.accepter}
            </div>
            <div className='msg'>
              
              {(props.data.status)?" accepted your friend request :":" canceled your friend request :"}
            </div>
        </div>
    </ToastStyle>
  )
}
export default  function MsgToast(props: {data : msgType}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })
  useEffect(() => {
  //   axios.get( process.env.REACT_APP_BACKEND_URL + "/users/friends/" + props.data.senderId  ,  {withCredentials: true}
  //       ).then((res)=>{
  //             // check for the user is bloked 
  //             console.log("> status = " , res.status)
  //             setUser(res.data)

  //           }).catch((error)=>{ 
             
  //             } 
  //  )


        
  }, [])
  
  return (
    <ToastStyle to={"/chat/"+ props.data.channelId}>
        <div className='avatar'>
          <AvatarComponent img={Mamali}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {props.data.displayName}
            </div>
            <div className='msg'>
              Sent a meessage :
              <span>
                {" " + props.data.content}
              </span>
            </div>
        </div>
    </ToastStyle>
  )
}

const ToastStyle = styled(Link)`
  /* width: 400px; */
  width: 100%;
  height: 100%;
  color : #FFF;
  display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    
    .buttons{
      display: flex;
      align-items: center;
      flex-direction: row;
      gap:5px;
    }
  .avatar{
    width: 50px;
    height: 50px;
  }
  .data{
    flex: 1;
    height: 50px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:5px;
    font-family: "Poppins" , sans-serif;
    font-size: 15px;
    overflow: hidden;
white-space: nowrap;
    .name{
      font-weight: 600;

    }
    .msg{
     max-width: 95%;
      text-overflow: ellipsis;
    font-size: 13px;
      >span{

      }
    }
  }
`
export  function GameChallengeToast(props: {data : any}) {
  const gamesocket = useContext(SocketGameContext)
  const UserData = useContext(UserContext)

  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })
  useEffect(() => {
    console.log(props.data)
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)

            }).catch((error)=>{ 
             
              } 
   )


        
  }, [])
  const acceptChallenge = ()=>{
    // gamesocket.emit("gameAccept", {player1 : props.data, player2: UserData?.login})
    // window.location.href = "/game"
  }
  return (
    <ToastStyle to="">
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {User.displayName}
            </div>
            <div className='msg'>
              Is challenging you.:
            </div>
        </div>
        <div className='buttons'>
          <Button  onClick={acceptChallenge} size='small'  isIcon={true} icon={<CheckIcon/>}/>
        </div>
    </ToastStyle>
  )
}


export  function FriendRequestToast(props: {data : any}) {
  const socket = useContext(SocketContext)
  const userData = useContext(UserContext)
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })
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
  const acceptFriendReq = async(k: boolean)=> {


    if (k)
    {
      await axios.get(process.env.REACT_APP_BACKEND_URL+  "/users/relation/"+  User?.login + "?event=accept",  {withCredentials: true} 
      ).then((res)=>{
        joinChannels()
      }).catch((err)=>{  })
    }
    userData.then((user : UserProp | "{}")=>{
      if (user !== "{}")
      {
        socket.emit('acceptFriendRequest', {accepter: user?.login, reciever: User?.login, status: k} )
      }

  })
  }
  useEffect(() => {
    console.log(props.data)
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data.sender  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              console.log("> status = " , res.data)
              setUser(res.data)

            }).catch((error)=>{ 

              } 
   )
  }, [])
  
  return (
    <ToastStyle to="">
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {User.displayName}
            </div>
            <div className='msg'>
              Sent a Friend Request:
            </div>
        </div>
        <div className='buttons'>
          <Button onClick={()=>{acceptFriendReq(true)}}  size='small'  isIcon={true} icon={<CheckIcon/>}/>
          <Button onClick={()=>{acceptFriendReq(false)}} type='secondary' size='small'  isIcon={true} icon={<CloseIcon/>}/>
        </div>
    </ToastStyle>
  )
}
