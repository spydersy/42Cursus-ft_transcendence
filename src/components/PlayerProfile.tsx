import React, {useState}  from 'react'
import styled ,{css}from "styled-components";
import Avatar from "../assets/imgs/tests/guy.svg"
import { ReactComponent as Penta} from "../assets/imgs/penta.svg"
import { CircularProgressbar } from 'react-circular-progressbar';
import{ReactComponent as DotsIcon }from "../assets/imgs/dots.svg"
import rank1 from "../assets/imgs/ranks/iron.png"
import rank2 from "../assets/imgs/ranks/gold.png"
import rank3 from "../assets/imgs/ranks/bronze.png"
import {ReactComponent as Etimer} from "../assets/imgs/Etimer.svg";
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";


/// UserProfile Variants  
const Backcolor = "#533483"
const GreyBackcolor = "#282c34"
const Barside = "#f3460fe"
const Borderimgcolor = "white";
const player = {  name: "Alchemist", login: "Eelaazmi",  lvl: "1", gamePlayed : 350,  lost : 150, won : 200, rank : rank2}
const green = "#238b65"

//// PlayerCard Comp 
export interface PlayerCardProps {
    player: {
      name: string,
      login: string,
      lvl: string,
      gamePlayed : number,
      lost : number,
      won : number,
      rank:string
    }
}
  
export function PlayerCard(props: PlayerCardProps) {
  return (
      <PlayerCardStyle  >
      
          <div className='Identity'> 
              
              <img src={Avatar} className="Iavatar"alt="test" />

              <div className='infoSec'>

                  <div className='Bar'>  
                      <div className='name'>
                          Username : 
                      </div>
                      <div className='text' > {props.player.name} </div>
                  </div>

                  <div className='Bar'>  
                      <div className='name'>
                      Intraname : 
                      </div>
                      <div className='text' > {props.player.login} </div>
                  </div>

              </div>
              
          </div>

          <Stats player={player}/>
          
      </PlayerCardStyle>
  )
}
  
const PlayerCardStyle = styled.div`
padding: 0px 0px;
margin-bottom: 13px;
width:  100%;
height: 300px;
display: flex;
position: relative;
border-radius: 10px 10px 10px 10px;

.Identity{
    width: 40%;
    height: 100%;
    background-color:${Backcolor};
    border-radius: 10px 0px 0px 0px;
    bottom: 0px;

    .Iavatar{
        background-color: white;
        display: flex;
        position: absolute;
        width : 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid ${GreyBackcolor};
        top: 13%;
        left: 6%;
        > img{
            /* border-radius: 30%; */
            width: 100%;
            height: 100%;
        }
    }

    .infoSec {
        position: absolute;
        height: 70px;
        bottom: 0px;
        justify-content: center;
        left: 2%;
        bottom: 5px;

        .Bar{
            margin-top: 5px;
            display: flex;
            align-items: center;
            .name{
                font-family: 'Michroma', sans-serif;
                font-style: normal;
                background-color: #8841ca1b;
                font-size: 12px;
                min-width: 90px;
                line-height: 20px;
                display: flex;
                align-items: right;
                color: ${props => props.theme.colors.primaryText};
                padding: 0px 0px;
                margin-right: 10px;
            }
            .text{
                color: ${props => props.theme.colors.primaryText};
                font-size: 19px;
                font-weight: bolder;
                -webkit-text-stroke: 1px #44404562;

            }
        }
    }
}

`;

//// Stats Comp
export function Stats(props: PlayerCardProps) {
    return (
      <StatsStyle  >
        <Data>
       
            <div className='progessCont' style={{ width: "140px", height: "140px" }}>
                <CircularProgressbar  styles={{
                    path: {
                    stroke: `#F13950`,
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 1s ease 0s',
                    transformOrigin: 'center center',
                    },
                    trail: {
                    stroke: '#0E1117',
                    strokeLinecap: 'round',
        
                    },
                    text: {
                    fill: '#000',
                    fontSize: '16px',
                    },
                }} value={15}  text={`${15}%`} />
                <div className='circularLabel'>
                {props.player.lost} <span style={{color: "#F13950"}}>Lost </span>
                </div>
            </div>
            

            <div  id="pentagon">
                <Penta/>
                <img src={props.player.rank} className="Rank" />
                <div>
                  <div id="played">
                      {props.player.gamePlayed}
                  </div>
                  <div id="label">
                    PLAYED GAMES
                </div>
                </div>
            
            </div>

            <div className='progessCont' style={{ width: "140px", height: "140px" }}>
                <CircularProgressbar  styles={{
                    path: {
                    stroke: `${green}`,
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 1s ease 0s',
                    transformOrigin: 'center center',
                    },
                    trail: {
                    stroke: '#000000',
                    strokeLinecap: 'round',
        
                    },
                    text: {
                    fill: '#000',
                    fontSize: '16px',
                    },
                }}
                value={66}  text={`${66}%`} />
                <div className='circularLabel'>
                {props.player.won} <span style={{color: "#3CC592"}}> Won </span>
                </div>
            </div>
       
        </Data>
      </StatsStyle>
    )
}

