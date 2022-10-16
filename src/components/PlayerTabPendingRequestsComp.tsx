import React, {useState , useEffect} from 'react'
// import { UserInvitCard } from "./PlayerProfile";
import styled from "styled-components"
import axios from 'axios';
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import {ReactComponent as Accepte} from "../assets/imgs/y-circle.svg";

import EmptyComponent  from "./PlayerrEmptyComp"
import avataro from "../assets/imgs/avatar/avatar2.png";

interface UserProp { defaultAvatar: string, login : string  }
export interface UserInvitCardProps { data: UserProp }
export interface StyleProps {  status: string; }

//
export default function PendingRequests()
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
      },
      {
        status: "ONGAME",
        defaultAvatar:avataro,
        login: "DefaultUser4"
      }
    ])
  
  useEffect(() => {
    
    axios.get("http://localhost:8000/profile/me?data=requests",  {withCredentials: true}  ).then((res)=>{
        
        // console.log(res)
        setfriends(res.data)
  
     }).catch((err)=>{ })

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
//
export  function UserInvitCard(props : UserInvitCardProps) {

const accepteFriend = ()=>{
    axios.get("http://localhost:8000/users/relation/"+ props.data.login+ "?event=accept",  {withCredentials: true} 
            ).then((res)=>{
    
        alert("User Request Accepted" + res.status) }).catch((err)=>{  })
        // window.location.reload();

}

const DenyFriend = ()=>{
    axios.get("http://localhost:8000/users/relation/"+ props.data.login+ "?event=deny",  {withCredentials: true} 
            ).then((res)=>{
    
        alert("User Request Deny" + res.status) }).catch((err)=>{  })
        // window.location.reload();

}

useEffect(() => {
    // console.log(props.data)

    })

return (
    <UserInvitCardStyle >
        <a href={"/profile/" + props.data.login}>
            <div className="YN"> 

                <Deny onClick={DenyFriend}  className='Bdeny'/>
                <Accepte onClick={accepteFriend} className='Adeny'/>

            </div>

            <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
            <div className="Uname"> {props?.data?.login}  </div>
        </a>
    </UserInvitCardStyle>
)
}
const UserInvitCardStyle = styled.div`

position: relative;
background: #38215b;
margin : 20px;
width: 120px;
height: 140px;
text-align: center;
border-radius: 10px;
/* border: 2px solid  #70539b ; */
box-shadow:   2px 2px 2px 2px #70539b ; 

/* animation: fadeIn 2s; */

.YN {
    /* background-color: #0228ff; */
    position: absolute;
    top: 0px;

    width: 100%;
    height: 20%;
    .Bdeny {
    position: absolute;
    width: 25px;
    height: 25px;
    
    top: 4px;
    left: 5px;

    &:hover {
        cursor: pointer;
        /* fill: #f50000a6; */
        transform: scale(1.3);

    }

    } 
    .Adeny {
    position: absolute;
    width: 25px;
    height: 25px;
    
    top: 4px;
    right: 5px;

    &:hover {
        cursor: pointer;
        /* fill: #12c006a8; */
        transform: scale(1.3);
    }
    }
}

.avatar {
    border: 1px solid #fcfafc;
    border-radius: 50%;
    position: absolute;
    display: block;
    width: 50%;
    top: 20%;
    left: 25%;
    /* animation: fadeIn 4s; */
    > img {
        width:70px;
        height: 70px;
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

/* @keyframes fadeIn {
0% { opacity: 0; }
100% { opacity: 1; }
} */

&:hover {
    cursor: pointer;
    background: #664297;
    transform: scale(1.1);
    transition: 1s ease-in-out;

}
`;
