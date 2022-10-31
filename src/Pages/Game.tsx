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
} from "react-router-dom";
import { AlterType } from 'tsparticles-engine'
interface UserProp {
  id : string,
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
}

interface GameProps {
  theme: any
  
}


export default function Game(props : GameProps) {
  const [user, setUser] = useState<UserProp>()
  const [loged, setloged] = useState<UserProp>()
  const [opennet, setOpennet] = useState<UserProp>()
  const gamesocket = useContext(SocketGameContext)

  const [end, setend] = useState(false)
  const [start, setstart] = useState(false)
  const [msg, setmsg] = useState(false)
  const [player, setplayer] = useState(true)
  const [show, setshow] = useState(false)
  gamesocket.off("startGame").on("startGame" , (pyload : any)=>{
    setend(false)
    fetchPlayersData(pyload.player1 , pyload.player2)
    setshow(true)
    console.log(loged?.login , pyload.player1)
    setplayer(loged?.login === pyload.player1 )
 })
  gamesocket.off("Aistart").on("Aistart" , (pyload : any)=>{
    setUser(loged)
    // setend(false)
    setshow(true)

 })
 gamesocket.off("endGame").on("endGame" , (payload)=>{

   setstart(false)
  if (payload.score.score1 > payload.score.score2 )
  {
      if (payload.roomPlayers[0].login === loged?.login )
        setmsg( true )
      else
        setmsg( false )

  }
  else
  {
    if (payload.roomPlayers[0].login === loged?.login )
        setmsg( false )
    else
        setmsg( true )

  }

    setOpennet(undefined)
    setUser(loged)
   setend(true)
 })

 var data : UserProp ;

  useEffect(() => {
    
    var s : string | null = localStorage.getItem('user');
    var mode = localStorage.getItem('mode') ;
    if (s)
    {
      data =  JSON.parse(s || '{}');
      setloged(data)
      if (mode === "classic")
      {
        if (!end)
        {
          gamesocket.emit("playerConnect" , data?.login)
  
        }
  
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
    return () => {
      gamesocket.emit("endGame" , data?.login)
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
  /* background-color: red; */
  /* > .react-p5{
    width: 100%;
    > .p5Canvas{
      width: 100% !important;
    }
  } */
  `;



export  function GameEndModal(props : {msg : boolean , socket :Socket , login? : string , close: ()=>void}) {
  
  useEffect(() => {

  }, [])
  
  
  return (
    <GameEndStyle>
      {props.msg ? "YOU WON" :"YOU LOST"}
        
        
        <Button onClick={()=>{
          props.socket.emit("playerConnect" , props.login)
          props.close()
        }} type='primary' text='playe again'/>
        <Link to="/">
        <Button type='secondary' text="go home"/>
        </Link>
          
    </GameEndStyle>
  )
}
const GameEndStyle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
justify-content: space-around;
  `;