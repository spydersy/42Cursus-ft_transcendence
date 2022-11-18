import React , {useState} from 'react'
import styled from "styled-components"
import Modal from './Modal';
import JoinGroupModal from './modals/JoinGroupModal';
import { ReactComponent as Lock} from "../assets/imgs/lock-01.svg"
import  {UpdateGroup} from './modals/CreateGroup';
import { Button } from '../Pages/SignIn'
import {ReactComponent as UserAddIcon} from "../assets/imgs/editRoom.svg";
import {ReactComponent as Edit} from "../assets/imgs/editRoom.svg";

interface RoomProps{
    isLocked : boolean,
    roomBanner: string,
    roomName : string,
    roomMembers : number
    id: number
    ownership : boolean
    type: string
}

export default function RoomComponent(props : RoomProps) {
  const [hideModel, sethideModel] = useState(false)
  const [hideModel1, sethideModel1] = useState(false)
 
  const disabloModel = () => {
      sethideModel1(false)
      sethideModel(false)
    }

  // check ownership to display hideModel1
  return (
    <RoomStyle  >

        <div className='banner' >
          <img src={props.roomBanner} alt="banner" />

          { props.ownership &&
            <div className='Edit'> 
                <Button   onClick={()=>{ sethideModel1(true) 
                sethideModel(false) }}isIcon={true} icon={<Edit/>} />
            </div>
          } 

          { !props.ownership &&
            <div className='Edit1'>
            <Button onClick={()=>{
            sethideModel1(false)
            sethideModel(true)
            }}isIcon={true} icon={<UserAddIcon/>}
            />
            </div>
          }
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

          {/* <UpdateGroup id={""} members={["",""]} setmembers={()=>{}}  closeModal={  ()=>{} } /> */}
          <JoinGroupModal  closeModal={()=>{
            sethideModel(false)
          }} isLocked={props.isLocked}  id={props.id} />

        </Modal>}

        {hideModel1 &&  <Modal
            isOpen={hideModel1}
            onRequestClose={()=>sethideModel1(false)}
            hideModal={() =>sethideModel1(false)}
        >

          <UpdateGroup  type={props.type} banner={props.roomBanner} id={props.id} name={props.roomName} members={["",""]} setmembers={()=>{}}  closeModal={  ()=>sethideModel1(false) } />
        
          <Btpo >
              <Button onClick={ ()=>disabloModel()} type='secondary' text='Cancel' />
          </Btpo>  

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
        position: relative;

        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .btp{
          position: relative;
          display: flex;
          color: #FFF;
          /* top: 50%;
          left: 50%; */
        
        }
        .Edit{
          position: absolute;
          display: flex;
          width: 50px;
          height: 50px;
          top: 0;
          right: 0;
          margin: 10px;
        }
        .Edit1{
          position: absolute;
          display: flex;
          width: 50px;
          height: 50px;
          top: 0;
          left: 0;
          margin: 10px;
        }

      &:hover{
        opacity: 0.8;
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
    .btpo {
      display: flex;
      justify-content: center;
      background-color: #FFF;
    }
`;
const Btpo = styled.div`
  display: flex;
  /* background-color: aquamarine; */

`;