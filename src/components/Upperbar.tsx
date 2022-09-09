import React, {useState , useEffect} from 'react'
import styled , {css} from "styled-components"
import SearchIcon from "../assets/imgs/searchIcon.svg"
import {ReactComponent as BellIcon }from "../assets/imgs/bell-icon.svg"
import {ReactComponent as Logo }from "../assets/imgs/logo.svg"
import TestAvatar from "../assets/imgs/tests/guy.svg" 
import DropDown from './DropDown'
import Modal from './Modal'
import GameModal from './modals/GameModal'



interface UserProp {
  DefaultAvatar: string,

}
export default function Upperbar() {
  const [open, setopen] = useState(false)
  const [hideModel, sethideModel] = useState(false)
  const [currentUser, setcurrentUser] = useState< UserProp>()
  const ToggleDD = (e : any)=>{
    setopen(!open)
    e.stopPropagation();
  }
  
  const bg = {
    overlay: {
      background: "#FFFF00"
    }
  };
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
          <PlayButton onClick={()=>{sethideModel(!hideModel)}} >
            Play
          </PlayButton>
          <NotificationComponent/>
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
              />
            }
          </div>
        </RightCont>
        {hideModel &&  <Modal
        isOpen={hideModel}
        onRequestClose={() => sethideModel(false)}
        hideModal={() => sethideModel(false)}
        styles={bg}
      >
        {/* <AppCommingSoon
          hideModal={() => sethideModel(false)}
          showAuth={showAuth}
        /> */}
        <GameModal/>
      </Modal>}
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
  background :  ${props => props.theme.colors.purple};
  border:1px solid ${props => props.theme.colors.border};;
  border-radius: 5px;
  font-family: 'Michroma', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

`;

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
width: 300px;
   display: flex;
   align-items:center;
   flex-direction: row;
   justify-content: space-between;
`;

export  function LogoComponent() {
    return (
      <Logo/>
      // <Logo>
      //     One Pong
      // </Logo>
    )
  }
    // const Logo = styled.div`
    // font-family: 'Michroma', sans-serif;
    //    color:  ${props => props.theme.colors.primaryText};;
    //    font-size:  ${props => props.theme.fontSize.l}; 
    //    /* object-fit : contain; */
    // `;
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


export  function NotificationComponent() {
  return (
    <Notification new={true}  >
    <BellIcon/>
    </Notification>
  )
}
export interface SearchProps {
new: boolean
}

const Notification= styled.div<SearchProps>`
width: auto;
position: relative;
>svg{
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
  border: 2px solid   ${props => props.theme.colors.purple};;

`;