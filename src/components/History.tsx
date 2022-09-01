import React from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from '../Pages/Home'
import { AvatarComponent } from './Upperbar'
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";
import  Badge1 from "../assets/imgs/badge1.svg";
import  Badge2 from "../assets/imgs/badge2.svg";
import  Badge3 from "../assets/imgs/badge3.svg";

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

  var listGame = [match1 , match2 ,  , match2]
  var listAchiev = [achievment1 , achievment2 , achievment3]

export default function History() {
  return (
    <Conta>


        <HistoryComponent/>
        <AchievementHistory/>
    </Conta>
  )
}
export  function HistoryComponent() {
  return (
    <HistoryComponentStyle>
        <Head>
            Last matches
            <a href="#profilepage">
                View all matches
            </a>
        </Head>
        {
            listGame.map((match : any, id : number )=>{
                return<GameComp key={id} match={match}  isFriend={true} />
            })
        }

    </HistoryComponentStyle>
  )
}


const Conta = styled.div`

    width: 90%;
    height: auto;
    display: flex;
    align-items: center;
    margin-top: 20px;
    /* background: #171A22; */
    flex-direction: row;
    border-radius: 10px ;
    padding: 0 15px;
    gap: 5px;
    /* border : 1px solid ${props => props.theme.colors.border};; */
`
const HistoryComponentStyle = styled.div`

    flex: 1;
    min-width: 330px;
    min-height: 300px;
    max-height: 300px;
    height: auto;
    display: flex;
    /* align-items: center; */

    background: #171A22;
    flex-direction: column;
    border-radius: 10px ;
    padding: 0 15px;
    border : 1px solid ${props => props.theme.colors.border};;
`
const Head = styled.div`
    margin-bottom: 20px;
    width: 100%;
    height: 60px;

    border-bottom: 1px solid ${props => props.theme.colors.border};;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:${props => props.theme.fontSize.l} ;
    font-weight: 600;
    color :${props => props.theme.colors.primaryText}; 
    background: transparent;
    > a{
        align-items: center;
        font-size: ${props => props.theme.fontSize.s};
        color: ${props => props.theme.colors.primaryText};
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
    /* width: 100%;
    height: 56px;
    position: relative;
    margin-bottom: 10px;
    mix-blend-mode: multiply;
    border-radius: 16px 0 0px 16px;
    display: flex;
    align-items: center;
    background: linear-gradient(270deg, #157DBD 3.1%, rgba(21, 125, 189, 0.82) 44.76%, rgba(21, 125, 189, 0.58) 72.2%, #FFFFFF 100.65%); */
    width: 100%;
    height: 55px;
    background: ${props => props.theme.colors.bg};
    border-top: 2px solid  ${props => props.theme.colors.border};
    border-bottom: 2px solid  ${props => props.theme.colors.border};
    border-left: 2px solid  ${props => props.theme.colors.border};
    margin-bottom: 10px;
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
const Data = styled.div`
    margin-left: 14px;
    height: 40px;
    display: flex;
    align-items: start;
    /* justify-content: space-between; */
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    color:  ${props => props.theme.colors.primaryText};
    .name{
        font-family: 'Poppins' , sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        /* or 18px */

        text-align: center;
        letter-spacing: 0.5px;

        /* color: #000000; */
        /* margin: 10px 0px 3px 10px; */
    }
    .stat{
        font-family: 'Poppins' , sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 150%;
        /* identical to box height, or 12px */

        text-align: center;
        letter-spacing: 0.5px;

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

export  function AchievementHistory() {
    return (
      <HistoryComponentStyle>
          <Head>
                Latest Achievements
              <a href="#profilepage">
                  View all matches
              </a>
          </Head>
          {
              listAchiev.map((match : any, id : number )=>{
                  return<AchievmentComp key={id}achievment={match}  />
              })
          }
   
      </HistoryComponentStyle>
    )
  }



export interface AchievmentCompProps {
    achievment: {
        name: string;
        desc: string,
        badge: string,
    },
}

export  function AchievmentComp(props : AchievmentCompProps) {
    // var state : boolean =( props.match.score1 > props.match.score2) ? true : false
  return (
    <AchievmentCompStyle  >
       <div id="title">
            {props.achievment.name}
       </div>
        <div id="desc">
            {props.achievment.desc}
        </div>
        <div id="badge">
          <img src={props.achievment.badge} alt="badge" />
        </div>
    </AchievmentCompStyle>
  )
}

const AchievmentCompStyle = styled.div`
    width: 100%;
    height: 60px;
    background: ${props => props.theme.colors.bg};;
    border: 2px solid ${props => props.theme.colors.border};;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    /* justify-content: ; */
    color: ${props => props.theme.colors.primaryText};;
    #title{
        font-family: 'Poppins' , sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        /* or 18px */

        text-align: center;
        letter-spacing: 0.5px;

        margin: 10px 0px 3px 10px;
    }
    #desc{
        font-family: 'Poppins' , sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 8px;
        line-height: 150%;
        /* identical to box height, or 12px */

        text-align: center;
        letter-spacing: 0.5px;

        
        margin-left: 10px;
        /* max-width: ; */

    }
    #badge
    {
        position: absolute;
        top: 0;
        right: 0;
        width: 55px;
        height: 55px;
        background-color:  ${props => props.theme.colors.primarybg};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
