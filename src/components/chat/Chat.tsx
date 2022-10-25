import React , {useEffect, useState , useContext , useRef}from 'react'
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
    channelId:  number,
    name: string;
    password: string,
    picture : string,
    users: usersType[]
  }
  interface msgType {
    channelId : string,
    content : string, 
    date : string, 
    displayName : string, 
    id : number,
    senderId : number
  }


export default function Chat() {
  const socket = useContext(SocketContext)
  const pageName = window.location.pathname.split("/")[2];
  const [msgs, setmsgs] = useState<msgType[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
    const [list, setlist] = useState<convType[]>([])
    var x = -1;
    if (window.innerWidth  < 900 )
      x = 1;

    const [state, setstae] = useState(x)
    const [currentConv, setcurrentConv] = useState<convType>({
      nbMessages: 0,
      lastUpdate: "string",
      access : "string",
      channelId:  0,
      name: "string",
      password: "string",
      picture : "string",
      users: [{
        id : "string",
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    restriction: "string",
    restrictionTime: "string",
    duration: 0,
      }]
    })
     useEffect(() => {
      // console.log(bottomRef)
       const fetchData = async () => {
         await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
         {withCredentials: true} 
         ).then((res)=>{
           setlist(res.data);
           var s : convType | undefined ;
           if (pageName === '0')
           {
            setcurrentConv(res.data[0])
            s = res.data[0]

           }
           else {
     
           for (let index = 0; index < res.data.length; index++) {
             const element : convType = res.data[index];
             console.log(element )    
        
               
            if (element.channelId?.toString() === pageName)
            {
              setcurrentConv(element)
              s = element
            }
                
              
              }
            }
            axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/messages/" + s?.channelId, 
            {withCredentials: true} 
            ).then((res)=>{
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
    },[])
    useEffect(() => {
      const recievedMessgae  =  (payload : msgType) => {        
        if (currentConv.channelId != 0)
        {
          if (payload.channelId  === currentConv.channelId.toString())
          {
            console.log(currentConv.channelId)
            console.log(payload.channelId)
    
            var tmp  : msgType[] = msgs;
            tmp.push(payload)
            setmsgs([...tmp])
    
          }

        }
    
    }
      socket.off("chatToClient").on('chatToClient', (payload) => {
        console.log(payload)
        recievedMessgae(payload);
        fetchData()

    
      })
      const catchAllListener = (event : any, ...args : any) => {
        console.log(`got event ${event}`);
      }
      // return ()=>{

      //   socket.off("chatToClient").(catchAllListener)
      // } 
    }, [msgs ])
      const fetchData = async () => {
      await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
      {withCredentials: true} 
      ).then((res)=>{
        setlist([...res.data]);
       }).catch((err)=>{
         console.log(err)
       })
     }
     useEffect(() => {
      axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/messages/" + currentConv?.channelId, 
        {withCredentials: true} 
        ).then((res)=>{
          setmsgs(res.data)
 
  
          console.log("done!")
  

          
        }).catch((err)=>{

           console.log(err)
         })
     }, [currentConv])
     
   
    return (
      <GridContainer id="test" className='container' style={{ marginTop: "100px" }}>
          
          {(state === -1 || state === 0) && 
          <div id="right" className='right'>
          <ChatSidebar state={state} setState={(e)=> setstae(e)} setcurrentConv={(e)=>{ setcurrentConv(e)
            var test = document.getElementById("test");
            if (test)
              test.style.zIndex = "1"
          }} currentConv={0} list={list} />
          </div>
          
          }
          {(state === -1 || state === 1) && 
          <div id="body"className='bodyy'>
          <div  className='top'>
            <ChatHeader  state={state} setState={(e)=> setstae(e)} data={currentConv} />
          </div>
          <div className='center'>

          <ChatBody refss={bottomRef} setlist={(e : any)=>(setlist(e))} setmsgs={(e : any)=>(setmsgs(e))} msgs={msgs} setcurrentConv={(e)=>{ setcurrentConv(e) }}  currentconv={currentConv} list={list} />
          </div>
          <div className='bottom'>
            <ChatBottom   setcurrentConv={(e)=>setcurrentConv(e)} msgs={msgs}  data={currentConv}  list={list} setList={(e)=>{setlist(e)}}  />
          </div>
        </div>
          
          }
         {(state === -1 || state === 3) && 
          <div className='left'>  
            <ChatControlBar data={currentConv}/>
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
  
  