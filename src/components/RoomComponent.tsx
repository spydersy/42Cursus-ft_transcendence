import React , {useState} from 'react'
import styled from "styled-components"

import Fadi from "../assets/imgs/avatar/ael-fadi.jpeg";
import Modal from './Modal';
import JoinGroupModal from './modals/JoinGroupModal';
import { ReactComponent as Lock} from "../assets/imgs/lock-01.svg"
import CreateGroup , {UpdateGroup} from './modals/CreateGroup';
import InputComponent from './Input';
import { Link } from 'react-router-dom'
import { Button } from '../Pages/SignIn'

interface RoomProps{
    isLocked : boolean,
    roomBanner: string,
    roomName : string,
    roomMembers : number
    id: number
}

export default function RoomComponent(props : RoomProps) {
  const [hideModel, sethideModel] = useState(false)
  const [hideModel1, sethideModel1] = useState(false)

  const [valo, setvalo]= useState(true)

  const enable = () => {
    if (!valo && !hideModel1)
      sethideModel(true)


    setvalo(!valo)
  }
  const disablo = () => {
      console.log(hideModel)
      sethideModel(false)
      console.log(hideModel)
      setvalo(false)
  }
  const UpdateGroupData = ()=>{
    //check for valid input
  //   var  bodyFormData = new FormData();
  //   bodyFormData.append('icone',data.icone);
  //   bodyFormData.append('name',data.name);
  //   bodyFormData.append('members', JSON.stringify(members));
  //   bodyFormData.append('type',check);
  //   if (passRef.current != null)
  //   {
  //       var pass = passRef.current.value;
  //       bodyFormData.append('password',pass);
    
  //   }



  //   console.log("__MEMBERS__DBG__ : ",bodyFormData.getAll("type"))
  //   axios.post("http://localhost:8000/chat/createRoom" , bodyFormData, 
  //   {withCredentials: true} 
  // ).then((res)=>{
  //   console.log(res.data)
  //   props.closeModal()
  // }).catch((err)=>{
  //   // if (data.name === "")
  //       setalert(true)
  //   console.log(err)
  //   })
    
}


  return (
    <RoomStyle onClick={()=>enable()} >
        <div className='banner'>
          <img src={props.roomBanner} alt="banner" />
          {/* <button className='btp'>ALOHA</button> */}
          <div className='Edit'>
                {/* <Link to={`/chat/${props.id}`}> */}
                  <Button onClick={()=>{
                  sethideModel1(true)
                  sethideModel(false)
                }}isIcon={true} icon={<i className="fas fa-edit"></i>}/>
                  {/* </Link> */}
          </div>
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
            onRequestClose={() => {}}
            hideModal={() => {}}
        >

          {/* <UpdateGroup id={""} members={["",""]} setmembers={()=>{}}  closeModal={  ()=>{} } /> */}
          
          <RoomSstyle  >
            {
                props.isLocked === true && 
                <InputComponent type='password' placeholder='Enter Password' />
            }
            <div>
            <Link to={"/chat/" + props.id}>
              <Button text='Join' />
            </Link>
          
            {/* <div>
              <Button type='primary' text='Update' onClick={UpdateGroupData} />
            </div> */}
          
            <Button onClick={ ()=>disablo()} type='secondary' text='Cancel' />


            </div>
          </RoomSstyle>

        </Modal>}


        {hideModel1 &&  <Modal
            isOpen={hideModel1}
            onRequestClose={() => {}}
            hideModal={() => {}}
        >

          <UpdateGroup id={""} members={["",""]} setmembers={()=>{}}  closeModal={  ()=>{} } />
          
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
          top: 0;
          right: 0;
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
`;

const RoomSstyle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    >div{

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > button {
            width: 40%;
        }
    }
`;