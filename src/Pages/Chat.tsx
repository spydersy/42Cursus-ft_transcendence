import React , {useEffect, useState, useRef}from 'react'
import styled  from "styled-components"
import { ReactComponent as SearchIcon}  from "../assets/imgs/searchIcon.svg"
import { AvatarComponent } from '../components/Upperbar';
import {ReactComponent as AddIcon} from "../assets/imgs/block-icon.svg";
import {ReactComponent as SendIcon} from "../assets/imgs/send-icon.svg";
import {ReactComponent as GameIcon} from "../assets/imgs/game-icon.svg";
import Img from "../assets/imgs/avatar/a1.png";


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
interface chatType {
  id: string,
  msg: string,

}
interface ChatProps {
  setList: (e : any) => void,
  list: chatType[]

}
export default function Chat() {
  const [list, setlist] = useState(msgList)

 
  useEffect(() => {
      
    // alert("ss")
    console.log(list)
    
  }, [list ])
  return (
    <GridContainer className='container' style={{ marginTop: "100px" , width: "1500px", maxWidth: "1500px"}}>
        <div className='right'>
        <ChatSidebar/>
            
        </div>
        <div className='bodyy'>
          <div  className='top'>
            <Top />
          </div>
          <div className='center'>

          <ChatBody list={list} setList={(e)=>{setlist(e)}}/>
          </div>
          <div className='bottom'>
            <BottomChat list={list} setList={(e)=>{setlist(e)}}  />
          
          </div>
        </div>
    </GridContainer>
  )
}

const GridContainer = styled.div`
display: flex;


    border: 1px solid ${props => props.theme.colors.border};
    font-family: 'Poppins' , sans-serif;
    .bodyy{

      flex: auto;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .right{
      width: 400px;
   
    }
    .top{
      background-color: ${props => props.theme.colors.seconderybg}; ;
      height: 70px;
      width: 100%;
      border-bottom: 1px solid ${props => props.theme.colors.border};
      color:  ${props => props.theme.colors.primaryText};
    }
    .center{
      flex: auto;
      width: 100%;

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




export  function ChatSidebar() {
  return (
    <ChatSidebarStyle>
        
        <div className='title'>
            Chat
        </div>
        <div className='searchbar'>
            <SearchIcon/>
            <SearchBar type="text" placeholder='Search for a friend' />
        </div>
        <div className='conversation'>
            <ChatMesgComponent />
            <ChatMesgComponent />
            <ChatMesgComponent />
            <ChatMesgComponent />
            <ChatMesgComponent />
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
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:  ${props => props.theme.fontSize.xl};
        font-family: 'Poppins', sans-serif;
        font-weight : 600;
        text-align: start ;
    }
    .searchbar{

        width: 90%;
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
      width: 90%;
      
      margin:  0 auto;

      display: flex;
      align-items: flex-start;

      flex-direction: column;
      

    }
`;
const SearchBar = styled.input`
background-color:${props => props.theme.colors.bg}  ;
  border: none;
  outline: none;
  border: 2px solid ${props => props.theme.colors.border};
  padding-left: 35px;
  width: calc(100% - 30px);
  height: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color :${props => props.theme.colors.seconderyText}; 
font-size:  ${props => props.theme.fontSize.l};
font-family: 'Poppins', sans-serif;
font-weight : 400;
`;


export  function ChatMesgComponent() {
  return (
      <ChatMesgstyle>

        <Avatar>
          <AvatarComponent img={Img}/>
        </Avatar>
        <div className='mesgData'>
          <div className='name'>
            mohamed Elkarmi
          </div>
          <div className='msg'>
            salam khouya wach haniiaaa
          </div>
        </div>
        <div className='time'>
          3min ago
        </div>

        
      </ChatMesgstyle>
  )
}
const Avatar = styled.div`
  width: 50px;
  height: 50px;
`
  const ChatMesgstyle = styled.a`
 
    height: 70px;
    width: 100%;
  position: relative;
    border-radius: 5px;
    align-items: center;
    display: flex;
    
    margin-bottom: 10px;
    &:hover{
      /* border :1px solid ${props => props.theme.colors.seconderybg};  */
      background-color: ${props => props.theme.colors.seconderybg};
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


export  function Top() {
  return (
    <TopStyle>
      <div style={{flex:"auto"}}>
        <div style={{width: "40px" , height: "40px"}}>

        <AvatarComponent img={Img}/>
        </div >
        <div >
            mohamed elkarmi
        </div>
      </div>
      <ChallengeFriend/>
      <BlockFriend/>
    </TopStyle>
  )
}


const TopStyle = styled.div`

    
    display: flex;
    align-items: center;
    justify-content: space-between;
      flex-direction: row;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      gap: 5px;

    >div{
      display: flex;
      align-items: center;
      flex-direction: row;
      align-items: center;
      gap: 15px;
    }
