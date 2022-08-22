import React from 'react'
import styled , {keyframes} from "styled-components"
import CoverImg from "../assets/imgs/cover.png"
import PatternImg from "../assets/imgs/pattern.png"
import FtImg from "../assets/imgs/42Icon.svg"
export default function SignIn() {
  return (
    <Wrraper>
      <CoverCnt>
         <div>
            
         </div>
      </CoverCnt>
      <RightComponent>
         <img src={PatternImg}/>
         <Bloc>
            <Title>
            Welcome Back!
            </Title>
            <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae nunc in.
            </Description>
            <LoginButton>
               <img src={FtImg} alt="42logo" />
               Login with intra
            </LoginButton>
            <a href="#termscondPage">Terms & conditions</a>
         </Bloc>
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
width: 40%;
height: 100%;
   > div {
      width: 100%;
      height: 100%;
      background: linear-gradient(152.83deg, rgba(138, 138, 138, 0.3) 0%, rgba(66, 134, 244, 0.3) 100%);
      /* opacity: 0.3; */
   }
`;
const RightComponent = styled.div`



   position: relative;

   width: 60%;
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
   /* overflow: hidden; */

   img{
    
      object-fit: cover;
      width: 100%;
      height: 100%;

   }
`;
const Bloc = styled.div`
   position: absolute;
   top: 50%;
   left: -100px;
   width: 650px;
   height: 400px;
   transform: translate(0%, -50%);
   background: #FFFFFF;
   border-radius: 5px;
   padding: 30px;
   display: flex;
   align-items: flex-start;
   flex-direction: column;
a{
   margin-top: 80px;
   width: 100%;
   text-align: center;
   align-items: center;
   font-size: ${props => props.theme.fontSize.s};
   color: ${props => props.theme.colors.primarybg};
}
`;
const Title = styled.div`
   font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.seconderyText};;
   font-size:  ${props => props.theme.fontSize.xl}; 
   font-weight: 500;
   margin-bottom: 15px;
   /* object-fit : contain; */
`;
const Description = styled.div`
font-family: 'Poppins', sans-serif;
   color:  ${props => props.theme.colors.seconderyText};;
   font-size:  ${props => props.theme.fontSize.l}; 
   font-weight: 500;

   line-height: 25px;
   opacity: 0.8;
   text-align: left;
   max-height: 170px;
   height: 200px;
`;
const LoginButton = styled.button`
margin: 0 auto ;
padding: 0 30px;
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
