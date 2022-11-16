import axios from 'axios';
import React , {useState , useEffect}from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import EmptyComponent from '../components/PlayerrEmptyComp';
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

export default function Room() {
const linkslist = ["All" , "My Rooms"]

    const [index, setindex] = useState(0)
    const [myrooms, setmyrooms] = useState<convType[]>([])
    const [allRooms, setallRooms] = useState<convType[]>([])
    useEffect(() => {
      const fetchData = async () => {
        await axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/myChannels", 
        {withCredentials: true} 
        ).then((res)=>{
          var tmp = []
          for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            if (element.access !== "DM")
              tmp.push(element)
          }
          setmyrooms(tmp)
         }).catch((err)=>{
         })
        await axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/allChannels", 
        {withCredentials: true} 
        ).then((res)=>{
          setallRooms(res.data)
         }).catch((err)=>{
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
                allRooms.length === 0 ? <EmptyComponent text="No Rooms" />:
                <>
              {
                allRooms.map((data : any , id : number)=>{
                return<RoomComponent key={id} id={data.id} roomMembers={data.nbUsers} roomName={data.name} roomBanner={data.picture} type={data.acces} isLocked={data.access === "Protected".toUpperCase()} ownership={false} />        
                })
              }
                </>
              }
            </Warraper>
              }
              {index === 1 && 
            <Warraper>
              {
                myrooms.length === 0 ? <EmptyComponent text="No Rooms" />:
                  <>
                  {
                      myrooms.map((data : convType , id : number)=>{
                  
                        return<RoomComponent   key={id} id={data.channelId } roomMembers={data.users.length} roomName={data.name} roomBanner={data.picture} type={data.access}  isLocked={data.access === "Protected".toUpperCase()} ownership={true} />        
                      
    
                    })
                  }
                  </>
         
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

