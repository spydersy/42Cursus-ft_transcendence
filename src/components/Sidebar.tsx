import React from 'react'
import styled from "styled-components"
import {ReactComponent as CollapseIcon} from "../assets/imgs/collapse.svg"
import ExpandIcon from "../assets/imgs/dashboardIcon.svg"
import {ReactComponent as DashIcon} from "../assets/imgs/dashboardIcon.svg";
export default function Sidebar() {
  return (
    <SidebarWrraper>
        <But/>
<Items>

        <Item>
            <DashIcon />
            Dashboard
        </Item>
        <Item>
            <DashIcon />
            Direct messages
        </Item>
        <Item>
            <DashIcon />
            Rooms
        </Item>
        <Item>
            <DashIcon />
            All Users
        </Item>

</Items>
    </SidebarWrraper>
  )
}

const SidebarWrraper = styled.div`
    width: 300px;
    max-width: 300px;
    height: calc(100vh - 70px);
    background-color:${props => props.theme.colors.seconderybg}; 
    

    display: flex;
    align-items: flex-end;
    flex-direction: column;
    border-radius: 10px;
    
`;
const But = styled(CollapseIcon)`
  
        align-items: flex-end; 
         margin-top: 20px; 
         margin-bottom: 60px;
         margin-right: 10px;
         &:hover{
             path{
             fill: ${props => props.theme.colors.primarybg}; 
                }
         }
         
    
`;
const Items = styled.div`

    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    
`;
const Item = styled.div`

    width: 100%;
    height: 60px;
    color :${props => props.theme.colors.seconderyText}; 
    font-size:  ${props => props.theme.fontSize.l};
    font-weight : 500;
    display: flex;
    align-items: center;
    /* justify-content:  */
    flex-direction: row;
    svg{
        margin: 0 30px;
        width: 30px;
        height: 30px;

    }

    &:hover{
        border-left: 8px solid ${props => props.theme.colors.primarybg};
        color :${props => props.theme.colors.primarybg}; 
        svg{
            path{
                stroke: ${props => props.theme.colors.primarybg}; 
            }
        }
    }
    
`;
