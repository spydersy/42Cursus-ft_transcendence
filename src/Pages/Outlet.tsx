import axios from 'axios';
import React , {useContext , useEffect ,useState} from 'react'
import { OnlineContextSocket, SocketContext,  SocketGameContext } from '../context/Socket';
import MsgToast , {AcceptToast, AddedToast, FriendRequestToast, GameChallengeToast, MutedToast} from '../components/Toasts/MsgToast';
import {  Routes,   Route, useNavigate  } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from '../Pages/NotFound';
import Home from '../Pages/Home';
import Upperbar from '../components/Upperbar';
import Sidebar from '../components/Sidebar';
import ProtectedLayout from '../components/protected/ProtectedLayout';
import Profile from '../Pages/Profile';
import Chat from '../components/chat/Chat';
import Game from '../Pages/Game';
import {TwoFa} from '../Pages/NotFound';
import Setting from '../Pages/Setting';
import Leader from '../Pages/Leader';
import Room from '../Pages/Room';
import SignIn from './SignIn';
interface ssss {
    accepter: string,
    reciever: string,
    status: boolean
  }
  interface msgType {
    login : string,
    content : string, 
    channelId: string,
    displayName: string
  }
  
const CustomToastWithLink = (data : msgType) => (

    <div style={{width: "100%" , height : "100%"}}>
          <MsgToast data={data}/>
    </div>
  );
  
  const CustomToast = (data : string) => (
    <div  style={{width: "100%" , height : "100%"}}>
          <AddedToast data={data}/>
    </div>
  );
  
  const CustomToastMesg = (msg : string) => (
    <div style={{width: "100%" , height : "100%"}}>
          <MutedToast mesg={msg} />
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
  
export default function Outlet() {
    const socket = useContext(SocketContext)
    const onlinesSocket = useContext(OnlineContextSocket)
    const gameSocket = useContext(SocketGameContext)
    const navigate = useNavigate();
    const pageName = window.location.pathname.split("/")[1];
    // const [gametheme, setGametheme] = useState({theme :  {map :mockedItems[1], rounds : 5}, mode : "classic"})

      let joinChannels = async () => {

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
            socket.emit('joinRoom', myChannels)
          }).catch((err)=>{
          })
      }
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
      function hundleMsg (payload) {
        console.table(payload)
        if (pageName !== "chat")
        {
           const    toasty = () =>  toast(CustomToastWithLink(payload) , {
            className: "toast",
            progressClassName: "toastProgress",
            autoClose: 2000,
            hideProgressBar: true,
          })
          toasty()
        }
      }
      function handleChallenge (payload) {
      
         const    toasty = () =>  toast(CustomToastWithLinkGame(payload) , {
          // position : toast.POSITION.TOP_RIGHT,
          className: "toast",
          progressClassName: "toastProgress",
          autoClose: 5000,
          hideProgressBar: true,
          // closeOnClick: false
        })
        toasty()
    
        // CHallengeNotify()
      }
      function handleRequest (payload) {
    
        const    toasty = () => toast(CustomToastFriendReq(payload) , {
          className: "toast",
          progressClassName: "toastProgress",
          autoClose: 2000,
          hideProgressBar: true,
        })
        toasty()
      }
      async function acceptRequest (payload) {
    
        const    toasty = () =>  toast(CustomToastAcceptFriendReq(payload) , {
          className: "toast",
          progressClassName: "toastProgress",
          autoClose: 2000,
          hideProgressBar: true,
        })
        toasty()
        await joinChannels()
    
      }
      function handleevent (payload) {
         const    toasty = () =>  toast(CustomToastMesg("Please, Come OHH...Take a break !") , {
          className: "toast",
          progressClassName: "toastProgress",
          autoClose: 2000,
          hideProgressBar: true,
        })
        toasty()
      }
      function handelChallengeAccept (payload) {
        localStorage.setItem("mode","1v1")
        navigate("/game")
      }
      async function handladdedMembert (payload) {
    
          const    toasty = () =>  toast(CustomToast(payload) , {
            className: "toast",
            progressClassName: "toastProgress",
            autoClose: 2000,
            hideProgressBar: true,
          })
          toasty()
          await joinChannels()
      }
    
      function PlayerInGame (payload) {
        // localStorage.setItem("mode","1v1")
        navigate("/game/"+ payload)
      }

      useEffect(()=>{
        
        if (pageName )
        
        socket.on('msg_event', hundleMsg);
        socket.on('challeneEvent', handleChallenge);
        socket.on('recievedRequest', handleRequest)
        socket.on('acceptedReq', acceptRequest)
        socket.on('event', handleevent);
        socket.on('addedMember', handladdedMembert);
        // socket.on('BlockRequest', BlockedUser);
        gameSocket.on('challengeAccepted', handelChallengeAccept)
        gameSocket.on('PlayerInGame', PlayerInGame);



        return () => {
          socket.removeListener('msg_event', hundleMsg);
          socket.removeListener('challeneEvent', handleChallenge);
          socket.removeListener('recievedRequest', handleRequest);
          socket.removeListener('acceptedReq', acceptRequest);
          socket.removeListener('event', handleevent);
          gameSocket.removeListener('PlayerInGame', PlayerInGame);
          socket.removeListener('addedMember', handladdedMembert);
          // socket.removeListener('BlockRequest', BlockedUser);
          gameSocket.removeListener('challengeAccepted', handelChallengeAccept);
        }
        } , [])

  return (
    <Routes>
         
              <Route path="/signin" element={<SignIn />} />
              <Route path="/game" element={<Game/>} />
              <Route path="/watch/:id" element={<Game   />} />
              <Route path="/game/:id" element={<Game   />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/leaderboard" element={<Leader />} />
              <Route path="/" element={<Home  />} />
              <Route path="/profile/:id" element={<Profile  />} />
              <Route path="/2fa" element={<TwoFa />} />
              <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
