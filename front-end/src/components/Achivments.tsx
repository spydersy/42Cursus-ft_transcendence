import React from 'react'
import styled , {css} from "styled-components";
import Badge1 from "../assets/imgs/Archive/badge1.svg";
import Badge2 from "../assets/imgs/Archive/badge2.svg";
import Badge3 from "../assets/imgs/Archive/badge3.svg";
import Badge4 from "../assets/imgs/Archive/badge4.svg";
import Badge5 from "../assets/imgs/Archive/badge5.svg";
import Badge7 from "../assets/imgs/Archive/badge7.svg";
import Modal from './Modal';

const achievment5 = {
    name: "Walo",
    desc : "play 3 batteles in the grand Line",
    badge : Badge1,
  }
const achievment2 = {
    name: "Camillion",
    desc : "Change Avatar.",
    badge : Badge2,
  }

const achievment3 = {
    name: "Blockuu",
    desc : "Block a user fih sda3.",
    badge : Badge4 ,
  }
const achievment4 = {
    name: "Win vs AI",
    desc : "Defeate the powerful Legend  Dr VegaPunk.",
    badge : Badge3 ,
  }
const achievment1 = {
    name: "ROOOM",
    desc : "Create Your first Channel",
    badge : Badge5 ,
  }
  const achievment7 = {
    name: "OYAJI",
    desc : " Enable the F 2FA",
    badge : Badge7 ,
  }

export interface StyleProps { status: boolean; }

const achiv = [achievment1 , achievment2 , achievment3 , achievment4, achievment5, achievment7]

export interface AchivementsProps { data: [] }

export interface AchiveStyleProps { status: boolean; }

export default function Achivments(props: AchivementsProps) {
  return (
    <AchiStyle>
      
        <div className='cont'>
        {
            achiv.map((data : any, id : number)=>{
               return (
                <Conty key={id} name={data.name} desc={data.desc} statue={props.data[id]} badge={data.badge} />
              )
            })
        }
        </div>

    </AchiStyle>
  )
}

export  function Conty(props : {statue : boolean , name : string , desc : string , badge : any}) {
  const [show, setshow] = React.useState(false)
  return (
    <ContyStyle onClick={()=>{setshow(!show)}} status={props.statue} >
      {show && <Modal isOpen={show}
                  onRequestClose={() => {setshow(false)}}
                  hideModal={() => {setshow(false) }}
                  >
                      <ModalStyle status={false} className='modal'>
                        <img  src={props.badge} alt={props.name} />

                        <div className='name'>{props.name}</div>
                        <div className='desc'>{props.desc}</div>
                      </ModalStyle>  
                  </Modal>
                        
              }
    <ToolTip>{props.name} </ToolTip>
      <img  src={props.badge} alt={props.name} />
  </ContyStyle>
  )
}

const AchiStyle = styled.div`
background-color: #1c70b517;
border-radius : 10px;
width: 100%;
left: 0px;
display: flex;
flex-direction: row;
align-items: flex-start;
margin: 35px 0px;

.head{
    color : ${props => props.theme.colors.seconderyText};
}

.cont{
    top: 0px;

    min-width:100%;
    display: flex;
    flex-direction: row;
    align-items:center;
    flex-wrap: wrap;
    >img{
        /* margin : 0px 0px; */
        filter: grayscale(100%);
    }

}
`
const ModalStyle = styled.div<AchiveStyleProps>`
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 100%;

    >img{
      width: 200px;
      height: auto;
      margin: 20px 0px;
    }
    font-size: "Poppins" , sans-serif;
    >.name{
      font-size: 30px;

    }
`;
const ContyStyle = styled.div<AchiveStyleProps>`
  display: flex;
  flex-direction: row;
  align-items:center;
  /* border: 1px solid #af1998; */
  /* border-style: inset; */
  position: relative;

  &:hover{
        > span{
            visibility: visible;
					opacity: 1;
        }


    }
  >img{
    margin : 2px 8px;
    padding: 0px;
    ${props => props.status === true ? css`
      filter: grayscale(0%); ` :
    css`
      /* filter: grayscale(100%); */
      /* filter: blur(0.9px); */
      filter: brightness(15%);
      `}
  }
`
const ToolTip = styled.span`
        display: inline-block;
				position: absolute;
				background-color: #ffffffb5; 
				padding: 8px 12px;
				border-radius: 3px;
				/* margin-top: -26px; */
				bottom: calc(-40%);
				opacity: 0.5;
				visibility: hidden;
				font-size: 10px;
				letter-spacing: .9px;
        transition: all .2s ease-in;
        font-weight: 500;
				/* border: 1px solid ${props => props.theme.colors.border}; */
        z-index: 3;
				&:before {
          z-index: 13;
          content: '';
					display: block;
					position: absolute;
					left: 50%;
          top: -5px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
          background-color: #c0bbbbce; 
				}
`;
