import React, { useEffect , useState, CSSProperties , useContext}  from 'react'
import styled ,{css, keyframes}from "styled-components";
import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";
import {ReactComponent as UserAddIcon} from "../assets/imgs/user-plus.svg";
import {ReactComponent as SendMessage} from "../assets/imgs/sendMessage.svg";
import {ReactComponent as Hourglass} from "../assets/imgs/hourglass.svg";
import {ReactComponent as UnfrienIcon} from "../assets/imgs/unfriend.svg";
import {ReactComponent as UnblockIcon} from "../assets/imgs/unbrella.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as CalendarIcon} from "../assets/imgs/calendar.svg";
import {ReactComponent as RankIcon} from "../assets/imgs/rank.svg";
import {ReactComponent as GameIcon} from "../assets/imgs/game-icon.svg";
import {ReactComponent as BlockIcon} from "../assets/imgs/ban.svg";
import { Button } from '../Pages/SignIn';
import axios from 'axios';
import Achivments  from './Achivments';
import  { RadarChart } from './charts/Charts';
import CircleLoader from "react-spinners/CircleLoader";
import { OnlineContextSocket, SocketContext ,SocketGameContext} from '../context/Socket';
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

//// PlayerCard Comp
interface UserProp {
  id: string,
  defaultAvatar: string,
  status: string,
  login : string
  displayName : string,
  dmChannel : string,
  relation : string
  nbFriends? : string
  wins : number[]
  losses : number[]
  lastModification : string 
}
const override: CSSProperties = {  display: "grid",  margin: "10 auto",  borderColor: "black",};

export interface PlayerCardProps { isCurrentUser : boolean,  player: UserProp }

