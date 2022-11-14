import React  from 'react'
import styled from "styled-components"
import {ReactComponent as LuffyAce} from "../assets/imgs/luffyAce.svg";

/// empty
interface EmptyProps { text: string }

export default function EmptyComponent(props: EmptyProps)
{
  return (
    <Empty >
      <LuffyAce/>
      {props.text}
    </Empty>
  )
}
const Empty = styled.div` 
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* background-color:  ${props => props.theme.colors.bg}; */
  color:  ${props => props.theme.colors.seconderyText};
  font-weight: 600;
  justify-content: center;
  font-size: 30px;
  font-family: "Poppins" , sans-serif;
`;






