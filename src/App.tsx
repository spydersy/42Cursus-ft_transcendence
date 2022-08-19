import  React, { useEffect , useRef , useState  }  from 'react';
import styled from "styled-components"

import './App.css';
import Pong from './components/Pong';

function App() {
  const [start, setstart] = useState(false)
  const [name, setname] = useState("")
  const inputRef : any= useRef<any>(null);

  return (
    <div className="App">
       
        {
          start ? 
          <Pong name={name}/>
          :
          
<div>        <Input ref={inputRef} type="text" placeholder="Enter your name .."
          
    />
        <StartGButton onClick={()=>{
          console.log("start")
          var namee : string = inputRef.current.value
          if (namee)
          {
            setname(namee)
            setstart(true)
          }
          }} >
      START
    </StartGButton> 
    </div>

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
const Input = styled.input`

   width: 150px;
   height: 40px;
  /* background-color: blue; */
  border-radius: 20px;
    z-index: 2;
  color: black;
`;
