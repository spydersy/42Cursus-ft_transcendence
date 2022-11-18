// import axios from 'axios'
import React from 'react'
import styled from "styled-components"
import { ReactComponent as Qr } from '../assets/imgs/QRtest.svg' // put ur qr image path here  
export default function Test() {

  return (
    <Cocoachraf>
        <Qr/>
    </Cocoachraf>
  )
}

const Cocoachraf = styled.div`
display: flex;
align-items: center;

flex-direction: column;
    width : 400px;
    height : 400px;
    background : white;
    display: flex;
    > button {
        width : 200px;
        height : 40px;
        background:  ${props => props.theme.colors.purple};
    }

`;