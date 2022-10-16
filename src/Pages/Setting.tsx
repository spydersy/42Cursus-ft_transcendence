import React, {useEffect, useState, CSSProperties, useCallback} from 'react'
import styled  from "styled-components"
import { HeadComponent } from './Home';
import {ReactComponent as Edit} from "../assets/imgs/edit.svg";
import { AvatarComponent } from '../components/PlayerProfile';
import axios from 'axios';
import InputComponent from '../components/Input';
import { Button } from './SignIn';
import RingLoader from "react-spinners/RingLoader";
import { wait } from '@testing-library/user-event/dist/utils';
import avataro from "../assets/imgs/avatar/avatar2.png";

// import Particles from "react-particles";
// import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";

const override: CSSProperties = {  display: "block",  margin: "0 auto",  borderColor: "red", };

export default function Setting() {
    // const [query, setQuery] = useState('');
    
    const [img, setImg] = useState(avataro);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#fa0137");
    const [data, setdata] = useState({login : "", defaultAvatar : "", displayName : "", twoFactorAuth : false, email : ""})
    const [checked, setchecked] = useState(false);

    // const particlesInit = useCallback(async (engine: Engine) => { 
    //     console.log(engine);   
    //     await loadFull(engine);
    //    }, []);
    
    //    const particlesLoaded = useCallback(async (container: Container | undefined) => {
    //      console.log(container);
    //   }, []);

    const [connection, setconnection] = useState(false);

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
            setchecked(res.data.twoFactorAuth)
            setconnection(true)

        }).catch((err)=>{
            // ERROR
            setconnection(false)
        })

        var e = document.getElementById("fileInput")
        e?.addEventListener("change", (c :any)=>{
            console.log(c.target.files[0])
            setImg(URL.createObjectURL(c.target.files[0]))
            var  bodyFormData = new FormData();

            setColor("#16ff01");

            bodyFormData.append('avatar', c.target.files[0]);
                axios.post("http://localhost:8000/profile/updateAvatar", bodyFormData, {withCredentials: true}).then((res)=>{
                    console.log(res)
                    wait(2000).then(() => { setLoading(false);  })

                }   ).catch((err)=>{ 
                    wait(2000).then(() => {  setColor("#ff000d");})
                    console.log(err)
                }   )
        })
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
        // setQuery(enteredName);
      };

      const TwoHandler = () => {
        setchecked(!checked)
        setColor("#f29408");
        if (!loading)
            setLoading(!loading);
        }

    const submitHandler = () => {
        const name = data.displayName.trim();
        if (name.length === 0)
        {
            setColor("#ff0101");
            return;
        }
        
        setColor("#16ff01");


        // console.log("2FA  /{" + checked +"}")


        axios.put("http://localhost:8000/profile/updateUsername/" + name , name, {withCredentials: true}).then((res)=>{
            wait(2000).then(() => {
                setColor("#ff000d");
                setLoading(false);
            })

            console.log("Res = ", res)
            // console.log(res)
        }   ).catch((err)=>{ 
            wait(2000).then(() => {
            setColor("#ff000d");})

            console.log(err)
        }   )

        axios.put("http://localhost:8000/profile/update2fa/" + checked , { checked}, {withCredentials: true}).then((res)=>{
            wait(2000).then(() => {
                setLoading(false); })

        }   ).catch((err)=>{ 
            wait(2000).then(() => {
            setColor("#ff000d");})

            console.log(err)
        }   )

        console.log("submit handler /{" + name+"}")
    };

    return (
        // <div className='container' >
            
        // {
        
            // (connection) ? 
            

            (
                // <SettingsStyle  className='container' style={{ display:"flex", right:"300px",  width: "800px", marginTop: "100px", marginLeft: "30px"}} >
                <SettingsStyle  className='container'  >

                    <div className='all'>
                    
                        <HeadComponent title="Settings" />
                    
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
                        
                                <TwofaStyle >
                                    <label> Two-Factor Authentication (2FA)</label>
                                    <input type="checkbox" id="toggle" name="toggle" checked={checked} onChange={TwoHandler} />
                                </TwofaStyle>
                        
                                <Button  cursor="default"  onClick={submitHandler} text="save" type='primary' />
                                <RingLoader  color={color} loading={loading} cssOverride={override} size={30} />
                            
                        </Row> 
                    </div>
                </SettingsStyle>

            )

            // :

            // <button style={{color:"white", position: "relative", fontSize: "100px", top:"300px", left:"300px" , cursor:"progress"}}> Hors-Ligne (D3IF) </button>

        // }
        // </div>

    )
}

const TwofaStyle = styled.div`      
    font-family: "Poppins", sans-serif;
    
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    display: flex;
    width: 100%;
    min-width: 50px;
    > label {
        color: #ffffff;
    }
    > input {
        width: 20px;
        height: 20px;
    }
`;

const SettingsStyle = styled.div`
    height: 650px;
    background-color: ${props => props.theme.colors.seconderybg};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    opacity: 0.8;
    .all {
        height: 100%;
        width: 100%;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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



