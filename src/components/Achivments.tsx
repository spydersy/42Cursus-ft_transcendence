import React from 'react'
import styled ,{css}from "styled-components";
import { HeadComponent } from '../Pages/Home';
import Badge1 from "../assets/imgs/Archive/badge1.svg";
import Badge2 from "../assets/imgs/Archive/badge2.svg";
import Badge3 from "../assets/imgs/Archive/badge3.svg";
import Badge4 from "../assets/imgs/Archive/badge4.svg";

const achievment1 = {
    name: "SERGENT",
    desc : "you played 20 game without any loss",
    badge : Badge1,
  }
const achievment2 = {
    name: "The Alchemist",
    desc : "You are a M9WED player by nature",
    badge : Badge2,
  }
const achievment3 = {
    name: "MASTER",
    desc : "you win 5 game.",
    badge : Badge3 ,
  }
const achievment4 = {
    name: "MASTER",
    desc : "you win 5 game.",
    badge : Badge4 ,
  }
const achiv = [achievment1 , achievment2 , achievment3 , achievment4]
export default function Achivments() {
  return (
    <AchiStyle>
        <HeadComponent title="Achivments"/>
        <div className='cont'>
        {
            achiv.map((data : any, id : number )=>{
               return <img src={data.badge} alt={data.name} />
                
            })
        }

    

        </div>
    </AchiStyle>
  )
}

  
const AchiStyle = styled.div`
height : 200px;
width: 40%;
border-radius : 10px;
background:  ${props => props.theme.colors.seconderybg};
padding: 10px;
display: flex;
/* justify-content: space-between; */
flex-direction: column;
align-items: flex-start;
.cont{
    margin: 20px 0;
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    >img{
        filter: grayscale(100%);
    }
  }
`