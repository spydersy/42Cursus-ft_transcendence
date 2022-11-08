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
import { OnlineContextSocket, SocketContext,  SocketGameContext,  SocketValue } from './context/Socket';
import {
  Routes, // instead of "Switch"
  Route,
  useNavigate
} from "react-router-dom";
import SignIn from './Pages/SignIn';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Upperbar from './components/Upperbar';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import ProtectedLayout from './components/protected/ProtectedLayout';
import Profile from './Pages/Profile';
import Chat from './components/chat/Chat';
import Game from './Pages/Game';
import {TwoFa} from './Pages/NotFound';
import axios from 'axios';
import Setting from './Pages/Setting';
import Leader from './Pages/Leader';
import Room from './Pages/Room';
import SocketTesting from './components/testing/SocketTesting';
import ChatTesting from './components/testing/ChatTesting';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MsgToast , {AcceptToast, FriendRequestToast, GameChallengeToast, CancelToast, MutedToast} from './components/Toasts/MsgToast';
import { ReactComponent as CloseIcon } from "./assets/imgs/close-icon.svg";
import { UserContext } from './context/UserContext';


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


const CustomToastMutedUser = () => (
  <div style={{width: "100%" , height : "100%"}}>
        <MutedToast />
  </div>
);
const CustomToastAcceptFriendReq = (data : ssss) => (
  <div style={{width: "100%" , height : "100%"}}>
        <AcceptToast data={data}/>
  </div>
);
const CustomToastFriendReq = (data : any) => (
  <div style={{width: "100%" , height : "100%"}}>
        <FriendRequestToast data={data}/>
  </div>
);
const CustomToastWithLinkGame = (data : any) => (
  <div style={{width: "100%" , height : "100%"}}>
        <GameChallengeToast data={data}/>
  </div>
);

function App() {
  const [gametheme, setGametheme] = useState({theme :  {map :mockedItems[1], rounds : 5}, mode : "classic"})
  
  const socket = useContext(SocketContext)
  const onlinesSocket = useContext(OnlineContextSocket)
  const gameSocket = useContext(SocketGameContext)
  const User = useContext(UserContext)
  const [toastData, settoastData] = useState<msgType>()
  const [toastDataChallenge, settoastDataChallenge] = useState()
  const pageName = window.location.pathname.split("/")[1];
  
  // const [toastData, settoastData] = useState()
  function hundleMsg (payload) {
    if (pageName != "chat")
    {
      console.table(payload)
      
      toast(CustomToastWithLink(payload) , {
        className: "toast",
        progressClassName: "toastProgress",
        autoClose: 2000,
        
        hideProgressBar: true,
      })
    }
  }
  function handleChallenge (payload) {
    console.log(payload)
    
    toast(CustomToastWithLinkGame(payload) , {
      // position : toast.POSITION.TOP_RIGHT,
      className: "toast",
      progressClassName: "toastProgress",
      autoClose: 2000,
      hideProgressBar: true,
      // closeOnClick: false
    })
    // CHallengeNotify()
  }
  function handleRequest (payload) {
    // console.log('__sahbiiiiii____:'+payload)
    toast(CustomToastFriendReq(payload) , {
      className: "toast",
      progressClassName: "toastProgress",
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
  async function acceptRequest (payload) {
    console.log('acceptii a sahbi:',payload)
    await joinChannels()
    toast(CustomToastAcceptFriendReq(payload) , {
      className: "toast",
      progressClassName: "toastProgress",
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
  function handleevent (payload) {
    toast(CustomToastMutedUser() , {
      className: "toast",
      progressClassName: "toastProgress",
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
  function handelChallengeAccept (payload) {
    localStorage.setItem("mode","1v1")
    navigate("/game/")
    
  }
  useEffect(()=>{
    // sub
    
    socket.on('msg_event', hundleMsg);
    socket.on('challeneEvent', handleChallenge);
    socket.on('recievedRequest', handleRequest)
    socket.on('acceptedReq', acceptRequest)
    socket.on('event', handleevent);
    gameSocket.on('challengeAccepted', handelChallengeAccept)
    return () => {
      socket.removeListener('msg_event', hundleMsg);
      socket.removeListener('challeneEvent', handleChallenge);
      socket.removeListener('recievedRequest', handleRequest);
      socket.removeListener('acceptedReq', acceptRequest);
      socket.removeListener('event', handleevent);

      gameSocket.removeListener('challengeAccepted', handelChallengeAccept);
    }
    })
  
  const    CHallengeNotify = () => toast.success("You accepted " +  toastDataChallenge + " Friend Request", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  let joinChannels = async () => {
    let userLogin : string;
    await axios.get( process.env.REACT_APP_BACKEND_URL+ "/profile/me", 
    {withCredentials: true} 
    ).then((res)=>{
      userLogin = res.data.login
    }).catch((err)=>{
      console.log(err)
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
      socket.emit('joinRoom', myChannels)
    }).catch((err)=>{
      console.log(err)
    })
    }
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
    
  useEffect(() => {
      // if ()
      User.then((user : UserProp | string)=>{
        console.log(user)
        if (user === "{}")
        {
          onlinesSocket.close()
          navigate("/signin")
        }
      })
      
      axios.get(process.env.REACT_APP_BACKEND_URL +"/profile/me", 
      {withCredentials: true} 
      ).then((res)=>{
        
        // console.log(res.data)
        localStorage.setItem("user", JSON.stringify(User))
        localStorage.setItem("mode","classic")
        joinChannels()
        socket.emit("AddOnlineUser")
        
    }).catch((err)=>{
          // console.log(err.message)
          // const pageName = window.location.pathname.split("/")[1];

      })

  }, [])
  
  return (
    <div className="App">
       
       <ThemeProvider theme={theme}>
     
        <Main>
          <ProtectedLayout body={<Upperbar />} />
          <ProtectedLayout body={ <Sidebar/>} />
          <Cont  >
          <ToastContainer  className={"toast_container"}/>
            {/* <SocketContext.Provider value={SocketValue}> */}
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/game" element={<Game theme={gametheme}  />} />
              <Route path="/game/watch/:id" element={<Game theme={gametheme}  />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/testing" element={<SocketTesting />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/leaderboard" element={<Leader />} />
              <Route path="/" element={<Home settheme={(e: any)=> setGametheme(e)} />} />
              <Route path="/profile/:id" element={<Profile  />} />
              <Route path="/socketTest" element={<SocketTesting />} />
              <Route path="/2fa" element={<TwoFa />} />
              <Route path="*" element={<NotFound />} />
            </Routes>


            {/* </SocketContext.Provider> */}
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
    width: calc(100% - 70px);
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