const StatsStyle = styled.div`
background-color: ${GreyBackcolor};
width: 100%;
min-height: 240px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
gap: 40px;
border-radius: 0px 10px 0px 0px;
`
const Data = styled.div`
/* background-color: #12128d ff41; */
width: 71%;
height: 100%;
display: flex;
position: relative;
/* top: 12%; */
/* align-items: flex-start; */
/* flex-direction: row; */
justify-content: space-around;

.progessCont{
    /* padding: 0px 10px; */
    position : relative;
    margin-top: 30px;
    top: 10%;
    font-family: 'Poppins' , sans-serif;
    font-size:  ${props => props.theme.fontSize.l}; 
    text-transform: uppercase;
    font-weight: 600;
    width: 100%;

    .circularLabel{
        top: 10%;
        text-align: center;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 18px;
        color : ${props => props.theme.colors.primaryText};
        -webkit-text-stroke: 1px #44404562;
    }
}

#pentagon {
    top: 13%;
    /* background-color: #a1a12d39; */
    position: relative;
    width: 210px;
    height: 180px;
    padding: 0px 20px;

    .Rank {
      width: 40%;
      height: 60%;
      top: 13%;
      left: 30%;
      position: absolute;
      display: flex;
      /* background-color: #ac25a84e; */
    }
    > div{
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 50px;
        font-family: 'Poppins' , sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        #played{
        /* background-color: aqua; */
        font-style: normal;
        font-weight: 700;
        font-size:  ${props => props.theme.fontSize.ll}; 
        line-height: 30px;
        color:  ${props => props.theme.colors.primaryText};
        -webkit-text-stroke: 1px #444045;
 
        }
        #label{
        /* width: ; */
        /* background-color: aqua; */
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        font-style: bold;
        font-weight: 600;
        font-size:  ${props => props.theme.fontSize.l}; 
        line-height: 25px;
        text-transform: uppercase;
        color:  ${props => props.theme.colors.primaryText}; 
        -webkit-text-stroke: 1px #444045b7;
        }
    }
    > svg {
        width: 100%;
        height: 100%;
        /* display: none; */
        /* svg{ */

    path{
        stroke: ${props => props.theme.colors.purple}
    } 
    } 
}
`
const ProgressBar = styled.div`

width: 90%;
height: 27px;
background-color: ${props => props.theme.colors.bg};
border-radius: 12.3071px;
display: flex;
align-items: center;

> div{
    /* padding-right: 3px; */
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 36%;
    background-color: ${props => props.theme.colors.purple};
    border-radius: 12.3071px;
    .lvl{
    margin-right: 10px;
    font-size: ${props => props.theme.fontSize.s};
    color: white;
    }
}

`
///// UserCard Comp
export interface UserCard {
  // avatar: string;
  data: {
    username: string;
    grade: string;
    status: boolean;
    avatar: string;
  }
}
export interface StyleProps {
  // avatar: string;

    status: boolean;

}

export  function UserCard(props : UserCard) {
  const [active, setActive] = useState(false);
  return (
    <UserCardStyle status={props.data.status}>
      
      <div className="status" >
      </div>

      <DotsIcon className='dots'/>
        <div className='List'>
          <div className='element' >
              Unfriend
          </div>
        
        </div>
      <img src={props.data.avatar} className="avatar" />
      
      <div className="Uname">
          {props.data.username}
    </div>
    </UserCardStyle>
  )
}

const UserCardStyle = styled.div<StyleProps>`
  position: relative;
  background: ${Backcolor};
  margin : 10px;
  width: 130px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid  #70539b ;
  animation: fadeIn 2s;
  ${props => props.status == true ? css`
  .status {
      background-color: #3CC592;
      /* display: none; */
    }
    ` :
    css`
    .status {
      background-color: #e40101;
    }
    
    `}

  .status {
  

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
  > svg {
    /* display: flex; */
    cursor: pointer;
    position: absolute;
    width: 20px;
    height:15px;
    right: 3px;
    top: 3px;
    /* padding: 1px 1px ; */
    path{
      stroke: white;
    }
    &:hover {
      transform: scale(1.5);

      right: 3px;
      top: 3px;
      path{
      stroke: black;
    }

    }
    }
  .avatar {
    display: none;
  }
  .Uname {
    position: absolute;
    color: #fcfafc;
    width: 100%;
    height: auto;
    min-height: 30px;
    margin : 2px 0px;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bolder;
    bottom: 0px;
    /* -webkit-text-stroke: 1px #929292b7; */
  }

  &:hover {
    height: 125px;
    transition: 0.8s;
    .avatar {
      border: 1px solid #fcfafc;
      border-radius: 50%;
      position: absolute;
      display: block;
      width: 50%;
      top: 15px;
      left: 25%;
      animation: fadeIn 4s;
      > img {
        width:70px;
        height: 70px;
      }
    }
  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
  }
`;

/// Game History tab //
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

export  function GameComp(props : GameCardProps) {
  var state : boolean =( props.match.score1 > props.match.score2) ? true : false
return (
  <GameCompStyle win={state} >
      <div style={{marginLeft : "24px"}}>
        <AvatarComponent img={ props.match.img} />
      </div>

      <Dataa>
          <div className='name' >
                  {props.match.name}
          </div>
          <div className='stat'>
               {props.match.score1} : {props.match.score2}
          </div>


      </Dataa>
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
  /* width: 10%; */
  /* min-width: 90px; */
  height: 40%;
  align-items: center;
  gap: 5px;
  .E_timer {
    height: 15px;
    width: 15px;
    /* min-width: 25px; */
    /* min-height: 25px; */

    /* margin: 0px 3px; */
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

interface AvatarProps { img: string, }

export  function AvatarComponent(props: AvatarProps) {
return (
  <Avatarr>
    <img src={props.img} alt='avatar' />
  </Avatarr>
)
}

const Avatarr = styled.div`
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

const Dataa = styled.div`
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
/// Game History tab //
