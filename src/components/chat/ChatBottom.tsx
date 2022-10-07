import React , {useEffect,useState ,useContext, useRef}from 'react'
import {ReactComponent as  SearchIcon} from "../../assets/imgs/search.svg"
import {ReactComponent as Group} from "../../assets/imgs/users.svg";
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";
import {ReactComponent as SendIcon} from "../../assets/imgs/send-icon.svg";
import { SocketContext } from '../../context/Socket';
import styled  from "styled-components"
import axios from 'axios';

// interface chatType {
//     id: string,
//     msg: string,
  
// }
// interface convType {
//   name : string,
//   avatar : string,
//   messages : chatType[]
// }

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
  setList: (e : any) => void,
  list: convType[],
  index : number
}

export default function ChatBottom(props: ChatProps) {
    const socket = useContext(SocketContext)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    var mesg : string = "";
    const addMessage = ()=>{
        if (inputRef.current?.value)
        {
          mesg =  inputRef.current.value;
          inputRef.current.value = "";
        }
        var msgtmp : string =  mesg;
        //validation layer (restrictions)
        socket.emit('chatToServer', msgtmp);
        /////

        var  bodyFormData = new FormData();
        console.log(props.list[props.index].channelId )
        bodyFormData.append('content',msgtmp);
        bodyFormData.append('channelId',props.list[props.index].channelId + "");
        console.log(bodyFormData.getAll('content'))
        //
        axios.post("http://localhost:8000/chat/sendMessage" ,{ "content" : msgtmp,
        'channelId' : props.list[props.index].channelId + ""
      }, 
        {withCredentials: true} 
      ).then((res)=>{
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
        })
    }
    const recievedMessgae = (payload: any) => {
        // var listtmp =  props.list;
        // alert(payload +  props.index);
        // const obj = {
        //   name: "reda",
        //   message: payload
        // }
        // listtmp[props.index].users.push(obj);
        // listtmp[props.index].messages.push(obj.message);
        // props.setList([...listtmp ]);
    }

    useEffect(() => {
      socket.on('connect', () => {
      });
      socket.on('chatToClient', (payload) => {
          recievedMessgae(payload);
      });
      return () => {

      }
  }, [props.index])
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
  