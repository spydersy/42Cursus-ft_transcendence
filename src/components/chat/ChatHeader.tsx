import React , { useState}from 'react'
import {ReactComponent as Dots} from "../../assets/imgs/dotsvertical.svg";
import {ReactComponent as UserIcon} from "../../assets/imgs/dotsvertical.svg";
import {ReactComponent as SettingIcon} from "../../assets/imgs/dotsvertical.svg";
import {ReactComponent as BackIcon} from "../../assets/imgs/arrowLeft.svg";
import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';
import DropDown from '../DropDown';
import { data } from 'jquery';

interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
}

interface usersType {

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
interface ListTypes  {
  
    title : string,
    icon :  any,
    href: string
  
  }

  interface chatHeaderProps {
    data : convType,
    setState : (e: number)=>void,
    state : number,
  }

  const list :ListTypes[]  =  [{title: "Profile" , icon : <UserIcon/> , href : "/profile/id"},{title: "Setting" , icon : <SettingIcon/>  ,href : "/setting"} ]
  
export default function ChatHeader(props : chatHeaderProps) {
    const [open, setopen] = useState(false)
    const ToggleDD = (e : any)=>{
      setopen(!open)
      e.stopPropagation();
    }
    return (
      <TopStyle>
       {props.state === 1 && <BackIcon onClick={()=>props.setState(0)} />}
          {
            props.data?.access === "DM" ? 
        <div className='cont'>

          <div style={{width: "40px" , height: "40px"}}>
  
          <AvatarComponent img={props.data?.users[1].defaultAvatar}/>
          </div >
          <div >
             {props.data?.users[1].displayName}
          </div>
        </div>
          :
          <div className='cont'>

            <div style={{width: "40px" , height: "40px"}}>
    
            <AvatarComponent img={props.data?.picture}/>
            </div >
            <div >
              {props.data?.name}
            </div>
          </div>

          }
        
        <Dots onClick={ToggleDD} />
        {
          open && <DropDown closeDropdown={ ()=>{
        
            console.log(open)
            setopen(false)
          }} open={open} 
          style={{bottom: "-25px" , right: '0'}}
          list={list}  /> 
        }
      </TopStyle>
    )
}


const TopStyle = styled.div`

    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
      flex-direction: row;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      gap: 5px;

    .cont{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row;
      align-items: center;
      height :60px;
      gap: 15px;
    }
    >svg{
      path {
      stroke : ${props => props.theme.colors.primaryText};

      }
    }
`;