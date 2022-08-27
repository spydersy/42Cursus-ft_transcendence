import React, {useState} from 'react'
import styled , {css} from "styled-components"
import SearchIcon from "../assets/imgs/searchIcon.svg"
import BellIcon from "../assets/imgs/bell-icon.svg"
import TestAvatar from "../assets/imgs/tests/guy.svg" 
import DropDown from './DropDown'

export default function Upperbar() {
  const [open, setopen] = useState(false)
  const ToggleDD = (e : any)=>{
    setopen(!open)
    e.stopPropagation();
  }
  return (
    <Wrraper>
        <LogoComponent/>
        <SearchBarComponent/>
        <RightCont>
          <NotificationComponent/>
          <div  style={{position : "relative"}} onClick={(e)=>{ToggleDD(e)}}>
            <AvatarComponent/>
            {
              open && <DropDown closeDropdown={ ()=>{
      
                console.log(open)
                setopen(false)
              }} open={open} />
            }
          </div>
        </RightCont>
    </Wrraper>
    
  )
}

const Wrraper = styled.div`

   width: calc(100vw - (26 * 2));
   height: 70px;
   background-color: ${props => props.theme.colors.primarybg};;
   display: flex;
   align-items:center;
   flex-direction: row;
   justify-content: space-between;
  padding: 0 26px;
  
`;
const RightCont = styled.div`
width: 100px;
   display: flex;
   align-items:center;
   flex-direction: row;
   justify-content: space-between;
`;

export  function LogoComponent() {
    return (
      <Logo>
          PingPong  Time 
      </Logo>
    )
  }
    const Logo = styled.div`
    font-family: 'Michroma', sans-serif;
       color:  ${props => props.theme.colors.primaryText};;
       font-size:  ${props => props.theme.fontSize.l}; 
       /* object-fit : contain; */
    `;
export  function SearchBarComponent() {
    return (
      <SearchBar>

        <input  type="text" placeholder='Search ..' />
      </SearchBar>
    )
  }
  const SearchBar = styled.div`
  background: #FFFFFF;
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


export  function NotificationComponent() {
  return (
    <Notification new={true}  >
      <img src={BellIcon} alt="notifications" />
    </Notification>
  )
}
export interface SearchProps {
new: boolean
}

const Notification= styled.div<SearchProps>`
width: auto;
position: relative;
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

export  function AvatarComponent() {
  return (
    <Avatar>
      <img src={TestAvatar} alt='avatar' />
    </Avatar>
  )
}

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius : 50%;
  img{
    width: 100%;
    height: 100%;
  }
  border: 2px solid   ${props => props.theme.colors.primarybg};;

`;