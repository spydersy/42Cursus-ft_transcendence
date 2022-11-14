import React, {useState , useEffect} from 'react'
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import axios from 'axios';
import styled from "styled-components"
import EmptyComponent from './PlayerrEmptyComp';
import { ToastContainer, toast } from 'react-toastify';

// My Black List
export default function BlockedUsers()
{
  const [listBlocked, setlistBlocked] = useState([])
    useEffect(() => {
      axios.get(process.env.REACT_APP_BACKEND_URL+  "/profile/me?data=blacklist",  {withCredentials: true} 
      ).then((res)=>{
        setlistBlocked(res.data)
        }).catch((err)=>{
      })

    }, [])

  return (
    <TabfourStyle> 
      <ToastContainer />
        {
           listBlocked.length === 0 ? 
           <EmptyComponent text="Peaceful User !"/>
           : 
          listBlocked.map((invit : any, id : number )=>{
              return<UserBlockedCard key={id} data={invit} index={id} listBlocked={ listBlocked} setlistBlocked={(e)=>setlistBlocked(e)}  />
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

/// Blocked Users ///
interface BlockProp {
    login: string;
    defaultAvatar: string;
}
export interface UserBlockedCardProps {
  data: BlockProp,
  listBlocked : BlockProp[], 
  setlistBlocked : (e : any)=>void
  index : number
}

export interface StyleProps { status: string; }

export  function UserBlockedCard(props : UserBlockedCardProps) {

  const    DeclineFriendNotify = () => toast.info("You Removed " +  props.data.login.toLocaleUpperCase() + " From BlackList", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });

  const RemoveBlockUser = ()=>{

    axios.get(process.env.REACT_APP_BACKEND_URL+  "/users/relation/"+ props.data.login+ "?event=unblock",  {withCredentials: true} 

      ).then((res)=>{
      
        DeclineFriendNotify();
          
          var s  = props.listBlocked.indexOf(props.data)
          var l = props.listBlocked
          l.splice(s , 1)
          props.setlistBlocked([...l])
          
      }).catch((err)=>{  })
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

