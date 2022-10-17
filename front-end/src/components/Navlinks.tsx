import React from 'react'
import styled from "styled-components";
const Container = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* background: white; */
  height: 40px;
  border-bottom: 2px solid #58a7fe;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  /* overflow-y: scroll; */
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
  padding: 0 12px;
  height: 100%;
  color: #9eacbf;
  margin-bottom: 3px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 130%;
  color: ${(props) => (props.active ? "#58a7fe" : "#ffffff")};
  border-bottom: ${(props) =>
    props.active ? "4px solid #58a7fe" : "#ffffff"};

  cursor: pointer;
  transition: all 200ms;
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
          active={props.index === i ? true : false}
        >
          {object}
        </Item>
      );
    })}
  </Container>
  )
}
