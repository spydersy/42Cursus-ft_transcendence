import React, { useEffect , useState}  from 'react'
import styled ,{css}from "styled-components";
import{ReactComponent as DotsIcon }from "../assets/imgs/dots.svg"
import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";

import {ReactComponent as Accepte} from "../assets/imgs/y-circle.svg";
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import {ReactComponent as UserAddIcon} from "../assets/imgs/user-plus.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as CalendarIcon} from "../assets/imgs/calendar.svg";
import {ReactComponent as RankIcon} from "../assets/imgs/rank.svg";
import {ReactComponent as GameIcon} from "../assets/imgs/game-icon.svg";

import { Button } from '../Pages/SignIn';

import axios from 'axios';
import Achivments from './Achivments';
import  { RadarChart } from './charts/Charts';

const Backcolor = css`${props => props.theme.colors.purple}`


//// PlayerCard Comp
interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
}
export interface PlayerCardProps {
  isCurrentUser : boolean,
    player: UserProp
}
export function PlayerCard(props: PlayerCardProps) {
  return (
      <PlayerCardStyle  >
      
          <div className='Identity'> 
              <div className='Iavatar' style={ {width : "150px" , height : "150px"}} >
                <AvatarComponent img={props.player.defaultAvatar}/>
              </div>

              <div className='infoSec'>

                  <div className='Bar'>  
        
                      <div className='text' > {props.player.displayName} </div>
                  </div>

                  <div className='Bar'>  
                      <div className='text' > @{props.player.login} </div>
                  </div>

              </div>
              
          </div>

          <Stats isCurrentUser={props.isCurrentUser} player={props.player}/>
          
      </PlayerCardStyle>
  )
}
  
const PlayerCardStyle = styled.div`
padding: 0px 0px;
margin-bottom: 13px;
width:  100%;
display: flex;
position: relative;
border-radius: 10px 10px 10px 10px;
background-color: ${props => props.theme.colors.seconderybg};
@media  only screen and (max-width: 1090px) {
  flex-direction: column;
  .Identity{
    /* width: 1500px; */
    width: 100% !important;
    margin: 0 auto;
    /* width: 90%; */

  }
}
.Identity{
    width: 250px;
    height: 100%;

    background: linear-gradient(144deg, #74549C 16.67%, #3581B3 100%);
border-radius: 10px 30px 30px 10px;
    .Iavatar{
      margin: 40px auto; 
    }
    .infoSec {
        padding : 10px;
        .Bar{
            margin-top: 5px;
            display: flex;
            align-items: center;
            font-family: 'Poppins', sans-serif;
            .name{
                font-style: normal;
                background-color: #8841ca1b;
                font-size: 15px;
                min-width: 90px;
                line-height: 20px;
                display: flex;
                align-items: right;
                color: ${props => props.theme.colors.primaryText};
                padding: 0px 0px;
                margin-right: 10px;
                font-weight: 600;
            }
            .text{
                color: ${props => props.theme.colors.primaryText};
                font-size: 19px;
                font-weight: 600;
                -webkit-text-stroke: 1px #44404562;

            }
        }
    }
}

`;



