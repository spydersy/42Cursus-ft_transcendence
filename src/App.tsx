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
import Upperbar from './components/Upperbar';
function App() {
  const [start, setstart] = useState(false)
  const [name, setname] = useState("")
  const inputRef : any= useRef<any>(null);

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
       <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/game" element={<Pong name="mohamed" />} />
        <Route path="/" element={<Upperbar />} />
      </Routes>
    </BrowserRouter>
       </ThemeProvider>
    </div>
  );
}

export default App;
const StartGButton = styled.button`

   width: 150px;
   height: 80px;
  background-color:  ${props => props.theme.colors.primaryText};
  border-radius: 20px;
    z-index: 2;
  color: white;
`;
const Input = styled.input`

   width: 150px;
   height: 40px;
  /* background-color: blue; */
  border-radius: 20px;
    z-index: 2;
  color: black;
`;
