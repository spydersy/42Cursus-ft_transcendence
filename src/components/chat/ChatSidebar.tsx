import React , { useState}from 'react'
import {ReactComponent as Group} from "../../assets/imgs/users.svg";
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";

import styled  from "styled-components"
import { Button } from '../../Pages/SignIn';
import Modal from '../Modal';
import CreateGroup from '../modals/CreateGroup';
import { AvatarComponent } from '../PlayerProfile';
import { Link } from 'react-router-dom';

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

  interface ChatProps {
    // setList: (e : any) => void,
    list:  convType[]
    setcurrentConv : (e: any)=>void,
    setState : (e: number)=>void,
    state : number,
    currentConv : number,
  }
export default function ChatSidebar(props : ChatProps) {
  const pageName = window.location.pathname.split("/")[2];
 
    const [hide, sethide] = useState(false)
    return (
      <ChatSidebarStyle>
          <div className='title'>
              Chat
              <Button  isIcon={true} onClick={()=>sethide(!hide)} icon={<Group/>}/>
              {hide &&  <Modal
                    isOpen={hide}
                    onRequestClose={() => sethide(false)}
                    hideModal={() => sethide(false)}
                 >
                  <CreateGroup closeModal={()=>sethide(false) } />
                 </Modal>
            }
          </div>
          <div className='conversation'>
                {props.list.map((data : convType , id : number)=>{
        
                   return < ConversationComponent  key={id}onClick={()=>{
                      props.setcurrentConv(data)
                      // window.location.href= data.channelId.toString()
                      if (props.state != -1 )
                        props.setState(1)
                  }}  data={data} active={pageName === data.channelId.toString()} />
                
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
      >a{
        width: 100%;
      }

    }
`
interface ConvProps{
    onClick : ()=>void,
    active : boolean
    data : convType
}

export  function ConversationComponent(props : ConvProps) {
    return (
        <ChatMesgstyle to={"/chat/" + ( props.data.channelId)} active={props.active ? "true" : "false"}onClick={props.onClick}>
          {
            props.data.access === "DM" ?
            <>
              <Avatar>
            <AvatarComponent img={props.data?.users[1].defaultAvatar}/>
          </Avatar>
          <div className='mesgData'>
            <div className='name'>
             { props.data?.users[1].displayName}
            </div>
              {
              <div className='msg'>
              {/* {props.messages[props.messages.length - 1]} */}
            </div>
              }
          </div>
          <div className='time'>
            3min ago
          </div>
            </>
            :
            <>
              <Avatar>
            <AvatarComponent img={props.data.picture}/>
          </Avatar>
          <div className='mesgData'>
            <div className='name'>
             { props.data.name}
            </div>
              {
              <div className='msg'>
              {/* {props.messages[props.messages.length - 1]} */}
            </div>
              }
          </div>
          <div className='time'>
            3min ago
          </div>
            </>

          }
        
        </ChatMesgstyle>
    )
  }
  const Avatar = styled.div`
    margin-left : 5px;
    width: 50px;
    height: 50px;
  `
  interface chatprop{
    active : string
  }
    const ChatMesgstyle = styled(Link)<chatprop>`
   
      height: 70px;
      width: 100%;
    position: relative;
      border-radius: 5px;
      align-items: center;
      display: flex;
      
      margin-bottom: 10px;
      ${props => (props.active === "true") && `
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
  