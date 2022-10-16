import React, {useState , useEffect} from 'react'
import avataro from "../assets/imgs/avatar/avatar2.png";
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import axios from 'axios';
import styled from "styled-components"
import EmptyComponent from './PlayerrEmptyComp';

// My Black List
export default function BlockedUsers()
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
        },
        {
          status: "MGHAYER",
          defaultAvatar:avataro,
          login: "DefaultUser4"
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
// My Black List

/// Blocked Users ///
export interface UserBlockedCardProps {
  data: {
    login: string;
    defaultAvatar: string;
  }
}
export interface StyleProps {
    status: string;
}

export  function UserBlockedCard(props : UserBlockedCardProps) {

    const RemoveBlockUser = ()=>{
        axios.get("http://localhost:8000/users/relation/"+ props.data.login+ "?event=unblock",  {withCredentials: true} 
                ).then((res)=>{
        
            alert("User Unblocked" + res.status) }).catch((err)=>{  })
            // window.location.reload();
    
    }
    
  return (
    <UserBlockedCardStyle >
      <div className="YN"> 
        <Deny onClick={RemoveBlockUser}  className='Bdeny'/>
      </div>
      <img alt="avatar" src={props.data.defaultAvatar} className="avatar" />
      <div className="Uname"> {props.data.login}  </div>
    </UserBlockedCardStyle>
  )
}

const UserBlockedCardStyle = styled.div`

  position: relative;
  background: #000000;
  margin : 20px;
  width: 120px;
  height: 140px;
  text-align: center;
  border-radius: 10px;
  /* border: 2px solid  #433f49 ; */
  /* animation: fadeIn 2s; */
  box-shadow:   2px 2px 2px 2px #433f49 ; 

  .YN {
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
        fill: #665a5a5f;
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
        fill: #12c006a8;
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
      background: #1e1c20;
      transform: scale(1.1);
        transition: 1s ease-in-out;
    }
`;
/// Blocked Users ///

