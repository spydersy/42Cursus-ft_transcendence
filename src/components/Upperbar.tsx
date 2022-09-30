import React, {useState , useEffect, useRef, CSSProperties} from 'react'
import styled , {css} from "styled-components"
import SearchIcon from "../assets/imgs/search.svg"
import {ReactComponent as BellIcon }from "../assets/imgs/notfication.svg"
import {ReactComponent as Logo }from "../assets/imgs/logo.svg"
import {ReactComponent as BigLogo }from "../assets/imgs/biglogo.svg"
import DropDown, { NotifDropDown } from './DropDown'
import { ReactComponent as UserIcon} from "../assets/imgs/user-icon.svg"
import { ReactComponent as SettingIcon} from "../assets/imgs/settings.svg"
import { AvatarComponent } from './PlayerProfile'
import NoUserIcon from "../assets/imgs/nouser-icon.svg";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useClickOutside } from "react-haiku"
import HashLoader from "react-spinners/HashLoader";
import { wait } from '@testing-library/user-event/dist/utils';

interface ListTypes {
  title : string,
  icon :  any,
  href: string

}

interface UserProp {
  defaultAvatar: string,
  login : string
}
interface NotifProps {
  setopen: (e : boolean) => void,
  
}
const list :ListTypes[]  =  [{title: "Profile" , icon : <UserIcon/> , href : "/profile/melkarmi"},{title: "Setting" , icon : <SettingIcon/>  ,href : "/setting"} ]

export default function Upperbar() {
  const [open, setopen] = useState(false)
  const [currentUser, setcurrentUser] = useState< UserProp>({defaultAvatar : NoUserIcon , login : ""})
  const ToggleDD = (e : any)=>{
    setopen(!open)
    e.stopPropagation();
  }
  

  useEffect(() => {
    // setcurrentUser(localStorage.getItem("user"))
    var s : string | null = localStorage.getItem('user');
    if (s)
    {
      const data : UserProp =  JSON.parse(s || '{}');
      setcurrentUser(data)
      // console.log(data)

      list[0].href = "/profile/" + data.login
    }

  
  }, [setcurrentUser])
  
  return (
    <Wrraper>
        <LogoComponent size={"small"} />
        <SearchBarComponent/>
        <RightCont>

          <NotificationComponent setopen={(e)=>setopen(e)} />
          <div  style={{position : "relative"}} onClick={(e)=>{ToggleDD(e)}}>
            <div style={{width : "40px", height :"40px"}}>
            <AvatarComponent  img={currentUser?.defaultAvatar!} />
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

interface LogoProps {
  size : string
}
export  function LogoComponent(props : LogoProps) {
    return (
      <a style={{marginLeft :"10px"}}href='/'>
        {(props.size === "small")  ? <Logo/> : <BigLogo/>}
      </a>
    )
  }

//////////////
const override: CSSProperties = {  display: "grid",  margin: "0 auto",  borderColor: "white", };

export  function SearchBarComponent() {
    // const [search, setsearch] = useState("")
    const [Users, setUsers] = useState([])
    const [open, setopen] = useState(false)
    const ref = useRef(null)
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");

    const InputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor("#ffffff");
      event.target.value.length > 0 ? setLoading(true) : setLoading(false);

      axios.get("http://localhost:8000/search/allUsers?input=" + event.target.value,  {withCredentials: true}  ).then((res)=>{

      // console.log(res.data)
      setUsers(res.data)
      res.data.length > 0 ? setColor("#0eac1b") : setColor("#ac0e0e");
  
      }).catch((err)=>{  })

      // setsearch(event.target.value)

      if (event.target.value.length > 0) {  setopen(true)   }
      else { setopen(false)  }
      
      console.log("Value = ", event.target.value)
    };

    const handleClickOutside = () => {
      setopen(false);
      wait (3000).then(() => { setLoading(false); });
    };

    useClickOutside(ref, handleClickOutside);

    return (
      <SearchBar>
        <input  onChange={InputSearchHandler} type="text" placeholder='Search ..' />
        {
          (open) ? 
            (Users.length === 0) ?            
                <UsersTable ref={ref}  > 
                  <UsersNotFound>404 Not Found</UsersNotFound>
                </UsersTable>
              : 
                <UsersTable ref={ref} style={{  height: "300px" } }> 
                  {
                    Users.map((user : any, index)=>{
                      return (
                          <UserFound to={`/profile/${user.login}`} >
                            
                            <AvatarStyle > <img  alt="" src={user.defaultAvatar} />  </AvatarStyle>
                            <LoginStyle>@{user.login}</LoginStyle>
                          </UserFound> )})
                  }
                  <p/>
                </UsersTable >
            : null
        }
        <HashLoader  className='s'  color={color} loading={loading} cssOverride={override} size={22} />
      </SearchBar>
    )
  }

const LoginStyle = styled.div`
  width: 50%;
  display: flex;
  font-size: 22px;
  left: 2%;
  position: relative;
`;
const AvatarStyle = styled.div`
  width: 15%;
  height: 90%;
  display: flex;
  position: relative;

  img {

    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-0%, -50%);
    font-size: 18px;
    width: 60%;
    height: 80%;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #61dafb;
  }
`;
const UserFound = styled(Link)`
  width: 100%;
  height: 16%;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primarybg};
  }
`;
const UsersNotFound = styled.div`

position: absolute;
display: flex;
top: 50%;
width: 100%;
height: 100px;
background-color: ${props => props.theme.colors.bg};
font-size: 29px;
text-align: center;
justify-content: center;
border-radius: 10px;
color: #813088;
`;
const UsersTable = styled.div`

  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  height: 130px;
  min-height: 200px;
  background-color:  ${props => props.theme.colors.bg};
  overflow-y: scroll;
  p {
    border: 0.5px solid white;
    width: 90%;
    margin: 15px auto;
  }
`;
const SearchBar = styled.div`
background:  ${props => props.theme.colors.bg};
border-radius: 5px;
display: flex;
align-items: flex-start;
width: 30%;
max-width: 600px;
height: 42px;
position: relative;
padding: 0px 0px 0px 49px;
  .s {
    position: absolute;
    top: 25%;
  }
  >svg{
    path{
      stroke:  ${props => props.theme.colors.seconderyText};;

    }
  }
   
  &::before{
    content: url(${SearchIcon});
    position: absolute;
    left: 10px; 
    top: 55%; 
    transform: translateY(-50%);
  }
  input{
      background-color: transparent;
      width: calc(100% - 49px);
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      color:  ${props => props.theme.colors.primaryText};;
    font-size:  ${props => props.theme.fontSize.l}; 
      &::placeholder{
    color:  ${props => props.theme.colors.seconderyText};;
    font-size: ${props => props.theme.fontSize.s};
        /* opacity: 0.6; */
      }
  }
  @media  only screen and (max-width: 768px) {
    width: 150px;
    max-width: 200px;
  }
`;
//////////////

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
