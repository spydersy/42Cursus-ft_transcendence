import  React, { useEffect , useRef , useState  }  from 'react';
import styled from "styled-components"
import {theme} from './theme'
import { ThemeProvider } from 'styled-components';
import Cookies from 'universal-cookie';
import './App.css';
import Pong from './components/Pong';
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


function App() {
  const [start, setstart] = useState(false)
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
  }, [])
  
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <Main>
          <ProtectedLayout body={<Upperbar/>} />
          <Cont >
            <ProtectedLayout body={ <Sidebar/>} />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/game" element={<Game />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/testing" element={<Test />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile/id" element={<Profile />} />
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
