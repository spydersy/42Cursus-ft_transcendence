
import axios from 'axios'
import React , {useEffect , useState} from 'react'
import styled from "styled-components"
import { AvatarComponent } from '../PlayerProfile'
import Mamali from "../../assets/imgs/avatar/mamali.jpeg";
import { Button } from '../../Pages/SignIn';
import { ReactComponent as CheckIcon } from "../../assets/imgs/check.svg";

interface msgType {
  channelId : string,
  content : string, 
  date : string, 
  displayName : string, 
  id : number,
  senderId : number
}
interface UserProp {
  defaultAvatar: string,
  login : string
  displayName : string
  relation? : string
  nbFriends? : string
  wins : number
  losses : number
}
export default function MsgToast(props: {data : msgType}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })
  useEffect(() => {
  //   axios.get( process.env.REACT_APP_BACKEND_URL + "/users/friends/" + props.data.senderId  ,  {withCredentials: true}
  //       ).then((res)=>{
  //             // check for the user is bloked 
  //             console.log("> status = " , res.status)
  //             setUser(res.data)

  //           }).catch((error)=>{ 
             
  //             } 
  //  )


        
  }, [])
  
  return (
    <ToastStyle>
        <div className='avatar'>
          <AvatarComponent img={Mamali}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {props.data.displayName}
            </div>
            <div className='msg'>
              Sent a meessage :
              <span>
                {" " + props.data.content}
              </span>
            </div>
        </div>
    </ToastStyle>
  )
}

const ToastStyle = styled.div`
  width: 100%;
  height: 100%;
  color : #FFF;
  display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  .avatar{
    width: 50px;
    height: 50px;
  }
  .data{
    flex: 1;
    height: 50px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:5px;
    font-family: "Poppins" , sans-serif;
    font-size: 15px;
    overflow: hidden;
white-space: nowrap;
    .name{
      font-weight: 600;

    }
    .msg{
     max-width: 95%;
      text-overflow: ellipsis;
    font-size: 13px;
      >span{

      }
    }
  }
`
export  function GameChallengeToast(props: {data : any}) {
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "string",
    login : "string",
    displayName : "string",
    relation : "string",
    nbFriends : "string",
    wins : 0,
    losses : 0,
  })
  useEffect(() => {
    console.log(props.data)
    axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.data  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              console.log("> status = " , res.status)
              setUser(res.data)

            }).catch((error)=>{ 
             
              } 
   )


        
  }, [])
  
  return (
    <ToastStyle>
        <div className='avatar'>
          <AvatarComponent img={User.defaultAvatar}/>
        </div>
        <div className='data'>
            <div className=' name'>
              {User.displayName}
            </div>
            <div className='msg'>
              Is challenging you.:
            </div>
        </div>
        <div className='buttons'>
          <Button size='small'  isIcon={true} icon={<CheckIcon/>}/>
        </div>
    </ToastStyle>
  )
}
