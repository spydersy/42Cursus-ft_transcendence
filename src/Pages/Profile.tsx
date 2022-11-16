import React, {useState , useEffect , useContext} from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import { PlayerCard} from '../components/PlayerProfile';
import axios from 'axios';
import BlockedUsers from '../components/PlayerTabBlockedUsersComp';
import FriendsComponent  from '../components/PlayerTabFriendsComp';
import PendingRequests from '../components/PlayerTabPendingRequestsComp';
import BlockIcon from "../assets/imgs/ban.svg";
import {UserContext} from "../context/UserContext"
import PlayerTabeGameHistory from '../components/PlayerTabGameHistory';
//-----------------------//
interface UserProp {
  id: string,
  defaultAvatar: string,
  status: string,
  login : string
  displayName : string
  relation : string
  dmChannel : string
  nbFriends? : string
  wins : number[]
  losses : number[]
  lastModification: string
  Achievements: boolean[]
}

//// Default function Profile
export default function Profile() {
  const id = window.location.pathname.split("/")[2];
  const [isCurrentUser, setisCurrent] = useState(true)
  
  const [User, setUser] = useState<UserProp>({
    id: "Ss",
    defaultAvatar: "avataro",
    status: "Default",
    login : "DefaultUserLogin",
    displayName : 'Default DisplayName',
    relation : "",
    dmChannel : "string",
    nbFriends : "100",
    wins : [0,0],
    losses : [0,0],
    lastModification: "Xxx 12 Xxx 1963 12:00:00",
    Achievements: [false, false, false, false, false, false, false, false]
  })
  const BlockedUser = {
    id: "Ss",
    defaultAvatar: BlockIcon,
    status: "BLOCKED",
    login : "Hiddenlogin",
    displayName : "HiddenDisplayName",
    relation : "BLOCKED",
    dmChannel : "string",
    nbFriends : "000",
    wins : [0,0],
    losses : [0,0],
    lastModification: "Xxx 00 Xxx 0000 00:00:00",
    Achievements: [false, false, false, false, false, false, false, false]
  }

  // const [connection, setconnection] = useState(true);
  const user = useContext(UserContext)
  useEffect(() => {

    user.then((data : UserProp | "{}")=>{
      
      if (data !== "{}"){
        if (id === data?.login){
            setisCurrent(true)
              setUser(data)
        }
        else
        {
          setisCurrent(false)
          axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + id,  {withCredentials: true}  ).then((res)=>{
            // check for the user is bloked 
            setUser(res.data)
      
          }).catch((error)=>{ 
            if (error.response) 
            {
              if (error.response.data.message === ("Forbidden : User Blocked you"))
                setUser(BlockedUser)
            } 
          })

        }
      }

 })


  // eslint-disable-next-line
  }, []);

  return (
        <div className='container' style={{  display: "flex" ,flexDirection : "column", marginTop: "100px"}}>

              { (id === "drVegaPunk") ?  <img alt="" src="https://assets.rbl.ms/27490650/origin.gif" width="900px" height="1000px"></img> :
                <>
                  <TheBox> 
                      <PlayerCard    isCurrentUser={isCurrentUser} player={User} />
                  </TheBox>
                  <PlayerTabsBar isCurrentUser={isCurrentUser} player={User} id={id} /> 
                </>
              }
        </div>
  )
};

const TheBox = styled.div` width: 100%;  border: 0px solid ${props => props.theme.colors.primarybg}; `;

interface PlayerTabsProps { id : string, isCurrentUser : boolean , player : any }


///// PlayerTabs Section


export function PlayerTabsBar(props : PlayerTabsProps)
{
  const [index, setindex] = useState(0)
  let linkslist = [ "GAME HISTORY", " FRIENDS"]

  if (props.isCurrentUser)
    linkslist = [ "GAME HISTORY"," FRIENDS" ,  "PENDING REQUESTS", "BLOCKED USERS"];

  return ( 
    <PlayerTabsStyle>
      <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/> 
        {index === 0 &&  <PlayerTabeGameHistory id={props.id} />}
        {index === 1 &&  <FriendsComponent id={props.id}/>}
        {index === 2 && props.isCurrentUser &&  <PendingRequests player={props.player}/>}
        {index === 3 && props.isCurrentUser && <BlockedUsers/>}
    </PlayerTabsStyle>
  )
}
const PlayerTabsStyle = styled.div`
  padding-top: 20px;
  margin : 30px 0px;
  width:  100%;
  flex: 1;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.primarybg};
  flex-direction: column;
  -webkit-text-stroke: 1px #6560679a;
`;
