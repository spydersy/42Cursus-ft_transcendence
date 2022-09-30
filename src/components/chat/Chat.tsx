import React , {useEffect, useState}from 'react'
import styled  from "styled-components"
import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import ChatBottom from './ChatBottom'
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";

interface convType {
  name : string,
  avatar : string,
  messages : chatType[]
}

const msgList = [
    {
      id: "0",
      msg : "salam merhba salam merhba salam merhba salam merhba salam merhba salam merhba", 
    },
    {
      id: "0",
      msg : "kidayr", 
    }
    , {
      id: "1",
      msg : "hamdulah unta ach fiha", 
    }
    , {
      id: "0",
      msg : "mafiha walo hh", 
    }
    , {
      id: "1",
      msg : "hh", 
    },
    {
      id: "0",
      msg : "ewa", 
    }
  ]
const msgList1 = [
    {
      id: "0",
      msg : "salam merhba salam merhba salam merhba salam merhba salam merhba salam merhba", 
    },
    {
      id: "0",
      msg : "kidayr", 
    }
   
  ]
const msgList2 = [
    {
      id: "0",
      msg : "salam merhba salam merhba salam merhba salam merhba salam merhba salam merhba", 
    },
    {
      id: "0",
      msg : "labas", 
    }
   
  ]
const ConversList : convType[] = [
    {

        name : "mamali",
        avatar : Mamali,
        messages: msgList

    },
    {

        name : "hfdyl",
        avatar : Mamali,
        messages: msgList1

    },
    {

        name : "ozakkare",
        avatar : Mamali,
        messages: msgList2

    }
] 
  interface chatType {
    id: string,
    msg: string,
  
  }


export default function Chat() {
    const [list, setlist] = useState(ConversList)
    const [currentConv, setcurrentConv] = useState(0)
  

   
    useEffect(() => {
        
      console.log(list)
      
    }, [list ])
    return (
      <GridContainer id="test" className='container' style={{ marginTop: "100px" }}>
          <div id="right" className='right'>
          <ChatSidebar setcurrentConv={(e)=>{ setcurrentConv(e)
            var test = document.getElementById("test");
            if (test)
            {
              test.style.zIndex = "1"

            }
          }} currentConv={currentConv} list={list}  />
              
          </div>
          <div id="body"className='bodyy'>
            <div  className='top'>
              <ChatHeader name={list[currentConv].name} avatar={list[currentConv].avatar} />
            </div>
            <div className='center'>
  
            <ChatBody list={list[currentConv].messages} setList={(e)=>{setlist(e)}}/>
            </div>
            <div className='bottom'>
              <ChatBottom index={currentConv} list={list} setList={(e)=>{setlist(e)}}  />
            
            </div>
          </div>
          <div className='left'>
          {/* <ControlBar/> */}
              
          </div>
      </GridContainer>
    )
  }
  
  const GridContainer = styled.div`
    display: flex;
    border-radius: 20px;
    overflow : hidden;
      border: 1px solid ${props => props.theme.colors.border};
      font-family: 'Poppins' , sans-serif; 
      .bodyy{
  
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        @media  only screen and (max-width: 768px) {
          width: 90%;
           min-width: 900%;
           /* position: absolute; */
        }
      }
      .right{
        width: 350px;
        height: 100%;

        background-color: ${props => props.theme.colors.seconderybg}; ;
        @media  only screen and (max-width: 768px) {
          width: 90%;
           min-width: 90%;
           /* position: absolute; */
        }
      }
      .left{
        width: 350px;
        background-color: ${props => props.theme.colors.seconderybg}; ;
        
      }
      .top{
        background-color: ${props => props.theme.colors.seconderybg}; ;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid ${props => props.theme.colors.border};
        color:  ${props => props.theme.colors.primaryText};
      }
      .center{
        flex: 1;
        width: 100%;
        overflow-y: scroll;
        @media  only screen and (max-width: 768px) {
          width: 100%;
        }
      }
      .bottom{
        height: 70px;
        width: 100%;
  
        border-top: 1px solid ${props => props.theme.colors.border};
        background-color: ${props => props.theme.colors.seconderybg}; ;
        
          grid-area: bottom;
          display: flex;
          align-items: center;
          justify-content: center;
  
      }
  `;
  
  