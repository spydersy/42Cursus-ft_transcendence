import React, {useState} from 'react'
import styled , {css}from "styled-components"
import Tet from "../assets/imgs/avatar/avatar1.png"
import Navlinks from '../components/Navlinks';
import { AchievmentComp,AchievmentCompProps }  from '../components/History'

import  Badge2 from "../assets/imgs/avatar/a1.png";
import  Badge3 from "../assets/imgs/avatar/a2.png";
import  Badge4 from "../assets/imgs/avatar/a6.png";
import  Badge5 from "../assets/imgs/avatar/a4.png";
import  Badge6 from "../assets/imgs/avatar/a5.png";

import Img from "../assets/imgs/avatar/a1.png";

import  B1 from "../assets/imgs/badge1.svg";
import  B2 from "../assets/imgs/badge2.svg";
import  B3 from "../assets/imgs/badge3.svg";

import { PlayerCard , UserCard} from '../components/PlayerProfile';

import{ReactComponent as ScoreBoard }from "../assets/imgs/SC1.svg"
import{ReactComponent as Sc }from "../assets/imgs/ScoreBoard.svg"
import {ReactComponent as Timer }from "../assets/imgs/timer.svg"
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";

import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
/////

const Backcolor = "#533483"
const Barside = "#f3460fe"
const GreyBackcolor = "#282c34"
const Borderimgcolor = "white";
const ProgressUser = "40%"
const player = { name: "Alchemist", login: "Eelaazmi", lvl: "1", gamePlayed : 350, lost : 150,  won : 200, rank: "rank1"}

////

const TheBox = styled.div`
  padding: 10p;
  width: 100%;
  border: 0px solid ${props => props.theme.colors.primarybg};
`;

const ProgressBar = styled.div`
width: 100%;
height: 32px;
background-color: ${GreyBackcolor};
border-radius: 18px;
display: flex;
align-items: center;
margin: 15px 0px;


> div{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  width: ${ProgressUser};
  background-color:${Backcolor};
  border-radius: 15px;

  .lvl{
    margin-right: 18px;
    font-size: ${props => props.theme.fontSize.s};
    font-weight: 12px;
    color: white;
    -webkit-text-stroke: 1px #b2a2b69a;
  }

}
`
//// DefaultComp
export default function Profile() {
  return (
    <div className='container' style={{marginTop: "50px"}}>
          <TheBox>
              <PlayerCard player={player} />
              <ProgressBar>
                <div >
                  <div className='lvl'>
                    level 8 - {ProgressUser}
                  </div>
                </div>
              </ProgressBar>
          </TheBox>
          <PlayerTabsBar/>
    </div>
  )
};

///// PlayerTabs Section
export function PlayerTabsBar()
{
  const [index, setindex] = useState(1)
  return ( 
    <PlayerAchieveStyle>
      <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/> 
        {index === 0 && <TabOne/> }
        {index === 1 && <Tabtwo/>}
        {index === 2 && <Tabthree/>}
    </PlayerAchieveStyle>
  )
}

const PlayerAchieveStyle = styled.div`
  padding-top: 20px;
  margin : 0px 0px;
  width:  100%;
  align-items: center;
  height: auto;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;

//// Tab Achievements info 
const linkslist = [" ACHIEVEMENTS", " FRIENDS" , " GAME HISTORY"]

const achievment1 = {
  name: "SERGENT",
  desc : "you played 20 game without any loss",
  badge : B1,
}
const achievment2 = {
  name: "The Alchemist",
  desc : "You are a M9WED player by nature",
  badge : B3,
}
const achievment3 = {
  name: "MASTER",
  desc : "you win 5 game.",
  badge : B1 ,
}

var listAchiev = [achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3]

export function TabOne()
{
  return (
    <TabOone >
      {
        listAchiev.map((match : any, id : number )=>{
            return<AchievmentComp key={id}achievment={match}  />
        })
      }
    </TabOone>
  )
}

const TabOone = styled.div`
  /* margin: 20px; */
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 20px;
  /* margin: 10px; */
  overflow-y: scroll;

  &::-webkit-scrollbar {
  width: 4px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: ${props => props.theme.colors.primarybg};
}

/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  background: ${props => props.theme.colors.primarybg};
}
`;

////// Tab Friends

export function Tabtwo()
{
  return (
    <TabOtwo >
      {/* <h1> Helloo Tab Friends </h1> */}
      {
        listCards.map((match : any, id : number )=>{
            return<UserCard key={id}data={match}  />
        })
      }
    </TabOtwo>
  )
}

const TabOtwo = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 10px;
  margin: 0px 0px;
  overflow-y: scroll;
  height: auto;
  max-height: 400px;
  /* border: 1px solid white; */

  overflow-y: scroll;
  &::-webkit-scrollbar {
  width: 4px;
}

&::-webkit-scrollbar-track {
  background: transparent; 
} 

/* Handle */
 &::-webkit-scrollbar-thumb {
  background: ${props => props.theme.colors.primarybg};
} 

/* Handle on hover */
 &::-webkit-scrollbar-thumb:hover { 
  background: ${props => props.theme.colors.primarybg};
}
`;

////

const card = {
  username: "mohammed el-karmi",
  grade : "Yaiba",
  status : true ,
  avatar : Badge2,
}
const card1 = {
  username: "elmahdi elaazmi",
  grade : "The Great Yaiba",
  status : false ,
  avatar : Badge3,

}
const card2 = {
  username: "Mohammed Reda amali",
  grade : "Prince of Persia",
  status : true ,
  avatar : Badge4,

}
const card3 = {
  username: "achraf belarif",
  grade : "Spydrey",
  status : true ,
  avatar : Badge5,
}
const card4 = {
  username: "elmahdi elaazmi",
  grade : "alchemist",
  status : true ,
  avatar : Badge6,
}

