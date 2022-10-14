import React, { useEffect , useState, CSSProperties}  from 'react'
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
import {ReactComponent as BlockIcon} from "../assets/imgs/ban.svg";
import { Button } from '../Pages/SignIn';
import axios from 'axios';
import Achivments  from './Achivments';
import  { RadarChart } from './charts/Charts';
import HashLoader from 'react-spinners/HashLoader';
import CircleLoader from "react-spinners/CircleLoader";

//// PlayerCard Comp
interface UserProp {
  defaultAvatar: string,
  status: string,
  login : string
  displayName : string
  relation : string
  nbFriends? : string
  wins : number
  losses : number
  lastModification : string 
}

export interface PlayerCardProps { isCurrentUser : boolean,  player: UserProp }

export function PlayerCard(props: PlayerCardProps) {

  let color = ("");
  const [loading, setLoading] = useState(true);

  let status = "";  
  
  
  if (props.player.status === "InGame")
  {
    color = ("#1e30a1");
    status = "InGame";
  }
  else if (props.player.status === "Online")
  {
    color = ("#2b8852");
    status = "Online";
  }
  else if (props.player.status === "Offline")
  {
    color = ("#af1c1c");
    status = "Offline";
  }
  else
  {
    // setLoading(false);
    status = "Mghayer";
  }


  let username = props.player.displayName;
  let name = username.split(" ");
  if (name.length > 2)
    username = name[1] + " " +  name[2];
  if (username === "Elmahdi Elaazmi" ) 
    username = "Alchemist"
   
    return (
      <PlayerCardStyle  status={color} >
      
          <div className='Identity'>
              
              {/* <>Status: </> */}
              <div className="status" >       
                {/* <HashLoader   color={color} loading={loading} cssOverride={override} size={22} /> */}
                <CircleLoader   color={color} loading={loading} cssOverride={override} size={20} />
                <div className='status-text' >{status}</div>
                {/* ONLINE */}
              </div>


              <div className='Iavatar' style={ {width : "150px" , height : "150px"}} >
                <AvatarComponent img={props.player.defaultAvatar}/>
              </div>

              <div className='infoSec'>

                  <div className='Bar'>  
        
                      <div className='text' > {username} </div>
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
  
const PlayerCardStyle = styled.div<StyleProps>`
padding: 0px 0px;
margin-bottom: 13px;
width:  100%;
display: flex;
position: relative;
border-radius: 10px 10px 10px 10px;
background-color: ${props => props.theme.colors.seconderybg};
/* box-shadow:         1px 1px 1px 2px ${props => props.status};  */

@media  only screen and (max-width: 1090px) {
  flex-direction: column;
  .Identity{
    /* width: 1500px; */
    width: 100% !important;
    margin: 0 auto;
    /* width: 90%; */
    /* box-shadow:         1px 1px 1px 1px ${props => props.status};  */

  }
  } 
.Identity{
    width: 250px;
    height: 100%;
    background: linear-gradient(144deg, #74549C 16.67%, #3581B3 100%);
    border-radius: 10px 30px 30px 10px;
    /* box-shadow:         2px 2px 2px 2px ${props => props.status};  */

    .status {

      width: 25px;
      height: 25px;
      border-radius: 50%;
      left: 0px;
      top: 0px;
      border: ${props=> props.status} 5px solid;
      /* border: 3px solid ; */
      transform: translate(15%, 15%);
      background-color: #f9f9f984;

      .status-text {
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        font-weight: 300;
        color: ${props => props.status};
        top: 0px;
        left: 35px;
        /* transform: translate(0%, 10%); */
        /* left: 10px; */
        position: absolute;
        /* left: 50%; */
        /* top: 0px; */
      }

    } 
    .Iavatar{ margin: 40px auto;  }
    
    .infoSec {
        padding : 10px;
        .Bar{
            margin-top: 5px;
            display: flex;
            align-items: center;
            align-content: flex-start;
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
                text-align: left;
                -webkit-text-stroke: 1px #44404562;

            }
        }
    }
}

`;

interface UserProp {
  defaultAvatar: string,
  status : string
  login : string
  displayName : string
  relation : string
  nbFriends? : string
  wins : number
  losses : number
  lastModification: string
}


export function Stats(props: PlayerCardProps) {
  
    const [relationStatus, setrelationStatus] = useState<string >("");
    const id = window.location.pathname.split("/")[2];
    const [createdTime, setcreatedTime] = useState<string | undefined>("")
    const Grades = ["Unranked","Shinobi","ShiboKay","Hokage","Yonko","3ANKOUB","XX","XXXX","XXXXX","XXXXX"]
    const [grade, setgrade] = useState<string | undefined>(Grades[5])
    const [AChievements, setAChievements] = useState< {} | any>([false, false, false, false, false, false, false, false])

    // setrelationStatus(props.player.relation)

    const addFriend = ()=>{
        //http://localhost:8000/users/relation/:id?evet=add
        axios.get("http://localhost:8000/users/relation/"+ props.player.login+ "?event=add", 
        {withCredentials: true} 
        ).then((res)=>{
        // console.log(res.data)
        // alert("friend Request sent" + res.status)
        setrelationStatus("PENDING")
        // console.log(relationStatus)
        }).catch((err)=>{
          // history.pushState("/signin");
        })
    }

    const UnfriendUser = ()=>{
    
    }

    const InviteToPlay = ()=>{
    
    }

    const BlockUser = ()=>{

    }

    console.log( "Player Data > ", props.player, "\n")

    useEffect(() => {
        
        // setrelationStatus(props.player?.relation)
        console.log( "- 1Relation <" , props.player.relation, "> \n")
        console.log( "- 2Relation <" , relationStatus, "> \n")
        
        // get user data  from server
        axios.get("http://localhost:8000/users/" + id,  {withCredentials: true}).then((res)=>{
          // set grade
          
          setrelationStatus(res.data.relation)


          //Rank
          if (res.data.level)
            setgrade(Grades[res.data.level])
          else
            setgrade("Unranked")
       
          //CreatedTime
          const date = new Date(res.data.lastModification)
          setcreatedTime(date.toString().split("GMT")[0])

          console.log("> createdTime : ", createdTime)
          console.log("> grade : ", grade, "\n")

        }).catch((err)=>{   
        })

        axios.get("http://localhost:8000/users/achievements/" + id,  {withCredentials: true}).then((res)=>{
          // Achievenments          
          setAChievements(res.data)
          console.log("> Achievements : ", AChievements)
        }).catch((err)=>{
        })
   
      }, [])


    return (
      <StatsStyle  >
        <Data>

            <div className='data'>
              
              <div>
               
                <DataTag> 
                  <DataTag>   <RankIcon/>  {grade}  </DataTag>
                  <DataTag>   <UsersIcon/> {props.player.nbFriends} {" Friends"} </DataTag>
                </DataTag>

                <DataTag>
                  <DataTag>     <GameIcon/> {props.player?.wins +   props.player?.losses} {"  Game"} </DataTag>
                  {/* <DataTag>     <CalendarIcon/> {props.player.lastModification}  </DataTag> */}
                  <DataTag>     <CalendarIcon/> {createdTime}  </DataTag>
                </DataTag>

                {props.isCurrentUser === false && 
                 
                  <Buttons className='Btp' >
                    {
                      // UserState : BlockedUser, Friend, Pending, None(Not a friend)
                  
                      // Friends relation
                      relationStatus === "FRIENDS" ? 
                        <>
                          <Button  type='secondary' onClick={UnfriendUser} icon={<UserAddIcon/>} text='Unfriend'/>

                          <a href="/chat/id">  <Button  icon={<UserAddIcon/>} text='Send Message'/> </a>

                          <Button icon={<UserAddIcon/>}   type='secondary' onClick={InviteToPlay} text='Invite to Play'/>

                          <Button  type='secondary' onClick={BlockUser} icon={<BlockIcon/>} text='Block'/>
                        </>
                      : 
                      // Pending request relation
                      relationStatus === 'PENDING' ? 
                        <Button onClick={addFriend}  text='Pending'/>
                      :
                      // Blocked relation
                      relationStatus === "BLOCKED" ? 
                        <Button icon={<BlockIcon/>}   type='secondary' text='UnBlock'/>
                      : 
                      relationStatus === "NOTHING" ? 
                      // None relation
                        <Button onClick={addFriend} icon={<UserAddIcon/>} text='Add User'/>
                      :
                        null
                    }
                    {/* <Button icon={<UserAddIcon/>}   type='secondary' text='Invite to play'/> */}

                  </Buttons>
                }

              </div>
            
            <Achivments  data={AChievements} /> 
              {/* <div className="Achiv"> <Achivments2/> </div> */}

            </div>

            <div className='vr'> </div>

            <div className='Stats'>
              < RadarChart/>
            </div>

        </Data>
      </StatsStyle>
    )
}

const DataTag = styled.div`
  /* background-color: #bdd4d4; */
  display: flex;
  align-items: center;
  min-width : 200px;
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
margin: 15px 0px;
flex-wrap: wrap;

/* background-color: red; */
`

const Data = styled.div`
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
.Achivv {
  position: relative;
  display: flex;
  /* background-color: aliceblue; */
  /* bottom: 5%; */
  /* margin-bottom: 5px; */


}
.Achiv {
  position: relative;
  display: flex;
  /* background-color: aliceblue; */
  /* bottom: 5%; */
  /* margin-bottom: 5px; */


}
.Stats{
  position: relative;
  height: 100%;
  width: auto;
 /* flex: 1; */
  
}
`
///// UserCard Comp
export interface UserCardProps { data: { status: string; defaultAvatar: string; login: string;} }

export interface StyleProps { status: string; }

const override: CSSProperties = {  display: "grid",  margin: "10 auto",  borderColor: "black",};


export  function UserCard(props : UserCardProps) {

const [loading, setLoading] = useState(true);

let color = ("#d21f2e");

if (props.data.status === "ONLINE")
   color = ("#1ea122") 
else if (props.data.status === "ONGAME")
  color = ("#ee900c");


  // console.log("status: " , props.data.status , "\n")
  // setLoading(true);

  return (
    <UserCardStyle status={color} >
       
      <a href={"/profile/" + props.data.login}>
       
          <div className="status" >       
            {/* <HashLoader   color={color} loading={loading} cssOverride={override} size={22} /> */}
            <CircleLoader   color={color} loading={loading} cssOverride={override} size={20} />
          </div>

            {/* <DotsIcon className='dots'>
              <div className='List'> <div className='element' >  Unfriend </div>  </div>
            </DotsIcon> */}
          <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
          
          <div className="Uname"> @{props.data.login} </div>
      </a>  
    </UserCardStyle>
  )
}

// let Statuscolor = "#12d418"

const UserCardStyle = styled.div<StyleProps>`
  position: relative;
  background: linear-gradient(144deg, #5c5861 16.67%, #1f2e39 100%);
  font-family: "Poppins" , sans-serif;
  margin : 20px;
  width: 120px;
  height: 140px;
  text-align: center;
  border-radius: 13px;
  animation: fadeIn 8s;
  /* border: ${props => props.status} 2px solid; */
  /* -webkit-box-shadow: 3px 3px 5px 6px #ccc;   */
  /* -moz-box-shadow:    3px 3px 5px 6px #1b9ad4;   */
   box-shadow:         1px 1px 1px 1px ${props => props.status}; 

  .status {

    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 0px;
    top: 0px;
    border: ${props=> props.status} 3px solid;
    /* border: 3px solid ; */
    /* transform: translate(-10%, -10%); */
    background-color: #f9f9f984;
  }


  .List {
    display: flex;
  }

  > svg { // Dots icon
      /* display: flex; */
      cursor: pointer;
      position: absolute;
      width: 25px;
      height:25px;
      right: 10px;
      top: 3px;
      /* padding: 1px 1px ; */
      path{
        stroke: ${props=> props.status} ;
      }
      &:hover {
        transform: scale(1.4);
        right:10px;
        top: 3px;
        path{
        stroke: #f9f9f9;
    }

    }
    }
  .avatar {
    border: 3px solid #ffffff;
    border-radius: 50%;
    position: absolute;
    display: block;
    width: 50%;
    top: 20%;
    left: 25%;
    animation: fadeIn 3s;
    > img {
      width:  80px;
      height: 80px;
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

  &:hover {
  }

  @keyframes fadeIn {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
  }
`;

/// Game History tab //
export interface GameCompProps { win: boolean }

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
    status: string;
}

export  function UserInvitCard(props : UserInvitCardProps) {
  
  const accepteFriend = ()=>{
   axios.get("http://localhost:8000/users/relation/"+ props.data.login+ "?event=accept",  {withCredentials: true} 
            ).then((res)=>{
   
        alert("friend Request Accepted" + res.status) }).catch((err)=>{  })
              
  }
  
  useEffect(() => {
    console.log(props.data)

  }, )
  
  // console.log(props.data)
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
    status: string;
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