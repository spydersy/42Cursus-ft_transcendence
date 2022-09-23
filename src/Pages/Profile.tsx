import React, {useState , useEffect} from 'react'
import styled , {css}from "styled-components"
import Navlinks from '../components/Navlinks';
import { AchievmentComp,AchievmentCompProps }  from '../components/History'
import  Badge2 from "../assets/imgs/avatar/a1.png";
import  Badge3 from "../assets/imgs/avatar/a2.png";
import  Badge4 from "../assets/imgs/avatar/a6.png";
import  Badge5 from "../assets/imgs/avatar/a4.png";
import  Badge6 from "../assets/imgs/avatar/a5.png";
import  B1 from "../assets/imgs/badge1.svg";
import  B3 from "../assets/imgs/badge3.svg";
import { PlayerCard , UserCard} from '../components/PlayerProfile';
import { GameComp } from "../components/PlayerProfile";
import { UserInvitCard } from "../components/PlayerProfile";
import { UserBlockedCard } from "../components/PlayerProfile";
import {ReactComponent as Warningo} from "../assets/imgs/warning.svg";



//-- Global Data --//
const Backcolor = "#1aba1d"
const Barside = "#f3460fe"
const GreyBackcolor = "#16c447"

//-- Global User Data --//
const ProgressUser = "40%"
const player = { name: "Alchemist", login: "Eelaazmi", lvl: "1", gamePlayed : 350, lost : 150,  won : 200, rank: "rank1"}
const hieghtTab = "500px";

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

var listAchiev = [achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3, achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3]
//------//

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
,card, card1,card3, card3, card2,card, card1,card3, card3, card2,card4, card1,card3,
card3, card2,card, card1,card3, card4, card2, card, card1,card4, card3, card2,card,
card1,card3, card3, card2, card, card1,card3, card3, card2,card, card1,card3, card3, 
card2, card, card1,card3, card3, card2,card, card1,card3, card3, card2]

//-----//

const match1 = {
  match:{
  name: "Melkarmi",
  score1 : 7,
  score2 : 5,
  img: Badge4,
  min: 10, 
  sec: 20}, 
  isFriend: false,
}
const match2 = {
  match:{
  name: "Mamali",
  score1 : 2,
  score2 : 5,
  img: Badge3,
  min: 25, 
  sec: 29}, 
  isFriend: true,
}
const match3 = {
  match:{
  name: "achraf",
  score1 : 17,
  score2 : 20,
  img: Badge5,
  min: 5, 
  sec: 20},
  isFriend: true,
}
var listGame = [match1 , match2, match3, match1 , match2, match3, match1 , match2, match3,
   match1 , match2, match3, match1 , match2, match3, match1 , match2, match3, match1 , match2, match3]

//-----//

const UserInvit = {
username: "Admiral Akainu",
avatar : Badge3,
}
const UserInvit1 = {
  username: "Admiral Kizaro",
  avatar : Badge2,
}
const UserInvit2 = {
  username: "Admiral Aokij",
  avatar : Badge4,
}
const UserInvit3 = {
  username: "Admiral Garb",
  avatar : Badge5,
}
const UserInvit4 = {
  username: "Yonko shanks",
  avatar : Badge6,
}
const UserInvit5 = {
  username: "Yonko Kaido",
  avatar : Badge2,
}
const UserInvit6 = {
  username: "Yonko Big mom",
  avatar : Badge6,
}
const UserInvit7 = {
  username: "Yonko Whitebeard",
  avatar : Badge4,
}
const UserInvit8 = {
  username: "Gold Roger",
  avatar : Badge2,
}
var listInvit = [UserInvit  , UserInvit1 , UserInvit2, UserInvit3, UserInvit4, UserInvit5, UserInvit6, UserInvit7, UserInvit8, UserInvit , 
                 UserInvit1 , UserInvit2 , UserInvit3, UserInvit4, UserInvit5, UserInvit6, UserInvit7, UserInvit8, UserInvit , UserInvit1,
                 UserInvit2, UserInvit3, UserInvit4, UserInvit5, UserInvit6, UserInvit7, UserInvit8]

