import React , { useState}from 'react'
import {ReactComponent as Dots} from "../../assets/imgs/dotsvertical.svg";
import {ReactComponent as UserIcon} from "../../assets/imgs/dotsvertical.svg";
import {ReactComponent as SettingIcon} from "../../assets/imgs/dotsvertical.svg";

import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';
import DropDown from '../DropDown';
interface ListTypes  {
    title : string,
    icon :  any,
    href: string
  
  }
  interface convType {
    name : string,
    avatar : string,
  }
  const list :ListTypes[]  =  [{title: "Profile" , icon : <UserIcon/> , href : "/profile/id"},{title: "Setting" , icon : <SettingIcon/>  ,href : "/setting"} ]
  
export default function ChatHeader(props : convType) {
    const [open, setopen] = useState(false)
    const ToggleDD = (e : any)=>{
  
      console.log("hello")
      setopen(!open)
      e.stopPropagation();
    }
    return (
      <TopStyle>
        <div className='cont'>
          <div style={{width: "40px" , height: "40px"}}>
  
          <AvatarComponent img={props.avatar}/>
          </div >
          <div >
             {props.name}
          </div>
        </div>
        
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