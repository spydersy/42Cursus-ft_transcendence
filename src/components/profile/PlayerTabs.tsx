import React, {useState , useEffect, CSSProperties} from 'react'
import styled from "styled-components"
import {ReactComponent as LuffyAce} from "../../assets/imgs/luffyAce.svg";
import avataro from "../../assets/imgs/avatar/avatar2.png";
import axios from 'axios';
// import { UserCard} from '../PlayerProfile';
import { UserInvitCard } from "../PlayerProfile";
import { UserBlockedCard } from "../PlayerProfile";
import CircleLoader from "react-spinners/CircleLoader";
import { animated, useSpring } from 'react-spring';


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
interface FriendsProps { id : string }
export function FriendsComponent(props : FriendsProps)
{
  const [friends, setfriends] = useState(
    [
      {
          status: "ONLINE",
          defaultAvatar:avataro,
          login: "DefaultUser1",
      },
      {
        status: "OFFLINE",
        defaultAvatar:avataro,
        login: "DefaultUser2"
      },
      {
        status: "ONGAME",
        defaultAvatar:avataro,
        login: "DefaultUser3"
      }
    ])
  
  useEffect(() => {
      axios.get("http://localhost:8000/users/friends/" + props.id,   {withCredentials: true}  ).then((res)=>{
        // console.log(res.data)
        setfriends(res.data)
      }).catch((err)=>{ })
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

//#2  Pending Requests
export function PendingRequests()
{
  const [friends, setfriends] = useState(
    [
      {
        status: "ONLINE",
        defaultAvatar:avataro,
        login: "DefaultUser1",
      },
      {
        status: "OFFLINE",
        defaultAvatar:avataro,
        login: "DefaultUser2"
      },
      {
        status: "ONGAME",
        defaultAvatar:avataro,
        login: "DefaultUser3"
      }
    ]
    )
  


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

//#3  My Black List
export function BlockedUsers()
{
  // eslint-disable-next-line 
  const [listBlocked, setlistBlocked] = useState(
      [
        {
          status: "ONLINE",
          defaultAvatar:avataro,
          login: "DefaultUser1",
        },
        {
          status: "OFFLINE",
          defaultAvatar:avataro,
          login: "DefaultUser2"
        },
        {
          status: "ONGAME",
          defaultAvatar:avataro,
          login: "DefaultUser3"
        }
      ]
    )
  
    useEffect(() => {

      axios.get("http://localhost:8000/profile/me?data=blacklist",  {withCredentials: true} 
      ).then((res)=>{
        console.log("Blockedlist : ", res)
        setlistBlocked(res.data)
        }).catch((err)=>{
      })

    }, [])


  
 
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
const TabfourStyle= styled.div`
  background-color:  ${props => props.theme.colors.bg};
  color:  ${props => props.theme.colors.seconderyText};
  width: 100%;
  height: 100%;
  opacity: 0.8;
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

/// # USED COMPONENETS # /// 

/// UserCard
const override: CSSProperties = {  display: "grid",  margin: "10 auto",  borderColor: "black",};

export interface UserCardProps { data: { status: string; defaultAvatar: string; login: string;} }

export interface StyleProps { status: string; }

export  function UserCard(props : UserCardProps) {

    const [loading] = useState(true);
    
    let color = ("#d21f2e");
    
    if (props.data.status === "ONLINE")
       color = ("#1ea122") 
    else if (props.data.status === "ONGAME")
      color = ("#ee900c");
    
    return (
    <UserCardStyle status={color} >
        <a href={"/profile/" + props.data.login}>
            <div className="status" >       
                <CircleLoader   color={color} loading={loading} cssOverride={override} size={20} />
            </div>
            <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
            <div className="Uname"> @{props.data.login} </div>
        </a>  
    </UserCardStyle>
    )
}
const UserCardStyle = styled.div<StyleProps>`
position: relative;
background: linear-gradient(144deg, #5c5861 16.67%, #1f2e39 100%);
font-family: "Poppins" , sans-serif;
margin : 20px;
width: 120px;
height: 140px;
text-align: center;
border-radius: 13px;
cursor: pointer;
/* animation: fadeIn 8s; */
/* border: ${props => props.status} 2px solid; */
/* -webkit-box-shadow: 3px 3px 5px 6px #ccc;   */
/* -moz-box-shadow:    3px 3px 5px 6px #1b9ad4;   */
box-shadow:         2px 1px 1px 1px ${props => props.status}; 

.status {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  border: ${props=> props.status} 3px solid;
  /* border: 3px solid ; */
  /* transform: translate(-10%, -10%); */
  background-color: #f9f9f984;
}

> svg { // Dots icon
    /* display: flex; */
    cursor: pointer;
    position: absolute;
    width: 25px;
    height:25px;
    right: 10px;
    top: 3px;
    /* padding: 1px 1px ; */
    path{
      stroke: ${props=> props.status} ;
    }
    &:hover {
    transform: scale(1.4);
    right:10px;
    top: 3px;
    path{
    stroke: #f9f9f9;
      }
    }
}

.avatar {
border: 3px solid #ffffff;
border-radius: 50%;
position: absolute;
display: block;
width: 50%;
top: 20%;
left: 25%;
animation: fadeIn 3s;
> img {
    width:  80px;
    height: 80px;
}
}

.Uname {
position: absolute;
color: #fcfafc;
width: 100%;
height: auto;
min-height: 30px;
margin : 2px 0px;
text-transform: capitalize;
font-size: 14px;
font-weight: bolder;
bottom: 0px;
/* -webkit-text-stroke: 1px #929292b7; */
}

&:hover {
  transform:  rotate(360deg);
  display: inline-block;
  backface-visibility: visible;
  transition: 2s ease-in-out;
}
  /* @keyframes fadeIn {
  0% { opacity: 0.9; }
  100% { opacity: 1; }
  } */
`;
/// UserCard



