export interface GameProps {
    ballcolor : string,
    paddlecolor : string,
    mode : string
  }
  

export interface UserProp {
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number
    losses : number
  }