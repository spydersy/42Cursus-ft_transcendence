import React, {useContext} from 'react'
import styled  from "styled-components"
import { useDetectClickOutside } from 'react-detect-click-outside';
import { FriendRequest } from './Notifications/NotifComponents';
import Mamali from "../assets/imgs/avatar/mamali.jpeg";
import { SocketContext } from '../context/Socket';


interface ListTypes {
  title : string,
  icon : any,
  href: string
}
interface DropDownProps {
    closeDropdown: () => void,
    open : boolean
    style :  React.CSSProperties,
    list : ListTypes[]

  }
export default function DropDown(props : DropDownProps) {
    const ref = useDetectClickOutside({ onTriggered: props.closeDropdown });
  return (<>
  {props.open && 
    <Dstyle style={props.style}  ref={ref} >
      {
        props.list.map(((data :ListTypes , id : number )=>{
            return  <Item key={id}href={data.href}>
              { data.icon}
          
              {data.title}
        </Item>
        }))
      }
    </Dstyle>}
  </>
  )
}

const Dstyle = styled.div`
position: absolute;
bottom: -25px;
transform: translateY(100%);
min-height: 60px;
border-radius: 8px;
border:1px solid ${props => props.theme.colors.seconderyText};;
/* padding: 0 15px; */
/* lef:t: ; */
right: 0;
box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
display: flex;
align-items: center;
flex-direction: column;
overflow: hidden;
min-width: 120px;
background-color: ${props => props.theme.colors.bg};;
`;


const Item = styled.a`
    min-width: 120px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: ${props => props.theme.fontSize.l};;
    line-height: 12px; 
    padding:9px 15px;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    color : ${props => props.theme.colors.seconderyText};
    gap: 10px;
    &:hover{
        background-color:  ${props => props.theme.colors.seconderybg};
        color : ${props => props.theme.colors.purple};
        >svg{
      path {
        stroke: ${props => props.theme.colors.purple};
      }
    }
        
    }
    cursor: pointer;
    >svg{
      path {
        stroke: ${props => props.theme.colors.seconderyText};
      }
    }
`;




interface NotifDropDownProps {
  closeDropdown: () => void,
  open : boolean
  style :  React.CSSProperties

}
export  function NotifDropDown(props : NotifDropDownProps) {
  const refs = useDetectClickOutside({ onTriggered: props.closeDropdown });
  const socket = useContext(SocketContext)
  // socket.on('event', (payload)=>{
  //     console.table(payload)
  // });
return (<>
    {props.open && 
      <NotifD style={props.style}  ref={refs} >
          {/* <div> */}
            <Head>
              <div>Notifications</div>
              <span>Clear all</span>
            </Head>
            <Notif>
              
              <FriendRequest name="moahmed" img={Mamali} msg={"Send a Friend request ."} check={()=>{}}  clear={()=>{}} />
              <FriendRequest name="moahmed" img={Mamali} msg={"Is challenging you."} check={()=>{}}  clear={()=>{}} />
            </Notif>
          {/* </div> */}
      </NotifD>}
</>
)
}


const NotifD = styled.div`
position: absolute;
min-width: 400px;
width: 400px;
bottom: -25px;
transform: translateY(100%);
min-height: 300px;
border-radius: 8px;
background-color: ${props => props.theme.colors.bg};;

border:2px solid ${props => props.theme.colors.seconderyText};;
/* padding: 0 15px; */
/* lef:t: ; */
right: 0;
box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
display: flex;
align-items: center;
flex-direction: column;
overflow: hidden;
min-width: 120px;

`;

const Head = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.primaryText};
  border-bottom: 0.5px solid ${props => props.theme.colors.seconderyText};
  >div{
    font-weight: 600;
    font-size: 20px;
  }
  >span{
    opacity: 0.7;
  }
`;
const Notif = styled.div`
  width: 100%;
  flex: 1;
  /* height: 100%; */
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.primaryText};
  /* border-bottom: 0.5px solid   #c8d0d97b; */
  border-radius: 10px;
  margin: 10px 0;
  /* background-color: ${props => props.theme.colors.purple};; */
`;



