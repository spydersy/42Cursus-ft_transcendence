import React , {useState} from 'react'
import { AvatarComponent } from '../../components/PlayerProfile'
import styled from "styled-components"
import { Socket } from "socket.io-client";
// import axios from 'axios'
interface UserProp {
    id : string,
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number[]
    losses : number[]
  }
  
export default function Score(props : {socket : Socket,user? :UserProp , opennet?: UserProp , score : {score1: number, score2: number}} ) {
  const [score, setScore] = useState({score1: 0 , score2: 0})
  
  props.socket.on("playerscored" , (py : any)=>{
    setScore(py)
})  
  return (
    <PlayerStyle>
        <Player1>
        {props.user ?     <UserComponent Ai={false} data={props.user}/>:  <Spinner/> }
        </Player1>
        <ScoreStyle>
            {score.score1}
            -
            {score.score2}
        </ScoreStyle>
        <Player2>
        {props.opennet ?    <UserComponent Ai={true} data={props.opennet}/>  :  <Spinner/> }
        </Player2>
</PlayerStyle>
  )
}

const Player1 = styled.div`
  margin-right: auto;
  height:auto ;
  display: flex;
  align-items: center;
  gap: 20px;

  `;
const ScoreStyle = styled.div`
  position: absolute;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);

        color:  ${props => props.theme.colors.primaryText};
  display: flex;
  align-items: center;
  font-family: "Poppins" , sans-serif;
  font-size: 30px;

  `;
const Player2 = styled.div`
margin-left: auto;
  height:auto ;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
`;
const PlayerStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100% ;
  height: auto;
  position: relative;
  margin: 10px 0;
  @media only screen and (max-width: 800px) {

    >div{
    .avatar{

        width: 60px !important;
        height: 60px !important;
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
        font-size:  ${props=> props.theme.fontSize.l} !important;

      }
      .msg{
 
        font-size:  ${props=> props.theme.fontSize.ll};
        opacity: 0.7;
        color:  ${props => props.theme.colors.seconderyText};
      }
   
  }
}
  }

  >div{
    .avatar{
        width: 100px;
        height: 100px;
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
        font-size:  ${props=> props.theme.fontSize.xl};

      }
      .msg{
        font-size: 15px;
        font-size:  ${props=> props.theme.fontSize.ll};

        opacity: 0.7;
        color:  ${props => props.theme.colors.seconderyText};
      }
   
  }
  
 
  }
`;

export function Spinner() {
  return (
    <SpinnerStyle className="lds-facebook"><div></div><div></div><div></div></SpinnerStyle>
  )
}
const SpinnerStyle = styled.div`

  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

> div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: ${props => props.theme.colors.primaryText};
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  &:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
&:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
&:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

      
      `;





interface UserComponetProps {
  data?: UserProp
  Ai : boolean
}
      


      export  function UserComponent(props: UserComponetProps) {
        return (
          <>
              <div  className='avatar'>
            {props.Ai === false ? <AvatarComponent img={props?.data?.defaultAvatar ? props?.data?.defaultAvatar : ""} /> : <AIstyle img={props?.data?.defaultAvatar ? props?.data?.defaultAvatar : ""} ></AIstyle>}
            
          </div>
          <div className='mesgData'>
            <div className='name'>
             {props?.data?.displayName}
            </div>
            <div className='msg'>
            {/* {props.data.msg} */}
            {props?.data?.login }
            </div>
          </div>

          </>
        )
      }
      const AIstyle = styled(AvatarComponent)`
      display: none;
        > img{
          display: none;
        }
  `