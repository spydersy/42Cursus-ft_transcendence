import React, {useState , useEffect} from 'react'
import styled , {css} from "styled-components"
import SearchIcon from "../assets/imgs/searchIcon.svg"
import {ReactComponent as BellIcon }from "../assets/imgs/bell.svg"
import {ReactComponent as Logo }from "../assets/imgs/logo.svg"
import TestAvatar from "../assets/imgs/tests/guy.svg" 
import DropDown, { NotifDropDown } from './DropDown'
import Modal from './Modal'
import { ReactComponent as UserIcon} from "../assets/imgs/user-icon.svg"
import { ReactComponent as SettingIcon} from "../assets/imgs/settings.svg"
import { theme } from '../theme'

interface ListTypes {
  title : string,
  icon :  any,
  href: string

}
const list :ListTypes[]  =  [{title: "Profile" , icon : <UserIcon/> , href : "/profile/id"},{title: "Setting" , icon : <SettingIcon/>  ,href : "/setting"} ]

interface UserProp {
  DefaultAvatar: string,

}
interface NotifProps {
  setopen: (e : boolean) => void,

}
export default function Upperbar() {
  const [open, setopen] = useState(false)
  const [hideModel, sethideModel] = useState(false)
  const [currentUser, setcurrentUser] = useState< UserProp>()
  const ToggleDD = (e : any)=>{
    setopen(!open)
    e.stopPropagation();
  }
  

  useEffect(() => {
    // setcurrentUser(localStorage.getItem("user"))
    var s : string | null = localStorage.getItem('user');
    const data : UserProp =  JSON.parse(s || '{}');
    setcurrentUser(data)
    console.log(data)
  
  }, [setcurrentUser])
  
  return (
    <Wrraper>
        <LogoComponent/>
        <SearchBarComponent/>
        <RightCont>
          {/* <PlayButton onClick={()=>{sethideModel(!hideModel)}} >
            Play
          </PlayButton> */}
          <NotificationComponent setopen={(e)=>setopen(e)} />
          <div  style={{position : "relative"}} onClick={(e)=>{ToggleDD(e)}}>
            <div style={{width : "40px", height :"40px"}}>
            <AvatarComponent img={currentUser?.DefaultAvatar!} />
            </div>
            {
              open && <DropDown closeDropdown={ ()=>{
      
                console.log(open)
                setopen(false)
              }} open={open} 
              style={{bottom: "-25px" , right: '0'}}
              list={list}
              />
            }
          </div>
        </RightCont>
       
    </Wrraper>
    
  )
}

const PlayButton = styled.button`
  width:150px;
  height :40px;
  border: none;
  outline:none;
  cursor:pointer;
  color: ${props => props.theme.colors.primaryText};;;
  /* background :  ${props => props.theme.colors.purple};
   */
  background: linear-gradient(266.44deg, #51002C 2.64%, #50002C 55.22%, #0E1117 97.6%);
  border:1px solid ${props => props.theme.colors.border};;
  border-radius: 5px;
  font-family: 'Michroma', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrraper = styled.div`
  z-index: 20;

   width: calc(100%);
   height: 70px;
   background-color: ${props => props.theme.colors.primarybg};;
   display: flex;
   align-items:center;
   flex-direction: row;
   justify-content: space-between;
  /* padding: 0 26px; */
  position: fixed;
  top: 0;
  left: 0;
  
`;
const RightCont = styled.div`
width: 100px;
   display: flex;
   align-items:center;
   flex-direction: row;
   justify-content: space-between;
   gap: 10px;
   margin-right :10px;
`;

export  function LogoComponent() {
    return (
      <a style={{marginLeft :"10px"}}href='/'>

        < Logo/>
      </a>
    )
  }

export  function SearchBarComponent() {
    return (
      <SearchBar>

        <input  type="text" placeholder='Search ..' />
      </SearchBar>
    )
  }
  const SearchBar = styled.div`
  background:  ${props => props.theme.colors.bg};
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  width: 50%;
  max-width: 600px;
  height: 42px;

      /* object-fit : contain; */
      position: relative;
      padding: 0px 0px 0px 40px;
      &::before{
        content: url(${SearchIcon});
        position: absolute;
        left: 10px; 
        top: 55%; 
        transform: translateY(-50%);
      }
      input{
        background-color: transparent;
        width: calc(100% - 40px);
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        outline: none;
        color:  ${props => props.theme.colors.seconderyText};;
      font-size:  ${props => props.theme.fontSize.l}; 
        &::placeholder{
      color:  ${props => props.theme.colors.seconderyText};;
      font-size: ${props => props.theme.fontSize.l};
          opacity: 0.6;
        }
    }
    @media  only screen and (max-width: 768px) {
      width: 150px;
  max-width: 200px;
    }
  `;


export  function NotificationComponent(props: NotifProps) {
  const [openNotif, setopenNotif] = useState(false)

  return (
    <Notification onClick={(e)=>{
      console.log(openNotif)
      setopenNotif(!openNotif)
      e.stopPropagation()
      props.setopen(false)
      }} new={true}  >
      <BellIcon/>
      {
              openNotif && <NotifDropDown closeDropdown={ ()=>{
                console.log(openNotif)
                setopenNotif(false)
              }} open={openNotif} 
              style={{bottom: "-25px" , right: '0'}}
              // list={list}
              />
            }
    </Notification>
  )
}
export interface SearchProps {
new: boolean
}

const Notification= styled.div<SearchProps>`
width: auto;
position: relative;
display: flex;
align-items: center;
justify-content: center;
>svg{
  height: 30px;
  width: 30px;

  path{
    stroke: ${props => props.theme.colors.primaryText};

  }
  
}
${props => props.new && css`
&::after{
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    background-color:  ${props => props.theme.colors.danger};;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }`
  }
 

`;
interface AvatarProps {
  img: string,
  // score2 : number
}
export  function AvatarComponent(props: AvatarProps) {
  return (
    <Avatar>
      <img src={props.img} alt='avatar' />
    </Avatar>
  )
}

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius : 50%;
  background-color: white;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  border: 2px solid   ${props => props.theme.colors.border};;

`;