import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
// import Pong from '../components/Pong'
import Pong from '../components/game/Pong'
import { SocketContext } from '../context/Socket'
import styled from "styled-components"
import axios from 'axios'
import CountDown from '../components/game/CountDown'
import Score from '../components/game/Score'

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
  const [score, setScore] = useState({score1: 0 , score2: 0})
  const gamesocket = useContext(SocketContext)

  const [end, setend] = useState(false)
  const [start, setstart] = useState(false)
  const [player, setplayer] = useState(true)
  const [show, setshow] = useState(false)
  gamesocket.on("startGame" , (pyload : any)=>{
    setend(false)
    fetchPlayersData(pyload.player1 , pyload.player2)
    setshow(true)
    console.log(loged?.login , pyload.player1)
    setplayer(loged?.login === pyload.player1 )
 })
 gamesocket.on("endGame" , ()=>{
  setOpennet(undefined)
  setUser(undefined)
   setend(true)
 })
 gamesocket.on("playerscored" , (pyload)=>{
    setScore(pyload)
 })
 var data : UserProp ;

  useEffect(() => {
    
    var s : string | null = localStorage.getItem('user');
    if (s)
    {
      data =  JSON.parse(s || '{}');
      setloged(data)

      if (!end)
      {
        gamesocket.emit("playerConnect" , data?.login)

      }

      setUser(data)
    }



  }, [])
  
  const fetchPlayersData =(player1 : string , player2: string)=>{
    axios.get("http://localhost:8000/users/" + player1, 
    {withCredentials: true} 
     ).then((res)=>{
          setUser(res.data)
        }).catch((err)=>{

    })
    axios.get("http://localhost:8000/users/" + player2, 
    {withCredentials: true} 
     ).then((res)=>{
        setOpennet(res.data)
        }).catch((err)=>{

    })
    
  }
  
  return (
    <div  style={{marginTop: "100px" , position: "relative"}}className="container">
      <Score score={score} user={user} opennet={opennet} />
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
         
                             End game
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
