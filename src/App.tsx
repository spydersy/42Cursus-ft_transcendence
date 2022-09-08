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
  // const navigate = useNavigate();


  useEffect(() => {
    const cookies = new Cookies();
    // const coc = Cookieequiredy
    // axios.defaults.withCredentials = true;
  //  console.log( Cookies.set)
    axios.get("http://127.0.0.1:3000/profile", 
    
    {
      
    // withCredentials: true,
    headers: {
      'Authorization': cookies.get('Authorization'),
      // 'Access-Control-Allow-Origin' : 'http://127.0.0.1:3001'
    }
  
    
  
  } 
  ).then((res)=>{
    console.log(res.data)}
    ).catch((err)=>{
        console.log(err)
        // navigate('/signin')
        // history.pushState("/signin");

    })
  }, [])
  
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <main>
          <ProtectedLayout body={<Upperbar/>} />
        {/* <Upperbar/> */}
        {/* <Sidebar/> */}
        <Cont >
          <ProtectedLayout body={ <Sidebar/>} />
    
          <BrowserRouter>
          <Routes>
    {/* <div>
      sss
    </div> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/game" element={<Game />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/testing" element={<Test />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile/id" element={<Profile />} />
          </Routes>
        </BrowserRouter>

</Cont>

        </main>
       </ThemeProvider>
    </div>
  );
}

const Cont = styled.div`
height: calc(100% - 70px);
/* position: absolute;

  width: calc(100% - 250px);
  top: 70px;
  left: 250px;
  padding-right: 1.5rem;
  padding-left: 1.5rem; */
  /* margin-right: auto; */
  /* margin-left: auto; */
  display: flex;
  flex-direction: row;
`;
export default App;
