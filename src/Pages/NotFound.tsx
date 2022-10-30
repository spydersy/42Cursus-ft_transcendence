import React , {useState} from "react";
import styled from 'styled-components';
import axios from 'axios';
import { PinInput } from 'react-input-pin-code' // ES Module
import SICIRITY from '../components/2fa/main';

export default function NotFound() {
    return <StyledTwoFa>
     

                {/* <body> */}

                <div className="video">
                    asdfasfa
                    <video autoPlay loop muted width="80%" height="100%">
                        <source src="https://i.gifer.com/PgbQ.mp4" type="video/mp4" />
                    </video>
                    
                </div>
              


            </StyledTwoFa>
}

export  function TwoFa() {
    const [values, setValues] = useState(['', '', '','','','']);

    const submitpass = ()=> {

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
        // axios.get(process.env.REACT_APP_BACKEND_URL+ "/profile/update2FA?status=true" ,   {withCredentials: true}).then((res)=>{
        //         console.log()
        //     }).catch((err)=>{})
        
        axios.post(process.env.REACT_APP_BACKEND_URL+ "/update2FA?status=true&code=" + pass ,  " " , {withCredentials: true}).then((res)=>{
            console.log("__status=true_&_code=__: ", res.data )
            
            if (res.data) 
            {
                console.log("ALREADY BROKEN")
                // setQrCode("ALREADY ENABLED")
                // setclosepop(false)
                // setIsToggled(true)
            }
            else
            {
                // axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=false" , "",{withCredentials: true}).then((res)=>{
                //     console.log("Response false Data ={", res.data.message , "}")
                //     setIsToggled(false)
                // }   ).catch((err)=>{ 
                //         // setIsToggled(true)
                // } )
            }
            
        }).catch((err)=>{
            // setIsToggled(false)
        })
        // window.location.reload()
        // console.log("FUCKING PIN IS ", values)
    }

    return <StyledTwoFa>
                              
                <div className='PoppUpp'>
                                
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
                            onComplete={(values) => submitpass()}
                        />
                    </div>
                    
                    <Line></Line>

                    <div className='Buttons' >
                        <button id="submit"  onClick={submitpass} > 
                            <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/spider-web_1f578-fe0f.png" width="40" height="40"></img>
                            submit
                        </button>
                        
                    </div>

                </div>
                <SICIRITY/> 
            </StyledTwoFa>
    }

const StyledTwoFa = styled.div`
    width: 100%;
    /* display: flex;
    position: relative; */
    /* flex-direction: row; */
    /* gap: 10px; */
    /* align-items: center; */
  
    .PoppUpp{
        background-color: #6f89a927;
        margin-top: 100px;
        left: 30%;
        height: 400px;
        width: 650px;
        background-color: ${props => props.theme.colors.seconderybg};
        border: 2px solid  ${props => props.theme.colors.purple};
        color: #dacece5f ;
        z-index: 30;
        position: absolute;
        top: 15%;
        border-radius: 25px;
        justify-content: center;
        align-items: center;
        
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
            width:  35px;
            height: 35px;
            top:    13px;
            right:  13px;
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
            /* background-color: #c88989; */
            width: 100%;
            height: 50px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            display: flex;
            gap: 20px;

            #submit {
                margin: 0px 0px;
                background-color: #1d5eac;
                width: 25%;
                height: 50px;
                border-radius: 20px;
                font-size: 25px;
                font-weight: 600;
                display: flex;
                justify-content: center;
                text-align: center;
                align-items: center;
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
const Line = styled.div`
    position: relative;
   margin: 20px 0;
    width: 100%;
    height: 1px;
    opacity: 0.5;
    background-color: ${props => props.theme.colors.seconderyText};
`;
