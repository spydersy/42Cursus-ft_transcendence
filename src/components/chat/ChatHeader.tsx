import React from 'react'
import {ReactComponent as BackIcon} from "../../assets/imgs/arrowLeft.svg";
import styled  from "styled-components"
import { AvatarComponent } from '../PlayerProfile';

interface usersType {
  id: string,
  defaultAvatar: string,
  login : string
  displayName : string,
  restriction: string,
  restrictionTime: string,
  duration: number,
}

interface convType {
  nbMessages: number,
  lastUpdate: string,
  access : string,
  channelId: number,
  name: string;
  password: string,
  picture : string,
  users: usersType[]
}
// interface ListTypes  {
  
//     title : string,
//     icon :  any,
//     href: string
  
//   }

  interface chatHeaderProps {
    data : convType,
    setState : (e: number)=>void,
    state : number,
    empty : boolean,
  }

  
export default function ChatHeader(props : chatHeaderProps) {

  // const [data, setdata] = useState<convType>(
  //     {
  //       nbMessages: 0,
  //       lastUpdate: "string",
  //       access : "string",
  //       channelId:  0,
  //       name: "string",
  //       password: "string",
  //       picture : "string",
  //       users: [{
  //         id : "string",
  //     defaultAvatar: "string",
  //     login : "string",
  //     displayName : "string",
  //     restriction: "string",
  //     restrictionTime: "string",
  //     duration: 0,
  //     }]
  //     })

  //   useEffect(() => {
  //     setdata(props.data)
  //   }, [props.data])
    
    return (
      <TopStyle>
       {props.state === 1 && <BackIcon onClick={()=>props.setState(0)} />}
          {
            props.empty ? <div></div>:props.data?.access === "DM"  ? 
        
            <a className='conty' href={"/profile/"+ props.data.users[1].login}>

              <div style={{width: "50px" , height: "50px"}}>
      
              <AvatarComponent img={props.data?.users[1].defaultAvatar}/>
              </div >

              <div >  {props.data?.users[1].displayName} </div>

            </a>

            :
              
            <div className='cont'>

              <div style={{width: "50px" , height: "50px"}}>
                <AvatarComponent img={props.data?.picture}/>
              </div >

              <div > {props.data?.name} </div>

            </div>

          }
          
        

      </TopStyle>
    )
}


const TopStyle = styled.div`

    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
      flex-direction: row;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      gap: 5px;

    .cont{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row;
      align-items: center;
      height :60px;
      gap: 15px;
    }
    .conty{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row;
      align-items: center;
      height :60px;
      gap: 15px;
      &:hover{
        cursor: pointer;
        color: #126ba3;

      }
    }
    >svg{
      path {
      stroke : ${props => props.theme.colors.primaryText};

      }
    }
    .Icon{
      display: flex;
      align-items: left;
      right: 0px;
      cursor: pointer;
      &:hover{
        >svg{
      path {
        stroke :  #126ba3;
        }
      }
    }
    }
      `;