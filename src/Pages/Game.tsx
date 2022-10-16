import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
// import Pong from '../components/Pong'
import Pong from '../components/game/Pong'
import { SocketContext } from '../context/Socket'
import styled from "styled-components"
import { AvatarComponent } from '../components/PlayerProfile'
import axios from 'axios'
import CountDown from '../components/game/CountDown'

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
  const gamesocket = useContext(SocketContext)

  const [end, setend] = useState(false)
  const [start, setstart] = useState(false)
  const [show, setshow] = useState(false)
  gamesocket.on("startGame" , (pyload : any)=>{
    setend(false)
    fetchPlayersData(pyload.player1 , pyload.player2)
    setshow(true)
 })
 gamesocket.on("endGame" , ()=>{
  setOpennet(undefined)
  setUser(undefined)
   setend(true)
 })
 var data : UserProp ;

  useEffect(() => {
    
    var s : string | null = localStorage.getItem('user');
    if (s)
    {
      data =  JSON.parse(s || '{}');
      if (!end)
        gamesocket.emit("playerConnect" , data?.login)

      setUser(data)
    }



  }, [])
  
  const fetchPlayersData =(player1 : string , player2: string)=>{
    axios.get("http://localhost:8000/users/" + player1, 
    {withCredentials: true} 
     ).then((res)=>{
          setUser(res.data)
          setloged(res.data)
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
      <PlayerStyle>
          <Player1>
          {user ?     <UserComponent Ai={false} data={user}/>:  <Spinner/> }
          </Player1>

          <Player2>
          {opennet ?    <UserComponent Ai={true} data={opennet}/>  :  <Spinner/> }
          </Player2>
      </PlayerStyle>
      <GameStyle>
        {show &&
            <CountDown show={show} setshow={(e)=>{
              setshow(e)
            }} start={start}  setstart={(e)=>{
              setstart(e)
            }} />
        }
       
          <Pong player={user?.id === loged?.id} start={start}  setstart={(e)=>{
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
  width: auto;
  height:auto ;
  position: relative;

  `;
const Player1 = styled.div`
  margin-right: auto;
  height:auto ;
  display: flex;
  align-items: center;
  gap: 20px;

  `;
const Score = styled.div`
  position: absolute;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);

        color:  ${props => props.theme.colors.primaryText};
  display: flex;
  align-items: center;
  font-family: "Poppins" , sans-serif;
  font-size: ${props=> props.theme.fontSize.xl};

  `;
const Player2 = styled.div`
margin-left: auto;
  height:auto ;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
`;
const PlayerStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100% ;
  height: auto;
  position: relative;
  margin: 10px 0;
  >div{
     .mesgData{
      margin-left: 12px;
      height: 40px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
      .name{
        color:  ${props => props.theme.colors.primaryText};
        font-size:  ${props=> props.theme.fontSize.xl};

      }
      .msg{
        font-size: 15px;
        font-size:  ${props=> props.theme.fontSize.ll};

        opacity: 0.7;
        color:  ${props => props.theme.colors.seconderyText};
      }
  }}
`;

export function Spinner() {
  return (
    <SpinnerStyle className="lds-facebook"><div></div><div></div><div></div></SpinnerStyle>
  )
}
const SpinnerStyle = styled.div`

  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

> div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: ${props => props.theme.colors.primaryText};
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  &:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
&:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
&:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

      
      `;





interface UserComponetProps {
  data : UserProp
  Ai : boolean
}
      


      export  function UserComponent(props: UserComponetProps) {
        return (
          <>
              <div style={{ width: "100px", height: "100px" }}>
            {props.Ai === false ? <AvatarComponent img={props.data.defaultAvatar} /> : <AIstyle img={props.data.defaultAvatar} ></AIstyle>}
            
          </div>
          <div className='mesgData'>
            <div className='name'>
             {props.data.login}
            </div>
            <div className='msg'>
            {/* {props.data.msg} */}
            ghadi tslkh
            </div>
          </div>

          </>
        )
      }
      const AIstyle = styled(AvatarComponent)`
      display: none;
        > img{
          display: none;
        }
  `