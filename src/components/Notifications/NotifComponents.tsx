import React from 'react'
import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';
import { Button } from '../../Pages/SignIn';
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-icon.svg";
import { ReactComponent as CheckIcon } from "../../assets/imgs/check.svg";

export default function NotifComponents() {
  return (
    <div>NotifComponents</div>
  )
}

interface NotifProps{
    type: string,
    clear : (e : any)=>void,
    check : (e : any)=>void,
    name : string,
    img : string,
    msg : string,
}
export  function FriendRequest(props : NotifProps) {

  return (
    <FriendRequestStyle>
        <div className='avatar'>
            <AvatarComponent img={props.img} />
        </div>
        
        <div className='data'>
            <div className='name'>
                {props.name}
            </div>
            <div className='message'>
               {props.msg}
            </div>
        </div>
        
        <div className='button'>
            {
                props.type === 'request' && <Button 
                onClick={(e)=>props.check(e)}
                size="small" isIcon={true}
                icon={<CheckIcon/>}/>
            }
            
            <Button  onClick={(e)=>props.clear(e)}  type='secondary' size="small"isIcon={true} icon={<CloseIcon/>}/>
        </div>


    </FriendRequestStyle>
  )

}
const FriendRequestStyle = styled.div`
    width: 95%;
    padding: 10px 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 0 auto;
background-color: ${props => props.theme.colors.primarybg};;

    .avatar{
        width: 50px;
        height: 50px;
        
    }
    .data{
        flex: 1;
        display: flex;
        height: 50px;
        align-items: flex-start;
        flex-direction: column;
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
       .name{
        color:  ${props => props.theme.colors.primaryText};;
        font-weight: 600;
       }
       .message{
        color:  ${props => props.theme.colors.seconderyText};;

       }
    }
    .button{

        display:  flex;
        gap: 5px;
        /* background-color: red; */
        /* width: 100px; */
    }
`;
