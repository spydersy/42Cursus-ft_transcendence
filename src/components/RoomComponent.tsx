import React , {useState} from 'react'
import styled from "styled-components"

import Fadi from "../assets/imgs/avatar/ael-fadi.jpeg";
import Modal from './Modal';


  interface RoomProps{
    isLocked : boolean,
    roomBanner: string,
    roomName : string,
    roomMembers : number
  }
export default function RoomComponent(props : RoomProps) {
  const [hideModel, sethideModel] = useState(false)

  return (
    <RoomStyle onClick={()=>sethideModel(!hideModel)} >
        <div className='banner'>
            <img src={Fadi} alt="banner" />
        </div>
        <div className='desc'>
            <div>
                    mohamed
                <div>
                    51 member
                </div>
            </div>
        </div>
        {hideModel &&  <Modal
        isOpen={hideModel}
        onRequestClose={() => sethideModel(false)}
        hideModal={() => sethideModel(false)}
      >
    joinRoomModal
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
        >div{
            font-family: "Poppins", sans-serif;
            color: ${props => props.theme.colors.primaryText };
            width: 95%;
            margin: 0 auto ;
            display: flex;
            align-items: center;
            justify-content: space-between;
            >div{
                font-size: 12px;
                opacity: 0.7;
            }
        }
    }
`;