// interface StatusProps {
//     status : "online" | "offline"
// }
export function Stats(props: PlayerCardProps) {
  const [relationStatus, setrelationStatus] = useState<string | undefined>("")
  const addFriend = ()=>{
       //http://localhost:8000/users/relation/:id?evet=add

      axios.get("http://localhost:8000/users/relation/"+ props.player.login+ "?event=add", 
      {withCredentials: true} 
    ).then((res)=>{
      // console.log(res.data)
      alert("friend Request sent" + res.status)
  
    }).catch((err)=>{
  
          // history.pushState("/signin");
      })
  }
  useEffect(() => {
      setrelationStatus(props.player?.relation)
      console.log(props.player?.relation)
  })
  

    return (
      <StatsStyle  >

          {/* <Status status={"online"}>
            <ActivityIcon/>
              Online
          </Status> */}

        
        <Data>
            <div className='data'>
              <div>
                <DataTag> 
                  <DataTag>
                    <RankIcon/>
                    Yonko
                  </DataTag>
                  <DataTag>
                    <UsersIcon/>
                   {props.player.nbFriends}
                    {" Friends"}
                  </DataTag>
                </DataTag>
                <DataTag>
                  <DataTag>
                    <GameIcon/>
                    {  props.player?.wins +   props.player?.losses}
                    Games
                    </DataTag>
                    <DataTag>
                    <CalendarIcon/>
                    Mars 2020
                  </DataTag>
                </DataTag>
              </div>
              <Achivments/>
              {props.isCurrentUser === false && 
                <Buttons>
                  
                  {
                    relationStatus === "FRIENDS" ? 
                    <Button  type='secondary' onClick={addFriend} icon={<UserAddIcon/>} text='Friend'/>
                    :
                    relationStatus === 'PENDING' ? 
                    <Button onClick={addFriend} icon={<UserAddIcon/>} text='Accept'/>
                    : 
                    <Button onClick={addFriend} icon={<UserAddIcon/>} text='Add User'/>
                  }
                  <Button icon={<UserAddIcon/>}   type='secondary' text='Invite to play'/>
                </Buttons>
              }

            </div>
            <div className='vr'>

            </div>
            <div className='Stats'>
              < RadarChart/>
            </div>
        </Data>
      </StatsStyle>
    )
}

const DataTag = styled.div`
  /* width: 100%; */
  /* background-color: #bdd4d4; */
  display: flex;
  align-items: center;
  min-width : 200px;
  /* padding: 10px; */
  gap: 10px;
  font-family: 'Poppins' , sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 33px;
  color : ${props => props.theme.colors.seconderyText};
  >svg{
    path {
      stroke: ${props => props.theme.colors.seconderyText};
    }
  }

`;



const StatsStyle = styled.div`
background-color: #171A22;
padding :10px;
/* width: 100%; */
flex: 1;
min-height: 100%;
display: flex;
align-items: center;
flex-direction: column;

gap: 5px;
border-radius: 0px 10px 0px 0px;
`
const Buttons = styled.div`

display: flex;
flex-direction: row;
gap: 10px;

`

const Data = styled.div`
/* flex: 1; */

flex: 1;
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
@media  only screen and (max-width: 750px) {
  flex-direction: column;

}

.data{
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  
}
.Stats{
  position: relative;
 /* flex: 1; */
 height: 100%;
  /* flex: 1;/ */
width: auto;
  
}
`


///// UserCard Comp
export interface UserCardProps {

  data: {
    login: string;
    defaultAvatar: string;

  }
}
export interface StyleProps {
    status: boolean;
}
export  function UserCard(props : UserCardProps) {
  return (
    <UserCardStyle status={true}>
      
      <div className="status" >
      </div>

      <DotsIcon className='dots'/>
        <div className='List'>
          <div className='element' >
              Unfriend
          </div>
        
        </div>
      <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
      
      <div className="Uname">
          {props.data.login}
    </div>
    </UserCardStyle>
  )
}

const UserCardStyle = styled.div<StyleProps>`
  position: relative;
  background: linear-gradient(144deg, #74549C 16.67%, #3581B3 100%);
font-family: "Poppins" , sans-serif;
  margin : 10px;
  width: 130px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  animation: fadeIn 2s;
  ${props => props.status === true ? css`
  .status {
      background-color: #3CC592;
      /* display: none; */
    }
    ` :
    css`
    .status {
      background-color: #e40101;
    }
    
    `}

  .status {
  

    /* border: 3px solid ${Backcolor}; */
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: 0px;
    transform: translate(-12%, -12%);
  }
  .List {
    display: none;
  }
  > svg {
    /* display: flex; */
    cursor: pointer;
    position: absolute;
    width: 20px;
    height:15px;
    right: 3px;
    top: 3px;
    /* padding: 1px 1px ; */
    path{
      stroke: white;
    }
    &:hover {
      transform: scale(1.5);

      right: 3px;
      top: 3px;
      path{
      stroke: black;
    }

    }
    }
  .avatar {
    display: none;
  }
  .Uname {
    position: absolute;
    color: #fcfafc;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin : 2px 0px;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bolder;
    bottom: 0px;
    /* -webkit-text-stroke: 1px #929292b7; */
  }

  &:hover {
    height: 125px;
    transition: 0.8s;
    .avatar {
      border: 1px solid #fcfafc;
      border-radius: 50%;
      position: absolute;
      display: block;
      width: 50%;
      top: 15px;
      left: 25%;
      animation: fadeIn 3s;
      > img {
        width:70px;
        height: 70px;
      }
    }
  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
  }
`;

