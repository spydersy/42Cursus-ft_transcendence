import React, {useState , useEffect, useRef, CSSProperties, useContext} from 'react'
import styled , {css} from "styled-components"
import SearchIcon from "../assets/imgs/search.svg"
import {ReactComponent as BellIcon }from "../assets/imgs/notfication.svg"
import {ReactComponent as Logo }from "../assets/imgs/logo.svg"
import {ReactComponent as BigLogo }from "../assets/imgs/biglogo.svg"
import DropDown, { } from './DropDown'
import { ReactComponent as UserIcon} from "../assets/imgs/user-icon.svg"
import { ReactComponent as SettingIcon} from "../assets/imgs/settings.svg"
import { AvatarComponent } from './PlayerProfile'
import NoUserIcon from "../assets/imgs/nouser-icon.svg";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useClickOutside } from "react-haiku"
import HashLoader from "react-spinners/HashLoader";
import { wait } from '@testing-library/user-event/dist/utils';
import EmptyComponent from './PlayerrEmptyComp';
import { UserContext } from '../context/UserContext'
import { FriendRequest } from './Notifications/NotifComponents';
import Mamali from "../assets/imgs/avatar/mamali.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import { useDetectClickOutside } from 'react-detect-click-outside';
// import { UserContext } from './context/UserContext';
import { OnlineContextSocket, SocketContext,  SocketGameContext,  SocketValue } from '../context/Socket';
import MsgToast , {AcceptToast, FriendRequestToast, GameChallengeToast} from '../components/Toasts/MsgToast';

///////

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
const list :ListTypes[]  =  [{title: "Profile" , icon : <UserIcon/> , href : ""},{title: "Setting" , icon : <SettingIcon/>  ,href : "/setting"} ]
export default function Upperbar() {
  const [open, setopen] = useState(false)
  const [currentUser, setcurrentUser] = useState< UserProp>({defaultAvatar : NoUserIcon , login : ""})
  const ToggleDD = (e : any)=>{
    setopen(!open)
    e.stopPropagation();
  }
  const User = useContext(UserContext)

  useEffect(() => {
    console.log(User)
    // setcurrentUser(localStorage.getItem("user"))
    User.then((user : UserProp | "{}" )=>{
    //   console.log(user.defaultAvatar)
    if (user !== "{}"){

      setcurrentUser(user)
      list[0].href = "/profile/" + user.login
    }

    })

      // console.log(data)

  }, [])
  useEffect(() => {

  }, [currentUser])



  return (
    <Wrraper>
        <LogoComponent size={"small"} />
        <SearchBarComponent/>
        <RightCont>
            <NotificationComponent setopen={(e)=>setopen(e)} />
            <div  style={{position : "relative"}} onClick={(e)=>{ToggleDD(e)}}>
              <div style={{width : "40px", height :"40px"}}>
              <AvatarComponent  img={currentUser?.defaultAvatar} />
              </div>
              {
                open && <DropDown closeDropdown={ ()=>{
        
                  console.log(open)
                  // setopen(false)
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
      <Link style={{marginLeft :"10px"}}to='/'>
        {(props.size === "small")  ? <Logo/> : <BigLogo/>}
      </Link>
    )
}

//////////////
const override: CSSProperties = {  display: "grid",  margin: "0 auto",  borderColor: "white", };
export  function SearchBarComponent() {
    const [Users, setUsers] = useState([])
    const [open, setopen] = useState(false)
    const ref = useRef(null)
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");

    const InputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor("#ffffff");
      event.target.value.length > 0 ? setLoading(true) : setLoading(false);

      axios.get( process.env.REACT_APP_BACKEND_URL+  "/search/allUsers?input=" + event.target.value,  {withCredentials: true}  ).then((res)=>{

      // console.log(res.data)
      setUsers(res.data)
      res.data.length > 0 ? setColor("#0eac1b") : setColor("#ac0e0e");
  
      }).catch((err)=>{  })

      // setsearch(event.target.value)

      if (event.target.value.length > 0) {  setopen(true)   }
      else { setopen(false)  }
      
      // console.log("Value = ", event.target.value)
    };

    const handleClickOutside = () => {
      setopen(false);
      wait (3000).then(() => { setLoading(false); });
    };

    useClickOutside(ref, handleClickOutside);

    return (
      <SearchBar>
        <input  onChange={InputSearchHandler} type="text" placeholder='Search users, rooms..' />
        {
          (open) ? 
            (Users.length === 0) ?            
                <UsersTable ref={ref}  > 
                  <EmptyComponent text="WALO MAKAYNSH" />
                </UsersTable>
              : 
                <UsersTable ref={ref} style={{  height: "300px" } }> 
                  {
                    Users.map((user : any, index)=>{
                      return (
                          <UserFound href={"/profile/" + user.login} >
                            
                            <AvatarStyle >
                              <AvatarComponent img={user.defaultAvatar} />
                               {/* <img  alt="avatar" src={user.defaultAvatar} />  */}
                                </AvatarStyle>
                            <div>
                              <NameStyle>{user.displayName}</NameStyle>
                              <LoginStyle>@{user.login}</LoginStyle>
                            </div>
                          </UserFound> )})
                  }
                </UsersTable >
            
            : null
        }
        <HashLoader  className='s'  color={color} loading={loading} cssOverride={override} size={22} />
      </SearchBar>
    )
}
const NameStyle = styled.div`
  width: 100%;
  display: flex;
  font-size: 20px;
  font-weight: 600;
  position: relative;
`;
const LoginStyle = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
  position: relative;
`;
const AvatarStyle = styled.div`
  /* background-color: #389c71; */
  display: flex;
  /* position: relative; */
  width: 50px;
  height: 50px;
  margin-left: 30px;

`;
const UserFound = styled.a`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-family: "Poppoins" , sans-serif;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primarybg};
  }
