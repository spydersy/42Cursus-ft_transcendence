import React , {useState} from 'react'
import styled from "styled-components"

import Fadi from "../assets/imgs/avatar/ael-fadi.jpeg";
import Modal from './Modal';
import JoinGroupModal from './modals/JoinGroupModal';
import { ReactComponent as Lock} from "../assets/imgs/lock-01.svg"


  interface RoomProps{
    isLocked : boolean,
    roomBanner: string,
    roomName : string,
    roomMembers : number
    id: number
  }
export default function RoomComponent(props : RoomProps) {
  const [hideModel, sethideModel] = useState(false)

  return (
    <RoomStyle onClick={()=>sethideModel(!hideModel)} >
        <div className='banner'>
            <img src={props.roomBanner} alt="banner" />
        </div>
        <div className='desc'>
            <div className='name'>
                    {props.isLocked  && <Lock/>}
                    
                    {props.roomName}
            </div>
                <div className='members'>
                    {props.roomMembers} Members
                </div>
        </div>
        {hideModel &&  <Modal
        isOpen={hideModel}
        onRequestClose={() => sethideModel(false)}
        hideModal={() => sethideModel(false)}
      >
    <JoinGroupModal link={props.id} isLocked={props.isLocked} />
      </Modal>}
    </RoomStyle>
  )
}

const RoomStyle = styled.div`
cursor: pointer;
    width: 240px;
    height: 190px;
    background-color: ${props => props.theme.colors.bg };
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .banner{
        border-radius: 10px;
        width: 100%;
        height: 140px;
        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .desc{
        
        display: flex;
        flex: 1;
        align-items: center;

        >.name{
            font-family: "Poppins", sans-serif;
            color: ${props => props.theme.colors.primaryText };
           flex: 1;
            margin: 0 auto ;
            display: flex;
            font-weight: 600;
            align-items: center;
            gap: 5px;
            >svg{
              >path{
                stroke: #FFF;
              }
            }
            
        }
        >.members{
            font-family: "Poppins", sans-serif;
            color: #FFF;
 margin-right: 5px;
            display: flex;
            font-weight: 700;
            align-items: center;
            justify-content: space-between;
        
            font-size: 12px;
            opacity: 0.7;
        }
    }
`;