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
function App() {
  const [start, setstart] = useState(false)
  const [name, setname] = useState("")
  const inputRef : any= useRef<any>(null);

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <main>
          <ProtectedLayout body={<Upperbar/>} />
          <ProtectedLayout body={ <Sidebar/>} />
        {/* <Upperbar/> */}
        {/* <Sidebar/> */}
        <Cont >
    
          <BrowserRouter>
          <Routes>
    {/* <div>
      sss
    </div> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/game" element={<Pong name="mohamed" />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>

</Cont>

        </main>
       </ThemeProvider>
    </div>
  );
}

const Cont = styled.div`
position: absolute;

  width: calc(100% - 250px);
  height: calc(100% - 70px);
  top: 70px;
  left: 250px;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  /* margin-right: auto; */
  /* margin-left: auto; */

`;
export default App;
