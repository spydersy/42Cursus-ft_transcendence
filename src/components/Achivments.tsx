import Tooltip from '@mui/material/Tooltip';
import React from 'react'
import styled , {css} from "styled-components";
import Badge1 from "../assets/imgs/Archive/badge1.svg";
import Badge2 from "../assets/imgs/Archive/badge2.svg";
import Badge3 from "../assets/imgs/Archive/badge3.svg";
import Badge4 from "../assets/imgs/Archive/badge4.svg";
import Badge5 from "../assets/imgs/Archive/badge5.svg";
import Badge6 from "../assets/imgs/Archive/badge6.svg";
import Badge7 from "../assets/imgs/Archive/badge7.svg";
import Badge8 from "../assets/imgs/Archive/badge8.svg";



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

export interface StyleProps { status: boolean; }

const achiv = [achievment1 , achievment2 , achievment3 , achievment4, achievment2, achievment4, achievment3, achievment3]

export interface AchivementsProps { data: [] }

export interface AchiveStyleProps { status: boolean; }

const ContyStyle = styled.div<AchiveStyleProps>`
  display: flex;
  flex-direction: row;
  align-items:center;
  /* border: 1px solid #af1998; */
  /* border-style: inset; */
  >img{
    margin : 3px 15px;
    padding: 3px;
    ${props => props.status === true ? css`
      filter: grayscale(0%); ` :
    css`
      /* filter: grayscale(100%); */
      /* filter: blur(0.9px); */
      filter: brightness(20%);

      `}
  }
`

export default function Achivments(props: AchivementsProps) {
  return (
    <AchiStyle>
      
        <div className='cont'>
        {
            achiv.map((data : any, id : number)=>{
               return (
                 <ContyStyle status={props.data[id]} >
                    <Tooltip title={data.name} arrow>
                      <img key={id} src={data.badge} alt={data.name} />
                    </Tooltip>
                  </ContyStyle>
              )
            })
        }
        </div>

    </AchiStyle>
  )
}

const AchiStyle = styled.div`
/* background-color: #85197936; */
border-radius : 10px;
width: 80%;
display: flex;
flex-direction: row;
align-items: flex-start;

.head{
    color : ${props => props.theme.colors.seconderyText};
}

.cont{
    min-width:100%;
    display: flex;
    flex-direction: row;
    align-items:center;
    flex-wrap: wrap;
    >img{
        margin : 0px 5px;
        filter: grayscale(100%);
    }
}
`