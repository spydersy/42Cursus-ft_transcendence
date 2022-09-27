import React, {useEffect, useState, FC, InputHTMLAttributes, CSSProperties} from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from './Home';
import Img from "../assets/imgs/avatar/a1.png";
import {ReactComponent as Edit} from "../assets/imgs/edit.svg";
import { AvatarComponent } from '../components/PlayerProfile';
import axios from 'axios';
import { map } from 'rxjs';
import InputComponent , {ToggleSwitch} from '../components/Input';
import { Button } from './SignIn';
import PacmanLoader from "react-spinners/PacmanLoader";
import RingLoader from "react-spinners/RingLoader";
import { wait } from '@testing-library/user-event/dist/utils';

const override: CSSProperties = {
    display: "block",
    // display: "flex",
    margin: "0 auto",
    borderColor: "red",
  };


export default function Setting() {
    const [query, setQuery] = useState('');
    const [img, setImg] = useState('');


    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#fa0137");

    const [data, setdata] = useState({login : "", defaultAvatar : "", displayName : "", twoFactorAuth : false, email : ""})
    
    const uploadFile = ()=>{
        var e = document.getElementById("fileInput")
        e?.click()
        
    }

    useEffect(() => {
        // setLoading(true);

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
        // setTimeout(() => {
        //     setLoading(false);
        //   }, 2000);
    }, [])

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor("#f29408");
        if (!loading)
            setLoading(!loading);

        const Name = event.target.value;
        let enteredName = "";

        if (Name.trim().length >= 25)    
        {
            setColor("#f20808");
            enteredName = Name.trim().slice(0, 25);
        }
        else
            enteredName = Name;
    
        setdata({...data, displayName : enteredName})
        setQuery(enteredName);
      };

    const submitHandler = () => {
        const name = data.displayName.trim();
        if (name.length === 0)
        {
            setColor("#ff0101");
            return;
        }
        
        setColor("#16ff01");

        // console.log("query = " + query)
        // console.log("diplayName = "  + data.displayName)

        axios.put("http://localhost:8000/profile/updateUsername/" + name , name, {withCredentials: true}).then((res)=>{
            wait(2000).then(() => {
                setColor("#ff000d");
                setLoading(false);
            })

            // console.log("Res = ")
            // console.log(res)
        }   ).catch((err)=>{ 
            wait(2000).then(() => {
            setColor("#ff000d");})

            console.log(err)
        }   )

        // console.log("submit handler /{" + name+"}")
    };

    return (
    
        <SettingsStyle  className='container' style={{marginTop: "100px"}} >
        
        {/* <div className="loader-container">
            <div className="spinner"></div>
        </div> */}

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
                <InputComponent onChange={(e)=>{inputHandler(e)}} value={data.displayName} type='text' lable='Display Name' />
                <InputComponent disabled={true} onChange={(e)=>{inputHandler(e)}} value={data.login} type='text' lable='Login' />
                
                {/* <div className=''> */}
                {/* </div> */}
                {/* <PacmanLoader className='spinner' color={color} loading={loading} cssOverride={override} size={20} /> */}
                
                <ToggleSwitch label='Two-Factor Authentication (2FA)'  />
                <Button    onClick={submitHandler} text="save" type='primary' />
                <RingLoader  color={color} loading={loading} cssOverride={override} size={30} />
                    
        </Row>



        </SettingsStyle>
    )
}


const SettingsStyle = styled.div`
    height: 650px;
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



