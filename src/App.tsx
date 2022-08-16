import  React, { useEffect , useRef , useState  }  from 'react';
import styled from "styled-components"

import './App.css';
import Pong from './components/Pong';

function App() {
  const [start, setstart] = useState(false)
  return (
    <div className="App">
       
        {
          start ? 
          <Pong/>
          :
        <StartGButton onClick={()=>{
          console.log("start")
          setstart(true)
          }} >
      START
    </StartGButton>

        }
    </div>
  );
}

export default App;
const StartGButton = styled.button`

   width: 150px;
   height: 80px;
  background-color: blue;
  border-radius: 20px;
    z-index: 2;
  color: white;
`;
