import React , {useEffect , useState , useContext} from 'react'
import styled  from "styled-components"
import { UserContext } from '../../context/UserContext';
import { UserProp } from '../game/types';

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
    empty : boolean
}

export default function ChatBody(props: ChatProps) {
  const User = useContext(UserContext)

  const [UserData, setUserData] = useState<UserProp>({
    id: "string",
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    wins : [0,0],
    losses : [0,0],
  })
    useEffect(() => {
      User.then((data : UserProp | "{}" )=>{
        if (data !== "{}")
          setUserData(data)
      })
      // eslint-disable-next-line
    }, [])
    useEffect(() => {
      scroolDown()
      // eslint-disable-next-line
    }, [props.msgs])
    const scroolDown  = ()=>
    {
      if (props.msgs.length !== 0)
      {
        var s = document.getElementsByClassName("bar" )
        if (s[props.msgs.length-1])
          s[props.msgs.length-1].scrollIntoView({behavior: 'smooth'});
      }
    }
    return (
      <ChatBodyStyle>
        {props.empty ? <></> : 
        
        <div className='wrapper'>
        {
          props.msgs.map((object: any , i : number)=>{
              if (object.senderId !== UserData.id)
              {
                return <div id={"bar"+ i} className='bar' key={i} >  <MsgNotStyle>
                  <div className='name'>{object.displayName}</div>
                  <div className='msg'> {object.content}</div>
                 
                <span>
                  {object.date.slice(11, 16)}
                </span>
                </MsgNotStyle></div>
              }
              else
              {
              return <div id={"bar"+ i} className='bar'  key={i} > <MsgStyle>
                   <div className='msg'> {object.content}</div>

                <span>
                {object.date.slice(11, 16)}
              </span>
                </MsgStyle></div>
              }
          })
        }
        {/* <div className='butt' ref={props.refss} /> */}
        </div>
        
        }
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
  >.msg{
  line-break: anywhere;
   min-width: 100%;
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
 >.name{
 color: ${props => props.theme.colors.purple};
 font-weight: 600;
 }
 >.msg{
  line-break: anywhere;
   min-width: 100%;

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


