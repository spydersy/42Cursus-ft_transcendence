import React , {useContext, useRef }from 'react'
import {ReactComponent as SendIcon} from "../../assets/imgs/send-icon.svg";
import { SocketContext } from '../../context/Socket';
import styled  from "styled-components"
import { UserContext } from '../../context/UserContext';
import { UserProp } from '../game/types';

interface usersType {
  id : string ,
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
  setList: (e : any) => void,
  list: convType[],
  data : convType,
  setcurrentConv : (e : any)=>void,
  msgs : any,
  empty : boolean

}

export default function ChatBottom(props: ChatProps) {
    const socket = useContext(SocketContext)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    var mesg : string = "";
 const User = useContext(UserContext)
    
    const addMessage = ()=>{
      // var s : string | null = localStorage.getItem('user');
      // var data: usersType ;
      User.then((data : UserProp | "{}")=>{
        if (data !== "{}")
        {
          if (inputRef.current?.value)
          {
            mesg =  inputRef.current?.value;
            mesg =  mesg.trim();
            if (mesg !== "")
            {
              inputRef.current.value = "";
              var msgtmp = {
                userId: data.id,
                content: mesg,
                channelId:  props.data?.channelId,
                login: data.login
              }
              //validation layer (restrictions
        
              socket.emit('chatToServer', msgtmp);

            }

        }
        }
      })
     
    }

    // useEffect(() => {
    //   inputRef.current?.addEventListener('keydown', (e : any)=>{
    //     if (e.code === "Enter")
    //     {
    //       if (props.data.channelId !== 0)
    //         addMessage()
    //     }
    //   });
    //   inputRef.current?.removeEventListener('keydown', (e : any)=>{
    //     if (e.code === "Enter")
    //     {
    //       if (props.data.channelId !== 0)
    //         addMessage()
    //     }
    //   });

    
    
    // }, [props.data])
    
   
  
    return (
      <BottomChatStyle>
        <textarea ref={inputRef} 
          placeholder='Write something ..' />
        <button onClick={addMessage}>
          Send
          <SendIcon/>
        </button>
      </BottomChatStyle>
    )
  }
    const BottomChatStyle = styled.div`
      margin: 0 auto;
       width: 95%;
       height: 70%;
       display: flex;
       align-items: center;
       justify-content: space-between;
       gap: 20px;
       > textarea{
        flex: auto;
        height: 100%;
        background-color:  ${props => props.theme.colors.bg};
        border: none;
        outline: none;
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: 5px;
        color : ${props => props.theme.colors.primaryText};
  
       }
       >button{
        background-color:  ${props => props.theme.colors.purple};
        border: 1px solid ${props => props.theme.colors.border};
  
        height: 100%;
        width: 150px;
        border-radius: 5px;
        outline: none;
        /* border: none; */
        color : ${props => props.theme.colors.primaryText};
        font-family: 'Poppins', sans-serif;
        font-size:  ${props => props.theme.fontSize.l};;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        >svg{
          path{
            stroke:  ${props => props.theme.colors.primaryText};
          }
        }
       }
    `;
  