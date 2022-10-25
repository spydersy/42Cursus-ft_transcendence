import React  from "react";

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

const getUserData = ()=>{
    var s : string | null = localStorage.getItem('user');

    if (s)
    {
      const data : UserProp  =  JSON.parse(s || '{}');
      return data;
    
    }
    return null
}   


export const UserContext = React.createContext<UserProp |  null>(getUserData());