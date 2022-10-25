
import axios from 'axios'
import React , {useEffect , useState , useContext, useRef} from 'react'
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
    setmsgs : (e : any)=>void,
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

const first = useRef(null)

    useEffect(() => {
      scroolDown()
    }, [props.msgs])
    const scroolDown  = ()=>
    {

      if (props.msgs.length != 0)
      {
        var s = document.getElementsByClassName("bar" )
        
        console.log(s[props.msgs.length-1])
          s[props.msgs.length-1].scrollIntoView({behavior: 'smooth'});

      }
    }
    return (
      <ChatBodyStyle>
        <div className='wrapper'>

        {
          props.msgs.map((object: any , i : number)=>{
            var s : string | null = localStorage.getItem('user');
            var data: usersType ;

            if (s)
            {
              
              data  =  JSON.parse(s || '{}');
              if (object.senderId != data.id)
              {


                return <div id={"bar"+ i} className='bar' key={i} >  <MsgNotStyle>
                  <div className='name'>{object.displayName}</div>
                  {object.content}
                <span>
                  7:20pm
                </span>
                </MsgNotStyle></div>

              }
              else
              {
              return <div id={"bar"+ i} className='bar'  key={i} > <MsgStyle>

                {object.content}
                <span>
                7:20pm
              </span>
                </MsgStyle></div>

              }
            }

          })
        }
        {/* <div className='butt' ref={props.refss} /> */}

        </div>
        
       
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
  .wrapper{
    width: 100%;
    display: flex;
    height: auto;
  align-items: center;
  flex-direction: column;
    >.butt{
      width: 100%;
        height: 40px;
        background-color: red;
    }
    >.bar{
     display: flex;
      width: 100%;
      margin: 5px 0;
      height: auto;
      align-items: flex-end;
      flex-direction: row; 
      color: ${props => props.theme.colors.primaryText};
    }
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


