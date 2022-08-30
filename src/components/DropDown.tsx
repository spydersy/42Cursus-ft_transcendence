import React from 'react'
import styled , {css} from "styled-components"
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ReactComponent as UserIcon} from "../assets/imgs/user-icon.svg"
import { ReactComponent as SettingIcon} from "../assets/imgs/settings.svg"

interface DropDownProps {
    closeDropdown: () => void,
    open : boolean


  }
export default function DropDown(props : DropDownProps) {
    const ref = useDetectClickOutside({ onTriggered: props.closeDropdown });
  return (<>
  {props.open && 
    <Dstyle ref={ref} >
        <Item href="/profile/id">
            <UserIcon/>
            Profile
        </Item>
        <Item>
            <SettingIcon/>
            Setting
        </Item>
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
    }
    cursor: pointer;
    >svg{
      path {
        stroke: ${props => props.theme.colors.seconderyText};
      }
    }
`;

