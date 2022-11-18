import React, {useEffect, useState, useContext} from 'react'
import { Button } from '../../Pages/SignIn';
import { AvatarComponent } from '../PlayerProfile';
import {ReactComponent as Ban} from "../../assets/imgs/ban.svg";
import {ReactComponent as Mute} from "../../assets/imgs/mute.svg";
import {ReactComponent as Kick} from "../../assets/imgs/kick.svg";

import {ReactComponent as GameIcon} from "../../assets/imgs/game-icon.svg";
import axios from 'axios';
import {ReactComponent as Admin} from "../../assets/imgs/Admino.svg";
import styled from "styled-components"
import Modal from '../Modal';
import EmptyComponent from '../PlayerrEmptyComp';
import { SocketContext , SocketGameContext} from '../../context/Socket';
import { UserContext } from '../../context/UserContext';


interface convType {
  nbMessages: number,
  lastUpdate: string,
  access : string,
  channelId: number,
  name: string;
  password: string,
  picture : string,
  users: usersType[]
}

export interface UserProp {
  id: string,
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number[]
    losses : number[]
  }

interface usersType {
  id: string,
  defaultAvatar: string,
  login : string
  displayName : string,
  restriction: string,
  permission: string, // OWNER=> 2 / ADMIN=> 1 / USER => 0
  num: number,
  restrictionTime: string,
  duration: number,
}

export default function MembersChatModal(props : { closeModal : ()=>void , data : convType }) {
  useEffect(() => {
    var l  =   []
    for (let i = 1; i < props.data.users.length; i++) {
      const element = props.data.users[i];
        l.push(element)
    }   
    setmembers(l)
 

  // eslint-disable-next-line
  }, [])
  const [members, setmembers] = useState([])
  
  const channelId = props.data.channelId;
  return (
    <div>
        Members: 
        {
         members.length === 0 ? <EmptyComponent text="Just You !"/> : 
        <div className='members'>
          {
              members.map((data : any , id : number)=>{
                return <Member key={id} users={ members} setUsers={(e)=>{setmembers(e)}} access={props.data.users[0].permission}  data={data} channelId={channelId} />
              })
          }
      </div>
        }
      </div>
  )
}

