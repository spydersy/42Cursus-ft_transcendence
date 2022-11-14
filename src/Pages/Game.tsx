import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
// import Pong from '../components/Pong'
import Pong from '../components/game/Pong'
import { SocketGameContext } from '../context/Socket'
import styled from "styled-components"
import axios from 'axios'
import CountDown from '../components/game/CountDown'
import Score from '../components/game/Score'
import { Button } from './SignIn'
import io, { Socket } from "socket.io-client";
import {
Link
,
useNavigate

} from "react-router-dom";
import { AlterType } from 'tsparticles-engine'

import { UserContext } from '../context/UserContext'
interface UserProp {
  id : string,
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number[]
  losses : number[]
}
interface GameProps {
  theme: any
  
}

export default function Game(props : GameProps) {
  const [user, setUser] = useState<UserProp>()
  const [loged, setloged] = useState<UserProp>()
  const [opennet, setOpennet] = useState<UserProp>()
  const gamesocket = useContext(SocketGameContext)
  const UserData = useContext(UserContext)
  const navigate = useNavigate();

  const [end, setend] = useState(false)
  const [start, setstart] = useState(false)
  const [msg, setmsg] = useState("")
  const [player, setplayer] = useState(true)
  const [show, setshow] = useState(false)


  gamesocket.on("startGame" , (pyload : any)=>{
    fetchPlayersData(pyload.player1 , pyload.player2)
    setend(false)
    setshow(true)
    setplayer(loged?.login === pyload.player1 )
 })
  gamesocket.on("watchGame" , (pyload : any)=>{

    fetchPlayersData(pyload.player1 , pyload.player2)
    if (loged?.login === pyload.player1)
    {
      setplayer(true)

    }
    else if (loged?.login === pyload.player2)
    {
      setplayer(false)
    }

 })
  gamesocket.on("roomNotFound" , (pyload : any)=>{
    navigate ("/NotFound")
 })

 gamesocket.off("endGame").on("endGame" , (payload)=>{
   setstart(false)
  if (payload.score.score1 > payload.score.score2 )
  {
      if (payload.roomPlayers[0].login === loged?.login )
        setmsg( "win" )
      else if (payload.roomPlayers[1].login === loged?.login)
        setmsg( 'lost' )
      else
        setmsg( 'over' )

      

  }
  else
  {
    if (payload.roomPlayers[0].login === loged?.login )
        setmsg( "lost" )
    else if (payload.roomPlayers[1].login === loged?.login)
        setmsg( "win" )
    else
        setmsg( 'over' )
  }

    setOpennet(undefined)
    setUser(loged)
   setend(true)
 })

 

 var data : UserProp ;
 

  useEffect(() => {

var dat : UserProp;
    UserData.then((data : UserProp | "{}")=>{
    const pageName = window.location.pathname.split("/")[2];
    const room = window.location.pathname.split("/")[3];
    var mode = localStorage.getItem('mode') ;
    if (data !== "{}")
    {
      dat = data
      setloged(data)
      
      if (pageName === "watch" || pageName === "game")
      {
          if (room)
          {
            gamesocket.emit("watchGame" ,room )
            
          }
      }
      else
      {
        if (mode === "classic")
        {
          if (!end)
            gamesocket.emit("playerConnect" , data?.login )
          setUser(data)
        }
        else if (mode === "1v1")
        {
          gamesocket.emit("start" , data?.login)
        }
        else if (mode === "AI")
        {
          gamesocket.emit("PlayAi" , data?.login)
  
        }
      }
      }
    })
    document.addEventListener('visibilitychange', function (event) {
      if (document.hidden) {
        gamesocket.emit("endGame" , dat?.login)
      } else {
          console.log('is visible');
      }
  });
    return () => {
      gamesocket.emit("endGame" , dat?.login)
    }

  }, [])
  



  
  const fetchPlayersData =(player1 : string , player2: string)=>{
    if (player1 && player2)
    {
      console.log(player1 , player2)
          axios.get(process.env.REACT_APP_BACKEND_URL+ "/users/" + player1, 
          {withCredentials: true} 
          ).then((res)=>{
                setUser(res.data)
              }).catch((err)=>{
      
          })
          axios.get(process.env.REACT_APP_BACKEND_URL+ "/users/" + player2, 
          {withCredentials: true} 
          ).then((res)=>{
              setOpennet(res.data)
              }).catch((err)=>{
      
          })

    }
    
  }
  
  return (
    <div  style={{marginTop: "100px" , position: "relative"}}className="container">
      <Score socket={gamesocket}  user={user} opennet={opennet} />
      <GameStyle id="canva">
        {show &&
            <CountDown show={show} setshow={(e)=>{
              setshow(e)
            }} start={start}  setstart={(e)=>{
              setstart(e)
            }} />
        }
       
          <Pong player={player} start={start}  setstart={(e)=>{
            setstart(e)
          }} />
      </GameStyle>
        {end && <Modal
                        isOpen={end}
                        onRequestClose={() => setend(false)}
                        hideModal={() => setend(false)}
                        >
                            <GameEndModal msg={msg} close={()=>{ setend(false)
                             setstart(false)
                            }}login={loged?.login}  socket={gamesocket} />
                        </Modal>}
    </div>
  )
}


const GameStyle = styled.div`
  width: 100%;
  height: 700px ;
  position: relative;
  .react-p5{
    display: flex;
    align-items: flex-start;
  }
  /* #defaultCanvas0{
    width: 100%;
  } */
  `;



export  function GameEndModal(props : {msg : string , socket :Socket , login? : string , close: ()=>void}) {
  
  useEffect(() => {

  }, [])
  
  
  return (
    <GameEndStyle>
      {props.msg === "win" ? "YOU WON" : props.msg === "lost"  ? "YOU LOST" : "GAME OVER"}
        
        <div className='buttns'>


{ props.msg!= "over" &&         <Button onClick={()=>{
        var mode = localStorage.getItem('mode') ;
        if (mode === "classic")
        {

            props.socket.emit("playerConnect" , props?.login)
        }
        else if (mode === "1v1")
        {
          props.socket.emit("start" , props?.login)
        }
        else if (mode === "AI")
        {
          props.socket.emit("PlayAi" , props?.login)
        }
          props.close()
        }} type='primary' text='Play'/>}
        <Link to="/">
        <Button type='secondary' text="go home"/>
        </Link>

        </div>
          
    </GameEndStyle>
  )
}
const GameEndStyle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
justify-content: space-around;
flex-direction :column;
font-size: 50px;
font-family: "Poppins" , sans-serif;
> .buttns{
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
justify-content: space-around;
}
  `;