export function PlayerCard(props: PlayerCardProps) {
  let color = ("");
  const [loading] = useState(true);
  let username = props.player.displayName;
  let status = "";  
  const socket = useContext(OnlineContextSocket)
  const [state, setstate] = useState("")
  const id = window.location.pathname.split("/")[2];

  const setUserStatu =( list : UserType[] )=>{
    for (let i = 0; i < list.length; i++) {
      const element : UserType = list[i];
      if (element.userid === props.player.login)
      {
        if (element.gameStatu === true)
          setstate("INGAME")
        else
          setstate("ONLINE")

        return ;
      }
    }
    setstate("OFFLINE")
  }

  socket.on("ConnectedUser" , (pyload)=>{
   setUserStatu(pyload)
  })

  useEffect(() => { 
  },[props.player.login])
  
  if (state === "ONLINE")
  { color = ("#1cb52e"); status = "ONLINE";  }
  else if (state === "INGAME")
  { color = ("#e68f38");  status = "INGAME"; }
  else
  { color = ("#af1c1c");  status = "OFFLINE"; }

  if (id === "drVegaPunk")
  { color = ("#efd320");  status = "AI"; }

    return (
      <PlayerCardStyle  status={color} >
          <div className='Identity'>
              <div className="status" >       
                <CircleLoader   color={color} loading={loading} cssOverride={override} size={20} />
                <div className='status-text' >{status}</div>
              </div>
              <div className='Iavatar' style={ {width : "150px" , height : "150px"}} >
                <AvatarComponent login={props.player.login} img={props.player.defaultAvatar}/>
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
export interface StyleProps { status: string; }

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
        font-weight: 500;
        color: ${props => props.status};
        top: 0px;
        left: 35px;
        position: absolute;
        width: 100%;
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
                /* background-color: #3581B3; */
                width: 800px;
                font-size: 18px;
                font-weight: 650;
                text-align: left;

                -webkit-text-stroke: 1px #44404562;
            }
        }
    }
}
`;

// State  // 
  export function Stats(props: PlayerCardProps) {
    const socket = useContext(SocketContext)
    const [relationStatus, setrelationStatus] = useState<string >("");
    const id = window.location.pathname.split("/")[2];
    const [createdTime, setcreatedTime] = useState<string | undefined>("Mon 1 Oct 1999 00:00:00")
    const Grades = [ "Unranked", "New-Bie","Shinobi","ShiboKay","Hokage","Yuaiba", "Alchemist", "Spyder" ,"Medara", "ALA-ZWIN","3ANKOUB"]
    const [grade, setgrade] = useState<string | undefined>(Grades[11])
    const [AChievements, setAChievements] = useState< {} | any>([false, false, false, false, false, false, false, false])
    // const userData = useContext(UserContext)
    const gamesocket = useContext(SocketGameContext)

    const addFriend = ()=>{
        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=add",   {withCredentials: true} 
        ).then((res)=>{
          setrelationStatus("PENDING")
          // AddUsernotify();
        user.then((user : UserProp | "{}")=>{
        if (user !== "{}")
        {
          socket.emit('sendFriendRequest', {sender : user?.login , reciver : props.player.login} )
        }
       })
      }).catch((err)=>{ 
        // alert("USER ALREADY BLOCKED")
        setrelationStatus("BLOCKER")
      })
    }
    const CancelRequest = ()=>{
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=cancel",   {withCredentials: true}
      ).then((res)=>{
      setrelationStatus("NOTHING")
      // CancelNotify();
    }).catch((err)=>{  
      setrelationStatus("PENDING")
      })
    }
    socket.on('acceptedReq', (data : any) => 
    {
      if (data.status)
        setrelationStatus("FRIENDS")
      else
        setrelationStatus("NOTHING")
    })
    const UnfriendUser = ()=>{
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=unfriend",   {withCredentials: true} 
      ).then((res)=>{
      setrelationStatus("NOTHING")
      // UnfriendUserNotify();
      }).catch((err)=>{  })
    }
    const BlockUser = ()=>{
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=block",   {withCredentials: true} 
      ).then((res)=>{
      setrelationStatus("BLOCKED")
      // BlockUserNotify();

      // user.then((user : UserProp | "{}")=>{
      //   if (user !== "{}")
      //   {
      //     socket.emit('msg_event', {sender : user?.login , reciver : props.player.login} )
      //   }
      //  })

      }).catch((err)=>{  })
    }
    const UnBlockUser = ()=>{
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=unblock",   {withCredentials: true}
      ).then((res)=>{
      setrelationStatus("NOTHING")
      // UnBlockUserNotify()
      }).catch((err)=>{  })
    }
    const setUserGrade = (props : any)=>{
      props = ( props > 100 ) ? 100 : (props < 0 ) ? 0 : props
      if (props <= 0)
        setgrade(Grades[0])
      else
      {
        let index : unknown = (props / 10).toFixed(0)
        setgrade(Grades[index as number])
      }
    }
    // const InviteToPlay = ()=>{ } // TO BE IMPLEMENTED

    useEffect(() => {
        // setTotalGames( props.player.wins[0] + props.player.wins[1] + props.player.losses[0] + props.player.losses[1])
        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/" + id,  {withCredentials: true}).then((res)=>{
          setrelationStatus(res.data.relation)
          setUserGrade(res.data.rank)
          const date = new Date(res.data.lastModification)
          setcreatedTime(date.toString().split("GMT")[0])
        }).catch((err)=>{})
        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/achievements/" + id,  {withCredentials: true}).then((res)=>{
          setAChievements(res.data)
        }).catch((err)=>{})

  // eslint-disable-next-line
    }, [])
    const user = useContext(UserContext)
    const [Owner, setOwner] = useState("")
    user.then((data : UserProp | "{}")=>{
      if (data !== "{}")
      {
        setOwner(data?.login)
      }
    })

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
                  <DataTag>     <GameIcon/> {props.player.wins[0] + props.player.wins[1] + props.player.losses[0] + props.player.losses[1]} {"  Game"} </DataTag>
                  <DataTag>     <CalendarIcon/> {createdTime}  </DataTag>
                </DataTag>
                {
                  props.isCurrentUser === false && 
                  <Buttons className='Btp' >
                    {
                      relationStatus === "NOTHING" ?  
                        <Button  onClick={addFriend} icon={<UserAddIcon/>} text='Add User'/>
                      : 
                      relationStatus === 'PENDING' ?
                        <Button  type='secondary' onClick={CancelRequest} icon={<Hourglass/>} text='Cancel Request'/>
                      :
                      relationStatus === 'WAITING' ?
                        <Button  type='secondary'  icon={<Hourglass/>} text='Pending Request'/>
                      :
                      relationStatus === "BLOCKED" ?
                        <Button  type='secondary' onClick={UnBlockUser} icon={<UnblockIcon/>} text='UnBlock'/>
                      :
                      relationStatus === "FRIENDS" ? 
                        <>
                        <div className='row'>

                          <Button   type='secondary' onClick={UnfriendUser} icon={<UnfrienIcon/>} text='Unfriend'/>
                          
                          <button className='BtpBlocked'onClick={BlockUser}>
                            <BlockIcon/>
                            Block
                          </button>
                          
                        </div>
                        <div className='row'>
                          <Link to={"/chat/" + props.player?.dmChannel}>  
                            <Button isIcon={true}  icon={<SendMessage/>} text='Send Message'/>
                          </Link>
                           <Button  isIcon={true} onClick={()=>{ 
                            socket.emit("gameChallenge", props.player?.login , Owner) ; 
                            gamesocket.emit("gameChallenge" , {player1 : props.player.login , player2 : Owner})}} 
                            icon={<GameIcon/>}/>
                        </div>
                        </>
                      :
                        null
                    }
                  </Buttons>
                }
              </div>
            
            <Achivments  data={AChievements} /> 

            </div>

            <div className='vr'> </div>

            <div className='Stats'>
              < RadarChart  wins={props.player.wins}  losses={props.player.losses} />
            </div>

        </Data>
      </StatsStyle>
    )
  }

  const DataTag = styled.div`
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
  const breatheAnimation = keyframes`
  /* 0% { transform: translateY(0) }
  50% { transform: translateY(10px)  }
  100% { transform: translateY(0)  } */
 `
  const Buttons = styled.div`
  /* background-color: #f0f8ff41; */
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
  margin: 20px 0px;
  flex-wrap: wrap;
  >.row{
  display: flex;
  flex-direction: row;
gap:10px;
  }
  .BtpBlocked {
      padding: 5px 10px;
      min-width: 100px;
      background: #9a1818c5;
      border-radius: 5px;
      height: auto;
      cursor: pointer;
      border: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
      gap : 5px;
      padding: 3px 8px;
      >svg{  path {  stroke : #fff; } }
      font-family: 'Poppins' sans-serif;
      font-weight: 500;
      font-size:  ${props => props.theme.fontSize.l}; 
      color: #FFFFFF;
      animation-name: ${breatheAnimation};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      min-width: auto;
      width: auto;
      z-index: 20;
      position: relative;
      overflow: hidden;
      &:after {
      background: #fff;
      content: "";
      height: 155px;
      left: -75px;
      opacity: .2;
      position: absolute;
      top: -50px;
      width: 50px;
      -webkit-transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
      transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
      -webkit-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
      transform: rotate(35deg);
      z-index: -10;
      }
      &:hover:after {
        left: 120%;
        -webkit-transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
      }
  }
  .BtpPending {
      padding: 5px 10px;
      min-width: 100px;
      background: #a4a912c5;
      border-radius: 5px;
      height: auto;
      cursor: pointer;
      border: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
      gap : 5px;
      padding: 5px 8px;
      >svg{  path {  stroke : #fff; } }
      font-family: 'Poppins' sans-serif;
      font-weight: 500;
      font-size:  ${props => props.theme.fontSize.l}; 
      color: #FFFFFF;
      animation-name: ${breatheAnimation};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      min-width: auto;
      width: auto;
      z-index: 20;
      position: relative;
      overflow: hidden;
      &:after {
      background: #fff;
      content: "";
      height: 155px;
      left: -75px;
      opacity: .2;
      position: absolute;
      top: -50px;
      width: 50px;
      -webkit-transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
      transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
      -webkit-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
      transform: rotate(35deg);
      z-index: -10;
      }
      &:hover:after {
        left: 120%;
        -webkit-transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
      }
  }

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

    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    >div{
      width: 95%;
    }
    
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
//
export  function GameComp(props : GameCardProps) {
  var state : boolean =( props.match.score1 > props.match.score2) ? true : false
return (
  <GameCompStyle win={state} >
      <div style={{marginLeft : "24px"}}>
        <AvatarComponent  img={ props.match.img} />
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
//
interface AvatarProps {img: string , login ?: string }
interface UserType {
 socketId : string[],
 userid : string,
 gameStatu : boolean,
}
export  function AvatarComponent(props: AvatarProps) {
  const socket = useContext(OnlineContextSocket)
  const User = useContext(UserContext)

  const [state, setstate] = useState("")
 
  const setUserStatu =( list : UserType[] )=>{
    for (let i = 0; i < list.length; i++) {
      const element : UserType = list[i];
      if (element.userid === props?.login)
      {
        if (element.gameStatu === true)
          setstate("ingame")
        else
          setstate("online")

        return ;
      }
    }
    setstate("offline")
  }
  socket.on("ConnectedUser" , (pyload)=>{
   setUserStatu(pyload)



  
  })

  useEffect(() => {
    User.then((data : UserProp | "{}")=>{
      if (data !== "{}")
      socket.emit("AddOnlineUser" ,data?.login)
      

 })
    

  // eslint-disable-next-line
  }, [props.login])
  
return (
  <Avatarr  on={state}>
  <div className='crcl'>
      <img src={props.img} alt='avatar' />
    </div>
    {state && <div className='on'></div>}
  </Avatarr>
)
}
interface AvatarStyleProps {
  on : string
}
const Avatarr = styled.div<AvatarStyleProps>`
width: 100%;
height: 100%;
border-radius : 50%;
position: relative;
border: 4px solid${props => props.theme.colors.bg};
${props => (props.on === "online") && `
border: 4px solid #1cb52e;

`}
${props => (props.on === "ingame") && `
border: 4px solid #e68f38;

`}
> .crcl{
  overflow: hidden;
  width: 100%;
height: 100%;
border-radius : 50%;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
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
//
export  function AddFriend() {
return (
  <AddFriendStyle>
      <AddIcon/>
      Add Friend
  </AddFriendStyle>
)}
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
//  