interface MemberProps{
   channelId: number,
    data : usersType
    access : string
    users : usersType[],
    setUsers : (e: any)=>void,
  }

  export  function Member(props : MemberProps) {
    const [restriction, setrestriction] = useState(props.data.restriction)
    const [permission, setpermission] = useState(props.data.permission)
    const [muteModel, setmuteModel] = useState(false)
    const socket = useContext(SocketContext)
    const gamesocket = useContext(SocketGameContext)
    const User = useContext(UserContext)



    useEffect(() => {
      // setmembers(prps.users)
      axios.get(process.env.REACT_APP_BACKEND_URL + "/chat/userRestriction/" + props.data.login + "?channelId=" + props.channelId,  {withCredentials: true}  ).then(async(res)=>{
   
        setrestriction(res.data.restriction)
        setpermission(res.data.permission)
      })

      return () => {
      }

    // eslint-disable-next-line
    }, [])
    
    const OwnerBan = async (k: number) => {
      var  bodyFormData = {
        channelId: props.channelId.toString(),
        user: props.data.login,
        restriction: (k === 0 ? "BAN":"UNBAN"),
        duration: 0
      }
      await axios.post( process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserRestriction", bodyFormData,
      {withCredentials: true}
      ).then((res)=>{
        (k === 0 ? setrestriction("BAN") : setrestriction("NULL") )
      }).catch((err)=>{
      })
    };
    const OwnerMute = async () => {
      setmuteModel(!muteModel)
    };
    const OwnerUnMute = async () => {
      var  bodyFormData = {
        channelId: props.channelId.toString(),
        user: props.data.login,
        restriction: "MUTE",
        duration: 0
      }
      await axios.post( process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserRestriction", bodyFormData,
      {withCredentials: true} 
      ).then((res)=>{
        setrestriction("NULL")
      }).catch((err)=>{
      })
    };
    const ChallengeGame =  () => {
      User.then((user : UserProp | "{}")=>{
        if (user !== "{}")
        {
          socket.emit("gameChallenge",  props.data.login, user.login ) ; 
          gamesocket.emit("gameChallenge" , {player1 :props.data.login  , player2 :  user.login})
        }
      })
    };
    const SetAdmin = async (s: string) => {
      var o = {
        channelId: props.channelId,
        user: props.data.login
      }
      await axios.post( process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserPermission?role="+s.toLowerCase(), o,
      {withCredentials: true} 
      ).then((res)=>{
        setpermission(s)
      }).catch((err)=>{
      })
    };
    const OwnerKick = async() =>{
      await axios.delete(process.env.REACT_APP_BACKEND_URL+"/chat/kickUser/" +props.data.login +"?channel=" + props.channelId ,       {withCredentials: true} )
      .then((res)=>{
        for (let i = 0; i < props.users.length; i++) {
          const element = props.users[i];
          if (element.login === props.data.login)
          {
            var s = props.users;
            s.splice(i , 1);
            props.setUsers([...s])

          }
        }
      }).catch((err)=>{
      })
    }
    return (
      <MemberStyle>
        <div className='data'>
          <div className='avatar'>
            <AvatarComponent img={props.data.defaultAvatar}/>
          </div>
          <div className='name'>
               { props.data.displayName}
            <span>
              @{props.data.login}
            </span>
          </div>
        </div>
        <div className='buttons'>
          {props.access === "OWNER"
          &&
          <>
           {permission === "USER"? <Button size='small' isIcon={true} onClick={()=>{SetAdmin("admin")}} icon={<Admin/>}/> 
          :<Button size='small' color={"#ae0b0b"} isIcon={true} onClick={()=>{SetAdmin("USER")}} icon={<Admin/>}/>
        }
          {(restriction === "NULL"||restriction === "MUTED")? <Button size='small'   isIcon={true} onClick={()=>{OwnerBan(0)}} icon={<Ban/>}/>
          :<Button size='small' color={"#ae0b0b"}  isIcon={true} onClick={()=>{OwnerBan(1)}} icon={<Ban/>}/>
        }
          {
            muteModel &&
            <Modal
                    isOpen={muteModel}
                    onRequestClose={() => setmuteModel(false)}
                    hideModal={() => setmuteModel(false)}
                >
                  <MuteModal setPermission={(e)=>(setrestriction(e))}  closeModal={()=>setmuteModel(false)} data={props.data} channelId={props.channelId} />
                  </Modal>
          }
          {restriction === "MUTED" ? <Button size='small' color={"#ae0b0b"} isIcon={true} onClick={()=>{OwnerUnMute()}} icon={<Mute/>}/>
          :<Button size='small'  isIcon={true} onClick={()=>{OwnerMute()}} icon={<Mute/>}/>
        }
           <Button size='small'  isIcon={true} onClick={()=>{OwnerKick()}} icon={<Kick/>}/>
          </>
        }
          {(props.access === "ADMIN"
          && props.data.permission !== "OWNER" && props.data.permission !== "ADMIN" )&& 
          <>
          {restriction === "NULL"? <Button size='small' color={"#ae0b0b"}  isIcon={true} onClick={()=>{OwnerBan(0)}} icon={<Ban/>}/>
          :<Button size='small'  isIcon={true} onClick={()=>{OwnerBan(1)}} icon={<Ban/>}/>
        }
          {
            muteModel &&
            <Modal
            isOpen={muteModel}
            onRequestClose={() => setmuteModel(false)}
            hideModal={() => setmuteModel(false)}
            >
                  <MuteModal setPermission={(e)=>(setrestriction(e))} closeModal={()=>setmuteModel(false)} data={props.data} channelId={props.channelId} />
                  </Modal>
          }
          {restriction === "MUTED" ? <Button size='small' color={"#ae0b0b"} isIcon={true} onClick={()=>{OwnerUnMute()}} icon={<Mute/>}/>
          :<Button size='small'  isIcon={true} onClick={()=>{OwnerMute()}} icon={<Mute/>}/>
        }
        <Button size='small'  isIcon={true} onClick={()=>{OwnerKick()}} icon={<Kick/>}/>
          </>
        }
        <Button size='small'  isIcon={true} onClick={()=>{ChallengeGame()}} icon={<GameIcon/>}/>
        </div>
      </MemberStyle>
    )
  }
  
  const MemberStyle = styled.div`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      width: 95%;
      height: 60px;
      margin: 0 auto;
      gap: 5px;
      font-family: 'Poppins', sans-serif;
        .data{
          display: flex;
          align-items: center;
          flex-direction: row;
          flex : 1;
          height: 60px;
          margin: 0 auto;
          gap: 5px;
          font-family: 'Poppins', sans-serif;
          .avatar{
              width: 50px;
              height: 50px;
          }
          .name{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-direction: column;
            text-align: start;
            color : #FFF;
            font-size:  ${props => props.theme.fontSize.s};
            font-weight : 600;
            text-align: start ;
            > span{
              font-weight : 500;
              opacity: 0.8;
            }
          }
        }
          > .buttons{
            display: flex;
            gap: 10px;
          }
  `;
  

  export  function MuteModal(props : {data : usersType, channelId: number , closeModal : ()=> void , setPermission :  (e : any)=> void }) {
    const [muteTime, setmuteTime] = useState(0)
    const OwnerMute = async () => {
      var  bodyFormData = {
        channelId: props.channelId.toString(),
        user: props.data.login,
        restriction: "MUTE",
        duration: muteTime
      }
      await axios.post(process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserRestriction", bodyFormData,{withCredentials: true} ).then((res)=>{
        props.setPermission("MUTED")
        props.closeModal()
      }).catch((err)=>{
      })
    };
    return (
      <MuteModalStyle>
        <div className='time'>
        <Button type={muteTime === 60? 'primary':'secondary'} text='1 min' onClick={()=>setmuteTime(60)} />
        <Button type={muteTime === 300? 'primary':'secondary'} text='5 min' onClick={()=>setmuteTime(300)} />
        <Button type={muteTime ===600 ? 'primary':'secondary'} text='10 min' onClick={()=>setmuteTime(600)} />
        <Button type={muteTime === 1800? 'primary':'secondary'} text='30 min' onClick={()=>setmuteTime(1800)} />
        <Button type={muteTime === 3600? 'primary':'secondary'} text='1 hr' onClick={()=>setmuteTime(3600)} />
        <Button type={muteTime === 86400? 'primary':'secondary'} text='1 day' onClick={()=>setmuteTime(86400)} />
        </div>
        <div className='buttons'>
        <Button text='confirm' onClick={()=>OwnerMute()} />
        <Button  type='secondary' text='cancel' onClick={()=>props.closeModal()} />
        </div>
      </MuteModalStyle>
    )
  }
  
  const MuteModalStyle = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    >.time{
    width: 100%;
      flex-wrap: wrap;
      display: flex;
      gap:5px;
      justify-content: center;
    align-items:center;
    flex-direction: row;
    }
    >.buttons{
    width: 100%;
      display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-around;
    }
  `;
