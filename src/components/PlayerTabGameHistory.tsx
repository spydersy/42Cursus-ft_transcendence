import axios from "axios";
import React  , {useEffect, useState}from "react";
import styled from "styled-components";
import { GameComp } from "./History";
import EmptyComponent from "./PlayerrEmptyComp"

interface GameHistory { id : string }

export default function PlayerTabeGameHistory(props : GameHistory) {

    const [gameHistory, setgameHistory] = useState([])

    useEffect(() => {

        axios.get(process.env.REACT_APP_BACKEND_URL+  "/game/MatchHistory/" + props.id,   {withCredentials: true}
        ).then((res)=>{
            setgameHistory(res.data)
        }
        ).catch((err)=>{ })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

return (
    <HistoryComponentStyle>
        {
            gameHistory.length === 0 ?
            <EmptyComponent text="No Games had been played !"/>
            :
            gameHistory.map((match : any, id : number )=>{
                return<GameComp key={id} match={match}  />
            })
        }
    </HistoryComponentStyle>
);
}

const HistoryComponentStyle = styled.div`

    flex: 1;
    height:400px;
    width: 95%;
    min-width: 95%;
    min-height: 300px;
    /* max-height: 300px; */
    display: flex;
    align-items: flex-start;
    /* justify-content: center; */
    /* background: #171A22; */
    flex-direction: column;
    border-radius: 10px ;
    /* padding: 0 15px; */
    margin: 20px auto ;
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
