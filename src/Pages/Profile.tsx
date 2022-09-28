import React, {useState , useEffect} from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import  Badge2 from "../assets/imgs/avatar/a1.png";
import  Badge3 from "../assets/imgs/avatar/a2.png";
import  Badge4 from "../assets/imgs/avatar/a6.png";
import  Badge5 from "../assets/imgs/avatar/a4.png";

import { PlayerCard , UserCard} from '../components/PlayerProfile';
import { GameComp } from "../components/PlayerProfile";
import { UserInvitCard } from "../components/PlayerProfile";
import { UserBlockedCard } from "../components/PlayerProfile";
import {ReactComponent as LuffyAce} from "../assets/imgs/luffyAce.svg";
import axios from 'axios';



//-- Global Data --

//-- Global User Data --//
const hieghtTab = "500px";
const match1 = {
  match:{
  name: "Melkarmi",
  score1 : 7,
  score2 : 5,
  img: Badge4,
  min: 10, 
  sec: 20}, 
  isFriend: false,
}
const match2 = {
  match:{
  name: "Mamali",
  score1 : 2,
  score2 : 5,
  img: Badge3,
  min: 25, 
  sec: 29}, 
  isFriend: true,
}
const match3 = {
  match:{
  name: "achraf",
  score1 : 17,
  score2 : 20,
  img: Badge5,
  min: 5, 
  sec: 20},
  isFriend: true,
}
var listGame = [match1 , match2, match3, match1 , match2, match3, match1 , match2, match3,
   match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3]

//-----//


const BlockedUser = {
  username: "Nami San",
  avatar : Badge2,
}
const BlockedUser1 = {
  username: "Nico Robin",
  avatar : Badge3,
}
const BlockedUser2 = {
  username: "Franky",
  avatar : Badge4,
}
const BlockedUser3 = {
  username: "Brook",
  avatar : Badge5,
}
var listBlocked = [BlockedUser , BlockedUser1 , BlockedUser2 , BlockedUser3]

//-----------------------//

interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
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
    defaultAvatar: "string",
    login : "@melkarmi",
    displayName : 'Mohamed Elkarmi'
  
  })

  useEffect(() => {
    var s : string | null = localStorage.getItem('user');
    if (s)
    {

      const data : UserProp =  JSON.parse(s || '{}');
      console.log(data)
      if (id === data.login)
      {
       
        setisCurrent(true)
        setUser(data)
      }
      else
      {
        setisCurrent(false)
        axios.get("http://localhost:8000/users/" + id, 
        {withCredentials: true} 
      ).then((res)=>{
        console.log(res.data)
        // check for the user is bloked 
        setUser(res.data)
      }).catch((err)=>{

        // history.pushState("/signin");
    })
      }
    }

  }, [id]);

  return (
    <div className='container' style={{display: "flex" ,flexDirection : "column", marginTop: "100px"}}>
          <TheBox>
              <PlayerCard  isCurrentUser={isCurrentUser} player={User} />
          </TheBox>
          <PlayerTabsBar id={id} /> 
    </div>
  )
};

const TheBox = styled.div`
  padding: 10p;
  width: 100%;
  border: 0px solid ${props => props.theme.colors.primarybg};
`;

///// PlayerTabs Section
const linkslist = [ " FRIENDS" , "PENDING REQUESTS", "BLOCKED USERS"]
interface PlayerTabsProps {
  id : string
}
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
  /* height: ; */
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;

//#1  Tab Achievements info 
export function TabOne()
{
  return (
    <TabOone >
      {
        // listAchiev.map((match : any, id : number )=>{
        //     return<AchievmentComp key={id}achievment={match}  />
        // })
      }
    </TabOone>
  )
}
const TabOone = styled.div`
  /* margin: 20px; */
  height: ${hieghtTab};
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 20px;
  /* margin: 10px; */
  overflow-y: scroll;

  &::-webkit-scrollbar {
  width: 4px;
}

/* Track */
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

//#2  Tab Friends
interface FriendsProps {
  id : string
}
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
    <TabOthree >
      {
        friends.length === 0 ? 
        <EmptyComponent text="No Friends Yet !"/>
        : 
        friends.map((match : any, id : number )=>{
            return<UserCard key={id} data={match}  />
        })
      }
    </TabOthree>
  )
}
interface EmptyProps {
  text: string
}
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

//#3  Game History Tab
export function Tabthree()
{
  return (  
    <TabOthree >
    {
        listGame.map((match : any, id : number )=>{
            return<GameComp key={id} match={match.match}  isFriend={match.isFriend} />
        })
    }
    </TabOthree >
  )
}
const TabOthree= styled.div`
  width: 100%;
  height: 100%;
  max-height: ${hieghtTab};

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

//#4  Pending Requests
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
    <TabOthree>
    {
        friends.length === 0 ? 
        <EmptyComponent text="No Pending Requests !"/>
        : 
        friends.map((invit : any, id : number )=>{
            return<UserInvitCard key={id} data={invit} />
        })
    }
       
    </TabOthree>
  )
}

//#5  My Black List
export function Tabfive()
{
  return (
    <TabOthree> 
        {
           listBlocked.length === 0 ? 
           <EmptyComponent text="Empty !"/>
           : 
          listBlocked.map((invit : any, id : number )=>{
              return<UserBlockedCard key={id} data={invit} />
          })
        }  
      
      </TabOthree>
  )
}



