import React, {useState} from 'react'
import styled from "styled-components"
import Tet from "../assets/imgs/tests/test2.png"
import Navlinks from '../components/Navlinks';
import { AchievmentComp,AchievmentCompProps }  from '../components/History'
import  Badge1 from "../assets/imgs/badge1.svg";
import  Badge2 from "../assets/imgs/badge2.svg";
import  Badge3 from "../assets/imgs/badge3.svg";

////
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
      <div className='first'> </div>
      
      <div className='sec'>

        <div className='img'>
          <img src={Tet} alt="test" />
        </div>

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
    </PlayerCardStyle>
  )
}

const PlayerCardStyle = styled.div`

  width:100%;
  height: 400px;
  display: flex;
  align-items: right;
  justify-content: space-between;
  .first{
  width: 35%;
  height: 100%;
  background-color: #DBE9F1;
}
.sec{
    width: 65%;
    height: auto;
    padding-top: 50px;
    background-color:${props => props.theme.colors.primarybg}; 
    position: relative;
    display: flex;
    align-items: flex-start;
    /* justify-content: ; */
    flex-direction: column;
    padding-left: 20%;

    .img{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -90px;
      width: 190px;
      height: 280px;
      border-radius: 12px;
      /* background-color: #0cb636; */
      > img{
        width: 100%;
        height: 100%;
        
      }
    }

    .Bar{
      width: 100%;
      height: 20px;
      margin-top: 15px;
      display: flex;
      align-items: center;
      /* background-color: #d21a1a8e; */
    }

    .name{
      font-family: 'Michroma', sans-serif;
      font-style: normal;
      min-width: 300px;
      font-weight: 350;
      font-size: ${props => props.theme.fontSize.l}; 
      line-height: 30px;
      display: flex;
      align-items: right;
      color: ${props => props.theme.colors.primaryText}; 
      /* margin-top: 50px; */
      /* background-color: #8b80ed6a; */
    }

    .texto{
      color: #0a0b0b;
      margin-left: 5%;
      font-size: large;
      margin: 0px 110px;
      /* background-color: #13575771; */
    }
    .text{
      color: #0a0b0b;
      margin-left: 5%;
      font-size: large;
      padding: 0px 10px;
      /* background-color: #13575771; */
    }
    .text-w{
      color: #0cb636;
      margin-left: 5%;
      /* background-color: #13575771; */
    }
    .text-l{
      color: #bc2727;
      margin-left: 5%;
      /* background-color: #13575771; */
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${props => props.theme.colors.seconderybg};
  border-radius: 12px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primaryText};
  margin-top: 20px;
  > div{
    /* padding-right: 3px; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 60%;
    background-color: ${props => props.theme.colors.primarybg};
    border-radius: 15px;
    .lvl{
      margin-right: 18px;
      font-size: ${props => props.theme.fontSize.s};
      color: white;
    }
  }

`
//// 

const linkslist = [" ACHIEVEMENTS", " FRIENDS" , " GAME HISTORY"]

const achievment1 = {
  name: "SERGENT",
  desc : "you played 20 game without any loss",
  badge : Badge1,
}
const achievment2 = {
  name: "The Alchemist",
  desc : "You are a M9WED player by nature",
  badge : Badge2,
}
const achievment3 = {
  name: "MASTER",
  desc : "you win 5 game.",
  badge : Badge3 ,
}

var listAchiev = [achievment1 , achievment2 , achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3,achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3, achievment3]

/////

export function TabOne()
{
  return (
    <TabOone >
      {/* <h1>Tab One</h1> */}
      {
        listAchiev.map((match : any, id : number )=>{
            return<AchievmentComp key={id}achievment={match}  />
        })
      }
    </TabOone>
  )
}

const TabOone = styled.div`
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 0px;
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

////// 

export function Tabtwo()
{
  return (
    <TabOone >
      {/* <h1> Helloo Tab Friends </h1> */}
      {
        listCards.map((match : any, id : number )=>{
            return<UserCard key={id}data={match}  />
        })
      }
    </TabOone>
  )
}

const TabOtwo= styled.div` 
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 0px;
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

////

const card = {
  username: "mel-karmi",
  grade : " The Alchemist",
  status : true ,
  avatar : Tet,
}

const card1 = {
  username: "eelaazmi",
  grade : "The Great Yaiba",
  status : false ,
  avatar : Badge2,

}
const card2 = {
  username: "mamali",
  grade : "Prince of Persia",
  status : true ,
  avatar : Tet,

}

var listCards = [card]

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
return (
  <UserCardStyle  >
    <div className="unfriend">
    x
    </div>
    <div className="img">
      <img src={props.data.avatar} />
    </div>

     <div id="username">
          {props.data.username}
     </div>
    
    <div id="grade">
          {props.data.grade}
    </div>
    
    <div id="status">
          {props.data.status ? <div className="text-w">online</div> : <div className="text-l">offline</div>}
    </div>
  
  </UserCardStyle>
)
}

const UserCardStyle = styled.div`
  position: absolute;
  width: 250px;
  height: 350px;
  background: #2e608a;
  border-radius: 8px;
  
  .unfriend {
    position: absolute;
    width: 10%;
  }

  .img {
    width: 100%;
    height: 50%;
    background: #bb1515;
    position: flex;
  }

.username{
  position: absolute;
  width: 43px;
  height: 9px;
  left: 1001px;
  top: 909px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 8px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #FFFFFF;
}
.grade{
  position: absolute;
  width: 43px;
  height: 9px;
  left: 1002px;
  top: 921px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #969696;
}


`;

///// 

export function Tabthree()
{
  return (  <div> <h1> Helloo Tab Game History </h1> </div> )
}

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

  margin-top: 15px;
  padding : 10px;
  /* padding: 0px 0px; */
  width:  99.5%;
  align-items: center;
  height: auto;
  border: 2px solid ${props => props.theme.colors.primarybg};
  /* background-color: #e1e11952; */
  flex-direction: column;
  
  .sticker {
    background-color: ${props => props.theme.colors.primarybg};
    height: 8%;
    /* width: 50%; */
    border-radius: 0px 10px 10px 0px;
  }
  
  .title{
    padding: 0px 5px;
    height: 9%;
    /* width: 100%; */
    font-size: 20px;  
    color: white;
  }
`;

/////

export default function Profile() {
  return (
    <div className='container' style={{marginTop: "50px"}}>
         <TheBox>

          <PlayerCard player={player} />
            <ProgressBar>
          
              <div >
                <div className='lvl'>
                  level 8 - 60%
                </div>
              </div>

            </ProgressBar>
          </TheBox>

          <PlayerTabsBar/>
    </div>
  )
};

const TheBox = styled.div`
  padding: 8px 8px 8px 8px;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid ${props => props.theme.colors.primarybg};

`;

////