import { data } from 'jquery';
import React from 'react'
import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';
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


export default function ChatControlBar(props :{data : convType} ) {
  return (
    <ContoleStyle>
        <div className='avatar'>
            {
                props.data?.access === "DM" ? 
                  <AvatarComponent img={props.data?.users[1].defaultAvatar}/>
                
                :
                <AvatarComponent img={props.data?.picture}/>
            }

        </div>
        {
    props.data?.access === "DM" ? 
        <div className='name'>
                  {props.data?.users[1].displayName} 
        </div>
                :
        <div className='name'>
                  {props.data?.name}
                
        </div>
            }
 
    </ContoleStyle>
  )
}

const ContoleStyle = styled.div`

    position: relative;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
      flex-direction: column;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      gap: 5px;
      font-family: 'Poppins', sans-serif;

        .avatar{
            margin-top: 100px;
            width: 200px;
            height: 200px;
        }
        .name{
            color : #FFF;
            margin-top: 30px;
            /* width: 100%; */
            margin:  0 auto;
            font-size:  ${props => props.theme.fontSize.xl};
            font-weight : 600;
            text-align: start ;
            display: flex;
            align-items: center;
            justify-content: center;
            /* width: 200px;
            height: 200px; */
        }
    
`;