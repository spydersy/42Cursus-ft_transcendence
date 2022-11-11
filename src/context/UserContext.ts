import axios from "axios";
import React  from "react";
import { useNavigate } from "react-router-dom";

interface UserProp {
    id: string,
    defaultAvatar: string,
    status: string,
    login : string
    displayName : string
    relation : string
    dmChannel : string
    nbFriends? : string
    wins : number
    losses : number
    lastModification: string
    Achievements: boolean[]
} 

const getUserData =  async()=>{
    var ret  : UserProp | "{}"  = "{}"
     await axios.get(process.env.REACT_APP_BACKEND_URL +"/profile/me", 
      {withCredentials: true} 
      ).then((res)=>{
        const data : UserProp   | null =  res.data
        localStorage.setItem("user", JSON.stringify(data))
        console.log(res.data)
        ret =  res.data;
      }).catch((err)=>{
          ret =  "{}"
    })
    return ret;
  }


export const UserContext = React.createContext<Promise<UserProp | "{}">>(getUserData());