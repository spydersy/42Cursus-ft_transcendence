import React from 'react'
import styled from "styled-components";
const Container = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: white;
  height: 40px;
  border-bottom: 2px solid #f0f4f8;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
`;


export interface ItemProps {
    active: boolean
}
    
export interface NavlinksProps {
    index: number,
    setindex: (i : number) => void,
    list : any
}
    

const Item = styled.div<ItemProps>`
  padding: 0 10px;
  height: 100%;
  color: #9eacbf;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: ${(props) => (props.active ? "#4569FF" : "#9EACBF")};
  border-bottom: ${(props) =>
    props.active ? " 2px solid #4569FF" : "#9EACBF"};
  cursor: pointer;
  transition: all 300ms;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export default function Navlinks(props: NavlinksProps) {
  return (
    <Container>
    {props.list.map(function (object : any, i : number) {
      return (
        <Item
        key={i}
          onClick={() => {
    
            props.setindex(i);
          }}
          active={props.index == i ? true : false}
        >
          {object}
        </Item>
      );
    })}
  </Container>
  )
}
