import  React, { useEffect  , useState  }  from 'react';
import styled from "styled-components"
import {theme} from './theme'
import { ThemeProvider } from 'styled-components';
import './App.css';
import Marin from "./assets/imgs/marinford.png";
import Punk from "./assets/imgs/punkhazard.png";
import Dress from "./assets/imgs/dressRosa.jpg";
import Wano from "./assets/imgs/wano.jpg";
import Fish from "./assets/imgs/fishman.jpeg";
// import { SocketContext,  SocketValue } from './context/Socket';
import {
  Routes, // instead of "Switch"
  Route,
  useNavigate
} from "react-router-dom";
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import Upperbar from './components/Upperbar';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import ProtectedLayout from './components/protected/ProtectedLayout';
import Profile from './Pages/Profile';
import Chat from './components/chat/Chat';
import Game from './Pages/Game';
import axios from 'axios';
import Setting from './Pages/Setting';
import Leader from './Pages/Leader';
import Room from './Pages/Room';
import SocketTesting from './components/testing/SocketTesting';
import Background from './components/Background';



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
  const [gametheme, setGametheme] = useState({theme :  {map :mockedItems[1], rounds : 5}, mode : "classic"})
  


  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8000/profile/me", 
    {withCredentials: true} 
  ).then((res)=>{
    // console.log(res.data)
    localStorage.setItem("user", JSON.stringify(res.data))
  }).catch((err)=>{
        console.log(err)
        navigate('/signin')
    })
  }, [])
  
  return (
    <div className="App">
       

       <ThemeProvider theme={theme}>
        {/* <Background/> */}
        <Main>
          <ProtectedLayout body={<Upperbar />} />
          <ProtectedLayout body={ <Sidebar/>} />
          <Cont  >
            {/* <SocketContext.Provider value={SocketValue}> */}
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/game" element={<Game theme={gametheme}  />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/testing" element={<Test />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/leaderboard" element={<Leader />} />
              <Route path="/" element={<Home settheme={(e: any)=> setGametheme(e)} />} />
              <Route path="/profile/:id" element={<Profile  />} />
              <Route path="/socketTest" element={<SocketTesting />} />
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
