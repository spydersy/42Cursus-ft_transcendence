import  React, { useEffect , useRef , useState  }  from 'react';
import styled from "styled-components"
import {theme} from './theme'
import { ThemeProvider } from 'styled-components';
import Cookies from 'universal-cookie';
import './App.css';
import Pong from './components/Pong';
import Marin from "./assets/imgs/marinford.png";
import Punk from "./assets/imgs/punkhazard.png";
import Dress from "./assets/imgs/dressRosa.jpg";
import Wano from "./assets/imgs/wano.jpg";
import Fish from "./assets/imgs/fishman.jpeg";

import {
  BrowserRouter,
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
import Chat from './Pages/Chat';
import Game from './Pages/Game';
import axios from 'axios';
import Setting from './Pages/Setting';
import Leader from './Pages/Leader';
import Room from './Pages/Room';

const mockedItems : any = [{
  title: "MarinFord",
  banner :Marin,
},
{
  title: "Punk Hazard",
  banner :Punk 
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
  const [start, setstart] = useState(false)
  const [gametheme, setGametheme] = useState({map :mockedItems[1], rounds : 5})
  const [logedIn, setlogedIn] = useState(false)
  const [name, setname] = useState("")
  const inputRef : any= useRef<any>(null);
  
  
  const navigate = useNavigate();
  useEffect(() => {
  //   const cookies = new Cookies();
  //   // const coc = Cookieequiredy
  //   // axios.defaults.withCredentials = true;
  // //  console.log( Cookies.set)
  //   axios.get("http://localhost:3000/profile", 
  //   {withCredentials: true} 
  // ).then((res)=>{
  //   console.log(res.data)
  //   localStorage.setItem("user", JSON.stringify(res.data))
  // }).catch((err)=>{
  //       console.log(err)
  //       navigate('/signin')
  //       // history.pushState("/signin");
  //   })
    console.log("hey")
  }, [])
  
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <Main>
          <ProtectedLayout body={<Upperbar />} />
          <Cont >
            <ProtectedLayout body={ <Sidebar/>} />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/game" element={<Game theme={gametheme}  />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/testing" element={<Test />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/leaderboard" element={<Leader />} />
              <Route path="/" element={<Home settheme={(e: any)=> setGametheme(e)} />} />
              <Route path="/profile/id" element={<Profile  />} />
            </Routes>
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
`;
const Main = styled.main`
  
  &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent; 
    } 

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
`;
export default App;
