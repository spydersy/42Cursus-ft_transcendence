
import axios from 'axios'
import React , {useEffect , useState , useContext} from 'react'
import styled  from "styled-components"
import { SocketContext } from '../../context/Socket';

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
interface ChatProps {
    list: convType[],
    currentconv: convType,
    setlist : (e : any)=>void,
    msgs : any
    setcurrentConv : (e : any)=>void
    refss : any;
  }

  interface msgType {
    channelId : string,
    content : string, 
    date : string, 
    displayName : string, 
    id : number,
    senderId : number
  }
  export default function ChatBody(props: ChatProps) {
  const socket = useContext(SocketContext)

  const [list, setlist] = useState<msgType[]>([])
  // const bottomRefss = useRefss<HTMLDivElement>(null)
  const pageName = window.location.pathname.split("/")[2];
  useEffect(() => {
    
    const recievedMessgae  =  (payload : msgType) => {
      var tmp  : msgType[] = list;
      tmp.push(payload)
      console.log(tmp)
      setlist([...tmp])
  
  }
      const fetchData = async () => {
      await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
      {withCredentials: true} 
      ).then((res)=>{
        props.setlist([...res.data]);
       }).catch((err)=>{
         console.log(err)
       })
     }
  
  socket.on('chatToClient', (payload) => {
    fetchData()
    console.log("xss")
  recievedMessgae(payload);

  if (props.refss?.current != null)
  {
  
  
    props.refss.current?.scrollIntoView({behavior: 'smooth'});
  }
  })
    axios.get( process.env.REACT_APP_BACKEND_URL + "/chat/messages/" + pageName, 
      {withCredentials: true} 
      ).then((res)=>{
        // setmsgs(res.data)
        setlist(res.data)

       }).catch((err)=>{
         console.log(err)
       })

      if (props.refss?.current != null)
      {

      console.log("xss")

        props.refss.current?.scrollIntoView({behavior: 'smooth'});
      }
    }, [props.list , props.currentconv])
    return (
      <ChatBodyStyle>
        {
          list.map((object: any , i : number)=>{
            var s : string | null = localStorage.getItem('user');
            var data: usersType ;

            if (s)
            {
              
              data  =  JSON.parse(s || '{}');
              if (object.senderId != data.id)
              {


                return <div key={i} >  <MsgNotStyle>
                  <div className='name'>{object.displayName}</div>
                  {object.content}
                <span>
                  7:20pm
                </span>
                </MsgNotStyle></div>

              }
              else
              {
              return <div key={i} > <MsgStyle>

                {object.content}
                <span>
                7:20pm
              </span>
                </MsgStyle></div>

              }
            }

          })
        }
        
        <div id="ddd" ref={props.refss} />
      </ChatBodyStyle>
    )
  }
  
  const    ChatBodyStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height : 100%;
  max-height : 100%;
  overflow-y: scroll;
  >div{
   display: flex;
    width: 100%;
    margin: 5px 0;
    height: auto;
    align-items: flex-end;
    flex-direction: row; 
    color: ${props => props.theme.colors.primaryText};
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
    z-index: 1;
    content: '';
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
                    z-index: 1;
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


