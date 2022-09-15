import React from 'react'
import styled  from "styled-components"
import SearchIcon from "../../assets/imgs/searchIcon.svg"

import Img from "../../assets/imgs/avatar/a1.png";
import { AvatarComponent } from '../PlayerProfile';

export default function AddFriendsModal() {
    const handleFriend= (e : any)=>{
        e.stopPropagation();
    }
  return (
    <AddFriendsModalStyle>
         <SearchBar>

        <input onClick={(e)=>e.stopPropagation()} type="text" placeholder='Search ..' />
    </SearchBar>

    <Friend>
        <div>
            <div style={{width : '35px' , height :'35px'}}>
                <AvatarComponent img={Img}/>

            </div>
            <div className='name'>
                Nico Robin
            </div>
        </div>
        <button onClick={handleFriend}>
            Add
        </button>
    </Friend>
    <Friend>
        <div>
            <div style={{width : '35px' , height :'35px'}}>
                <AvatarComponent img={Img}/>

            </div>
            <div className='name'>
                Nico Robin
            </div>
        </div>
        <button onClick={handleFriend}>
            Add
        </button>
    </Friend>
    <Friend>
        <div>
            <div style={{width : '35px' , height :'35px'}}>
                <AvatarComponent img={Img}/>

            </div>
            <div className='name'>
                Nico Robin
            </div>
        </div>
        <button onClick={handleFriend}>
            Add
        </button>
    </Friend>
    <Friend>
        <div>
            <div style={{width : '35px' , height :'35px'}}>
                <AvatarComponent img={Img}/>

            </div>
            <div className='name'>
                Nico Robin
            </div>
        </div>
        <button onClick={handleFriend}>
            Add
        </button>
    </Friend>
    </AddFriendsModalStyle>

  )
}


const AddFriendsModalStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SearchBar = styled.div`
background:  ${props => props.theme.colors.bg};
border-radius: 5px;
display: flex;
align-items: flex-start;
/* width: 100%; */
/* flex: 1; */
max-width: 600px;
height: 42px;

    /* object-fit : contain; */
    position: relative;
    padding: 0px 0px 0px 40px;
    &::before{
      content: url(${SearchIcon});
      position: absolute;
      left: 10px; 
      top: 55%; 
      transform: translateY(-50%);
    }
    input{
      background-color: transparent;
      width: calc(100% - 40px);
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      color:  ${props => props.theme.colors.seconderyText};;
    font-size:  ${props => props.theme.fontSize.l}; 
      &::placeholder{
    color:  ${props => props.theme.colors.seconderyText};;
    font-size: ${props => props.theme.fontSize.l};
        opacity: 0.6;
      }
  }
  @media  only screen and (max-width: 768px) {
    width: 150px;
max-width: 200px;
  }
`;

const Friend = styled.div`
    width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-bottom: 0.5px solid  ${props => props.theme.colors.bg} ;
font-family: 'Poppins', sans-serif;

  >div{
    display: flex;
    align-items: center;
    justify-content: row;
    gap: 10px;
    font-size: 20px;
    color:  ${props => props.theme.colors.primaryText};;

  }
  >button{
    color:  ${props => props.theme.colors.seconderyText};
        width: 100px;
        height: 30px;
        border-radius: 5px;
        background-color: ${props => props.theme.colors.purple};; ;
  }
`;