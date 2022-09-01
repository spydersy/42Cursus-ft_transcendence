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

import dots from "../assets/imgs/tests/dots.svg"

import dot from "../assets/imgs/circle.svg"

const Backcolor = "#533483"
const Barside = "#f3460fe"
const Borderimgcolor = "white";
const ProgressUser = "40%"

///// main comp
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

const TheBox = styled.div`
  padding: 20p;
  width: 100%;
  border: 0px solid ${props => props.theme.colors.primarybg};
`;

//// player card 
export interface PlayerCardProps {
  player: {
    name: string,
    login: string,
    lvl: number,
    gamePlayed : number,
    lost : number,
    won : number
  }
}

const player = {
  
  name: "Alchemist",
  login: "Eelaazmi",
  lvl: 1,
  gamePlayed : 350,
  lost : 150,
  won : 200,
}

export function PlayerCard(props: PlayerCardProps) {
  return (
    <PlayerCardStyle  >
      
      <div className='first'> 
        <div className='img'>
          <img src={Tet} alt="test" />
        </div>
      </div>


      <div className='sec'>

        <div className='infoSec'>

          <div className='Bar'>  
            <div className='name'>
              Username : 
            </div>
            <div className='text' > {props.player.name} </div>
            
          </div>
        
          <div className='Bar'>  
            <div className='name'>
              Intra-name : 
            </div>
              <div className='text' > {props.player.login} </div>
            
          </div>

          <div className='Bar'>  
            <div className='name'>
              Level : 
            </div>
              <div className='text'> {props.player.lvl} </div>
            
          </div>

          <div className='Bar'>  
            <div className='name'>
              Played-game : 
            </div>
            
              <div className='text' > {props.player.gamePlayed} </div>
          </div>
          
          <div className='Bar'>  
            <div className='name'>
              Won : 
            </div>
              <div className='text-w' > +{props.player.won} </div>
            
          </div>
          
          <div className='Bar'>  
            <div className='name'>
            Defeated : 
            </div>
              <div className='text-l' > -{props.player.lost} </div>
            
          </div>

        </div>

      </div>

    </PlayerCardStyle>
  )
}

const PlayerCardStyle = styled.div`

  /* background-color: #ffffff; */
  padding: 20px 0px;
  width:100%;
  height: 350px;
  display: flex;
  align-items: right;
  justify-content: space-between;

  .first{
    width: 30%;
    height: 100%;
    background-color: ${Backcolor};
    border-left: 20px solid ${Barside};
    border-radius: 80px 0px 0px 0px;
    .img{
      display: flex;
          position: flex;
          width : 80%;
          height: 80%;
          margin-top: 15%;
          margin-left: 15%;
          > img{
            border-radius: 50%;
            width: 80%;
            height: 80%;
            border: 8px solid ${Borderimgcolor};
          }
      }
  }

  .sec{
      width: 75%;
      height: auto;
      /* padding-top: 50px; */
      background-color:${props => props.theme.colors.primarybg}; 
      position: flex;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding-left: 10%;
      border-radius: 00px 10px 0px 00px;
      .infoSec {
        width: 100%;
        margin-top: 50px;
      }
        .Bar{
          width: 100%;
          height: 20px;
          margin-top: 15px;
          display: flex;
          align-items: center;
        }
        .name{
          font-family: 'Michroma', sans-serif;
          font-style: normal;
          min-width: 250px;
          /* font-weight: 400; */
          font-size: ${props => props.theme.fontSize.l}; 
          line-height: 40px;
          display: flex;
          align-items: right;
          color: ${props => props.theme.colors.primaryText}; 
        }
        .texto{
          color: #825050;
          margin-left: 5%;
          font-size: 10px;
          margin: 0px 110px;
        }
        .text{
          color: ${Backcolor};
          font-size: 25px;
          font-weight: bold;
        }
        .text-w{
          color: #0cb636;
          /* color: ${Backcolor}; */
          font-weight: bold;
          font-size: 23px;
        }
        .text-l{
          color: #bc2727;
          font-weight: bold;
          /* color: ${Backcolor}; */
          font-size: 23px;
        }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${props => props.theme.colors.primarybg};
  border-radius: 15px;
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
      font-weight: 10px;
      color: white;
    }


  }

`

///// Player Tabs Section
export function PlayerTabsBar()
{
  const [index, setindex] = useState(1)
  // const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

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

///// tab achieve
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

// User Card Comp
export interface UserCard {
  // avatar: string;
  data: {
    username: string;
    grade: string;
    status: boolean;
    avatar: string;
  }
}



export  function UserCard(props : UserCard) {
  const [active, setActive] = useState(false);
return (
  <UserCardStyle>
    
    
    <div className="status" >
    </div>

    <img src={dots} className="dots"/> 
      <div className='List'>
        hh
        <div className='element' >
            Unfriend
        </div>
      
      </div>
    <img src={props.data.avatar} className="avatar" />
    
    <div className="Uname">
        {props.data.username}
   </div>


    

    {/*<div className="grade">
          {props.data.grade}
    </div>  */}

   
    
  </UserCardStyle>
  
)
}

const UserCardStyle = styled.div`
  position: relative;
  background: ${Backcolor};
  margin : 10px;
  width: 150px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid  #70539b ;
  animation: fadeIn 9s;

  .status {
    background-color: #238f33;
    border: 3px solid ${Backcolor};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: 0px;
    transform: translate(-12%, -12%);
  }
  .List {
    display: none;
  }
  .dots {
    display: flex;
    position: absolute;
    width: 20px;
    height:15px;
    right: 3px;
    top: 3px;
    padding: 1px 1px ;
    > img {
     height: 100%;
     width: 100%;
    }
    &:hover {
      background-color: #238f33;
    }
    }
  .avatar {
    display: none;

  }
  .Uname {
    position: absolute;
    color: white;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin : 2px 0px;
    text-transform: capitalize;
    font-size: 13px;
    font-weight: bold;
    bottom: 0px;
  }

  &:hover {
    height: 100px;
    transition: 0.8s;
   
    .avatar {
      position: absolute;
      display: block;
      margin: 0px 0px 0px 50x;
      /* margin-left: auto;
      margin-right: auto; */
      width: 50%;
      top: 0px;
      left: 25%;
      animation: fadeIn 6s;
      > img {
        width: 80px;
        height: 80px;
      }
    }

  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
  }
`;

///// Game History Tab
export function Tabthree()
{
  return (  <div> <h1> Helloo Tab Game History </h1> </div> )
}