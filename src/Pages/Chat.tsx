import React from 'react'
import styled , {css} from "styled-components"
import { ReactComponent as SearchIcon}  from "../assets/imgs/searchIcon.svg"
import { AvatarComponent } from '../components/Upperbar';
import {ReactComponent as AddIcon} from "../assets/imgs/block-icon.svg";

export default function Chat() {
  return (
    <GridContainer className='container'>
        <div className='right'>
        <ChatSidebar/>
            
        </div>
        <div className='bodyy'>
          <div  className='top'>
            <Top />
          </div>
          <div className='center'>

          <ChatBody/>
          </div>
          <div className='bottom'>
            <BottomChat/>
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

        <Avatar/>
        <div>
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
const Avatar = styled(AvatarComponent)`
  width: 40px;
  height: 40px;
`
  const ChatMesgstyle = styled.a`
 
    height: 65px;
    width: 100%;
  position: relative;
    border-radius: 5px;
    align-items: center;
    
    display: flex;
    margin-bottom: 5px;
    &:hover{
      border :1px solid ${props => props.theme.colors.seconderybg}; 
      background-color: ${props => props.theme.colors.seconderybg};
    }
    > div{
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
      <div>
        <AvatarComponent/>
        <div>
            mohamed elkarmi
        </div>
      </div>
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
const BlockFriendStyle = styled.div`
   font-family: 'Poppins';
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
    color: ${props => props.theme.colors.primaryText};
    cursor: pointer;

    svg{
 
        path{
            fill: ${props => props.theme.colors.primaryText};
        }
    }
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 0 5px;
`;


export  function BottomChat() {
  return (
    <BottomChatStyle>
      <textarea  placeholder='Write something ..' />
      <button>
        Send
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
      background-color:  ${props => props.theme.colors.bg};
      border: 1px solid ${props => props.theme.colors.border};

      height: 100%;
      width: 150px;
      border-radius: 5px;
      outline: none;
      /* border: none; */
      color : ${props => props.theme.colors.primaryText};
      cursor: pointer;
     }
  `;

  
  export  function ChatBody() {
    return (
      <ChatBodyStyle>
<div>

        <MsgNotStyle>dds</MsgNotStyle>
</div>
        {/* <MsgStyle></MsgStyle>
        <MsgNotStyle>dds</MsgNotStyle>
        <MsgStyle>dds</MsgStyle> */}

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
    height: auto;
    align-items: flex-end;
    flex-direction: row;
    /* background-color: red; */
  }
  
`;
  const    MsgStyle = styled.div`
  background-color: ${props => props.theme.colors.seconderybg};
  min-width: 300px;
  min-height: 26px;
  /* align-items: flex-end; */
  border-radius: 5px;
  `;
  const    MsgNotStyle = styled.div`
  /* align-items: flex-end; */
  align-self: flex-end;
  border-radius: 5px;
  min-height: 26px;
  background-color: #D9D9D9;
  min-width: 300px;
  
`;