/// Game History tab //
export interface GameCompProps {
  win: boolean
}

export interface GameCardProps {
  match: {
      name: string;
      score1: number,
      score2: number,
      img: any,
      min: number,
      sec: number,
  },
  isFriend : boolean
}

export  function GameComp(props : GameCardProps) {
  var state : boolean =( props.match.score1 > props.match.score2) ? true : false
return (
  <GameCompStyle win={state} >
      <div style={{marginLeft : "24px"}}>
        <AvatarComponent img={ props.match.img} />
      </div>

      <Dataa>
          <div className='name' >
                  {props.match.name}
          </div>
          <div className='stat'>
               {props.match.score1} : {props.match.score2}
          </div>

      </Dataa>
      {
          props.isFriend &&
          <div id='addFriend'>
              <AddFriend/>
          </div>
      }

      <ElapsedTime>
        <Etimer className='E_timer'/>

        <div className='time_min'> {props.match.min}m  </div>
        <div className='time_sec'> {props.match.sec}s</div>

      </ElapsedTime>

  </GameCompStyle>
)
}

const GameCompStyle = styled.div<GameCompProps>`
  
  width: 90%;
  height: 70px;
  margin: 15px 0px 10px 50px ;

  background: ${props => props.theme.colors.bg};
  border-top: 2px solid  ${props => props.theme.colors.border};
  border-bottom: 2px solid  ${props => props.theme.colors.border};
  border-left: 2px solid  ${props => props.theme.colors.border};
  /* margin-bottom: 10px; */
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  &::after{
      content: "";
      position: absolute;
      width: 3px;
      height: 100%;
      top: 0;
      right: 0;
      background-color:  ${props => props.theme.colors.green};
      ${props => (props.win === false) && css`
      background-color:  ${props => props.theme.colors.danger};
    `}
  }
  #addFriend{
      position: absolute;
      bottom: 5px;
      right: 10px;
      cursor: pointer;
      &:hover{
          transform: scale(1.1);
      }
  }
`;

const ElapsedTime = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 3px;
  height: 40%;
  align-items: center;
  gap: 5px;
  .E_timer {
    height: 15px;
    width: 15px;
    path {
      fill: #a648b7;
    }
  }
  .time_min {
      width: auto;
      height: auto;
      color: white;
      align-items: center;
  }
  .time_sec{
    height: auto;
    width: auto;
    color: white;
  }
`;
interface UserProp {
  defaultAvatar: string,
  login : string
}
interface AvatarProps {img: string }

export  function AvatarComponent(props: AvatarProps) {
 
  useEffect(() => {
   

  }, [])
  
return (
  <Avatarr>
    <img src={props.img} alt='avatar' />
  </Avatarr>
)
}

const Avatarr = styled.div`
width: 100%;
height: 100%;
border-radius : 50%;
overflow: hidden;
background-color: white;
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

`;

const Dataa = styled.div`
  
  width: 20%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  color:  ${props => props.theme.colors.primaryText};

  .name{
      font-family: 'Poppins' , sans-serif;
      text-transform: capitalize;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      text-align: center;
      letter-spacing: 1px;
  }
  .stat{
      font-family: 'Poppins' , sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 100%;
      margin: 10px 0px;
      text-align: center;
      letter-spacing: 0.3px;
  }
`;

export  function AddFriend() {
return (
  <AddFriendStyle>
      <AddIcon/>
      Add Friend
  </AddFriendStyle>
)
}

const AddFriendStyle = styled.div`
 font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  width: 75px;
  height: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;


  svg{

      path{
          fill: ${props => props.theme.colors.primaryText}
      }
  }
  color: ${props => props.theme.colors.primaryText};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  padding: 0 5px;
