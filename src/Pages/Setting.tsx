import React, {useEffect, useState, FC, InputHTMLAttributes} from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from './Home';
import Img from "../assets/imgs/avatar/a1.png";
import {ReactComponent as Edit} from "../assets/imgs/edit.svg";
import { AvatarComponent } from '../components/PlayerProfile';
import axios from 'axios';
import { map } from 'rxjs';
import InputComponent from '../components/Input';
import { Button } from './SignIn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

    
export default function Setting() {
    const [query, setQuery] = useState('');
    const [img, setImg] = useState('');

    const [data, setdata] = useState({login : "", defaultAvatar : "", displayName : "", twoFactorAuth : false, email : ""})
    const uploadFile = ()=>{
        var e = document.getElementById("fileInput")
        e?.click()
        
    }
    useEffect(() => {

    axios.get("http://localhost:8000/profile/me",   {withCredentials: true} 
    ).then((res)=>{
        console.log(res.data)
        setdata(res.data)
        setImg(res.data.defaultAvatar)
    }).catch((err)=>{
        })


        var e = document.getElementById("fileInput")
        e?.addEventListener("change", (c :any)=>{
            console.log(c.target.files[0])
            setImg(URL.createObjectURL(c.target.files[0]))
            var  bodyFormData = new FormData();
            bodyFormData.append('avatar', c.target.files[0]);
                axios.post("http://localhost:8000/profile/updateAvatar", bodyFormData, {withCredentials: true}).then((res)=>{
                    console.log(res)
                }   ).catch((err)=>{ 
                    console.log(err)
                }   )
        })
       
    }, [])

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setdata({...data, displayName : enteredName})
        setQuery(enteredName);
      };



  return (
  
    <SettingsStyle  className='container' style={{marginTop: "100px"}} >
      <HeadComponent title="Setting" />
      <Avatar onClick={uploadFile}>
        <div className='edit'>
            <Edit />
        </div>
        <AvatarComponent  img={img}  />
        <input id="fileInput" type="file" hidden />

    </Avatar>
    <Line></Line>
    
    <Row>
        {/* <div className="col"> 
            Login : 
            <input value={'@' + data.login} />
        </div> */}
        
        {/* <div className="col1">  */}
            {/* DisplayName : 
            <input value={query}   onChange={inputHandler} />
            <button>  Submit </button> */}
            <InputComponent onChange={(e)=>{inputHandler(e)}} value={data.displayName} type='text' lable='Display Name' />
            <InputComponent disabled={true} onChange={(e)=>{inputHandler(e)}} value={data.login} type='text' lable='Login' />
            <Button text="save" type='primary' />
        {/* </div> */}

    </Row>



    </SettingsStyle>
  )
}

const SettingsStyle = styled.div`
    height: 500px;
    background-color: ${props => props.theme.colors.seconderybg};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;
const Avatar = styled.div`
   width: 200px;
   height: 200px;
   background-color: ${props => props.theme.colors.bg};
    position: relative;
    border-radius: 50%;
    border: 0.5px solid ${props => props.theme.colors.primaryText};
    overflow: hidden;
    cursor: pointer;
    .edit{
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        background-color: #0000004a;
        align-items: center;
        justify-content: center;
        >svg{
        width: 50px;
        height: 50px;
            >path{
                stroke:  ${props => props.theme.colors.seconderyText};
        }
        }
    }
    &:hover{
        .edit{
        display: flex;

    }
    }
`;
const EditStyle = styled.div`
position: absolute;
    width: 30px;
            height: 30px;
        background-color: ${props => props.theme.colors.bg};

        bottom: 11px;
        right: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center ;
        cursor: pointer;
            /* background-color: ; */
        >svg{
            width: 20px;
            height: 20px;
      
            /* height: ; */
            path {
                stroke: ${props => props.theme.colors.seconderyText};;
            }
        }
`;

const Line = styled.div`
margin: 20px 0;
    width: 100%;
            height: 1px;
            opacity: 0.5;
        background-color: ${props => props.theme.colors.seconderyText};

       
    
`;

const Row = styled.div`
width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
   
`;



