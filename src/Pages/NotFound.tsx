import React , {useState} from "react";
import styled from 'styled-components';
import axios from 'axios';
import { PinInput } from 'react-input-pin-code' // ES Module
import AnimatedBg from '../components/AnimatedBg';
import { Button } from './SignIn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { wait } from '@testing-library/user-event/dist/utils';

export default function NotFound() {
    return <StyledTwoFa>

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
    const navigate = useNavigate();

    const error = (props: string) => {
        toast.error(props, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    const succes = (props: string) => {
        toast.success(props, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const submitpass = ()=> {
        let pass  = "";

        for (let i = 0; i < values.length; i++) 
        {
            if (values[i] === ',')
                i++;
            else
                pass += values[i];
        } 

        axios.post(process.env.REACT_APP_BACKEND_URL+ "/auth/validate2FA?code=" + pass , {} ,{withCredentials: true}).then((res)=>{
            if (res.data.Authentication === "SUCCESS")
            {
                succes("Signed in successfully\nWelcome back!");
                // navigate("/");
                window.location.href = ('/')
            }
            else
            {
                error("Wrong code , Try again");
                navigate("/signin");
            }   
        }).catch((err)=>{
            error("Something is Wrong , Try again or contact us");
            navigate("/signin");
        })
    }

    return   <StyledTwoFa>
               
                <div className='Hiho'>  <AnimatedBg />   </div>

                <div className='PoppUpp'>
                                
                    <div className='Title'> TWO-FACTOR AUTHENTICATION (2FA) - DUO SECURITY </div>

                    <Line></Line>
                    
                    <div className='passwordo' >
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
                        <a href="/signin"> <Button  onClick={submitpass} text="Go Back to Sign-in" type='secondary' /></a>
                        <Button  onClick={submitpass} text="Submit" type='primary' />
                    </div>

                </div>
            </StyledTwoFa>
    }

const StyledTwoFa = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
    .Hiho {
        width: 100%;
        height: 100%;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: #dc1111f0
    }

    .PoppUpp{
        opacity: 0.9;
        background-color: #6f89a927;
        left: 30%;
        height: 280px;
        width: 550px;
        background-color: ${props => props.theme.colors.seconderybg};
        border: 2px solid  ${props => props.theme.colors.purple};
        color: #dacece5f ;
        z-index: 30;
        position: absolute;
        top: 30%;
        border-radius: 15px;
        justify-content: center;
        align-items: center;
        animation: 6s ease-in-out;
        
        .Title {
            width: 100%;
            height: 18px;
            text-align: center;
            font-size: 14px;
            margin: 20px 0px;
            font-weight: 800;
            color:  ${props => props.theme.colors.purple};
            /* background-color: aqua; */
        }
      
        .piniput{
            /* background-color: #c88989; */
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 25%;
            height: 130px;
            width: 50%;

        }
     
        .Buttons{
            /* background-color: #c88989; */
            width: 100%;
            height: 40px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            display: flex;
            gap: 40px;

        }
        .passwordo {
            position: relative;
            width: 100%;
            height: 100px;
            /* position: relative; */
            display: flex;
            align-items: center;
            background-color: #6f89a927;
            .text {
                width: 25%;
 
                color: #090909;
                font-size: 25px;
            }
        }
        &:hover {
            opacity: 1;
            animation: 6s ease-in-out;
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
