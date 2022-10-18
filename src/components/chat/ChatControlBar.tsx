import React  , {useState} from 'react'
import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';
import {ReactComponent as Group} from "../../assets/imgs/users.svg";
import {ReactComponent as Ban} from "../../assets/imgs/ban.svg";
import {ReactComponent as Mute} from "../../assets/imgs/mute.svg";
import { Button } from '../../Pages/SignIn';
import Modal from '../Modal';
import MembersChatModal from '../modals/MembersChatModal';

interface UserProp {
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number
    losses : number
  }
  
  interface usersType {
  
    defaultAvatar: string,
    login : string
    displayName : string,
    restriction: string,
    restrictionTime: string,
    duration: number,
  }
  
  interface convType {
    nbMessages: number,
    lastUpdate: string,
    access : string,
    channelId: number,
    name: string;
    password: string,
    picture : string,
    users: usersType[]
  }


export default function ChatControlBar(props :{data : convType }) {

  const [hide, sethide] = useState(false)

  return (
    <ContoleStyle>
        <div className='avatar'>
            {
                props.data?.access === "DM" ? 
                  <AvatarComponent img={props.data?.users[1].defaultAvatar}/>
                
                :
                <AvatarComponent img={props.data?.picture}/>
            }

        </div>
        {
    props.data?.access === "DM" ? 
        <div className='name'>
                  {props.data?.users[1].displayName} 
        </div>
                :
        <div className='name'>
                  {props.data?.name}
                
        </div>
            }
   <div className='buttons'>
                
   <Button cursor="default" isIcon={true} onClick={()=>{sethide(true)}} icon={<Group/>}/>
   {hide &&  <Modal
                    isOpen={hide}
                    onRequestClose={() => sethide(false)}
                    hideModal={() => sethide(false)}
                 >
                  <MembersChatModal closeModal={()=>sethide(false) } />
                 </Modal>
            }
   <Button cursor="default" isIcon={true} onClick={()=>{}} icon={<Ban/>}/>
   <Button  cursor="default" isIcon={true} onClick={()=>{}} icon={<Mute/>}/>
        </div>

    </ContoleStyle>
  )
}

const ContoleStyle = styled.div`

    position: relative;
    display: flex;
    align-items: center;
      flex-direction: column;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      gap: 5px;
      font-family: 'Poppins', sans-serif;

        >.avatar{
            margin-top: 100px;
            width: 200px;
            height: 200px;
        }
        >.name{
            color : #FFF;
            /* width: 100%; */
            margin:  15px auto;
            font-size:  ${props => props.theme.fontSize.xl};
            font-weight : 600;
            text-align: start ;
            display: flex;
            align-items: center;
            justify-content: center;
            /* width: 200px;
            height: 200px; */
        }
       > .buttons{
          margin:  0 auto;
          display: flex;
          gap: 10px;
        }
        >.members{
          width: 100%;
          margin:  30px auto;
          display: flex;
          gap: 10px;
        }
    
`;
