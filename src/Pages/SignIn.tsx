import React from 'react'
import styled , {keyframes} from "styled-components"
import CoverImg from "../assets/imgs/cover.png"
import PatternImg from "../assets/imgs/pattern.png"
import FtImg from "../assets/imgs/42Icon.svg"
//todo env file
const url = "https://api.intra.42.fr/oauth/authorize?client_id=b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code"
export default function SignIn() {
  return (
    <Wrraper>
      <CoverCnt>
         <div>
            PingPong<br/>Time
         <Bloc>
            <Title>
            Welcome Back!
            </Title>
            <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in.
            </Description>
            <LoginButton href={url} >
               <img src={FtImg} alt="42logo" />
               Login with intra
            </LoginButton>
            <a id="TermsCond" href="#termscondPage">Terms & conditions</a>
         </Bloc>
         </div>

      </CoverCnt>
      <RightComponent>
         <img src={PatternImg}/>
      </RightComponent>
   </Wrraper>
  )
}
const breatheAnimation = keyframes`
 0% { transform: translateY(0) }
 50% { transform: translateY(10px)  }
 100% { transform: translateY(0)  }
`
const Wrraper = styled.div`

   width: 100vw;
   height: 100vh;
   display: flex;
   
`;

const CoverCnt = styled.div`
   background: url(${CoverImg})   no-repeat ;
   background-size: 100% 100%;
   width: 45%;
   min-width: 550px;
   height: 100%;
   position: relative;
   @media  only screen and (max-width: 768px) {
      width: 100%;
      min-width: 100%;
      >div{
         justify-content: start;
      }
}
   > div {
      width: 100%;
      height: 100%;
      /* background: linear-gradient(152.83deg, rgba(138, 138, 138, 0.3) 0%, rgba(66, 134, 244, 0.3) 100%); */
      /* opacity: 0.3; */
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      text-align: start;
      font-family: 'Michroma';
      font-size: 52px;
      color: ${props => props.theme.colors.primaryText};
      line-height: 74px;
      margin-left: 100px;
   }
`;
const RightComponent = styled.div`
   width: 60%;
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
   /* overflow: hidden; */
   @media  only screen and (max-width: 768px) {
      display: none;
    
}
   img{
    
      object-fit: cover;
      width: 100%;
      height: 100%;

   }
`;
const Bloc = styled.div`
   position: absolute;
   top: 50%;
   right: 20%;
   width: 90%;
   min-width: 500px;
   max-width: 500px;
   height: 400px;
   transform: translate(100%, -50%);
   background: #FFFFFF;
   border-radius: 5px;
   padding: 30px;
   display: flex;
   align-items: flex-start;
   flex-direction: column;
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
   color: ${props => props.theme.colors.primarybg};
   text-decoration: underline;
}
`;
const Title = styled.div`
   font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.primarybg};;
   font-size:  ${props => props.theme.fontSize.xl}; 
   font-weight: 500;
   margin-bottom: 15px;
   /* object-fit : contain; */
`;
const Description = styled.div`
font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.primarybg};;
   font-size:  ${props => props.theme.fontSize.l}; 
   font-weight: 500;

   line-height: 25px;
   opacity: 0.8;
   text-align: left;
   max-height: 170px;
   height: 200px;
`;
const LoginButton = styled.a`
margin: 0 auto ;
padding: 0 5px;
width: 250px;
height: 40px;
left: 341px;
top: 238px;

background: linear-gradient(91.7deg, #1F8DD0 1%, #154A6B 99.47%);
border-radius: 5px;

box-shadow: 0 12px 14px rgba(21, 125, 189, 0.5);
cursor: pointer;
border: none;
display: flex;
align-items: center;
justify-content: space-around;
img{
   width: 34px;
   height: 24px;
}

   font-family: 'Poppins' sans-serif;
   font-weight: 500;
   font-size:  ${props => props.theme.fontSize.l}; 
   color: #FFFFFF;
   animation-name: ${breatheAnimation};
   animation-duration: 3s;
   animation-iteration-count: infinite;

`;
