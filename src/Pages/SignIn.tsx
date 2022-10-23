import React from 'react'
import styled , {keyframes , css} from "styled-components"
import PatternImg from "../assets/imgs/background.jpeg"
import {ReactComponent as FtImg } from "../assets/imgs/42Icon.svg"
import {ReactComponent as FttImg } from "../assets/imgs/google.svg"
import {ReactComponent as FtttImg } from "../assets/imgs/google1.svg"
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
         <div className='Logo'>
            <LogoComponent size={"big"}/>
         </div>
         {/* <div className='Quotoo'>
            ~ all your dreams can come true if you have the courage to pursue them ~
         </div> */}
         
         <div className='team'>


            <div className='wrow'>

               <a className='urow' href="https://github.com/spydersy">
                  <img className='avatar' src={abelarif}  />
                  <a > @Spydersy </a>  
               </a>
              
               <a className='urow' href="https://github.com/aladinez">
                  <img className='avatar' src={aez_zaou}  />
                  <a > @Aladinez </a>  
               </a>
              
               <a className='urow' href="https://github.com/NotYaiba">
                  <img className='avatar' src={melkarmi}  />
                  <a > @NotYaiba </a>  
               </a>

               <a className='urow' href="https://github.com/mamali543">
                  <img className='avatar' src={mamali}  />
                  <a > @Mamali543 </a>  
               </a>
               <a className='urow' href="https://github.com/Alcheemiist">
                  <img className='avatar' src={eelaazmi}  />
                  <a > @Alchemist </a>  
               </a>
               
            </div>

           

         </div>

         <a className="Butto" href={process.env.REACT_APP_REDIRECT_URL}>
            <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}}   icon={<FtImg/>} text="Sign in"/>
            <a className='space-zb'/>
            <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}}   icon={<FtttImg/>} text="Sign up"/>
         </a>
         {/* <a id="TermsCond" href="#termscondPage">Terms & conditions</a> */}


      

         <div className="title"> 
            <a className='space-zb'/>

            <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/spider_1f577-fe0f.png" 
                  // srcset="https://emojipedia-us.s3.amazonaws.com/source/skype/289/spider_1f577-fe0f.png 2x"
                  alt="Spider on Skype Emoticons 1.2" width="70" height="60" /> 
            <a className="timo"  > # Team AL-3ANAKIB </a>
            
         </div>
         
      </Bloc>

   </Wrraper>
  )
}



const Wrraper = styled.div`
   position: relative;
   margin: 0;
   padding: 0;
   overflow-x:hidden;
   overflow-y:hidden;
   background-color: #112238;
   width:   100%;
   height:  100%; 
   display: flex;
   background-size: cover;

   /* background: url(${PatternImg})   no-repeat ; */
   /* position: absolute; */
   /* align-items: center;  */
`;

const Bloc = styled.div`
   position: absolute;

   min-width: 750px;
   max-width: 700px;
   min-height:    350px;
   min-height:    400px;

   top: 400px;
   right: 28%;
   
   border-radius : 10px;
   background-color: ${props => props.theme.colors.primarybg}; 
   flex-direction: column;
   box-shadow:   1px 1px 3px 2px #25a7d7; 

   .Logo {
      width: 100%;
      margin: 30px 0px;
      /* background-color: #25a8d74b; */
      height: 60px;
   }
   .Quotoo {
      color: #ebf2f467;
      font-weight: 600;
      font-size: 18px;
      padding: 10px 0px;
      margin: 30px 0px;
      /* background-color: #25a7d7; */
   }
   .team {
      width: 100%;
      color: #546970;
      height: 160px;
      /* background-color: #25a7d7; */
      margin-bottom: 0px;


      .wrow{
         position: relative;
         align-items: center;
         justify-content: center;

         flex-direction: row;
         display: flex;

         padding: 10px 0px;
         gap: 30px;
         /* background-color: #0635517b; */
         width: 100%;
         cursor: pointer;

         .urow{
            /* background-color: #1553b6; */
            .avatar{
               border-radius: 50%;
               width:   90px;
               height:  90px;
            }
         }
      }
   }
   

   .Butto {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      /* position: relative; */
      /* background-color: antiquewhite; */
      height: 60px;
      /* margin: 0px 10px; */
      .space-zb {
         width: 40px;
      }


   }

   .title {
         flex-direction: row;
         display: flex;
         /* position: absolute; */

         font-family: "Gill Sans", sans-serif;
         color:  ${props => props.theme.colors.primaryText};;
         font-weight: 500;
         font-size: 15px;
         background-color: #25a8d70;
         /* margin     : 10px 0px; */
         width: 100%;
         /* height: 100px; */
         .timo {
            display: flex;
            position: absolute;
            /* bottom: 0px; */
            background-color: #5469704a;
            bottom: 20px;
            left: 10%;
         }

      }
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
  
`;

const Title = styled.div`

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
