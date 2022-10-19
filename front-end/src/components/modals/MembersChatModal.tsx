import React from 'react'
import { Button } from '../../Pages/SignIn';
import { AvatarComponent } from '../PlayerProfile';
import {ReactComponent as Ban} from "../../assets/imgs/ban.svg";
import {ReactComponent as Mute} from "../../assets/imgs/mute.svg";
import styled , {css} from "styled-components"

export default function MembersChatModal(props : { closeModal : ()=>void}) {
  return (
    <div>   
        Members: 
        <div className='members'>
    <Member img={""}/>
</div></div>
  )
}

interface MemberProps{
    img : string
  }
  export  function Member(props : MemberProps) {
    return (
      <MemberStyle>
        <div className='data'>
  
          <div className='avatar'>
                      <AvatarComponent img={props.img}/>
  
          </div>
          <div className='name'>
                    Mohamed Elkarmi
            <span>
              @melkarmi
            </span>
          </div>
        </div>
        <div className='buttons'>
          <Button cursor="default" isIcon={true} onClick={()=>{}} icon={<Ban/>}/>
        <Button  cursor="default" isIcon={true} onClick={()=>{}} icon={<Mute/>}/>
  
        </div>
      </MemberStyle>
    )
  }
  
  const MemberStyle = styled.div`
  
      position: relative;
      display: flex;
      align-items: center;
  justify-content: space-between;
      flex-direction: row;
        width: 95%;
        height: 60px;
        margin: 0 auto;
        gap: 5px;
        font-family: 'Poppins', sans-serif;
        .data{
          display: flex;
      align-items: center;
      flex-direction: row;
      flex : 1;
        height: 60px;
        margin: 0 auto;
        gap: 5px;
        font-family: 'Poppins', sans-serif;
          .avatar{
              width: 50px;
              height: 50px;
          }
          .name{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-direction: column;
            text-align: start;
              color : #FFF;
              font-size:  ${props => props.theme.fontSize.s};
              font-weight : 600;
              text-align: start ;
            > span{
              font-weight : 500;
              opacity: 0.8;
            }
  
          }
        }
          > .buttons{
            display: flex;
            gap: 10px;
          }
      
  `;
  