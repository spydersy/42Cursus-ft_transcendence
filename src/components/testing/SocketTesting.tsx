import React , {useEffect , useContext , useState} from 'react'
import styled from "styled-components"
import io from 'socket.io-client';
import { Button } from '../../Pages/SignIn';
import { SocketContext } from '../../context/Socket'

export default function SocketTesting() {
  const [rooms, setrooms] = useState([])

    useEffect(() => {
      // const socket = io('http://localhost:8000');
    }, [])
  const gamesocket = useContext(SocketContext)
  gamesocket.on("change", (ss : any)=>{
    setrooms(ss)
      console.log(ss)
  })
  return (
    <Test className="container" >
      <div className="rooms">
          <div>
          <Button onClick={()=>{gamesocket.emit("playerConnect" , "player1")}}  text='add player1'/>
      <Button onClick={()=>{gamesocket.emit("playerConnect" , "player2")}} text='add player2'/>
      <Button onClick={()=>{gamesocket.emit("playerConnect" , "player3")}} text='add player3'/>
      <Button onClick={()=>{gamesocket.emit("playerConnect" , "player4")}}  text='add player4'/>
      <Button onClick={()=>{gamesocket.emit("playerConnect" , "player5")}} text='add player5'/>
      <Button onClick={()=>{gamesocket.emit("playerConnect" , "player6")}} text='add player6'/>


          </div>
          <div>
          <Button onClick={()=>{gamesocket.emit("endGame" , "player1")}}  text='remove player1'/>
      <Button onClick={()=>{gamesocket.emit("endGame" , "player2")}} text='remove player2'/>
      <Button onClick={()=>{gamesocket.emit("endGame" , "player3")}} text='remove player3'/>
      <Button onClick={()=>{gamesocket.emit("endGame" , "player4")}}  text='remove player4'/>
      <Button onClick={()=>{gamesocket.emit("endGame" , "player5")}} text='remove player5'/>
      <Button onClick={()=>{gamesocket.emit("endGame" , "player6")}} text='remove player6'/>
          </div>
      </div>
      

     
      <div className="rooms">
        {rooms.map((room : any , id : number)=>{
          if (room.roomPlayers.length === 2)
          {
            return <div key={id}>
                 {room.roomPlayers[0].login} vs {room.roomPlayers[1].login} 
            </div>
          }
          // return < ></>

        })}

      </div>

    </Test>
  )
}
const Test = styled.div`
      margin-top: 100px;
      display:  flex;
      align-items: center;
      flex-direction: column;
      gap: 10;
      .rooms{
        display:  flex;
      align-items: center;
      flex-direction: row;
        >div{
          color : white;
          width: 200px;
          height: 200px;
          border-radius: 5px;
          border: 2px solid  gray;
        }
      }
  `;