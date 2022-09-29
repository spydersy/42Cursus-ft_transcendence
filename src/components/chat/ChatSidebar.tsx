import React , { useState}from 'react'
import {ReactComponent as Group} from "../../assets/imgs/users.svg";
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";

import styled  from "styled-components"
import { Button } from '../../Pages/SignIn';
import Modal from '../Modal';
import CreateGroup from '../modals/CreateGroup';
import { AvatarComponent } from '../PlayerProfile';

  interface chatType {
    id: string,
    msg: string,
  
  }
  interface ChatProps {
    // setList: (e : any) => void,
    list:  convType[]
    setcurrentConv : (e: number)=>void,
    currentConv : number,
  }
  interface convType {
    name : string,
    avatar : string,
    messages : chatType[]
  }

export default function ChatSidebar(props : ChatProps) {
 
    const [hide, sethide] = useState(false)
    return (
      <ChatSidebarStyle>
          
          <div className='title'>
              Chat
              <Button onClick={()=>sethide(!hide)} icon={<Group/>}/>
              {hide &&  <Modal
                    isOpen={hide}
                    onRequestClose={() => sethide(false)}
                    hideModal={() => sethide(false)}
                 >
                  <CreateGroup/>
                 </Modal>
            }
          </div>
          <div className='conversation'>
                {props.list.map((data : any , id : number)=>{
                    return  < ConversationComponent onClick={()=>{
                        props.setcurrentConv(id)
                    }} key={id} messages={data.messages} name={data.name} avatar={data.avatar}  active={id === props.currentConv} />
                })}
    
          </div>
  
      </ChatSidebarStyle>
    )
  
}

const ChatSidebarStyle = styled.div`
  
  width: 100%;
  height: 100%;
  /* padding: 5px  5px; */
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
    .title{

        color :${props => props.theme.colors.seconderyText}; 
        height: 80px;
        width: 95%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        font-size:  ${props => props.theme.fontSize.xl};
        font-family: 'Poppins', sans-serif;
        font-weight : 600;
        text-align: start ;
        display: flex;
        align-items: center;
        justify-content: space-between;
       
        }
    
    .searchbar{

        width: 95%;
        height: 40px;
      margin:10px auto;
        color :${props => props.theme.colors.seconderyText}; 

        font-size:  ${props => props.theme.fontSize.l};
        font-family: 'Poppins', sans-serif;
        font-weight : 400;
        position: relative;
         > svg{
              position: absolute;
            left: 10px; 
            top: 60%; 
            transform: translateY(-50%);
         }
        
    }
    .conversation{
      flex: auto;
      
      /* margin-top: 50px; */
      width: 95%;
      
      margin:  0 auto;

      display: flex;
      align-items: flex-start;

      flex-direction: column;
      

    }
`
interface ConvProps{
    name : string,
    avatar : string, 
    messages: chatType[],
    onClick : ()=>void,
    active : boolean
}

export  function ConversationComponent(props : ConvProps) {


    
    return (
        <ChatMesgstyle active={props.active}onClick={props.onClick}>
  
          <Avatar>
            <AvatarComponent img={Mamali}/>
          </Avatar>
          <div className='mesgData'>
            <div className='name'>
             { props.name}
            </div>
              {
              <div className='msg'>
              {props.messages[props.messages.length - 1].msg}
            </div>
              }
          </div>
          <div className='time'>
            3min ago
          </div>
  
          
        </ChatMesgstyle>
    )
  }
  const Avatar = styled.div`
    margin-left : 5px;
    width: 50px;
    height: 50px;
  `
  interface chatprop{
    active : boolean
  }
    const ChatMesgstyle = styled.a<chatprop>`
   
      height: 70px;
      width: 100%;
    position: relative;
      border-radius: 5px;
      align-items: center;
      display: flex;
      
      margin-bottom: 10px;
      ${props => (props.active === true) && `
      background-color:  #0E1117;
      `}
      &:hover{
        /* border :1px solid ${props => props.theme.colors.seconderybg};  */
        background-color: ${props => props.theme.colors.bg};
      }
       .mesgData{
        margin-left: 12px;
        height: 40px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        .name{
          color:  ${props => props.theme.colors.primaryText};
  
        }
        .msg{
          font-size: 15px;
          opacity: 0.7;
          color:  ${props => props.theme.colors.seconderyText};
        }
  
      }
      .time{
        position: absolute;
        top: 10px;
        right: 10px;
        color: ${props => props.theme.colors.purple};
        font-size: 10px;
      }
    `;
  