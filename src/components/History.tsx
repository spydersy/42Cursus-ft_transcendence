import React from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from '../Pages/Home'
import { AvatarComponent } from './Upperbar'
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";

const match1 = {
    name: "Melkarmi",
    score1 : 7,
    score2 : 5,
  }
const match2 = {
    name: "Alchemist",
    score1 : 2,
    score2 : 5,
  }

  var list = [match1 , match2 , match2 , match1 , match2]

export default function History() {
  return (
    <HistoryComponent>
        <Head>
            Last matches
            <a href="#profilepage">
                View all matches
            </a>
        </Head>
        {
            list.map((match : any )=>{
                return<GameComp match={match}  isFriend={true} />
            })
        }
        {/* <GameComp match={match2} isFriend={false} />
        <GameComp match={match1} isFriend={true} />
        <GameComp match={match2} isFriend={false} />
        <GameComp match={match1} isFriend={true} /> */}
    </HistoryComponent>
  )
}


const HistoryComponent = styled.div`

    width: 330px;
    height: 400px;
    display: flex;
    /* align-items: center; */

    background: #D8E4ED;
    flex-direction: column;
    border-radius: 10px ;
    padding: 0 15px;
`
const Head = styled.div`
    margin-bottom: 20px;
    width: 100%;
    height: 60px;
    background-color: red;
    border-bottom: 1px solid ${props => props.theme.colors.seconderyText};;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:${props => props.theme.fontSize.ll} ;
    font-weight: 600;
    background: #D8E4ED;
    > a{
        align-items: center;
        font-size: ${props => props.theme.fontSize.s};
        color: ${props => props.theme.colors.seconderyText};
    }
    /* border-radius: 10px ; */
`

export interface GameCompProps {
    win: boolean
}
    
export interface GameCardProps {
    match: {
        name: string;
        score1: number,
        score2: number,
    },
    isFriend : boolean
}
export  function GameComp(props : GameCardProps) {
    var state : boolean =( props.match.score1 > props.match.score2) ? true : false
  return (
    <GameCompStyle win={state} >
        <div style={{marginLeft : "14px"}}>
        <AvatarComponent  />

        </div>
        <Data>
            <div className='name'>
                    {props.match.name}
            </div>
            <div className='stat'>
                 {props.match.score1} : {props.match.score2}
            </div>
        </Data>
        {
            props.isFriend &&
            <div id='addFriend'>
                <AddFriend/>
            </div>
        }
    </GameCompStyle>
  )
}



const GameCompStyle = styled.div<GameCompProps>`
    width: 100%;
    height: 56px;
    position: relative;
    margin-bottom: 10px;
    mix-blend-mode: multiply;
    border-radius: 16px 0 0px 16px;
    display: flex;
    align-items: center;
    background: linear-gradient(270deg, #157DBD 3.1%, rgba(21, 125, 189, 0.82) 44.76%, rgba(21, 125, 189, 0.58) 72.2%, #FFFFFF 100.65%);
    &::after{
        content: "";
        position: absolute;
        width: 3px;
        height: 100%;
        top: 0;
        right: 0;
        background-color:  ${props => props.theme.colors.green};
        ${props => (props.win === false) && css`
        background-color:  ${props => props.theme.colors.danger};
            `}
    }
    #addFriend{
        position: absolute;
        bottom: 5px;
        right: 10px;
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
     
        }
    }
`;
const Data = styled.div`
    margin-left: 14px;
    height: 40px;
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    .name{
        color: ${props => props.theme.colors.primaryText};
    }
    .stat{
        color: ${props => props.theme.colors.seconderyText};
        
    }
`;

export  function AddFriend() {
  return (
    <AddFriendStyle>
        <AddIcon/>
        Add Friend
    </AddFriendStyle>
  )
}

const AddFriendStyle = styled.div`
   font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    width: 75px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;


    /* white */

    color: ${props => props.theme.colors.primaryText};
`;