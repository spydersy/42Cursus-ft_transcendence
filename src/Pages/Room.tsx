import React , {useState}from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import RoomComponent from '../components/RoomComponent';
import { HeadComponent } from './Home';

export default function Room() {
const linkslist = ["Public", "Protected" , "My Rooms"]

    const [index, setindex] = useState(0)
  return (
    <RoomStyle className='container'>
        <HeadComponent title='Chat Rooms'/>
        <PlayerAchieveStyle>
        <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/>
            <Warraper>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
                    <RoomComponent/>
            </Warraper>
        </PlayerAchieveStyle>
    </RoomStyle>
  )
}


const RoomStyle = styled.div`
    width: 100%;
    
height: auto;
padding: 20px 0;
margin-top: 100px;
display: flex;
align-items: center;
/* justify-content: space-around; */
border-radius: 5px;
flex-direction: column;
border: 2px solid  ${props => props.theme.colors.border};
color : ${props => props.theme.colors.primaryText};
background-color: ${props => props.theme.colors.primarybg};

`;
const PlayerAchieveStyle = styled.div`
margin-top: 100px;
  padding-top: 20px;
  margin : 0px 0px;
  width:  90%;
  align-items: center;
  height: auto;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;
const Warraper = styled.div`
margin-top: 20px;
display: flex;
/* align-items: center; */
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
`;

