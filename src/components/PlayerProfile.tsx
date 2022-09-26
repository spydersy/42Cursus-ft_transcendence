import React, { useRef, useEffect, useState}  from 'react'
import styled ,{css}from "styled-components";
import Avatar from "../assets/imgs/tests/guy.svg"
import { ReactComponent as Penta} from "../assets/imgs/penta.svg"
import { CircularProgressbar } from 'react-circular-progressbar';
import{ReactComponent as DotsIcon }from "../assets/imgs/dots.svg"
import rank1 from "../assets/imgs/ranks/iron.png"
import rank2 from "../assets/imgs/ranks/gold.png"
import rank3 from "../assets/imgs/ranks/bronze.png"
import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";

import {ReactComponent as Accepte} from "../assets/imgs/y-circle.svg";
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import {ReactComponent as UserAddIcon} from "../assets/imgs/user-plus.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as ActivityIcon} from "../assets/imgs/activity.svg";
import {ReactComponent as CalendarIcon} from "../assets/imgs/calendar.svg";
import {ReactComponent as RankIcon} from "../assets/imgs/rank.svg";
import Melkarmi from "../assets/imgs/avatar/hfadyl.jpeg";
import {ReactComponent as GameIcon} from "../assets/imgs/game-icon.svg";
import Badge1 from "../assets/imgs/Archive/badge1.svg";
import Badge2 from "../assets/imgs/Archive/badge2.svg";
import Badge3 from "../assets/imgs/Archive/badge3.svg";
import Badge4 from "../assets/imgs/Archive/badge4.svg";


import { Button } from '../Pages/SignIn';

import axios from 'axios';
import Achivments from './Achivments';
import DoughnutChart from './charts/Charts';

const Backcolor = css`${props => props.theme.colors.purple}`
const GreyBackcolor = "#282c34"


//// PlayerCard Comp 
const achievment1 = {
  name: "SERGENT",
  desc : "you played 20 game without any loss",
  badge : Badge1,
}
const achievment2 = {
  name: "The Alchemist",
  desc : "You are a M9WED player by nature",
  badge : Badge2,
}
const achievment3 = {
  name: "MASTER",
  desc : "you win 5 game.",
  badge : Badge3 ,
}
const achievment4 = {
  name: "MASTER",
  desc : "you win 5 game.",
  badge : Badge4 ,
}
const achiv = [achievment1 , achievment2 , achievment3 , achievment4]
interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
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
                      <div className='text' > {props.player.login} </div>
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
.Identity{
    width: 30%;
    height: 100%;
    /* background-color:${Backcolor}; */
    border-radius: 10px 0px 0px 0px;
    bottom: 0px;
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



interface StatusProps {
    status : "online" | "offline"
}
export function Stats(props: PlayerCardProps) {
  const addFriend = ()=>{
       //http://localhost:8000/users/relation/:id?evet=add

      axios.get("http://localhost:8000/users/relation/"+ props.player.login+ "?event=add", 
      {withCredentials: true} 
    ).then((res)=>{
      // console.log(res.data)
      alert("friend Request sent")
  
    }).catch((err)=>{
  
          // history.pushState("/signin");
      })
  }

const option =  {

  legend : {
    position : "bottom"
  },
}
 const data = {
  labels: ['Wins', 'Lost'],
 
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',

      ],
      borderWidth: 1,
    },
  ],
};
    return (
      <StatsStyle  >
        <Header>
          {/* <Status status={"online"}>
            <ActivityIcon/>
              Online
          </Status> */}
          {props.isCurrentUser === false && 
            <Buttons>
              
              <Button icon={<UserAddIcon/>}   type='secondary' text='Invite to play'/>
              <Button onClick={addFriend} icon={<UserAddIcon/>} text='Add Friend'/>
            </Buttons>
          }

        </Header>
      
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
                    5
                    Friends
                  </DataTag>
                </DataTag>
                <DataTag>
                  <DataTag>
                    <GameIcon/>
                    250
                    Games
                    </DataTag>
                    <DataTag>
                    <CalendarIcon/>
                    Mars 2020
                  </DataTag>
                </DataTag>
              </div>
              <Achivments/>

            </div>
            <div className='Stats'>
              <DoughnutChart />
            </div>
        </Data>
      </StatsStyle>
    )
}

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

`;
const DataTag = styled.div`
  /* width: 100%; */

  display: flex;
  align-items: center;
  min-width : 200px;
  gap: 10px;
  font-family: 'Poppins' , sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  color : ${props => props.theme.colors.seconderyText};
  >svg{
    path {
      stroke: ${props => props.theme.colors.seconderyText};
    }
  }

`;

const Status = styled.div<StatusProps>`
  /* width: 150px; */
  display: flex;
  align-items: center;
 
  font-family: 'Poppins' , sans-serif;
