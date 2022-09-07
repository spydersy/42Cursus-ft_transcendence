import axios from 'axios'
import React , {useState}from 'react'
import styled from "styled-components"

export default function Test() {
    const [data, setdata] = useState(null)
    const handlePhotoChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.files)
    }
  return (
    <Cocoachraf>
        <input type="file" onChange={handlePhotoChange}/>
        <button onClick={()=>{
            axios.put("127.0.0.1:3030/updateUser/id", data, { withCredentials: true }).then(
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
        </button>
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