`;

export  function BlockFriend() {
  return (
    <BlockFriendStyle>
        <AddIcon/>
        Block Friend
    </BlockFriendStyle>
  )
}
export  function ChallengeFriend() {
  return (
    <BlockFriendStyle>
        <GameIcon/>
        Challenge
    </BlockFriendStyle>
  )
}
const BlockFriendStyle = styled.div`
   font-family: 'Poppins' , sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    /* width: 75px; */
    gap: 5px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    color: ${props => props.theme.colors.bg};
    background-color: ${props => props.theme.colors.primaryText};
    cursor: pointer;

    svg{
 
        path{
            stroke: ${props => props.theme.colors.bg};
        }
    }
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 0 5px;
`;


export  function BottomChat(props: ChatProps) {

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
      var list =  props.list
      list.push(msgtmp)
      props.setList([...list])
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

  
  export  function ChatBody(props: ChatProps) {
 
    
    return (
      <ChatBodyStyle>
        {
          props.list.map((object: any , i : number)=>{
            if (object.id === "0")
              return <div key={i} >  <MsgNotStyle>
                
                <div className='name'>Dosker </div>
                {object.msg} 
              <span>
                7:20pm
              </span>
              </MsgNotStyle></div>
              else
              return <div key={i}  >  <MsgStyle>{object.msg}
               <span>
                7:20pm
              </span>
               </MsgStyle></div>

          })
        }
      </ChatBodyStyle>
    )
  }
  
  const    ChatBodyStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  >div{
   display: flex;
    width: 100%;
    margin: 5px 20px;
    height: auto;

     align-items: flex-end; 
    flex-direction: row; 
    color: ${props => props.theme.colors.seconderyText};
  }
  
`;
  const    MsgStyle = styled.div`
  background-color: ${props => props.theme.colors.purple};
  
  border-radius: 10px;
  margin-left: auto;
  margin-right: 10px;
  text-align: start;
  padding : 10px 8px 20px 8px;

  max-width: 300px;
  min-width: 150px;
  display: flex;
  gap: 15px;
  position: relative;
  &:before {
                    z-index: 13;
                    content: '';
                    /* border: 1px solid ${props => props.theme.colors.border}; */
					display: block;
					position: absolute;
					right: -4px;
					top: 10px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
					background-color: inherit;
				}
  >span{
    opacity: 0.5;
    font-size: 12px;
   position: absolute;
   right: 5px;
   bottom: 5px;
   
  }
  `;
  const    MsgNotStyle = styled.div`

  text-align: start;
  padding : 10px 8px 20px 8px;
  height: auto;
  align-self: flex-end;
  border-radius: 10px;

  background-color:  ${props => props.theme.colors.primarybg};
  max-width: 300px;
  min-width: 150px;
  /* min-height: 35px; */
  margin-right: auto;
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: flex-start;
 flex-direction: column;
 &:before {
                    z-index: 13;
                    content: '';
                    /* border: 1px solid ${props => props.theme.colors.border}; */
					display: block;
					position: absolute;
					left: -4px;
					top: 10px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
					background-color: inherit;
				}
 .name{
 color: ${props => props.theme.colors.purple};
 font-weight: 600;
 }
  >span{
    opacity: 0.5;
    font-size: 12px;
   position: absolute;
   right: 5px;
   bottom: 5px;
   
  }
  /* min-width: ; */
  
`;

