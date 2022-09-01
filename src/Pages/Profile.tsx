import React, {useState} from 'react'
import styled from "styled-components"
import Tet from "../assets/imgs/avatar/avatar1.png"
import Navlinks from '../components/Navlinks';
import { AchievmentComp,AchievmentCompProps }  from '../components/History'
import  Badge1 from "../assets/imgs/avatar/avatar1.png";
import  Badge2 from "../assets/imgs/avatar/avatar2.png";
import  Badge3 from "../assets/imgs/avatar/avatar3.png";
import  B1 from "../assets/imgs/badge1.svg";
import  B2 from "../assets/imgs/badge2.svg";
import  B3 from "../assets/imgs/badge3.svg";

import { PlayerCard , UserCard} from '../components/PlayerProfile';

/////
const Backcolor = "#533483"
const Barside = "#f3460fe"
const GreyBackcolor = "#282c34"
const Borderimgcolor = "white";
const ProgressUser = "40%"
const player = { name: "Alchemist", login: "Eelaazmi", lvl: "1", gamePlayed : 350, lost : 150,  won : 200, }

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
margin-top: 8px;

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

  /* margin-top: 40px; */
  padding-top: 25px;
  margin : 20px 0px;
  width:  100%;
  align-items: center;
  height: auto;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;

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
  badge : B1,
}
const achievment3 = {
  name: "MASTER",
  desc : "you win 5 game.",
  badge : B1 ,
}

var listAchiev = [achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3]

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
  margin: 20px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 10px;
  overflow-y: scroll;
  margin: 10px;

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
  margin: 20px 0px;
  overflow-y: scroll;
  height: 400px;
  border: 1px solid white;

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
  avatar : Badge3,
}
const card1 = {
  username: "elmahdi elaazmi",
  grade : "The Great Yaiba",
  status : false ,
  avatar : Badge2,

}
const card2 = {
  username: "Mohammed Reda amali",
  grade : "Prince of Persia",
  status : true ,
  avatar : Badge3,

}
const card3 = {
  username: "achraf belarif",
  grade : "Spydrey",
  status : true ,
  avatar : Badge3,
}
const card4 = {
  username: "elmahdi elaazmi",
  grade : "alchemist",
  status : true ,
  avatar : Badge3,
}

var listCards = [card, card4,card2, card3]

///// Game History Tab
export function Tabthree()
{
  return (  <div> <h1> Helloo Tab Game History </h1> </div> )
}