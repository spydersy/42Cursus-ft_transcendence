import React, {useState , useEffect, useCallback} from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import { PlayerCard , UserCard} from '../components/PlayerProfile';
import { UserInvitCard } from "../components/PlayerProfile";
import { UserBlockedCard } from "../components/PlayerProfile";
import {ReactComponent as LuffyAce} from "../assets/imgs/luffyAce.svg";
import axios from 'axios';

//-----------------------//
interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
  lastModification: string
  Achievements: boolean[]
}

interface InvProp {
  sender: {
    login : string
  },
  // login : string
  // displayName : string
}

//// Default function Profile
export default function Profile() {
  const id = window.location.pathname.split("/")[2];
  const [isCurrentUser, setisCurrent] = useState(true)
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "defaultAvatar",
    login : "login",
    displayName : 'displayName',
    relation : "relation",
    nbFriends : "999",
    wins : 9999,
    losses : 0,
    lastModification: "XXX XX XXX XXXX XX:XX:XX",
    Achievements: [false, false, false, false, false, false, false, false]
  })

  // const [connection, setconnection] = useState(true);

  useEffect(() => {
    var s : string | null = localStorage.getItem('user');
    if (s)
    {
      const data : UserProp =  JSON.parse(s || '{}');
      // console.log(data)
      if (id === data.login)
      {
        setisCurrent(true)
        setUser(data)
      }
      else
      {
        setisCurrent(false)
        axios.get("http://localhost:8000/users/" + id,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setUser(res.data)
              // setconnection(true)
            }).catch((err)=>{ })
      }
      console.log("> User Data < " , User, ">\n")
    }

  }, [id]);

  return (
        <div className='container' style={{  display: "flex" ,flexDirection : "column", marginTop: "100px"}}>

              <TheBox> 
                  <PlayerCard  isCurrentUser={isCurrentUser} player={User} />
              </TheBox>

              <PlayerTabsBar id={id} /> 
        </div>
  )
};

const TheBox = styled.div` width: 100%;  border: 0px solid ${props => props.theme.colors.primarybg}; `;

interface PlayerTabsProps { id : string }

///// PlayerTabs Section
const linkslist = [ " FRIENDS" , "PENDING REQUESTS", "BLOCKED USERS"]

export function PlayerTabsBar(props : PlayerTabsProps)
{
  const [index, setindex] = useState(0)
  return ( 
    <PlayerAchieveStyle>
      <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/> 

        {index === 0 && <FriendsComponent id={props.id}/>}
        {index === 1 && <Tabfour/>}
        {index === 2 && <Tabfive/>}
    </PlayerAchieveStyle>
  )
}

const PlayerAchieveStyle = styled.div`
  padding-top: 20px;
  margin : 20px 0px;
  width:  100%;
  flex: 1;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;

/// empty
interface EmptyProps { text: string }

export function EmptyComponent(props: EmptyProps)
{
  return (
    <Empty >
      <LuffyAce/>
      {props.text}
    </Empty>
  )
}

const Empty = styled.div` 
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color:  ${props => props.theme.colors.bg};
  color:  ${props => props.theme.colors.seconderyText};
  font-weight: 600;
  justify-content: center;
  font-size: 30px;
  font-family: "Poppins" , sans-serif;
`;

//#1  Tab Friends
export function FriendsComponent(props : FriendsProps)
{
  const [friends, setfriends] = useState([])
useEffect(() => {
  
  axios.get("http://localhost:8000/users/friends/" + props.id, 
    {withCredentials: true} 
  ).then((res)=>{
    console.log(res.data)
    setfriends(res.data)

  }).catch((err)=>{
    })
}, [props.id])

  return (
    <TabfourStyle >
      {
        friends.length === 0 ? 
        <EmptyComponent text="No Friends Yet !"/>
        : 
        friends.map((match : any, id : number )=>{
            return<UserCard key={id} data={match}  />
        })
      }
    </TabfourStyle>
  )
}

interface FriendsProps { id : string }

//#2  Pending Requests
export function Tabfour()
{
  const [friends, setfriends] = useState<InvProp[]>([])
  useEffect(() => {
    
    axios.get("http://localhost:8000/profile/me?data=requests", 
      {withCredentials: true} 
    ).then((res)=>{
      console.log(res)

      setfriends(res.data)
  
    }).catch((err)=>{
      })
  }, [])
  return (
    <TabfourStyle>
    {
        friends.length === 0 ? 
        <EmptyComponent text="No Pending Requests !"/>
        : 
        friends.map((invit : any, id : number )=>{
            return<UserInvitCard key={id} data={invit} />
        })
    }
       
    </TabfourStyle>
  )
}

const TabfourStyle= styled.div`
  background-color:  ${props => props.theme.colors.bg};
  color:  ${props => props.theme.colors.seconderyText};
  width: 100%;
  height: 100%;
  max-height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.colors.primarybg};
  overflow-y: scroll;
      &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent; 
    } 
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
`;

//#3  My Black List
export function Tabfive()
{
  // eslint-disable-next-line 
  const [listBlocked, setlistBlocked] = useState<InvProp[]>([])
 
  return (
    <TabfourStyle> 
        {
           listBlocked.length === 0 ? 
           <EmptyComponent text="Peaceful User !"/>
           : 
          listBlocked.map((invit : any, id : number )=>{
              return<UserBlockedCard key={id} data={invit} />
          })
        }  
    </TabfourStyle>
  )
}