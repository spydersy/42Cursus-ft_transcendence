import React, {useState} from 'react'
import styled from "styled-components"
import Tet from "../assets/imgs/avatar/avatar1.png"
import Navlinks from '../components/Navlinks';
import { AchievmentComp,AchievmentCompProps }  from '../components/History'

import  Badge2 from "../assets/imgs/avatar/a1.png";
import  Badge3 from "../assets/imgs/avatar/a2.png";
import  Badge4 from "../assets/imgs/avatar/a6.png";
import  Badge5 from "../assets/imgs/avatar/a4.png";
import  Badge6 from "../assets/imgs/avatar/a5.png";
import  Badge7 from "../assets/imgs/avatar/a6.png";
import  Badge8 from "../assets/imgs/avatar/a7.png";
import  Badge9 from "../assets/imgs/avatar/a8.png";


import  B1 from "../assets/imgs/badge1.svg";
import  B2 from "../assets/imgs/badge2.svg";
import  B3 from "../assets/imgs/badge3.svg";

import { PlayerCard , UserCard} from '../components/PlayerProfile';

import{ReactComponent as ScoreBoard }from "../assets/imgs/SC1.svg"
import{ReactComponent as Sc }from "../assets/imgs/ScoreBoard.svg"
import {ReactComponent as Timer }from "../assets/imgs/timer.svg"

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

const TabOtwo= styled.div` 
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


export interface Game {
    data: {
    win: boolean;
    timeMin: number;
    timeSec: number;
    player : string;   //{ name: string, avatar: string, status: boolean , score:number};
    opponent : string; //{ name: string, avatar: string, status: boolean, score:number}; 
    }
  }

const game1 = {
  data: {
    win: true,
  timeMin: 5,
  timeSec: 30,
  player : "as", //{ name: "string1", avatar: "string1", status: true , score:18},
  opponent : "as", //{ name: "string2", avatar: "string2", status: false, score:5},
  }
}
const game2 = {
  data: { win: false,
  timeMin: 5,
  timeSec: 30,
  player : "asdas" , //{ name: "string", avatar: "string", status: false, score:5},
  oppenent : "asdasd" , //{ name: "string", avatar: "string", status: true , score:18},
  }
}

// var ListGameHistory = [game1, game2, game1, game2, game1, game2,game1, game2, game1, game2, game1, game2, game1, game2, game1, game2, game1, game2, game1, game2, game1, game2, game1, game2]
var ListGameHistory = [game1, game2]


export function Tabthree()
{
  return (  

      <TabOthree >
        {
          ListGameHistory.map((game : any, id : number )=>{
              return<Game key={id} data={game}/>
          })
        }
      </TabOthree >
  )
}

const hieghtTab = "400px";

const TabOthree= styled.div`
  background-color: #879898d1;
  width: 100%;
  max-height: ${hieghtTab};
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.colors.primarybg};
  /* height: ${hieghtTab}; */
  /* margin: 20px; */
`;

export  function Game(props : Game)  {
  return (
    <div >
      <GameStyle > 
        {/* Game Statistics */}
        <ScoreBoard className='Bordo'/>
          <Timer className='Timero'/>
          <div className='user1'> User1 </div>
          <div className='user2'> User2 </div>
          <div className='score1'> 5</div>
          <div className='score'> : </div>
          <div className='score2'> 15</div>
      </GameStyle>
    </div>
);
}

const GameStyle = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  width: 700px;
  height: 100px;
  background-color: #483d41d1;
  border: 2px solid black;
  margin: 10px;
  .mainbord {
    background-color: aqua;
  }

  .Bordo {
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
  }
  .Timero {
    position: absolute;
    /* background-color: aqua; */
    left: 40%;
    top: 11%;
    width: 60px;
    height: 25%;
  }

  .user1 {
    position: absolute;
    background-color: #e0b5c5d1;
    left: 10%;
    top: 42%;
  }
  .user2 {
    position: absolute;
    background-color: #cf2563d1;
    right: 20%;
    top: 42%;
  }
  


  .score {
    position: absolute;
    background-color: #338e21d1;
    right: 50%;
    bottom: 25%;
  }
  .score1 {
    position: absolute;
    background-color: #338e21d1;
    right: 45%;
    bottom: 25%;
  }
  .score2 {
    position: absolute;
    background-color: #338e21d1;
    left: 45%;
    bottom: 25%;
  }
  `;