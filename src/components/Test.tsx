// import axios from 'axios'
import React from 'react'
import styled from "styled-components"
import { ReactComponent as Qr } from '../assets/imgs/QRtest.svg' // put ur qr image path here  
export default function Test() {
    // const [data, setdata] = useState(null)
    // const handlePhotoChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    //     console.log(e.target.files)
    // }
  return (
    <Cocoachraf>
        {/* <input type="file" onChange={handlePhotoChange}/> */}
        {/* <button onClick={()=>{
            axios.put("http://127.0.0.1:3030/test", 
       data, {  headers: {  
        'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',}
    }).then(
                (x)=>{
                    console.log("uploaded")
                }
            ).catch(
                (err) => {
                    console.log(err);
                  }
            )
        }}>
            Upload
        </button> */}
        <Qr/>
    </Cocoachraf>
  )
}

const Cocoachraf = styled.div`
display: flex;
align-items: center;

flex-direction: column;
    width : 400px;
    height : 400px;
    background : white;
    display: flex;
    > button {
        width : 200px;
        height : 40px;
        background:  ${props => props.theme.colors.purple};
    }

`;