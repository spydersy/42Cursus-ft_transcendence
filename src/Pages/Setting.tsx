import React from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from './Home';
import Img from "../assets/imgs/avatar/a1.png";
import {ReactComponent as Edit} from "../assets/imgs/edit.svg";
import { AvatarComponent } from '../components/PlayerProfile';
import Input from '../components/Input';

export default function Setting() {
  return (
    <SetStyle className='container' style={{marginTop: "100px"}}>
        <HeadComponent title="Setting" />
        <Avatar>
            <AvatarComponent img={""}/>
        </Avatar>
        <Line></Line>
        
            TODO
    </SetStyle>
  )
}

const SetStyle = styled.div`
    height: 500px;
    background-color: ${props => props.theme.colors.seconderybg};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;
const Avatar = styled.div`
   width: 200px;
   height: 200px;
   background-color: ${props => props.theme.colors.bg};
    position: relative;
    border-radius: 50%;
    border: 0.5px solid ${props => props.theme.colors.primaryText};

    .ava{
        overflow: hidden;
        width: 100%;
        height: 100%;
        > img{
            width: 100%;
            height: 100%;
        }
    }
`;
const EditStyle = styled.div`
position: absolute;
    width: 30px;
            height: 30px;
        background-color: ${props => props.theme.colors.bg};

        bottom: 11px;
        right: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center ;
        cursor: pointer;
            /* background-color: ; */
        >svg{
            width: 20px;
            height: 20px;
      
            /* height: ; */
            path {
                stroke: ${props => props.theme.colors.seconderyText};;
            }
        }
`;

const Line = styled.div`
margin: 20px 0;
    width: 100%;
            height: 1px;
            opacity: 0.5;
        background-color: ${props => props.theme.colors.seconderyText};

       
    
`;
