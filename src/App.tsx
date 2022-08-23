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
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
       </ThemeProvider>
    </div>
  );
}

export default App;