`;
const UsersTable = styled.div`

  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  height: 300px;
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
border: 2px solid ${props => props.theme.colors.purple};
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
      stroke:  ${props => props.theme.colors.purple};;

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

interface ssss {
  accepter: string,
  sender: string,
  status: boolean
}
interface msgType {
  channelId : string,
  content : string, 
  date : string, 
  displayName : string, 
  id : number,
  senderId : number
}

const CustomToastWithLink = (data : msgType) => (
  <div style={{width: "100%" , height : "100%"}}>
        <MsgToast data={data}/>
  </div>
);

export  function NotificationComponent(props: NotifProps) {
    
    const [openNotif, setopenNotif] = useState(false)
    const [isNotif, setisNotif] = useState(false)
    const socket = useContext(SocketContext)
    // const onlinesSocket = useContext(OnlineContextSocket)
    // const gameSocket = useContext(SocketGameContext)
    // const User = useContext(UserContext)
    // const [toastData, settoastData] = useState<msgType>()
    // const [toastDataChallenge, settoastDataChallenge] = useState()
    const pageName = window.location.pathname.split("/")[1];
    var [list, setlist] = useState<NotifDataCard[]>([
      // {sender:"Mehdi",img:"", msg:"Send you Friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you Game request", type:"request"},
      // {sender:"Reda",img:"", msg:"oui", type:"msg"},
      // {sender:"Reda",img:"", msg:"cv", type:"msg"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Mehdi",img:"", msg:"Send you friend request", type:"request"},
      // {sender:"Reda",img:"", msg:"MaHello", type:"msg"}
    ])

    const refo = useRef(null)
    function hundleMsg (payload : any) {
      setisNotif(true)
      if (pageName != "chat")
      {
        console.table(">__NOTIF__HANDLE__MSG__", payload)
        list.push({sender:payload.displayName, img:payload.img, msg:payload.content, type:payload.type})
      }
    }

    // function handleChallenge (payload) {
    //   console.log(payload)
      
    //   toast(CustomToastWithLinkGame(payload) , {
    //     // position : toast.POSITION.TOP_RIGHT,
    //     className: "toast",
    //     progressClassName: "toastProgress",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     // closeOnClick: false
    //   })
    //   // CHallengeNotify()
    // }
    // function handleRequest (payload) {
    //   // console.log('__sahbiiiiii____:'+payload)
    //   toast(CustomToastFriendReq(payload) , {
    //     className: "toast",
    //     progressClassName: "toastProgress",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //   })
    // }
    // function acceptRequest (payload) {
    //   console.log('acceptii a sahbi:',payload)
      
    //   toast(CustomToastAcceptFriendReq(payload) , {
    //     className: "toast",
    //     progressClassName: "toastProgress",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //   })
    // }
    // function handelChallengeAccept (payload) {
    //   localStorage.setItem("mode","1v1")
    //   navigate("/game/")
      
    // }

    const handleClickOutside = () => {
      setopenNotif(false);
      // wait (3000).then(() => { setLoading(false); });
    };

    useClickOutside(refo, handleClickOutside);

  useEffect(()=>{
    // sub
    
    socket.on('msg_event', hundleMsg);
    // socket.on('challeneEvent', handleChallenge);
    // socket.on('recievedRequest', handleRequest)
    // socket.on('acceptedReq', acceptRequest)
    // gameSocket.on('challengeAccepted', handelChallengeAccept)
      return () => {
        socket.removeListener('msg_event', hundleMsg);
        // socket.removeListener('challeneEvent', handleChallenge);
        // socket.removeListener('recievedRequest', handleRequest);
        // socket.removeListener('acceptedReq', acceptRequest);
        // gameSocket.removeListener('challengeAccepted', handelChallengeAccept);
      }
    })

  return (

    <Notification ref={refo} onClick={(e)=>{ console.log(openNotif)
      setopenNotif(true) 
      e.stopPropagation()
      props.setopen(false)
      }} new={isNotif}  >
      
      <BellIcon />
      {
        openNotif &&   <NotifDropDown closeDropdown={ ()=>{ console.log(openNotif)
          setopenNotif(false)
        }} open={openNotif} 
        style={{bottom: "-25px" , right: '0'}}
        list={list}
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

///////

interface NotifDataCard {
  sender : string,
  img: string,  
  msg : string,
  type : string
  // check: check(), 
  // clear: clear()
 }

interface NotifDropDownProps {
  closeDropdown: () => void,
  open : boolean
  style :  React.CSSProperties
  list : NotifDataCard[]
}

export  function NotifDropDown(props : NotifDropDownProps) {

  const refs = useRef<HTMLDivElement>(null)

  // const refs = useDetectClickOutside({ onTriggered: props.closeDropdown });
  const socket = useContext(SocketContext)
  var [list, setlist] = useState<NotifDataCard[]>(props.list)
  const [isNotif, setisNotif] = useState(true)


  const ClearNotif = () => {
    console.log("______clearALLNotifList_____")
    list.splice(0, list.length)
    setlist([])
    props.list = []
  }

  const removeNotif = (index : number) => {
    console.log("______removeNotif_____", index)
    console.log("______removeNotif__list___", list)
    list.splice(index, 1)
    setlist([...list])
    props.list = list
  }

  // socket.on('event', (payload)=>{
  //     console.table("___TABLE__", payload)
  // });

return (<>
    
    {props.open && 
      <NotifD style={props.style}  ref={refs} new={isNotif}  >
            {
                <Head>
                  <div>Notifications</div>
                  <div  className="clearo" onClick={ClearNotif} >Clear all</div>
                </Head>
           }  

            <Notif>
              {list.map((item: any, index: any) => (
                <FriendRequest type={item.type} name={item.sender} img={Mamali} msg={item.msg} check={()=>{}}  clear={(index)=>{removeNotif(index)}} />
              ))}
              {/* <FriendRequest name="moahmed" img={Mamali} msg={"Send a Friend request ."} check={()=>{}}  clear={()=>{}} /> */}
              {/* <FriendRequest name="moahmed" img={Mamali} msg={"Is challenging you."} check={()=>{}}  clear={()=>{}} /> */}
            </Notif>

      </NotifD>}
</>
)
}
const NotifD = styled.div<SearchProps>`
position: absolute;
min-width: 400px;
width: 400px;
bottom: -25px;
transform: translateY(100%);
min-height: 300px;
max-height: 600px;
border-radius: 8px;
background-color: ${props => props.theme.colors.bg};;

border:2px solid ${props => props.theme.colors.seconderyText};;
/* padding: 0 15px; */
/* lef:t: ; */
right: 0;
box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
display: flex;
align-items: center;
flex-direction: column;
overflow: hidden;
min-width: 120px;
`;
const Head = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.primaryText};
  border-bottom: 0.5px solid ${props => props.theme.colors.seconderyText};
  >div{
    font-weight: 600;
    font-size: 20px;
  }
  .clearo{
    opacity: 0.7;
    font-size: 18px;
    cursor: pointer;
    &:hover{
      opacity: 1;
      color: #1065af;
    }

  }
`;
const Notif = styled.div`
  width: 100%;
  flex: 1;
  /* height: 100%; */
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.primaryText};
  /* border-bottom: 0.5px solid   #c8d0d97b; */
  border-radius: 10px;
  margin: 10px 0;
  overflow-y: scroll;

  /* background-color: ${props => props.theme.colors.purple};; */
`;


