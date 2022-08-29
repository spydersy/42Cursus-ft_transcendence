import  React, { useEffect , useRef , useState  }  from 'react';
import styled from "styled-components"
import {theme} from './theme'
import { ThemeProvider } from 'styled-components';
import './App.css';
import Pong from './components/Pong';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import Upperbar from './components/Upperbar';
import Sidebar from './components/Sidebar';
import ProtectedLayout from './components/protected/ProtectedLayout';
import Chat from './Pages/Chat';
// import Profile from './Pages/Profile';
function App() {
  const [start, setstart] = useState(false)
  const [name, setname] = useState("")
  const inputRef : any= useRef<any>(null);

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
            <Route path="/game" element={<Pong name="mohamed" />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/profile/id" element={<Profile />} /> */}
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
