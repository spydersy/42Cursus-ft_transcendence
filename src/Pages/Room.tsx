import axios from 'axios';
import React , {useState , useEffect}from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import RoomComponent from '../components/RoomComponent';
import { HeadComponent } from './Home';
interface usersType {
  id : string,
      defaultAvatar: string,
      login : string
      displayName : string,
      restriction: string,
      restrictionTime: string,
      duration: number,
    }
  
    interface convType {
      nbMessages: number,
      lastUpdate: string,
      access : string,
      channelId: number,
      name: string;
      password: string,
      picture : string,
      users: usersType[]
    }
const  roomListDummy = [
  {
    isLocked : true,
    roomBanner: "string",
    roomName : "string"
  }, 
  {
    isLocked : true,
    roomBanner: "string",
    roomName : "string"
  },
  {
    isLocked : false,
    roomBanner: "string",
    roomName : "string"
  },
  {
    isLocked : true,
    roomBanner: "string",
    roomName : "string"
  },
  {
    isLocked : false,
    roomBanner: "string",
    roomName : "string"
  }
]
export default function Room() {
const linkslist = ["All" , "My Rooms"]

    const [index, setindex] = useState(1)
    const [myrooms, setmyrooms] = useState<convType[]>([])
    const [allRooms, setallRooms] = useState<convType[]>([])
    useEffect(() => {
      const fetchData = async () => {
        await axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/myChannels", 
        {withCredentials: true} 
        ).then((res)=>{
          setmyrooms(res.data)
         }).catch((err)=>{
           console.log(err)
         })
        await axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/allChannels", 
        {withCredentials: true} 
        ).then((res)=>{
          console.log(res.data)
          setallRooms(res.data)
         }).catch((err)=>{
           console.log(err)
         })
       }
       fetchData()
    }, [])
    
  return (
    <RoomStyle className='container'>
        <HeadComponent title='Chat Rooms'/>
        <PlayerAchieveStyle>
        <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/>
              {index === 0 && 
            <Warraper>

              {
                allRooms.map((data : any , id : number)=>{
                  return<RoomComponent  key={id} id={3} roomMembers={data.nbUsers} roomName={data.name} roomBanner={data.picture} isLocked={data.access === "Protected"} />        
                })
              }
            </Warraper>
              }
              {index === 1 && 
            <Warraper>
              {
                myrooms.map((data : convType , id : number)=>{
                  if (data.access != "DM")
                  {
                    return<RoomComponent  key={id}  id={data.channelId } roomMembers={data.users.length} roomName={data.name} roomBanner={data.picture} isLocked={data.access === "Protected"} />        
                    
                  }
                  return<div key={id} ></div>
                })
              }
            </Warraper>
              }
              
                  
        </PlayerAchieveStyle>
    </RoomStyle>
  )
}


const RoomStyle = styled.div`
    width: 100%;
    
height: auto;
padding: 20px 0;
margin-top: 100px;
display: flex;
align-items: center;
/* justify-content: space-around; */
border-radius: 5px;
flex-direction: column;
border: 2px solid  ${props => props.theme.colors.border};
color : ${props => props.theme.colors.primaryText};
background-color: ${props => props.theme.colors.primarybg};

`;
const PlayerAchieveStyle = styled.div`
margin-top: 100px;
  padding-top: 20px;
  margin : 0px 0px;
  width:  90%;
  align-items: center;
  height: auto;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;
const Warraper = styled.div`
margin-top: 20px;
display: flex;
/* align-items: center; */
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
`;