var listCards = [card, card1,card3, card3, card2,card, card1,card3, card3, card2
,card, card1,card3, card3, card2,card, card1,card3, card3, card2,card4, card1,card3, card3, card2,card, card1,card3, card4, card2, card, card1,card4, card3, card2,card, card1,card3, card3, card2, card, card1,card3, card3, card2,card, card1,card3, card3, card2, card, card1,card3, card3, card2,card, card1,card3, card3, card2]
///// Game History Tab

//////
export function Tabthree()
{
  return (  
    <TabOthree >
    {
        listGame.map((match : any, id : number )=>{
            return<GameComp key={id} match={match}  isFriend={true} />
        })
    }
    </TabOthree >
  )
}

const hieghtTab = "400px";

const TabOthree= styled.div`
  /* background-color: #4a085a4e; */
  width: 100%;
  max-height: ${hieghtTab};
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.colors.primarybg};
  /* height: ${hieghtTab}; */
  /* margin: 20px; */
  overflow-y: scroll;
      &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent; 
    } 

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
`;

/////// game data

const match1 = {
  name: "Melkarmi",
  score1 : 7,
  score2 : 5,
  img: Badge4,
  min: 10, 
  sec: 20,
}
const match2 = {
  name: "Mamali",
  score1 : 2,
  score2 : 5,
  img: Badge3,
  min: 25, 
  sec: 29,
}
const match3 = {
  name: "achraf",
  score1 : 17,
  score2 : 20,
  img: Badge5,
  min: 5, 
  sec: 20,

}

var listGame = [match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3]

export interface GameCompProps {
    win: boolean
}

export interface GameCardProps {
    match: {
        name: string;
        score1: number,
        score2: number,
        img: any,
        min: number,
        sec: number,
    },
    isFriend : boolean
}

////// game Comp

export  function GameComp(props : GameCardProps) {
    var state : boolean =( props.match.score1 > props.match.score2) ? true : false
  return (
    <GameCompStyle win={state} >
        <div style={{marginLeft : "24px"}}>
          <AvatarComponent img={ props.match.img} />
        </div>

        <Data>
            <div className='name' >
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

        <ElapsedTime>
          <Etimer className='E_timer'/>

          <div className='time_min'> {props.match.min}m  </div>
          <div className='time_sec'> {props.match.sec}s</div>

        </ElapsedTime>

    </GameCompStyle>
  )
}

const GameCompStyle = styled.div<GameCompProps>`
    
    width: 90%;
    height: 70px;
    margin: 15px 0px 10px 50px ;

    background: ${props => props.theme.colors.bg};
    border-top: 2px solid  ${props => props.theme.colors.border};
    border-bottom: 2px solid  ${props => props.theme.colors.border};
    border-left: 2px solid  ${props => props.theme.colors.border};
    /* margin-bottom: 10px; */
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
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

const ElapsedTime = styled.div`
    /* background-color: #325e81; */
    display: flex;
    position: absolute;
    right: 10px;
    top: 3px;
    /* margin: 5px 0px; */
    width: 10%;
    min-width: 90px;
    height: 40%;
    align-items: center;

    .E_timer {
      height: 22px;
      width: 22px;
      min-width: 25px;
      /* min-height: 25px; */

      margin: 0px 3px;
      path {
        fill: #a648b7;
      }
    }
    .time_min {
        /* background-color: #d16522; */
        /* width: auto; */
        width: auto;
        height: auto;
        /* min-width: 25px; */
        color: white;
        align-items: center;
        /* margin: 5px 0px 5px 5px; */
    }
    .time_sec{
      height: auto;
      width: auto;
      /* min-width: 25px; */
      color: white;

      /* background-color: #d16522; */
      /* margin: 5px 0px 5px 2px; */
    }
`;

interface AvatarProps {
  img: string,
  // score2 : number
}
export  function AvatarComponent(props: AvatarProps) {
  return (
    <Avatar>
      <img src={props.img} alt='avatar' />
    </Avatar>
  )
}

const Avatar = styled.div`
  width: 70%;
  height: 70%;
  border-radius : 50%;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  border: 3px solid   ${props => props.theme.colors.primarybg};;

`;

const Data = styled.div`
    /* width: 100%; */
    /* margin-left: 14px;s */
    /* height: 100%; */
    
    width: 20%;
    height: 70%;
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    /* font-weight: 700; */
    color:  ${props => props.theme.colors.primaryText};
    /* background-color: #00ffff92; */

    .name{
        font-family: 'Poppins' , sans-serif;
        text-transform: capitalize;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        /* or 18px */
        text-align: center;
        letter-spacing: 1px;
        /* color: #000000; */
        /* margin: 10px 0px 3px 10px; */
    }
    .stat{
        /* background-color: #b22bd0; */
        font-family: 'Poppins' , sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 100%;
        margin: 10px 0px;
        /* identical to box height, or 12px */
        text-align: center;
        letter-spacing: 0.3px;
        /* color: #000000; */
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
    height: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;


    svg{
 
        path{
            fill: ${props => props.theme.colors.primaryText}
        }
    }
    color: ${props => props.theme.colors.primaryText};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 10px;
    padding: 0 5px;
`;

