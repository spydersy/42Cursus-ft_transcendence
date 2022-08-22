import React from 'react'
import styled from "styled-components"
import CoverImg from "../assets/imgs/cover.png"
export default function SignIn() {
  return (
    <Wrraper>
      <CoverCnt>
        <Cover src={CoverImg} alt="cover" />
      </CoverCnt>
      <RightComponent>
        <ProjectTitle>
        Last but not least ft_transcendence
        </ProjectTitle>
      </RightComponent>
   </Wrraper>
  )
}

const Wrraper = styled.div`

   width: 100vw;
   height: 100vh;
   display: flex;
    
`;
const Cover = styled.img`

   width: 100%;
   height: 100%;
   object-fit : fill;
   `;
const CoverCnt = styled.div`


   width: 50%;
   height: 100%;
`;
const RightComponent = styled.div`

   width: 50%;
   height: 100%;
   background-color: #E5E5E5;
   /* object-fit : contain; */
`;
const ProjectTitle = styled.div`
  font-family: 'Inter', sans-serif;

   /* object-fit : contain; */
`;
