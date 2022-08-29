import React from 'react'
import styled , {css} from "styled-components"
import { ReactComponent as SearchIcon}  from "../assets/imgs/searchIcon.svg"

export default function Chat() {
  return (
    <GridContainer className='container'>
        <div className='right'>
        <ChatSidebar/>
            
        </div>
        <div  className='top'>top</div>
        <div className='center'>center</div>
        <div className='bottom'>bottom</div>
    </GridContainer>
  )
}

const GridContainer = styled.div`
display: grid;
    /* grid-template-rows: auto; */
    grid-template-rows: 50px 50px 50px 50px;
  grid-template-areas: 
    "right header header header"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right main main main"
    "right bottom bottom bottom";

    .right{

        grid-area: right;
   
    }
    .top{
        grid-area: header;
        background-color: black;

    }
    .center{
        background-color: green;
        grid-area: main;
    }
    .bottom{
        background-color: blue;
        grid-area: bottom;

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
  border: 1px solid ${props => props.theme.colors.seconderyText};
  display: flex;
  align-items: center;
  flex-direction: column;
    .title{

        color :${props => props.theme.colors.seconderyText}; 
        height: auto;
        width: 90%;
        padding: 5%;
        font-size:  ${props => props.theme.fontSize.ll};
        font-family: 'Poppins', sans-serif;
        font-weight : 600;
        text-align: start ;
    }
    .searchbar{

        width: 90%;
        height: 40px;
      padding: 0 5%;
        color :${props => props.theme.colors.seconderyText}; 

        font-size:  ${props => props.theme.fontSize.l};
        font-family: 'Poppins', sans-serif;
        font-weight : 400;
        position: relative;
         > svg{
              position: absolute;
            left: 30px; 
            top: 60%; 
            transform: translateY(-50%);
         }
        
    }
    .conversation{
      flex: auto;
      
      margin-top: 50px;
      width: 90%;
      padding: 5px 5%;
      border: 1px solid;
      display: flex;
      align-items: flex-start;
      gap: 7px;
      flex-direction: column;
      

    }
`;
const SearchBar = styled.input`
  border: none;
  border: 2px solid ${props => props.theme.colors.seconderyText};
  padding-left: 35px;
  width: calc(100% - 030px);
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
      <ChatMesgstyle>Chat</ChatMesgstyle>
  )
}
  const ChatMesgstyle = styled.a`
 
    height: 42px;
    width: 90%;
    border-radius: 5px;
    border :1px solid ${props => props.theme.colors.seconderybg}; 
  `;
