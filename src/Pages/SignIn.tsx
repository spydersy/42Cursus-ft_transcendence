import React from 'react'
import styled , {keyframes , css} from "styled-components"
import PatternImg from "../assets/imgs/background.jpeg"
import {ReactComponent as FtImg } from "../assets/imgs/42Icon.svg"
import { LogoComponent } from '../components/Upperbar'
import Background from '../components/Background';

import abelarif from "../assets/imgs/team/abelarif.jpeg"
import aez_zaou from "../assets/imgs/team/az.jpeg"
import eelaazmi from "../assets/imgs/team/eelaazmi.jpeg"
import mamali from "../assets/imgs/team/mamali.jpeg"
import melkarmi from "../assets/imgs/team/melkarmi.jpeg"

//todo env file

export default function SignIn() {
  return (
    <Wrraper>
      <Background/>
         <Bloc>
            <LogoComponent size={"big"}/>
            
            {/* “Those who don't know pain will never know what true peace is, the world will know pain SHINRA-TENSIE” */}
           
            <Description>
            {/* “Nobody Dies a Virgin, Life Fucks Us All.” - Yaiba */}
            
            </Description>
           
            {/* <LoginButton href={url} >
               <img src={FtImg} alt="42logo" />
               Login with intra
            </LoginButton> */}
            <a href={process.env.REACT_APP_REDIRECT_URL}>
               <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}}   icon={<FtImg/>} text="Sign in with intra"/>

            </a>
            <a id="TermsCond" href="#termscondPage">Terms & conditions</a>
         
         <br></br>


            <div className='wrow'>

               <div className='urow'>
                  <img className='avatar' src={abelarif}  />
                  Person 
               </div>
               <div className='urow'>
                  <img className='avatar' src={aez_zaou}  />
                  Person 
               </div>
               <div className='urow'>
                  <img className='avatar' src={melkarmi}  />
                  Person 
               </div>
               <div className='urow'>
                  <img className='avatar' src={mamali}  />
                  Person
               </div>
               <div className='urow'>
                  <img className='avatar' src={eelaazmi}  />
                  Person 
               </div>
               
               
            </div>

            <Title> THE GOLDEN 3ANAKIB TEAM  </Title>

         </Bloc>

   </Wrraper>
  )
}


const breatheAnimation = keyframes`
 /* 0% { transform: translateY(0) }
 50% { transform: translateY(10px)  }
 100% { transform: translateY(0)  } */
`
const Wrraper = styled.div`

   width:   100%;
   height:  100%; 
   display: flex;

   /* background: url(${PatternImg})   no-repeat ; */
   background-color: #000000;
   background-size: cover;
   position: absolute;
   align-items: center;
   
 
`;

const Bloc = styled.div`
   position: absolute;

   /* width: 100%; */
   min-width: 650px;
   max-width: 650px;
   height:    400px;

   top:  25%;
   right: 25%;

   border-radius : 10px;
   box-shadow:   1px 1px 5px 5px #163f83; 
   background-color: ${props => props.theme.colors.primarybg}; 
   display: flex;
   align-items: center;
   flex-direction: column;
   padding-top : 30px;

   @media  only screen and (max-width: 768px) {
      width: 70%;
      min-width: 70%;
      right: 50%;
      transform: translate(50%, -50%);
   }
   #TermsCond{
      margin-top: 20px;
      width: 100%;
      text-align: center;
      align-items: center;
      font-size: ${props => props.theme.fontSize.s};
      color: ${props => props.theme.colors.primaryText};
      text-decoration: underline;
   }
   .wrow{
      flex-direction: row;
      display: flex;
      padding: 10px;
      gap: 50px;
      background-color: #0635517b;
      width: 90%;
      .urow{
         /* background-color: #1553b6; */
         .avatar{
            border-radius: 25px;
            width:   60px;
            height:  60px;
         }
      }
   }
`;

const Title = styled.div`
   font-family: 'Gill Sans Extrabold', cursive;
   color:  ${props => props.theme.colors.primaryText};;
   font-size:  ${props => props.theme.fontSize.xl}; 
   font-weight: 500;
   /* margin-top: 10px; */
   /* margin-bottom: 0px; */
   bottom: 30px;
   position: absolute;
   font-weight: 300;
   line-height: 20px;
`;

const Description = styled.div`
   margin-bottom: 30px;
   color:  ${props => props.theme.colors.primaryText};;
   font-family: 'Poppins' , sans-serif;
   font-style: normal;
   font-weight: 300;
   line-height: 20px;
   display: flex;
   text-align: start;
   width: 500px;
   opacity: 0.6;
`;

interface ButtonProps {
   isIcon? : boolean,
   type? : "primary" | "secondary" ,
   text? : string
   icon? : React.ReactElement,
   onClick? : (e?: any)=> void;
   size ? : "small" | "big";

}
interface ButtonStyleProps {
   isIcon? : boolean | undefined,
   typeS? : string ,
   size ? : "small" | "big"; 
}
export  function Button(props :ButtonProps ) {
  return (
    <LoginButtonStyle  size={props.size} isIcon={props.isIcon} onClick={props.onClick} typeS={props.type}>
      {props?.icon}
      {props.text}
    </LoginButtonStyle>
  )
}

const LoginButtonStyle = styled.button<ButtonStyleProps>`
/* margin: 0 auto; */
   padding: 10px 20px;
   min-width: 100px;
   background: ${props => props.theme.colors.purple};;
   /* background-color: #831717; */
   border-radius: 5px;
   height: auto;
   cursor: pointer;;
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   gap : 5px;
   ${props => (props.size === "small") && `

padding: 3px 5px;
`}
   >svg{
      /* display: none; */
      path {
         stroke : #fff;
      }
   }
   font-family: 'Poppins' sans-serif;
   font-weight: 500;
   font-size:  ${props => props.theme.fontSize.l}; 
   color: #FFFFFF;
   animation-name: ${breatheAnimation};
   animation-duration: 3s;
   animation-iteration-count: infinite;
   ${props => (props.typeS === "secondary") && css`
   background: transparent;
   border: 1px solid #FFFFFF;


   `}
   ${props => (props.isIcon === true) && css`
  min-width: auto;
  width: auto;

   `}

   z-index: 20;
   position: relative;
   overflow: hidden;
   &:after {
  background: #fff;
  content: "";
  height: 155px;
  left: -75px;
  opacity: .2;
  position: absolute;
  top: -50px;
  width: 50px;
  -webkit-transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
          transition: all 950ms cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
          transform: rotate(35deg);
  z-index: -10;
}

&:hover:after {
  left: 120%;
  -webkit-transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
          transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
}

`;
