import React , {useEffect, useState}from 'react'
import styled  from "styled-components"
import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import ChatBottom from './ChatBottom'
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";
import axios from 'axios'

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

export default function Chat() {
  const pageName = window.location.pathname.split("/")[2];

    const [list, setlist] = useState<convType[]>([])
    const [currentConv, setcurrentConv] = useState(parseInt(pageName))
    useEffect(() => {
      // console.log(list)
      axios.get("http://localhost:8000/chat/myChannels", 
      {withCredentials: true} 
    ).then((res)=>{
      console.log(res.data)
      setlist(res.data);
      console.log(res.data[currentConv])
    }).catch((err)=>{
          console.log(err)
          // history.pushState("/signin");
      })
    },[])
    return (
      <GridContainer id="test" className='container' style={{ marginTop: "100px" }}>
          <div id="right" className='right'>
          <ChatSidebar setcurrentConv={(e)=>{ setcurrentConv(e)
            var test = document.getElementById("test");
            if (test)
              test.style.zIndex = "1"
          }} currentConv={currentConv} list={list} />
          </div>
          <div id="body"className='bodyy'>
            <div  className='top'>
              <ChatHeader data={list[currentConv]} />
            </div>
            <div className='center'>
  
            <ChatBody list={[]} />
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
  
  