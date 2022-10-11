import React from 'react'
import styled from "styled-components";
import Badge1 from "../assets/imgs/Archive/badge1.svg";
import Badge2 from "../assets/imgs/Archive/badge2.svg";
import Badge3 from "../assets/imgs/Archive/badge3.svg";
import Badge4 from "../assets/imgs/Archive/badge4.svg";

const achievment1 = {
    name: "SERGENT",
    desc : "you played 20 game without any loss",
    badge : Badge1,
    on: true,
  }
const achievment2 = {
    name: "The Alchemist",
    desc : "You are a M9WED player by nature",
    badge : Badge2,
    on: true,

  }
const achievment3 = {
    name: "MASTER",
    desc : "you win 5 game.",
    badge : Badge3 ,
    on: true,

  }
const achievment4 = {
    name: "MASTER",
    desc : "you win 5 game.",
    badge : Badge4 ,
    on: true,

  }

  export interface StyleProps {
    status: boolean;
}

const achiv = [achievment1 , achievment2 , achievment4 , achievment3]

export default function Achivments() {
  return (
    <AchiStyle>
        {/* <HeadComponent title="Achivments"/> */}
        {/* <div className='head'>Achivments : </div> */}
        <div className='cont'>
        {
            achiv.map((data : any, id : number )=>{
               return (
                   ( data.on) ?
                  <div className='conty' style={{ filter: "grayscale(-50%) " }} >
                        <img key={id} src={data.badge} alt={data.name} />
                  </div> :  

                  null
                )
                
            })
        }
        </div>
    </AchiStyle>
  )
}

  
const AchiStyle = styled.div`
background-color: #8519798b;
border-radius : 10px;
/* background:  ${props => props.theme.colors.seconderybg}; */
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;

.head{
    color : ${props => props.theme.colors.seconderyText};
}

.cont{
    /* margin: 5px 0; */

    width:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items:center;
    >img{
        margin : 0px 10px;
        filter: grayscale(100%);
    }
}

.conty{
    /* margin: 5px 0; */
  
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items:center;
    padding: 0px 15px;

    >img{
      margin : 0px 10px;
      /* filter: grayscale(50%); */
    }
  }
`