import React from 'react'
import styled , {keyframes , css} from "styled-components"
import PatternImg from "../assets/imgs/background.jpeg"
import {ReactComponent as FtImg } from "../assets/imgs/42Icon.svg"
import { LogoComponent } from '../components/Upperbar'
import Background from '../components/Background';


//todo env file

export default function SignIn() {
  return (
    <Wrraper>
      <Background/>
         <Bloc>
            <LogoComponent size={"big"}/>
            <Title>
            3ANAKIB TEAM
            </Title>
            {/* “Those who don't know pain will never know what true peace is, the world will know pain SHINRA-TENSIE” */}
            <Description>
            “Nobody Dies a Virgin, Life Fucks Us All.” - Yaiba
            
            </Description>
            {/* <LoginButton href={url} >
               <img src={FtImg} alt="42logo" />
               Login with intra
            </LoginButton> */}
            <a href={process.env.REACT_APP_REDIRECT_URL}>
            <Button  onClick={()=>{console.log(process.env.REDIRECT_URL)}} cursor="default"  icon={<FtImg/>} text="Sign in with intra"/>

            </a>
            <a id="TermsCond" href="#termscondPage">Terms & conditions</a>
         
         <br></br>
         <br></br>

            <h1>  Team Presentation  </h1>
         <div className='wrow'>
            <div className='urow'>Person x</div>
            <div className='urow'>Person x</div>
            <div className='urow'>Person x</div>
            <div className='urow'>Person x</div>
            <div className='urow'>Person x</div>
           
         </div>
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

   width: 100vw;
   height: 100vh;
   display: flex;
   /* background: url(${PatternImg})   no-repeat ; */
   background-color: #000000;
   background-size: cover;
   position: relative;
   .wrow{
      flex-direction: row;
      display: flex;
      padding: 10px;
      gap: 50px;
      /* flex: 5; */
      .urow{
         background-color: #859bbf;
         /* padding: 10px; */
      }

   }
`;

const Bloc = styled.div`
   position: absolute;
   /* top: 50%;
   right: 10%; */
   width: 100%;
   border-radius : 10px;
   min-width: 600px;
   max-width: 600px;
   height: 650px;
   /* border: 1px solid ; */
   background-color: aqua;
   box-shadow:   1px 1px 5px 5px #163f83; 
   top: 30%;
   left: 50%;
   >svg 
      {
         fill: white;
      }
   /* transform: translate( 50%, -50%); */
   background-color: ${props => props.theme.colors.primarybg}; 
   border-radius: 5px;
   /* padding-top: 89px; */
   display: flex;
   align-items: center;
   flex-direction: column;
   padding-top : 89px;
   @media  only screen and (max-width: 768px) {
      width: 70%;
      min-width: 70%;
      right: 50%;
      transform: translate(50%, -50%);
}
#TermsCond{
   margin-top: 80px;
   width: 100%;
   text-align: center;
   align-items: center;
   font-size: ${props => props.theme.fontSize.s};
   color: ${props => props.theme.colors.primaryText};
   text-decoration: underline;
}
`;
const Title = styled.div`
   font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.primaryText};;
   font-size:  ${props => props.theme.fontSize.xl}; 
   font-weight: 500;
   margin-top: 50px;
   margin-bottom: 13px;
   /* object-fit : contain; */
   `;
const Description = styled.div`
   margin-bottom: 57px;
   /* width: 100%; */
   font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.primaryText};;
   font-size:  ${props => props.theme.fontSize.l}; 
   font-family: 'Poppins' , sans-serif;
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 25px;
   display: flex;
   text-align: start;
   /* position: relataive; */
   /* display: flex; */
   width: 500px;
   padding: 10px;
   color: #FFFFFF;
   opacity: 0.8;
`;

interface ButtonProps {
   isIcon? : boolean,
   type? : "primary" | "secondary" ,
   text? : string
   icon? : React.ReactElement,
   onClick? : (e?: any)=> void;
   size ? : "small" | "big";
   cursor: string

}
interface ButtonStyleProps {
   isIcon? : boolean | undefined,
   typeS? : string ,
   size ? : "small" | "big"; 
   cursor?: string
}
export  function Button(props :ButtonProps ) {
  return (
    <LoginButtonStyle cursor={props.cursor} size={props.size} isIcon={props.isIcon} onClick={props.onClick} typeS={props.type}>
      {props?.icon}
      {props.text}
    </LoginButtonStyle>
  )
}

const LoginButtonStyle = styled.button<ButtonStyleProps>`
/* margin: 0 auto; */
   padding: 5px 10px;
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
