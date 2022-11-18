import React , {useState , useEffect , useContext} from 'react'
import styled , {css} from "styled-components"
import { AvatarComponent } from './PlayerProfile';
import {ReactComponent as AddIcon} from "../assets/imgs/add-icon.svg";
import { ReactComponent as BattleIcon} from "../assets/imgs/battle-icon.svg"
import Modal from './Modal';
import AchievmentModal from './modals/AchievmentModal';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { UserProp } from './game/types';
import EmptyComponent from './PlayerrEmptyComp';

interface  matchType {
     id  : number,
     score1  : number,
     score2  : number,
     mode : string ,
     date : string,
     player1 : {
         login : string ,
         displayName :  string ,
         defaultAvatar :string,
    },
     player2 : {
         login : string ,
         displayName : string ,
         defaultAvatar :string,
    }
  }

//   var listGame = [match1 , match2 ,  match2]

export default function History() {
   
    
  return (
    <Conta>
        <HistoryComponent/>
    </Conta>
  )
}

export  function HistoryComponent() {
  const UserData = useContext(UserContext)

    const [list, setlist] = useState<matchType[]>([])
    useEffect(() => {UserData.then((user : UserProp | "{}")=>{
        if (user !== "{}")
        {
            axios.get(process.env.REACT_APP_BACKEND_URL+ "/game/MatchHistory/all" , 
            {withCredentials: true} 
            ).then((res)=>{
                setlist(res.data)
            
              }).catch((err)=>{
                })

        }

    })


    
        return () => {
          
        }
  // eslint-disable-next-line
      }, [])
  return (
    <HistoryComponentStyle>
        {list.length === 0 ? <EmptyComponent text='No Games had been played .' /> : 
        <>
        {

            list.map((match : any, id : number )=>{
                return<GameComp key={id} match={match}  />
            })
        }
        </>
        }

    </HistoryComponentStyle>
  )
}

const Conta = styled.div`

    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    background-color: red;
    margin-top: 20px;
    /* background: #171A22; */
    flex-direction: row;
    border-radius: 10px ;
  
    gap: 5px;
    /* border : 1px solid ${props => props.theme.colors.border};; */
`
const HistoryComponentStyle = styled.div`

    flex: 1;
    height:300px;
    width: 95%;
    min-width: 95%;
    min-height: 300px;
    /* max-height: 300px; */
    display: flex;
    align-items: flex-start;
    /* justify-content: center; */
    background: #171A22;
    flex-direction: column;
    border-radius: 10px ;
    /* padding: 0 15px; */
    margin: 0 auto ;
    overflow-y: scroll;
    border : 1px solid ${props => props.theme.colors.border};;
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent; 
    } 

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primarybg};
    } 

    &::-webkit-scrollbar-thumb:hover { 
      background: ${props => props.theme.colors.primarybg};
    }
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
   
      match: matchType, 
     
}

export  function GameComp(props : GameCardProps) {
    var state : boolean =( props.match.score1 > props.match.score2) ? true : false
  return (
    <GameCompStyle win={state} >
        <Data>
          <div>
            {props.match.mode}
          </div>
            <div className='name'>
                    {props.match.player1.displayName}
            </div>

            <div style={{margin : "0 14px" , width: "50px" , height: "50px"}}>
                <AvatarComponent img={props.match.player1.defaultAvatar} />
            </div>
            <div className='stat'>
                {props.match.score1}
                <BattleIcon/>
                
                {props.match.score2}
                 
            </div>
            <div style={{margin : "0 14px" , width: "50px" , height: "50px"}}>
                <AvatarComponent img={props.match.player2.defaultAvatar} />
            </div>
            <div className='name'>
            {props.match.player2.displayName}
                    
            </div>
            
        </Data>
        {/* {
            props.isFriend &&
            <div id='addFriend'>
                <AddFriend/>
            </div>
        } */}
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
    width: 95%;

    height: 80px;
    background: ${props => props.theme.colors.bg};
    border: 2px solid  ${props => props.theme.colors.purple};
    margin: 0 auto;
    border-radius : 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    position: relative;
    /* &::after{
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
    } */
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
    flex: 1;
    height: 100px;
    display: flex;
    align-items: center;
    max-width: 100%;
    justify-content: center;
    
    /* flex-direction: column; */
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    color:  ${props => props.theme.colors.primaryText};
    .name{
        /* font-family: 'Poppins' , sans-serif; */
        flex: 1;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 150%;
        /* or 18px */
        /* max-width: 20%; */
        text-overflow: ellipsis;
        text-align: center;
        letter-spacing: 0.5px;

        /* color: #000000; */
        /* margin: 10px 0px 3px 10px; */
    }
    .stat{
        /* font-family: 'Poppins' , sans-serif; */
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 150%;
        /* identical to box height, or 12px */
        /* color : ${props => props.theme.colors.green}; */
        
        text-align: center;
        letter-spacing: 0.5px;

        /* color: #000000; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width         :  100px;
        >svg{
            path {
                stroke: ${props => props.theme.colors.primaryText};
            }
        }
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
            //    
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
    const [hideModel, sethideModel] = useState(false)

    // var state : boolean =( props.match.score1 > props.match.score2) ? true : false
  return (
    <AchievmentCompStyle  onClick={(e)=>sethideModel(!hideModel)}  >
         {hideModel &&  <Modal
        isOpen={hideModel}
        onRequestClose={() => sethideModel(false)}
        hideModal={() => sethideModel(false)}
       
      >

        <AchievmentModal achiev={props.achievment}/>
      </Modal>}
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
    color: ${props => props.theme.colors.purple};;
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
    color: ${props => props.theme.colors.seconderyText};;

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
