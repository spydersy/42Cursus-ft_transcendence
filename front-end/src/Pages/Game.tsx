import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
import Pong from '../components/game/Pong'
import { OnlineContextSocket, SocketGameContext } from '../context/Socket'
import styled from "styled-components"
import axios from 'axios'
import CountDown from '../components/game/CountDown'
import Score from '../components/game/Score'
import { Button } from './SignIn'
import{ Socket } from "socket.io-client";
import { Link ,  useNavigate } from "react-router-dom";
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
  theme?: any
  
}

export default function Game(props : GameProps) {
  const [user, setUser] = useState<UserProp>()
  const [loged, setloged] = useState<UserProp>()
  const [opennet, setOpennet] = useState<UserProp>()
  const gamesocket = useContext(SocketGameContext)
  const onlineSocket = useContext(OnlineContextSocket)
  const UserData = useContext(UserContext)
  const navigate = useNavigate();

  const [end, setend] = useState(false)
  const [start, setstart] = useState(false)
  const [msg, setmsg] = useState("")
  const [player, setplayer] = useState(true)
  const [show, setshow] = useState(false)
  const [score, setScore] = useState({score1: 0 , score2: 0})


  function startGame()
  {
    setshow(false)
    setstart(true)
    gamesocket.emit("changeGameStatue" , loged?.login)
  }
  gamesocket.on("startGame" , (pyload : any)=>{

    fetchPlayersData(pyload.player1 , pyload.player2)
    setend(false)
    setshow(true)
    setScore({score1: 0 , score2: 0})

    setplayer(loged?.login === pyload.player1 )
    onlineSocket.emit("InGame" , loged?.login)
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
 gamesocket.on("playerscored" , (py : any)=>{
    // setstart(false)
    // setTimeout(() => {
    // setstart(true)
  
    // }, 3000);
})
  gamesocket.on("roomNotFound" , (pyload : any)=>{
    navigate ("/NotFound")
 })

 gamesocket.off("endGame").on("endGame" , (payload)=>{
   setstart(false)
   gamesocket.emit("checkEnd")
  if (payload.score.score1 > payload.score.score2 )
  {
      if (payload.roomPlayers[0].login === loged?.login )
        setmsg( "win" )
      else if (payload.roomPlayers[1].login === loged?.login)
        setmsg( 'lost' )
      else
        setmsg( 'over' )

  }
  else if (payload.score.score1 < payload.score.score2)
  {
    if (payload.roomPlayers[0].login === loged?.login )
      setmsg( "lost" )
    else if (payload.roomPlayers[1].login === loged?.login)
      setmsg( "win" )
    else
      setmsg( 'over' )
  }
  else
  {
      setmsg( "over" )
  }
  onlineSocket.emit("outGame" , loged?.login)
  setOpennet(undefined)
  setUser(loged)
  setend(true)
 })

 
  useEffect(() => {

var dat : UserProp;
    UserData.then((data : UserProp | "{}")=>{
    const pageName = window.location.pathname.split("/")[1];
    const room = window.location.pathname.split("/")[2];
    var mode = localStorage.getItem('mode') ;
    if (data !== "{}")
    {
      dat = data
      setloged(data)
        if (pageName === "watch")
        {
            if (room)
              gamesocket.emit("watchGame" ,room )       
        }
        else
        {
          setUser(data)
          gamesocket.emit("Play" , {login : dat?.login , mode : mode})
        }
    }
    })
    document.addEventListener('visibilitychange', function (event) {
      if (document.hidden) {
        // gamesocket.emit("endGame" , dat?.login)
      } else {

      }
  });
    return () => {
      gamesocket.emit("endGame" , dat?.login)
      onlineSocket.emit("outGame" , dat?.login)
    }

  }, [gamesocket ,onlineSocket , UserData ])
  



  
  const fetchPlayersData =(player1 : string , player2: string)=>{
    if (player1 && player2)
    {
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
      <Score score={score} socket={gamesocket}  user={user} opennet={opennet} />
      <GameStyle id="canva">
        {show &&
            <CountDown onComplete={()=>{startGame()}} show={show} setshow={(e)=>{
              setshow(e)
            }} start={start}  setstart={(e)=>{
              setstart(e)
            }} />
        }
       
          <Pong login={loged?.login} player={player} start={start}  setstart={(e)=>{
            setstart(e)
          }} />
      </GameStyle>
        {end && <Modal
                        isOpen={end}
                        onRequestClose={() => {setend(false) ; navigate("/") }}
                        hideModal={() => {setend(false) ; navigate("/")} }
                        >
                            <GameEndModal  score={score}  msg={msg} close={()=>{ setend(false)
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



export  function GameEndModal(props : { score : {score1: number , score2: number}, msg : string , socket :Socket , login? : string , close: ()=>void}) {
  // const [score, setScore] = useState({score1: 0 , score2: 0})

  var mode = localStorage.getItem('mode') ;
  
 
  
  return (
    <GameEndStyle>
      {props.msg === "win" ? "YOU WON" : props.msg === "lost"  ? "YOU LOST" : "GAME OVER"}
       <div>
        {/* {score.score1} - {score.score2} */}

       </div>
        <div className='buttns'>


{ props.msg !== "over" &&  mode !=="1v1"   &&       <Button onClick={()=>{
        props.socket.emit("Play" , {login : props?.login , mode : mode})
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