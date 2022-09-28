

import React , { useRef}from 'react'
import {ReactComponent as SendIcon} from "../../assets/imgs/send-icon.svg";

import styled  from "styled-components"

interface chatType {
    id: string,
    msg: string,
  
  }
  interface convType {
    name : string,
    avatar : string,
    messages : chatType[]
  }
interface ChatProps {
    setList: (e : any) => void,
    list: convType[],
    index : number
  }

export default function ChatBottom(props: ChatProps) {

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const addMessage = ()=>{
  
        var mesg : string = "";
        if (inputRef.current?.value)
        {
          mesg =  inputRef.current.value
          inputRef.current.value = ""
        }
        
        if (mesg === "")
          return ;
        var msgtmp : chatType =  {
          id: "1",
          msg: mesg
        }
        var listtmp =  props.list;

        //
        
        listtmp[props.index].messages.push(msgtmp)

        props.setList([...listtmp ])
    }
   
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
  