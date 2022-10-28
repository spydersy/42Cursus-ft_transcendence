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
import {ReactComponent as Deny} from "../assets/imgs/x-circle.svg";
import {ReactComponent as CloseLock} from "../assets/imgs/closelock.svg";
import OpenLock from "../assets/imgs/TwoFa.png";
import PasswordChecklist from "react-password-checklist"
import { PinInput } from 'react-input-pin-code' // ES Module


const override: CSSProperties = {  display: "block",  margin: "0 auto",  borderColor: "red", };

export default function Setting() {
    
    const [img, setImg] = useState(avataro);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#fa0137");
    const [data, setdata] = useState({login : "", defaultAvatar : "", displayName : "", twoFactorAuth : false, email : ""})
    const [isToggled, setIsToggled] = useState(false);
    const [closepop, setclosepop] = useState(false)
    const [openpass, setopenpass] = useState(false)
    const [QrCode, setQrCode] = useState("")
    const [values, setValues] = useState(['', '', '','','','']);

    useEffect(() => {

        // setIsToggled(false)
        
        axios.get(process.env.REACT_APP_BACKEND_URL+ "/profile/me",   {withCredentials: true} 
        ).then((res)=>{

            console.log("__Settings__Data__: ", res.data )
            setdata(res.data)
            setImg(res.data.defaultAvatar)

            setIsToggled(res.data.twoFactorAuth)

            console.log("__res.data.twoFactorAuth__ = " , isToggled)

        }).catch((err)=>{})

        var e = document.getElementById("fileInput")
        e?.addEventListener("change", (c :any)=>{
            console.log(c.target.files[0])
            setImg(URL.createObjectURL(c.target.files[0]))
            var  bodyFormData = new FormData();

            setColor("#16ff01");

            bodyFormData.append('avatar', c.target.files[0]);
                axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/updateAvatar", bodyFormData, {withCredentials: true}).then((res)=>{
                    console.log(res)
                    wait(2000).then(() => { setLoading(false);  })

                }   ).catch((err)=>{ 
                    wait(2000).then(() => {  setColor("#ff000d");})
                    console.log(err)
                }   )
        })

    }, [])
    
    const uploadFile = ()=>{  var e = document.getElementById("fileInput")
        e?.click()
    }
    
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
    };

    const setClosePop = () => {
        setclosepop(false)
        setIsToggled(false)
        setopenpass(false)
    }

    const setEnable = () => {
        setclosepop(false)
        // setIsToggled(true)
        setopenpass(true)    
    }

    const onToggle = ()=> {
        
        setIsToggled(!isToggled)
        const stateToggle = !isToggled
        // console.log("1-OnToggle =  " , isToggled)

        if (stateToggle) 
        {
            // console.log("true =  " , isToggled)
            axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=true" , "",{withCredentials: true}).then((res)=>{
                // console.log("Response true Data ={", res.data , "}")

                if (res.data === "2fa is already enabled")
                {
                    setIsToggled(false)
                    console.log("ALREADY BROKEN")
                    setQrCode("ALREADY ENABLED")
                }
                else
                {
                    setIsToggled(true)
                    setQrCode(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=generate")
                    setclosepop(true)
                }   

            }).catch((err)=>{
                    setIsToggled(false)
            })
        
        }
        else 
        {
            console.log("false =  " , isToggled)

            axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=false" , "",{withCredentials: true}).then((res)=>{

                console.log("Response false Data ={", res.data.message , "}")

            }   ).catch((err)=>{ 
                    setIsToggled(true)
            } )
        }

        // setColor("#f29408");
        // if (!loading)
        //     setLoading(!loading);
    }
    
    const submitpass = ()=> {
        setopenpass(false)
        setclosepop(false)
        setIsToggled(true)

        console.log("__PIN  = ", values)
        let pass  = "";

        for (let i = 0; i < values.length; i++) 
        {
            if (values[i] === ',')
                i++;
            else
                pass += values[i];
        } 
        // console.log("_FILTRED_PIN  = ", pass)

        axios.get(process.env.REACT_APP_BACKEND_URL+ "/2fa/verifie?code=" + pass ,   {withCredentials: true}).then((res)=>{
            console.log("__verifie__Data__: ", res.data )
            if (res.data) 
            {
                setclosepop(false)
                setIsToggled(true)
            }
            else
            {
                axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=false" , "",{withCredentials: true}).then((res)=>{

                    console.log("Response false Data ={", res.data.message , "}")
    
                }   ).catch((err)=>{ 
                        // setIsToggled(true)
                } )
                setclosepop(false)
                setIsToggled(false)
                window.location.reload()
            }

        }).catch((err)=>{
            setclosepop(false)
            setIsToggled(false)
            window.location.reload()
        })
        console.log("FUCKING PIN IS ", values)
    }

    const submitHandler = () => {
        const name = data.displayName.trim();
        if (name.length === 0)
        {
            setColor("#ff0101");
            return;
        }
        
        setColor("#16ff01");

        axios.put(process.env.REACT_APP_BACKEND_URL+ "/profile/updateUsername/" + name , name, {withCredentials: true}).then((res)=>{
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
        })

        // axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=" + isToggled , "",{withCredentials: true}).then((res)=>{
        //     wait(2000).then(() => {
        //         setLoading(false); })

        // }   ).catch((err)=>{ 
        //     wait(2000).then(() => {
        //     setColor("#ff000d");})

        //     console.log(err)
        // } )

        console.log("submit handler /{" + name+"}")
    };

    return (
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
                        <InputComponent  disabled={true} onChange={(e)=>{inputHandler(e)}} value={data.login} type='text' lable='Login' /> 
                
                        <ToggleSwitchStyle>
                            <label className="toggle-switch">
                                <input type="checkbox" checked={isToggled} onChange={onToggle} />
                                <span className="switch" />
                            </label>
                            <div className="TwoFaText" > Two-Factor Authentication ( {isToggled ? "ON": "OFF" } ) </div>
                        </ToggleSwitchStyle>

                        {
                            isToggled && closepop &&
                            <div className='PoppUp'>

                                <Deny onClick={setClosePop}  className='CloseTab'/>
                                <div className='Title'> TWO-FACTOR AUTHENTICATION (2FA) - DUO SECURITY </div>

                                <Line></Line>

                                <div className='Description'>
                                    <img className='D_img' src={OpenLock} alt='OpenLock' />
                                    <div className='D_text'>
                                        
                                        <div className='D_title' >
                                        Configuration via a third-party authentication system    
                                        </div>
                                        <div className='D_texto' >
                                        - Use your authentication application (such as Duo or Google Authenticator) to Configure it as a third party.
                                        </div>
                                        
                                        <div className='D_texto' >
                                            Steps to configure your authentication application:<br/>
                                            1- Scan The Qr code.  <br/>
                                            2- Click Next and Enter 6 digit PIN Generated by the app  <br/>
                                            4- Submit, if the PIN isn't valid, try again. <br/>
                                            3- Logout and you'll be asked to enter Generated PIN after sign-in. <br/>
                                            4- Enjoy !!! <br/>
                                        </div>
                                    </div>
                                </div>

                                <Line></Line>
                                
                                <img id="borderimg1" src={QrCode} alt="qr code" />

                                <div className="Bastard" >
                                    Scan Me 
                                </div>
                                <Line></Line>
                                <div className='Buttons' >
                                    <button id="cancel" onClick={setClosePop} > 
                                        <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider_1f577-fe0f.png" alt="Spider on Microsoft Teams 1.0" width="40" height="35"></img>
                                        Disable 2FA 
                                     </button>

                                    <button id="next"  onClick={setEnable} > 
                                        <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="40" height="40"></img>
                                        Next 
                                    </button>
                                </div>
                            </div>
                        }

                        {
                            openpass &&
                            <div className='PoppUpp'>
                               <Deny onClick={setClosePop}  className='CloseTab'/>
                                
                                <div className='Title'> TWO-FACTOR AUTHENTICATION (2FA) - DUO SECURITY </div>

                                <Line></Line>
                                

                                <div className='passwordo' >
                                    {/* <label className='text'> 8 Digit Pin : </label> */}
                                    <PinInput
                                        containerClassName='piniput'
                                        values={values}
                                        size='lg'
                                        // onChange={(value, index, values) => setValues(values)}
                                        onChange={(value, index, values) => setValues(values)}
                                        // onComplete={(values) => submitpass(values)}
                                    />
                                </div>
                                
                                <Line></Line>

                                <div className='Buttons' >
                                    <button id="next"  onClick={submitpass} > 
                                        <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="40" height="40"></img>
                                        Next 
                                    </button>
                                    
                                    {/* <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="60" height="60"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider_1f577-fe0f.png" alt="Spider on Microsoft Teams 1.0" width="50" height="50"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="60" height="60"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider_1f577-fe0f.png" alt="Spider on Microsoft Teams 1.0" width="50" height="50"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="60" height="60"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider_1f577-fe0f.png" alt="Spider on Microsoft Teams 1.0" width="50" height="50"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="60" height="60"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider_1f577-fe0f.png" alt="Spider on Microsoft Teams 1.0" width="50" height="50"></img>
                                    <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="60" height="60"></img> */}
                                </div>
                            </div>
                        }
                
                        <Button  onClick={submitHandler} text="save" type='primary' />
                        <RingLoader  color={color} loading={loading} cssOverride={override} size={30} />     
                </Row> 
            </div>

        </SettingsStyle>
    )
}