const BlockedUser = {
  username: "Nami San",
  avatar : Badge2,
}
const BlockedUser1 = {
  username: "Nico Robin",
  avatar : Badge3,
}
const BlockedUser2 = {
  username: "Franky",
  avatar : Badge4,
}
const BlockedUser3 = {
  username: "Brook",
  avatar : Badge5,
}
var listBlocked = [BlockedUser , BlockedUser1 , BlockedUser2 , BlockedUser3]

//-----------------------//

//// Default function Profile
export default function Profile() {
  const id = window.location.pathname.split("/")[2];
  const [isCurrentUser, setisCurrent] = useState(true)


  console.log(id);
  useEffect(() => {

  }, []);
  var s : string | null = localStorage.getItem('user');
  if (s)
  {
    // const data : UserProp =  JSON.parse(s || '{}');
    // setcurrentUser(data)
    // list[0].href = "/profile/" + data.login
    // console.log(data)
  }

  return (
    <div className='container' style={{marginTop: "100px"}}>
          <TheBox>
              <PlayerCard  isCurrentUser={isCurrentUser} player={player} />
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
const TheBox = styled.div`
  padding: 10p;
  width: 100%;
  border: 0px solid ${props => props.theme.colors.primarybg};
`;
const ProgressBar = styled.div`
width: 100%;
height: 32px;
background-color: ${props => props.theme.colors.primarybg};
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
  background-color: ${props => props.theme.colors.purple};
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

///// PlayerTabs Section
const linkslist = [" ACHIEVEMENTS", " FRIENDS" , " GAME HISTORY", "PENDING REQUESTS", "BLOCKED USERS"]

export function PlayerTabsBar()
{
  const [index, setindex] = useState(0)
  return ( 
    <PlayerAchieveStyle>
      <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/> 
        {index === 0 && <TabOne/> }
        {index === 1 && <Tabtwo/>}
        {index === 2 && <Tabthree/>}
        {index === 3 && <Tabfour/>}
        {index === 4 && <Tabfive/>}
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

//#1  Tab Achievements info 
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
  height: ${hieghtTab};
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

//#2  Tab Friends
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
  max-height: ${hieghtTab};
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

//#3  Game History Tab
export function Tabthree()
{
  return (  
    <TabOthree >
    {
        listGame.map((match : any, id : number )=>{
            return<GameComp key={id} match={match.match}  isFriend={match.isFriend} />
        })
    }
    </TabOthree >
  )
}
const TabOthree= styled.div`
  width: 100%;
  max-height: ${hieghtTab};
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.colors.primarybg};
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

//#4  Pending Requests
export function Tabfour()
{
  return (
    <TabOfour>
    {
        listInvit.map((invit : any, id : number )=>{
            return<UserInvitCard key={id} data={invit} />
        })
    }
       
    </TabOfour>
  )
}
const TabOfour= styled.div`

    /* background-color: #cccccc4e; */
    max-height: ${hieghtTab};
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
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

//#5  My Black List
export function Tabfive()
{
  return (
    <TabOfive> 
      <div className="Title">
        <Warningo className="icon" /> 
      </div>
        {
          listBlocked.map((invit : any, id : number )=>{
              return<UserBlockedCard key={id} data={invit} />
          })
        }  
      
      </TabOfive>
  )
}
const TabOfive= styled.div`

    /* background-color: rgba(80, 22, 22, 0.313);  */
    max-height: ${hieghtTab};
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    overflow-y: scroll;
    .Title {
      position: absolute;
      width: 100%;
      opacity: 0.2;
      left: 10%;
      bottom: 20%;

    }
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

/// To be added : Other users profile // Rooms Page /// All users page // 


