 import React , {useEffect} from 'react'
import styled , { css} from "styled-components"
import PatternImg from "../assets/imgs/background.jpeg"
import {ReactComponent as FtImg } from "../assets/imgs/42Icon.svg"
import {ReactComponent as FtttImg } from "../assets/imgs/google1.svg"

import { LogoComponent } from '../components/Upperbar'
import Background from '../components/Background';

import abelarif from "../assets/imgs/team/abelarif.jpeg"
import aez_zaou from "../assets/imgs/team/az.jpeg"
import eelaazmi from "../assets/imgs/team/eelaazmi.jpeg"
import mamali from "../assets/imgs/team/mamali.jpeg"
import melkarmi from "../assets/imgs/team/melkarmi.jpeg"

import  Zero from "../assets/imgs/badgezero.svg"
import  Huit from "../assets/imgs/huit.svg"
import  Joke from "../assets/imgs/joke.svg"
import  Cinq from "../assets/imgs/cinq.svg"
import {Link} from "react-router-dom";

// import  Zeroo from "../assets/imgs/zero.svg"
//todo env file

export default function SignIn() {
useEffect(() => {
   localStorage.setItem("achievement", JSON.stringify([false, false, false, false, false, false]))
   localStorage.setItem("first", JSON.stringify(true))

// window.location.reload()
}, [])

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

               <Link className='urow' to="https://github.com/spydersy">
                  <img alt='img1' className='avatar' src={abelarif}  />
                  <img alt='img2' className='avatarr' src={Cinq}></img>
                  <div > @Spydersy </div>  
               </Link>
              
               <Link className='urow' to="https://github.com/aladinez">
                  <img alt='img3' className='avatar' src={aez_zaou}  />
                  <img alt='img4' className='avatarr' src={Huit}></img>
                  <div > @Aladinez </div>  
               </Link>
              
               <Link className='urow' to="https://github.com/NotYaiba">
                  <img alt='img5' className='avatar' src={melkarmi}  />
                  <img  alt='img6'  className='avatarr' src={Joke}></img>
                  <div > @NotYaiba </div>  
               </Link>

               <Link className='urow' to="https://github.com/mamali543">
                  <img alt='img7' className='avatar' src={mamali}  />
                  <img  alt='img8' className='avatarr' src={Huit}></img>
                  <div > @Mamali543 </div>  
               </Link>
               <Link className='urow' to="https://github.com/Alcheemiist">
                  
                  <img alt='img9' className='avatar' src={eelaazmi}  />
                  <img alt='img10' className='avatarr' src={Zero}></img>
                  <div > @Alchemist </div>  

               </Link>
            </div>

         </div>

         <a  className="Butto" href={process.env.REACT_APP_REDIRECT_URL}>
            <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}}   icon={<FtImg/>} text="Sign in"/>
            <div className='space-zb'/>
            <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}}   icon={<FtttImg/>} text="Sign up"/>
         </a>
         {/* <a id="TermsCond" href="#termscondPage">Terms & conditions</a> */}

         <div className="title"> 
            <div className='space-zb'/>

            <img className="spider" src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/spider_1f577-fe0f.png" 
                  // srcset="https://emojipedia-us.s3.amazonaws.com/source/skype/289/spider_1f577-fe0f.png 2x"
                  alt="Spider on Skype Emoticons 1.2" width="80" height="70" /> 
            
            <div className="timo"  > # Team AL-3ANAKIB </div>
            
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
   min-height:    250px;
   max-height:    400px;

   top: 25%;
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
         /* align-items: center; */
         /* justify-content: center; */

         flex-direction: row;
         display: flex;

         padding: 10px 0px;
         gap: 20px;
         /* background-color: #0635517b; */
         width: 80%;
         height: 100px;
         left: 3%;
         cursor: pointer;

         .urow{
            /* background-image: url(""); */
            /* background-color: #1553b6; */
            width: 100%;
            padding: 0px 10px;
            .avatar{
               /* display: none; */
               border-radius: 50%;
               width:   100px;
               height:  100px;
               border: 2px solid  #25a7d7;
               transition: 600ms ease-in-out;
               /* animation: ease-in-out 2s; */

            }
            .avatarr{
               display: none;
                 /* transition: 2s ease-in-out;
                  animation: ease-in-out 2s; */
                  /* animation: alternate; */
             
            }
            .badge{
               width: 100%;
               height: 100%;
               position: absolute;
               object-fit: cover;
               /* background-color: #25a7d7; */
            }
            &:hover {
               /* background-color: #25a7d7; */
               .avatar {
                  border-radius: 50%;
                  width:   100px;
                  height:  100px;
                  border: 2px solid  #25a7d7;
                  box-shadow: 1px 1px 5px 5px #25a7d7;

               }
               .avatarr{
                  top: 10%;
                  display: flex;
                  position: absolute;
                  opacity: 0.8;
                  width:   105px;
                  height:  105px;
                  /* transition: 2s ease-in-out;
                  animation: ease-in-out 2s;
                  animation: alternate; */
               }
            }
         }
         
      }
   }
   

   .Butto {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      position: relative;
      /* background-color: antiquewhite; */
      height: 60px;
      left: 25%;
      /* margin: 0px 10px; */
      .space-zb {
         width: 30px;
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
         /* background-color: #258d70; */
         /* margin     : 10px 0px; */
         width: 100%;
         /* height: 100px; */
         .timo {
            display: flex;
            position: absolute;
            /* bottom: 0px; */
            background-color: #5469704a;
            bottom: 8px;
            left: 2%;
         }
         .spider {
            position: relative;
            /* background-color: #25a7d7; */
            bottom: -70px;
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

// const Title = styled.div`

// `;

// const Description = styled.div`
//    margin-bottom: 30px;
//    color:  ${props => props.theme.colors.primaryText};;
//    font-family: 'Poppins' , sans-serif;
//    font-style: normal;
//    font-weight: 300;
//    line-height: 20px;
//    display: flex;
//    text-align: start;
//    width: 500px;
//    opacity: 0.6;
// `;

interface ButtonProps {
   isIcon? : boolean,
   type? : "primary" | "secondary" ,
   text? : string
   icon? : React.ReactElement,
   onClick? : (e?: any)=> void;
   size ? : "small" | "big";
   color ?: string,

}
interface ButtonStyleProps {
   isIcon? : boolean | undefined,
   typeS? : string ,
   size ? : "small" | "big",
   color?: string
}
export  function Button(props :ButtonProps ) {
  return (
    <LoginButtonStyle  color={props.color} size={props.size} isIcon={props.isIcon} onClick={props.onClick} typeS={props.type}>
      {props?.icon}
      
      {props.isIcon ? "" : <>{props.text}</>}
      <ToolTip>{props.text} </ToolTip>

    </LoginButtonStyle>
  )
}

const ToolTip = styled.span`
        display: inline-block;
				position: absolute;
				background-color: #ffffffb5; 
				padding: 8px 12px;
				border-radius: 3px;
				/* margin-top: -26px; */
				bottom: calc(-40%);
				opacity: 0.5;
				visibility: hidden;
				font-size: 10px;
				letter-spacing: .9px;
        transition: all .2s ease-in;
        font-weight: 500;
				/* border: 1px solid ${props => props.theme.colors.border}; */
        z-index: 3;
				&:before {
          z-index: 13;
          content: '';
					display: block;
					position: absolute;
					left: 50%;
          top: -5px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
          background-color: #c0bbbbce; 
				}
`;

const LoginButtonStyle = styled.button<ButtonStyleProps>`
/* margin: 0 auto; */
   padding: 10px 20px;
   min-width: 100px;
   background: ${props => props.theme.colors.purple};;
   /* background-color: #831717; */
   border-radius: 5px;
   border: 1px solid  ${props => props.theme.colors.purple};;;

   height: auto;
   cursor: pointer;;
   display: flex;
   align-items: center;
   justify-content: center;
   gap : 5px;
   position: relative;
   &:active {
            transform: scale(0.90);
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
        }
   ${props => (props.size === "small") && `
padding: 3px 5px;
`}
   ${props => (props.color) && `
      background: ${props.color};;
   border: 1px solid  ${props.color};


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