const Row = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    .PoppUp{

        width: 50%;
        /* height: 700px; */
        background-color: ${props => props.theme.colors.seconderybg};
        border: 2px solid  ${props => props.theme.colors.purple};
        color: #dacece5f ;
        z-index: 30;
        position: absolute;
        top: 15%;
        border-radius: 25px;

        .Title {
            width: 90%;
            height: 15px;
            text-align: center;
            font-size: 16px;
            margin: 20px 10px;
            font-weight: 800;
            color:  ${props => props.theme.colors.purple};
            /* background-color: aqua; */
        }
        .CloseTab{
            position: absolute;
            width:  23px;
            height: 23px;
            top:    18px;
            right:  10px;
            &:hover {
                cursor: pointer;
                fill: #665a5a5f;
                transform: scale(1.2);
            }
        }
        .Description {
            flex-direction: row;
            display: flex;
            position: relative;
            gap: 30px;
            margin: 10px ;

            .D_img{
                display: flex;
                background-color: #ada8a3dc;
                width: 100px;
                height: 100px;
                border: 3px solid #665a5a5f;
                border-radius: 50%;
                left: 20%;
                > img {
                    width: 98%;
                    height: 98%;
                    fill: #c88989;
                }
            }
            .D_text{
                /* background-color: #c889899d; */
                gap: 10px;
                width: 100%;
                position: relative;
                margin: 0px 5px;

                .D_title{
                    margin: 10px 0px;
                    font-size: 20px;
                    text-align: start;
                    font-weight: bold;
                }
                .D_texto{
                    margin: 10px 0px;
                    font-size: 15px;
                    text-align: start;
                }
                /* right: 0px; */
                /* display: flex; */
            }
        }
        #borderimg1 {
            border: 8px solid #2e2d2dbd;
            padding: 15px;
            border-radius: 25px;
            border: dashed;
            height: 300px;
            width: 300px;
        }
        .Bastard {
            font-size: 30px;
            align-items: center;
        }
        .Buttons{
            width: 100%;
            height: 100px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            display: flex;
            gap: 10px;

            #next {
                margin: 0px 20px;
                background-color: #1d5eac;
                width: 30%;
                height: 60px;
                border-radius: 20px;
                font-size: 25px;
                font-weight: 600;

                display: flex;
                justify-content: center;
                bottom: 0px;
                text-align: center;
                align-items: center;



            }
            #cancel{
                background-color: #b0a7a7;
                margin: 10px 0px;
                width: 30%;
                align-items: center;
                height: 60px;
                text-align: center;
                bottom: 0px;
                display: flex;
                justify-content: center;

                /* height: 50px; */
                border-radius: 20px;
                font-size: 25px;
                font-weight: 600;
            }
        }
        .passwordo {
            width: 100%;
            position: relative;

            height: 300px;
            background-color: #1d5eac;
            .Blocko{
                width: 150px;
                height: 20px;
                border: 3px solid #090909;
                margin-left: 8px;
            }
            .passList{
                /* display: flex; */
                position: absolute;
                background-color: #c88989;
                /* width: 80%; */
                width: 50%;
                height: 120px;
                align-items: center;
                text-align: center;
                left: 25%;
                margin: 30px 0px;
                /* top: 100px; */

            }
        }
}
    .PoppUpp{
        margin-top: 100px;
        height: 400px;
        width: 650px;
        background-color: ${props => props.theme.colors.seconderybg};
        border: 2px solid  ${props => props.theme.colors.purple};
        color: #dacece5f ;
        z-index: 30;
        position: absolute;
        top: 15%;
        border-radius: 25px;

        .Title {
            width: 100%;
            height: 15px;
            text-align: center;
            font-size: 18px;
            margin: 20px 0px;
            font-weight: 800;
            color:  ${props => props.theme.colors.purple};
            /* background-color: aqua; */
        }
        .CloseTab{
            position: absolute;
            width:  25px;
            height: 25px;
            top:    18px;
            right:  10px;
            &:hover {
                cursor: pointer;
                fill: #665a5a5f;
                transform: scale(1.2);
            }
        }
        .piniput{
            /* background-color: #c88989; */
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 25%;
            height: 100px;
            width: 50%;

        }
     
        .Buttons{
            width: 100%;
            height: 100px;
            flex-direction: row;
            align-items: center;

            #next {
                margin: 0px 20px;
                background-color: #1d5eac;
                width: 20%;
                height: 50px;
                border-radius: 20px;
                font-size: 20px;
                font-weight: 600;
            }
        }
        .passwordo {
            position: relative;
            width: 100%;
            height: 200px;
            /* position: relative; */
            display: flex;
            align-items: center;
            background-color: #6f89a927;
            .text {
                width: 25%;
                /* height: 30px; */
                /* background-color: #b0a7a7; */
                color: #090909;
                font-size: 25px;

                
         
            }

        }
}

`;

const PoppUpp = styled.div`


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
    font-weight: 500;

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
    position: relative;
   margin: 20px 0;
    width: 100%;
    height: 1px;
    opacity: 0.5;
    background-color: ${props => props.theme.colors.seconderyText};
`;

const ToggleSwitchStyle = styled.div`

font-family: "Poppins", sans-serif;
position: relative;
/* background-color: #00ff40; */
color : white;
display: flex;
width: 100%;
min-width: 50px;
margin: 20px;
height: 30px;


.TwoFaText{
    /* background-color: aqua; */
    margin: 0px 10px;
}   
.toggle-switch {
position: relative;
display: inline-block;
width: 50px;
height: 25px;
}
.toggle-switch input[type="checkbox"] {
display: none;
}
.toggle-switch .switch {
position: absolute;
cursor: pointer;
background-color: #ccc;
border-radius: 25px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {
position: absolute;
content: "";
left: 2px;
top: 2px;
width: 21px;
height: 21px;
background-color: #aaa;
border-radius: 50%;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: #6699cc;
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color: #336699;
}

`;

