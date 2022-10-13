// import Tooltip from '@mui/material/Tooltip';
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
    name: "NEW-3ANKOUB",
    desc : "you played 20 game without any loss",
    badge : Badge1,
  }

const achievment2 = {
    name: "ONLY-ALCHEMIST",
    desc : "You are a M9WED player by nature",
    badge : Badge2,
  }

const achievment3 = {
    name: "3ANKOUB-MASTER",
    desc : "you win 5 game.",
    badge : Badge3 ,
  }
  
const achievment4 = {
    name: "MOGIWARA",
    desc : " (9owat Sada9a).",
    badge : Badge4 ,
  }
const achievment5 = {
    name: "ROOOOM",
    desc : "(MODMIR aka Yaiba)",
    badge : Badge5 ,
  }
const achievment6 = {
    name: "SASAGAYO",
    desc : "you win 5 game.",
    badge : Badge6 ,
  }
const achievment7 = {
    name: "OYAJI",
    desc : "(Only Golden Promo)",
    badge : Badge7 ,
  }
const achievment8 = {
    name: "MADARA ",
    desc : "(Only Golden Promo)",
    badge : Badge8 ,
  }

export interface StyleProps { status: boolean; }

const achiv = [achievment1 , achievment2 , achievment3 , achievment4, achievment5, achievment6, achievment7, achievment8]

export interface AchivementsProps { data: [] }

export interface AchiveStyleProps { status: boolean; }

const ContyStyle = styled.div<AchiveStyleProps>`
  display: flex;
  flex-direction: row;
  align-items:center;
  /* border: 1px solid #af1998; */
  /* border-style: inset; */
  >img{
    margin : 2px 8px;
    padding: 0px;
    ${props => props.status === true ? css`
      filter: grayscale(0%); ` :
    css`
      /* filter: grayscale(100%); */
      /* filter: blur(0.9px); */
      filter: brightness(12%);
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
                    {/* <Tooltip title={data.name} arrow> */}
                      <img key={id} src={data.badge} alt={data.name} />
                    {/* </Tooltip>  */}
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