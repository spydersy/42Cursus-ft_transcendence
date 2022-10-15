import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
// import Pong from '../components/Pong'
import Pong from '../components/game/Pong'
import { SocketContext } from '../context/Socket'
import styled from "styled-components"
import { AvatarComponent } from '../components/PlayerProfile'

interface UserProp {
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
  const [user, setUser] = useState<UserProp>({
    defaultAvatar: "",
    login : "",
    displayName : "",
    relation : "",
    nbFriends : "",
    wins : 0,
    losses : 0,
  })
  const [opennet, setOpennet] = useState<UserProp>()
  const gamesocket = useContext(SocketContext)

  const [end, setend] = useState(false)
  useEffect(() => {
    gamesocket.on("endGame" , ()=>{
      setend(true)
    })
    
    var s : string | null = localStorage.getItem('user');
    var data;
    if (s)
    {
      data =  JSON.parse(s || '{}');
      gamesocket.emit("playerConnect" , data.login)
      setUser(data)
    }



  }, [end])
  
  return (
    <div  style={{marginTop: "100px"}}className="container">
       <PlayerStyle>
        <Player1>
          <UserComponent Ai={false} data={user}/>
        </Player1>
  {/* <Score>
    {score1Ref.current} | {score2Ref.current}
  </Score> */}
  <Player2>
    {opennet ?    <UserComponent Ai={true} data={opennet}/>  :  <Spinner/> }
</Player2>
</PlayerStyle>
        <Pong/>
        {/* <Pong themes={props.theme} mode={props.theme.mode}/>
        {end && <Modal
                        isOpen={end}
                        onRequestClose={() => setend(false)}
                        hideModal={() => setend(false)}
                        >
         
                             End game
                        </Modal>} */}
    </div>
  )
}


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