`;


export interface UserInvitCardProps {
  data: UserProp
}
export interface StyleProps {
    status: boolean;
}

export  function UserInvitCard(props : UserInvitCardProps) {
  const accepteFriend = ()=>{
   axios.get("http://localhost:8000/users/relation/"+ props.data.login+ "?event=accept", 
   {withCredentials: true} 
 ).then((res)=>{
   alert("friend Request Accepted" + res.status)

 }).catch((err)=>{

   })
}
  useEffect(() => {
    console.log(props.data)

  }, )
  
  console.log(props.data)
  return (
    <UserInvitCardStyle >

      <div className="YN"> 

        <Deny className='Bdeny'/>
        <Accepte onClick={accepteFriend} className='Adeny'/>

      </div>

      <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
      <div className="Uname"> {props?.data?.login}  </div>
    
    </UserInvitCardStyle>
  )
}

const UserInvitCardStyle = styled.div`

  position: relative;
  background: #70539b68;
  margin : 10px;
  width: 130px;
  height: 130px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid  #70539b ;
  animation: fadeIn 2s;

  .YN {
    /* background-color: #0228ff; */
    position: absolute;
    top: 0px;

    width: 100%;
    height: 20%;
    .Bdeny {
      position: absolute;
      width: 25px;
      height: 25px;
      
      top: 4px;
      left: 5px;

      &:hover {
        cursor: pointer;
        fill: #f50000a6;
        width: 27px;
        height: 27px;
      }

    } 
    .Adeny {
      position: absolute;
      width: 25px;
      height: 25px;
      
      top: 4px;
      right: 5px;

      &:hover {
        cursor: pointer;
        fill: #12c006a8;
        width: 27px;
        height: 27px;
      }
    }
  }

  .avatar {
      border: 1px solid #fcfafc;
      border-radius: 50%;
      position: absolute;
      display: block;
      width: 50%;
      top: 20%;
      left: 25%;
      animation: fadeIn 4s;
      > img {
        width:70px;
        height: 70px;
      }   
    }

    .Uname {
    position: absolute;
    color: #fcfafc;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin : 2px 0px;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bolder;
    bottom: 0px;
    /* -webkit-text-stroke: 1px #929292b7; */
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    &:hover {
      cursor: pointer;
      background: #70539bdb;

    }
`;

/// Blocked Users ///
export interface UserBlockedCardProps {
  data: {
    login: string;
    defaultAvatar: string;
  }
}
export interface StyleProps {
    status: boolean;
}

export  function UserBlockedCard(props : UserBlockedCardProps) {
  return (
    <UserBlockedCardStyle >
      <div className="YN"> 
        <Deny className='Bdeny'/>
      </div>
      <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
      <div className="Uname"> {props.data.login}  </div>
    </UserBlockedCardStyle>
  )
}

const UserBlockedCardStyle = styled.div`

  position: relative;
  background: #000000;
  margin : 10px;
  width: 130px;
  height: 130px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid  #433f49 ;
  animation: fadeIn 2s;

  .YN {
    position: absolute;
    top: 0px;

    width: 100%;
    height: 20%;
    .Bdeny {
      position: absolute;
      width: 25px;
      height: 25px;
      
      top: 4px;
      left: 5px;

      &:hover {
        cursor: pointer;
        fill: #f50000a6;
        width: 27px;
        height: 27px;
      }

    } 
    .Adeny {
      position: absolute;
      width: 25px;
      height: 25px;
      
      top: 4px;
      right: 5px;

      &:hover {
        cursor: pointer;
        fill: #12c006a8;
      }
    }
  }

  .avatar {
      border: 1px solid #fcfafc;
      border-radius: 50%;
      position: absolute;
      display: block;
      width: 50%;
      top: 20%;
      left: 25%;
      animation: fadeIn 4s;
      > img {
        width:70px;
        height: 70px;
      }   
    }

    .Uname {
    position: absolute;
    color: #fcfafc;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin : 2px 0px;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bolder;
    bottom: 0px;
    /* -webkit-text-stroke: 1px #929292b7; */
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    &:hover {
      cursor: pointer;
      background: #282c34;

    }
`;