font-style: normal;
font-weight: 400;
font-size: 22px;
line-height: 33px;
justify-content: space-around;
>svg{
  path {
    stroke: ${props => props.theme.colors.green};
  }
}
color: ${props => props.theme.colors.green};

`

const StatsStyle = styled.div`
background-color: #171A22;
padding :10px;
width: 100%;
min-height: 100%;
display: flex;
align-items: center;
flex-direction: column;

gap: 5px;
border-radius: 0px 10px 0px 0px;
`
const Buttons = styled.div`

 flex : 1;
height: auto;
display: flex;
flex-direction: row-reverse;
align-items: flex-start;
gap: 10px;

`

const Data = styled.div`

flex: 1;
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
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
  flex: 1;

  
}
`


///// UserCard Comp
export interface UserCard {

  data: {
    login: string;
    defaultAvatar: string;

  }
}
export interface StyleProps {
    status: boolean;
}
export  function UserCard(props : UserCard) {
  const [active, setActive] = useState(false);
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
      <img src={props.data.defaultAvatar} className="avatar" />
      
      <div className="Uname">
          {props.data.login}
    </div>
    </UserCardStyle>
  )
}

const UserCardStyle = styled.div<StyleProps>`
  position: relative;
  background: ${Backcolor};
  margin : 10px;
  width: 130px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid  #70539b ;
  animation: fadeIn 2s;
  ${props => props.status == true ? css`
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
  

    border: 3px solid ${Backcolor};
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
      animation: fadeIn 4s;
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
  /* background-color: #325e81; */
  display: flex;
  position: absolute;
  right: 10px;
  top: 3px;
  /* margin: 5px 0px; */
  /* width: 10%; */
  /* min-width: 90px; */
  height: 40%;
  align-items: center;
  gap: 5px;
  .E_timer {
    height: 15px;
    width: 15px;
    /* min-width: 25px; */
    /* min-height: 25px; */

    /* margin: 0px 3px; */
    path {
      fill: #a648b7;
    }
  }
  .time_min {
      /* background-color: #d16522; */
      /* width: auto; */
      width: auto;
      height: auto;
      /* min-width: 25px; */
      color: white;
      align-items: center;
      /* margin: 5px 0px 5px 5px; */
  }
  .time_sec{
    height: auto;
    width: auto;
    /* min-width: 25px; */
    color: white;

    /* background-color: #d16522; */
    /* margin: 5px 0px 5px 2px; */
  }
`;
interface UserProp {
  defaultAvatar: string,
  login : string
}
interface AvatarProps {img: string }

export  function AvatarComponent(props: AvatarProps) {
  var s : string | null = localStorage.getItem('user');
 
  // const [image, setimage] = useState<undefined | string>()
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
/* border: 2px solid   ${props => props.theme.colors.purple};; */

`;

const Dataa = styled.div`
  /* width: 100%; */
  /* margin-left: 14px;s */
  /* height: 100%; */
  
  width: 20%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  /* font-weight: 700; */
  color:  ${props => props.theme.colors.primaryText};
  /* background-color: #00ffff92; */

  .name{
      font-family: 'Poppins' , sans-serif;
      text-transform: capitalize;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      /* or 18px */
      text-align: center;
      letter-spacing: 1px;
      /* color: #000000; */
      /* margin: 10px 0px 3px 10px; */
  }
  .stat{
      /* background-color: #b22bd0; */
      font-family: 'Poppins' , sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 100%;
      margin: 10px 0px;
      /* identical to box height, or 12px */
      text-align: center;
      letter-spacing: 0.3px;
      /* color: #000000; */
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
/// Game History tab //

/// Pending Request tab //
export interface UserInvitCard {
  data: UserProp
}
export interface StyleProps {
    status: boolean;
}

export  function UserInvitCard(props : UserInvitCard) {
  useEffect(() => {
 
  

  }, )
  
  const [active, setActive] = useState(false);
  console.log(props.data)
  return (
    <UserInvitCardStyle >

      <div className="YN"> 

        <Deny className='Bdeny'/>
        <Accepte className='Adeny'/>

      </div>

      <img src={props.data.defaultAvatar} className="avatar" />
      <div className="Uname"> {props.data.login}  </div>
    
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
export interface UserBlockedCard {
  data: {
    username: string;
    avatar: string;
  }
}
export interface StyleProps {
    status: boolean;
}

export  function UserBlockedCard(props : UserInvitCard) {
  const [active, setActive] = useState(false);
  return (
    <UserBlockedCardStyle >
      <div className="YN"> 
        <Deny className='Bdeny'/>
      </div>
      <img src={props.data.defaultAvatar} className="avatar" />
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