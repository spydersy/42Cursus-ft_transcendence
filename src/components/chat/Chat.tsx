import React , {useEffect, useState , useContext}from 'react'
import styled  from "styled-components"
import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import ChatBottom from './ChatBottom'
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";
import axios from 'axios'
import { SocketContext } from '../../context/Socket';
import ChatControlBar from './ChatControlBar'

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
id : string,
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
  const socket = useContext(SocketContext)

  const pageName = window.location.pathname.split("/")[2];
  const [msgs, setmsgs] = useState([])

    const [list, setlist] = useState<convType[]>([])
    var x = -1;
    if (window.innerWidth  < 900 )
      x = 1;

    const [state, setstae] = useState(x)
    const [currentConv, setcurrentConv] = useState(parseInt(pageName))
     useEffect(() => {
       const fetchData = async () => {
         await axios.get("http://localhost:8000/chat/myChannels", 
         {withCredentials: true} 
         ).then((res)=>{
           setlist(res.data);
          //  console.log('> mychannells = '  , res.data, "} \n")

           
           axios.get("http://localhost:8000/chat/messages/" + res.data[currentConv]?.channelId, 
           {withCredentials: true} 
           ).then((res)=>{
             console.log('mychannells = '  , res.data, "} \n")
             setmsgs(res.data)
            }).catch((err)=>{
              console.log(err)
            })
          }).catch((err)=>{
            console.log(err)
          })
        }
        fetchData()
        window.addEventListener("resize" , (e)=>{
          if (window.innerWidth  < 900 )
          setstae(1);
          else
          setstae(-1)
        }
        )
        var s : string | null = localStorage.getItem('user');
        var data: usersType ;
        if (s )
        {
          data  =  JSON.parse(s || '{}');
          socket.emit('concon', data.id)
        }
    },[currentConv])
    useEffect(() => {
      const recievedMessgae  = async () => {
        if (list[currentConv]?.channelId  != undefined)
        {
          console.log('chi haja');
          console.log(list[currentConv]?.channelId)
          await axios.get("http://localhost:8000/chat/messages/" + list[currentConv]?.channelId, 
           {withCredentials: true} 
         ).then((res)=>{
           console.log(res.data)
          setmsgs(res.data)
         }).catch((err)=>{
          console.log(err)
           })
        }
        
    }
    socket.on('chatToClient', (payload) => {
      recievedMessgae();
  });
    }, [  list])
    return (
      <GridContainer id="test" className='container' style={{ marginTop: "100px" }}>
          
          {(state === -1 || state === 0) && 
          <div id="right" className='right'>
          <ChatSidebar state={state} setState={(e)=> setstae(e)} setcurrentConv={(e)=>{ setcurrentConv(e)
            var test = document.getElementById("test");
            if (test)
              test.style.zIndex = "1"
          }} currentConv={currentConv} list={list} />
          </div>
          
          }
          {(state === -1 || state === 1) && 
          <div id="body"className='bodyy'>
          <div  className='top'>
            <ChatHeader  state={state} setState={(e)=> setstae(e)} data={list[currentConv]} />
          </div>
          <div className='center'>

          <ChatBody setmsgs={(e : any)=>setmsgs} msgs={msgs} setcurrentConv={(e)=>{ setcurrentConv(e) }}  list={list[currentConv]} />
          </div>
          <div className='bottom'>
            <ChatBottom   setcurrentConv={(e)=>setcurrentConv(e)} msgs={msgs} currentConv={currentConv} list={list} setList={(e)=>{setlist(e)}}  />
          </div>
        </div>
          
          }
         {(state === -1 || state === 3) && 
          <div className='left'>
            <ChatControlBar data={list[currentConv]}/>
          </div>
         }
      </GridContainer>
    )
  }
  
  const GridContainer = styled.div`
    display: flex;
    border-radius: 20px;
    overflow : hidden;
      border: 1px solid ${props => props.theme.colors.border};
      font-family: 'Poppins' , sans-serif; 
      @media  only screen and (max-width: 900px) {
  
          .right{
           min-width: 100%;
          }
           .left{
            
           }
           .top{
     
           }
           .center{
     
           }
           .bottom{
     
       
           }

        }
      .bodyy{
  
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        
      }
      .right{
        width: 350px;
        height: 100%;

        background-color: ${props => props.theme.colors.seconderybg}; ;

      }
      .left{
        width: 350px;
        background-color: ${props => props.theme.colors.seconderybg}; ;
        
      }
      .top{
        background-color: ${props => props.theme.colors.seconderybg}; ;
        height: 70px;
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
  
  