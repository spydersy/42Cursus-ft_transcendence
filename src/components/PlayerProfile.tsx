import React, { useEffect , useState, CSSProperties , useContext}  from 'react'
import styled ,{css, keyframes}from "styled-components";
import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";
import {ReactComponent as UserAddIcon} from "../assets/imgs/user-plus.svg";
import {ReactComponent as SendMessage} from "../assets/imgs/sendMessage.svg";
import {ReactComponent as Hourglass} from "../assets/imgs/hourglass.svg";
import {ReactComponent as UnfrienIcon} from "../assets/imgs/unfriend.svg";
import {ReactComponent as InviteToPlayIcon} from "../assets/imgs/rocket.svg";
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
import { OnlineContextSocket, SocketContext,  SocketValue } from '../context/Socket';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { data } from 'jquery';

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
  wins : number
  losses : number
  lastModification : string 
}

interface usersType {
  id : string ,
  defaultAvatar: string,
  login : string
  displayName : string,
  restriction: string,
  restrictionTime: string,
  duration: number,
}

const override: CSSProperties = {  display: "grid",  margin: "10 auto",  borderColor: "black",};
export interface PlayerCardProps { isCurrentUser : boolean,  player: UserProp }

export function PlayerCard(props: PlayerCardProps) {

  let color = ("");
  const [loading] = useState(true);
  let username = props.player.displayName;
  let name = username.split(" ");
  let status = "";  

  const socket = useContext(OnlineContextSocket)

  const User = useContext(UserContext)

  const [state, setstate] = useState(true)
 
  const setUserStatu =( list : UserType[] )=>{
    for (let i = 0; i < list.length; i++) {
      const element : UserType = list[i];
      if (element.userid === props?.player.login)
      {
        setstate(true)
        return ;
      }
      
    }
    setstate(false)
  }
  socket.on("ConnectedUser" , (pyload)=>{
   console.log(pyload)
   setUserStatu(pyload)
  
  })
  useEffect(() => {
  //   User.then((data : UserProp | "{}")=>{
  //     if (data !== "{}")
  //       socket.emit("AddOnlineUser" ,data?.login)

  // })
        console.log("mystatue=", state)
    


  }, [props.player.login])
  
  
  
  // console.log("actual statue", props.player.status);

  // if (props.player.status === "InGame")
  // {
  //   color = ("#1e30a1");
  //   status = "IN-GAME";
  // }
  // else 
  if (state)
  {
    color = ("#1cb52e");
    status = "ONLINE";
  }
  else if (!state)
  {
    color = ("#af1c1c");
    status = "OFFLINE";
  }
  
  // else if (props.player.status === "BLOCKED")
  // {
  //   color = ("#b5c113");
  //   status = "Unavailable";
  // }
  // else
  // {
  //   // setLoading(false);
  //   status = "UnvailableStatus";
  // }

   
    return (
      <PlayerCardStyle  status={color} >
      
          <div className='Identity'>
              {/* {state && <>BULLLSHIT</>} */}
              {/* <>Status: </> */}
              <div className="status" >       
                {/* <HashLoader   color={color} loading={loading} cssOverride={override} size={22} /> */}
                <CircleLoader   color={color} loading={loading} cssOverride={override} size={20} />
                <div className='status-text' >{status}</div>
                {/* ONLINE */}
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
    const Grades = ["Unranked","Shinobi","ShiboKay","Hokage","Yonko","3ANKOUB","XX","XXXX","XXXXX","XXXXX"]
    const [grade, setgrade] = useState<string | undefined>(Grades[5])
    const [AChievements, setAChievements] = useState< {} | any>([false, false, false, false, false, false, false, false])
    const userData = useContext(UserContext)
    let isBlocked = "";

    const    AddUsernotify = () => toast.success("You have successfully Send the invitaion to " + id.toLocaleUpperCase() , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const    ALreadyFriendnotify = () => toast.success("You can't Friendo !!" + id.toLocaleUpperCase() , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const    UnfriendUserNotify = () => toast.error("You have successfully Unfriend this Bastard " + id.toLocaleUpperCase()  , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const    BlockUserNotify = () => toast.error("You have successfully Block " + id.toLocaleUpperCase()  , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const    UnBlockUserNotify = () => toast.warning("You have successfully UnBlock " + id.toLocaleUpperCase()  , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const    CancelNotify = () => toast.warning("You have successfully Cancel the invitation to " + id.toLocaleUpperCase() , {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });

    const addFriend = ()=>{

        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=add",   {withCredentials: true} 
        ).then((res)=>{
        console.log(res.data)
        // if (res.data.message === "Relation Already Exist")
        // {
        //   setrelationStatus("PENDING")
        //   ALreadyFriendnotify();
        // } 
        // else
        // {
          setrelationStatus("PENDING")
          AddUsernotify();
        // }
        userData.then((user : UserProp | "{}")=>{
          if (user !== "{}")
          {
            socket.emit('sendFriendRequest', {sender : user?.login , reciver : props.player.login} )

          }

    })


        // get this user login
        // join user login room
        // emit event to the room.
        // window.location.reload();
      }).catch((err)=>{ 
        console.log(err)
        alert("USER ALREADY BLOCKED")
        setrelationStatus("BLOCKER")
        isBlocked = "BLOCKER"
      })
    }
    const CancelRequest = ()=>{
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=cancel",   {withCredentials: true}
      ).then((res)=>{
      // console.log(res.data)
      
      
      setrelationStatus("NOTHING")
      CancelNotify();


      // CancelRequestNotify();
      // window.location.reload();
    }).catch((err)=>{  
        // setrelationStatus("PENDING")

      })
      window.location.reload();

    }
    const UnfriendUser = ()=>{
      //  GET process.env.REACT_APP_BACKEND_URL+  /users/relation/:id?event=unfriend
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=unfriend",   {withCredentials: true} 
      ).then((res)=>{
      // console.log(res.data)
      // alert("friend Request sent" + res.status)
      setrelationStatus("NOTHING")
      UnfriendUserNotify();
      // window.location.reload();
      }).catch((err)=>{  })
    }
    const BlockUser = ()=>{
      //  GET process.env.REACT_APP_BACKEND_URL+  /users/relation/:id?event=block
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=block",   {withCredentials: true} 
      ).then((res)=>{
      // console.log(res.data)
      // alert("friend Request sent" + res.status)
      setrelationStatus("BLOCKED")
      isBlocked = "BLOCKED";
      BlockUserNotify();
      // window.location.reload();
      }).catch((err)=>{  })
    }
    const UnBlockUser = ()=>{
      //  GET process.env.REACT_APP_BACKEND_URL+  /users/relation/:id?event=unblock
      axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/relation/"+ props.player.login+ "?event=unblock",   {withCredentials: true}
      ).then((res)=>{
      // console.log(res.data)
      // alert("friend Request sent" + res.status)
      setrelationStatus("NOTHING")
      UnBlockUserNotify()
      // window.location.reload();
      }).catch((err)=>{  })
    }
    const InviteToPlay = ()=>{ }

    useEffect(() => {
        
        // setrelationStatus(props.player?.relation)
        console.log( "- 2Relation <" , relationStatus, "> \n")
        
        // get user data  from server
        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/" + id,  {withCredentials: true}).then((res)=>{
          
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
          console.log(  "> Relation <" , relationStatus, "> \n")
          
        }).catch((err)=>{   
        })
        
        axios.get( process.env.REACT_APP_BACKEND_URL+ "/users/achievements/" + id,  {withCredentials: true}).then((res)=>{
          // Achievenments          
          setAChievements(res.data)
          console.log("> Achievements : ", AChievements)
        }).catch((err)=>{
        })
        
        console.log( "- 1Relation <" , props.player, "> \n")
      }, [setAChievements])
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
                    <DataTag>     <CalendarIcon/> {createdTime}  </DataTag>
                  </DataTag>
                  
                  {props.isCurrentUser === false && 
                    <Buttons className='Btp' >
                      {
                        // Friends relation
                        relationStatus === "NOTHING" ? 
                          <Button  onClick={addFriend} icon={<UserAddIcon/>} text='Add User'/>
                        : 
                        // Pending request relation
                        relationStatus === 'PENDING' ? 
                          <button className='BtpPending' onClick={CancelRequest}>
                                <Hourglass/>
                                Cancel Request
                          </button>
                        :
                        // Blocked relation
                        relationStatus === "BLOCKED" ? 
                          <button className='BtpBlocked'onClick={UnBlockUser}>
                            <UnblockIcon/>
                            UnBlock
                          </button>
                        :
                        // relationStatus === "BLOCKED" ? 
                        // <Button  icon={<BlockIcon/>}   type='secondary' text='GHAYERHA'/>
                        // :
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
                            <Button  icon={<InviteToPlayIcon/>} isIcon={true}   type='secondary' onClick={InviteToPlay} text='Invite to Play'/>


                          </div>

                          </>
                        :
                        null
                        
                      }
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
    /* background-color: #1c70b517; */
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
// State //

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

  const [state, setstate] = useState(false)
 
  const setUserStatu =( list : UserType[] )=>{
    for (let i = 0; i < list.length; i++) {
      const element : UserType = list[i];
      if (element.userid === props?.login)
      {
        setstate(true)
        return ;
      }
      
    }
    setstate(false)
  }
  socket.on("ConnectedUser" , (pyload)=>{
   console.log(pyload)
   setUserStatu(pyload)
  
  })
  useEffect(() => {
    User.then((data : UserProp | "{}")=>{
      if (data !== "{}")
        socket.emit("AddOnlineUser" ,data?.login)
 })
    

  console.log("AvatarComponent status = ", state)
  }, [props.login])
  
return (
  <Avatarr  on={state ? "true" : "false"}>
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
${props => (props.on === "true") && `
border: 4px solid #157DBD;

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