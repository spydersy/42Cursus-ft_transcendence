
import axios from 'axios'
import React , {useEffect , useState , useContext} from 'react'
import styled from "styled-components"
import { AvatarComponent } from '../PlayerProfile'
import { Button } from '../../Pages/SignIn';
import { ReactComponent as CheckIcon } from "../../assets/imgs/check.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-icon.svg";
import { SocketGameContext } from '../../context/Socket'
import { SocketContext } from '../../context/Socket'
import {Link} from "react-router-dom";
import { UserContext } from '../../context/UserContext';


interface msgType {
  login : string,
  content : string, 
  channelId: string,
  displayName: string
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
  wins : number[]
  losses : number[]
}
export  function MutedToast(props :{ mesg : string , link? : string}) {
  return (
    <ToastStyle to={props.link}>
        <div className='data'>
            <div className='msg'>
              {props.mesg}
            </div>
        </div>
    </ToastStyle>
  )
}
export  function AddedToast(props: {data : string}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : [0,0],
    losses : [0,0],
  })
  useEffect(() => {
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked
              setUser(res.data)
            }).catch((error)=>{ 
        } 
   )     
   // eslint-disable-next-line
  }, [])
  return (
    <ToastStyle to="">
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {props.data}
            </div>
            <div className='msg'>
              Added You to a channel
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
    wins : [0,0],
    losses : [0,0],
  })

  useEffect(() => {
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data.login ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked
              setUser(res.data)

            }).catch((error)=>{ 
              } 
   )
   // eslint-disable-next-line
  }, [])
  
  return (
    <ToastStyle to={"/chat/"+ props.data.channelId}>
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
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

export  function AcceptToast(props: {data : ssss}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : [0,0],
    losses : [0,0],
  })

  useEffect(() => {
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data.accepter  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)
            }).catch((error)=>{ 
             
              } 
   )


        // eslint-disable-next-line
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
    wins : [0,0],
    losses : [0,0],
  })
  useEffect(() => {
   
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)
            }).catch((error)=>{ 
             
              } 
   )


      // eslint-disable-next-line
  }, [])
  const acceptChallenge = (e : any)=>{
    // e.stopPropagation()
    UserData.then((data: UserProp | "{}")=>{
      if (data !== "{}")
      {
        gamesocket.emit("gameAccept", {player1 :data?.login , player2:  props.data})
      }
    }
    )
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
          <Button  onClick={(e)=>{acceptChallenge(e)}} size='small'  isIcon={true} icon={<CheckIcon/>}/>
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
    wins : [0,0],
    losses : [0,0],
  })
  let joinChannels = async () => {
    let userLogin : string;
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/profile/me", 
    {withCredentials: true} 
    ).then((res)=>{
      userLogin = res.data.login
    }).catch((err)=>{
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
   
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data.sender  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)

            }).catch((error)=>{ 

              } 
   )
   // eslint-disable-next-line
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
