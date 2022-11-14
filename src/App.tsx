// @ts-nocheck
import  React, { useEffect  , useState , useContext  }  from 'react';
import styled , {ThemeProvider} from "styled-components"
import {theme} from './theme'
import './App.css';
import Marin from "./assets/imgs/marinford.png";
import Punk from "./assets/imgs/punkhazard.png";
import Dress from "./assets/imgs/dressRosa.jpg";
import Wano from "./assets/imgs/wano.jpg";
import Fish from "./assets/imgs/fishman.jpeg";
import {  Routes,   Route, useNavigate  } from "react-router-dom";
import SignIn from './Pages/SignIn';
// import NotFound from './Pages/NotFound';
// import Home from './Pages/Home';
import Upperbar from './components/Upperbar';
import Sidebar from './components/Sidebar';
import ProtectedLayout from './components/protected/ProtectedLayout';
// import Profile from './Pages/Profile';
// import Chat from './components/chat/Chat';
// import Game from './Pages/Game';
import {TwoFa} from './Pages/NotFound';
import axios from 'axios';
// import Setting from './Pages/Setting';
// import Leader from './Pages/Leader';
// import Room from './Pages/Room';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import io, { Socket } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import Outlet from './Pages/Outlet';
import { OnlineContextSocket, SocketGameContext } from './context/Socket';

const mockedItems : any = [{
  title: "MarinFord",
  banner : Marin,
},
{
  title: "Punk Hazard",
  banner : Punk 
},
{
  title: "Dressrosa",
  banner :Dress 
},
{
  title: "Wano",
  banner :Wano 
},
{
  title: "Fishman Island",
  banner :Fish 
}]


function App() {
  const gameSocket = useContext(SocketGameContext)
  const onlineSocket = useContext(OnlineContextSocket)
  const User = useContext(UserContext)
  const pageName = window.location.pathname.split("/")[1];

    interface UserProp {
      id: string,
      defaultAvatar: string,
      status: string,
      login : string
      displayName : string
      relation : string
      dmChannel : string
      nbFriends? : string
      wins : number
      losses : number
      lastModification: string
      Achievements: boolean[]
  } 
  const navigate = useNavigate();
  let leaveChunnels = async () => {

    let userLogin : string;
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/profile/me", 
    {withCredentials: true} 
    ).then((res)=>{
      userLogin = res.data.login
    }).catch((err)=>{
    })
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
    {withCredentials: true} 
    ).then((res)=>{
      var myChannels : Array<string> = [];
      for (let index = 0; index < res.data.length; index++) {
        myChannels.push(res.data[index].channelId);
      }
      myChannels.push(userLogin);
      // mychannels.pushback(userlogin)
      socket.emit('leave', myChannels)
    }).catch((err)=>{
    })
    }
  useEffect(() => {
      // if ()
      User.then(async (user : UserProp | string)=>{

        if (user === "{}" && pageName !== "2fa")
        {
          await leaveChunnels()
          onlineSocket.emit("logout" ,  user.login)
          navigate("/signin")
        }
        else{
  
            gameSocket.emit('gameConnected', {login : user.login});

        }
      })
      
      axios.get(process.env.REACT_APP_BACKEND_URL +"/profile/me", 
      {withCredentials: true} 
      ).then(async(res)=>{
        
        localStorage.setItem("mode","classic")
        await joinChannels()
        socket.emit("AddOnlineUser")
        
    }).catch((err)=>{

      })
  }, [window.location.pathname])
  
  return (
    <div className="App">
       
       <ThemeProvider theme={theme}>
     
        <Main>
          <ProtectedLayout body={<Upperbar />} />
          <ProtectedLayout body={ <Sidebar/>} />
          <Cont  >
          <ToastContainer  className={"toast_container"}/>
            <Outlet/>
           

          </Cont>
        </Main>
       </ThemeProvider>

    </div>
  );
}










const Cont = styled.div`
  height: calc(100% - 70px);
  display: flex;
  flex-direction: row;
  flex: 1;
  @media  only screen and (max-width: 1270px) {
    width: calc(100% - 80px);
  }
  @media  only screen and (max-width: 560) {
    width: 100%;
  }
  .toast_container{
    width: auto;
  }
  .toast{
    width: 400px;
    background-color: ${props => props.theme.colors.bg};;
    border: 3px solid ${props => props.theme.colors.purple};
  }
  .toastProgress{

    background-color: ${props => props.theme.colors.secondaryText} !important;;

  }
`;

const Main = styled.main`


display: flex;
  flex-direction: row;
  .vr{
    width: 1px;
    height: 70%;
    background-color: ${props => props.theme.colors.seconderyText};
    opacity: 0.5;
  }
  &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent; 
    } 

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 

    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
    div{
      &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent; 
    } 

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 

    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
    }
`;

export default App;
