import React , {useContext , useState , useEffect} from 'react'
import Modal from '../components/Modal'
import Pong from '../components/Pong'
import { SocketContext } from '../context/Socket'


interface GameProps {
  theme: any
  
}
export default function Game(props : GameProps) {
  const gamesocket = useContext(SocketContext)

  const [end, setend] = useState(false)
  useEffect(() => {
    gamesocket.on("endGame" , ()=>{
      setend(true)
    })
  }, [end])
  
  return (
    <div style={{marginTop: "100px"}}className="container">
        
        <Pong themes={props.theme} mode={props.theme.mode}/>
        {end && <Modal
                        isOpen={end}
                        onRequestClose={() => setend(false)}
                        hideModal={() => setend(false)}
                        >
                            {/* <AddFriendsModal/>
                             */}
                             End game
                        </Modal>}
    </div>
  )
}
