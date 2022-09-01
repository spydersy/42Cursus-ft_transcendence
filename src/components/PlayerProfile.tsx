import React, {useState}  from 'react'
import styled from "styled-components";
import Avatar from "../assets/imgs/tests/guy.svg"
import { ReactComponent as Penta} from "../assets/imgs/penta.svg"
import { CircularProgressbar } from 'react-circular-progressbar';
import dots from "../assets/imgs/tests/dots.svg"

///

const Backcolor = "#533483"
const GreyBackcolor = "#282c34"
const Barside = "#f3460fe"
const Borderimgcolor = "white";
const player = {  name: "Alchemist", login: "Eelaazmi",  lvl: "1", gamePlayed : 350,  lost : 150, won : 200,  }

//// PlayerCard Comp 

export interface PlayerCardProps {
    player: {
      name: string,
      login: string,
      lvl: string,
      gamePlayed : number,
      lost : number,
      won : number
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
        width : 180px;
        height: 180px;
        border-radius: 50%;
        border: 4px solid ${GreyBackcolor};
        top: 5%;
        left: 3%;
        > img{
            border-radius: 30%;
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
                color: ${GreyBackcolor};
                font-size: 19px;
                font-weight: bolder;
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
                <div>
                <div id="played">
                    {props.player.gamePlayed}
                </div>
                <div id="label">
                    PLAYED GAMES
                </div>
                </div>
            <Penta/>
            </div>

            <div className='progessCont' style={{ width: "140px", height: "140px" }}>
                <CircularProgressbar  styles={{
                    path: {
                    stroke: `#3CC592`,
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
/* background-color: #00ff ff41; */
width: 71%;
height: 100%;
display: flex;
position: absolute;
/* top: 12%; */
/* align-items: flex-start; */
/* flex-direction: row; */
justify-content: space-around;

.progessCont{
    margin-top: 35px;

    /* background-color: #f5f5dc19; */
    top: 10%;
    font-family: 'Poppins' , sans-serif;
    font-size:  ${props => props.theme.fontSize.l}; 
    text-transform: uppercase;
    font-weight: 600;
    width: 100%;
    .circularLabel{
        top: 10%;
        /* background-color: #f5f5dc24; */

        text-align: center;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 20px;
        color : ${props => props.theme.colors.primaryText};

        }
    
}

#pentagon {
    top: 15%;
    /* background-color: #f5f5dc39; */
    position: relative;
    width: 240px;
    height: 190px;
    > div{
        position: absolute;
        top: 35%;
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
        font-style: normal;
        font-weight: 700;
        font-size:  ${props => props.theme.fontSize.ll}; 
        line-height: 30px;
        color:  ${props => props.theme.colors.seconderyText}; 
        }
        #label{
        /* width: ; */
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        font-style: normal;
        font-weight: 600;
        font-size:  ${props => props.theme.fontSize.l}; 
        line-height: 22px;
        text-transform: uppercase;
        color:  ${props => props.theme.colors.primaryText}; 
        -webkit-text-stroke: 1px #000;
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
  animation: fadeIn 2s;

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

/////
