import React from 'react'
import { Button } from '../../Pages/SignIn';
import { AvatarComponent } from '../PlayerProfile';
import {ReactComponent as Ban} from "../../assets/imgs/ban.svg";
import {ReactComponent as Mute} from "../../assets/imgs/mute.svg";
import {ReactComponent as GameIcon} from "../../assets/imgs/game-icon.svg";
import axios from 'axios';
import {ReactComponent as Admin} from "../../assets/imgs/Admino.svg";


import styled , {css} from "styled-components"
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
interface usersType {
  id: string,
  defaultAvatar: string,
  login : string
  displayName : string,
  restriction: string,
  permission: string,
  restrictionTime: string,
  duration: number,
}


export default function MembersChatModal(props : { closeModal : ()=>void , data : convType}) {

  const channelId = props.data.channelId;


  console.log(props.data.users)
  return (
    <div>   
        Members: 
        <div className='members'>
          {
              props.data.users.map((data : any , id : number)=>{
                if (id === 0)
                  return <></>
                console.log(data)
                return <Member access={props.data.users[0].permission}  data={data} channelId={channelId} />
              })
          }
      </div>
      </div>
  )
}

interface MemberProps{
   channelId: number,
    data : usersType
    access : string
  }

  export  function Member(props : MemberProps) {
    console.log('hna '+props.access)

    const OwnerBan = async () => {
      console.log("OwnerBan")
      var  bodyFormData = {
        channelId: props.channelId.toString(),
        user: props.data.login,
        restriction: "BAN",
        duration: 0
      }
      await axios.post( process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserRestriction", bodyFormData,
      {withCredentials: true} 
      ).then((res)=>{
      }).catch((err)=>{
        console.log(err)
      })
    };
    const OwnerMute = async () => {
      console.log("OwnerMute")
      var  bodyFormData = {
        channelId: props.channelId.toString(),
        user: props.data.login,
        restriction: "MUTE",
        duration: 3
      }
      await axios.post( process.env.REACT_APP_BACKEND_URL+ "/chat/UpdateUserRestriction", bodyFormData,
      {withCredentials: true} 
      ).then((res)=>{
      }).catch((err)=>{
        console.log(err)
      })
    };
    const AdminBan = () => {
      console.log("AdminBan")
    };
    const AdminMute = () => {
      console.log("AdminMute")
    };

    const ChallengeGame = () => {
      console.log("ChallengeGame")
    };
    const SetAdmin = () => {
      console.log("Set the user as admin")
    };

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
          <Button size='small' isIcon={true} onClick={()=>{SetAdmin()}} icon={<Admin/>}/>
          <Button size='small' isIcon={true} onClick={()=>{OwnerBan()}} icon={<Ban/>}/>
          <Button size='small'  isIcon={true} onClick={()=>{OwnerMute()}} icon={<Mute/>}/>
          </>
          
        }
          {(props.access === "ADMIN"
          && props.data.permission !== "OWNER" )&& 
          <>
          <Button size='small' isIcon={true} onClick={()=>{AdminBan()}} icon={<Ban/>}/>
          <Button size='small'  isIcon={true} onClick={()=>{AdminMute()}} icon={<Mute/>}/>
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
  