import React, {useState , useEffect} from 'react'
import styled from "styled-components"
import Navlinks from '../components/Navlinks';
import { PlayerCard} from '../components/PlayerProfile';
import axios from 'axios';
import avataro from "../assets/imgs/avatar/avatar2.png";
import BlockedUsers from '../components/PlayerTabBlockedUsersComp';
import FriendsComponent  from '../components/PlayerTabFriendsComp';
import PendingRequests from '../components/PlayerTabPendingRequestsComp';
import BlockIcon from "../assets/imgs/ban.svg";

//-----------------------//
interface UserProp {
  defaultAvatar: string,
  status: string,
  login : string
  displayName : string
  relation : string
  nbFriends? : string
  wins : number
  losses : number
  lastModification: string
  Achievements: boolean[]
}

//// Default function Profile
export default function Profile() {
  const id = window.location.pathname.split("/")[2];
  const [isCurrentUser, setisCurrent] = useState(true)
  const [User, setUser] = useState<UserProp>({
    defaultAvatar: "avataro",
    status: "Default",
    login : "DefaultUserLogin",
    displayName : 'Default DisplayName',
    relation : "",
    nbFriends : "100",
    wins : 100,
    losses : 0,
    lastModification: "Xxx 12 Xxx 1963 12:00:00",
    Achievements: [false, false, false, false, false, false, false, false]
  })

  const BlockedUser = {
    defaultAvatar: BlockIcon,
    status: "BLOCKED",
    login : "Hiddenlogin",
    displayName : "HiddenDisplayName",
    relation : "BLOCKED",
    nbFriends : "000",
    wins : 0,
    losses : 0,
    lastModification: "Xxx 00 Xxx 0000 00:00:00",
    Achievements: [false, false, false, false, false, false, false, false]
  }

  // const [connection, setconnection] = useState(true);

  useEffect(() => {
    var s : string | null = localStorage.getItem('user');
    if (s)
    {
      const data : UserProp =  JSON.parse(s || '{}');
      // console.log(data)
      if (id === data.login)
      {
        setisCurrent(true)
        setUser(data)
      }
      else
      {
        setisCurrent(false)
        axios.get("http://localhost:8000/users/" + id,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              console.log("> status = " , res.status)
              setUser(res.data)

            }).catch((error)=>{ 
              // if (err.status === 403)
              //   setUser(BlockedUser)
              // console.log("> status = " , err.status)
              console.log("---- error ----")
              if (error.response) 
              {

                if (error.response.data.message == ("Forbidden : User Blocked you"))
                  setUser(BlockedUser)

                console.log("m={",error.response.data.message, "}=", (error.response.data.message == ("Forbidden : User Blocked you")) );
                console.log("m1={",error.response.status, "}");
                console.log("m2={",error.response.headers, "}");
              } 
              // else if (error.request) {
                
              //   console.log("Reeeq", error.request);
              // } 
              // else {
              //   console.log('Error', error.message);
              // }
              // console.log(error.config);
              console.log("*---- error ----*")



            })
      }
    }
    console.log("> User Data < " , User, ">\n")

  }, []);

  return (
        <div className='container' style={{  display: "flex" ,flexDirection : "column", marginTop: "100px"}}>

              <TheBox> 
                  <PlayerCard  isCurrentUser={isCurrentUser} player={User} />
              </TheBox>

              <PlayerTabsBar id={id} /> 
        </div>
  )
};

const TheBox = styled.div` width: 100%;  border: 0px solid ${props => props.theme.colors.primarybg}; `;

interface PlayerTabsProps { id : string }


///// PlayerTabs Section
const linkslist = [ " FRIENDS" , "PENDING REQUESTS", "BLOCKED USERS"]

export function PlayerTabsBar(props : PlayerTabsProps)
{
  const [index, setindex] = useState(0)
  return ( 
    <PlayerTabsStyle>
      <Navlinks  index={index} setindex={(e)=> setindex(e)} list={linkslist}/> 
        {index === 0 && <FriendsComponent id={props.id}/>}
        {index === 1 && <PendingRequests/>}
        {index === 2 && <BlockedUsers/>}
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
