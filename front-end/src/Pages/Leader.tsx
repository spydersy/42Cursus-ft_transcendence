import React , {useEffect , useState} from 'react'
import styled  from "styled-components"
import { AvatarComponent } from '../components/PlayerProfile';
import { HeadComponent } from './Home';
import { ReactComponent as Hat} from "../assets/imgs/hat.svg"

import axios from 'axios';



export default function Leader() {

    const [users, setusers] = useState([])
    useEffect(() => {
         axios.get(process.env.REACT_APP_BACKEND_URL+ "/users", 
    {withCredentials: true} 
  ).then((res)=>{
    setusers(res.data)

  }).catch((err)=>{

    })
    }, [])
    
  return (
    <LeaderStyle className='container' style={{marginTop : "100px"}}>
        <HeadComponent title='Leader Board' />
        <Header>
            {/* <div style={{width: "100px" , height: "100px"}}>
                <AvatarComponent img={list[1].img}/>
            </div> */}
            <div style={{width: "200px" , height: "200px"}}>
                {
                    users.length === 0 ? <></>:  <AvatarComponent   img={users[0].defaultAvatar}/>
                }
               
            <Hat/>

            </div>
            {/* <div style={{width: "100px" , height: "100px"}}>
                <AvatarComponent img={list[3].img}/>
            </div> */}
        </Header>
        <Body>

        <Table>
            <thead>
        <tr>
            <th>rank</th>
            <th className='name'>name</th>
            <th>Xp</th>
            <th>Played</th>
            <th>wins</th>
            <th>lost</th>
        </tr>

            </thead>
            <tbody>

                {
                users?.map((data : any , id : number)=>{
                    return <Rank key={id}>
                        <td className='id'> {id + 1}</td>
                        <td>
                            <a href={"/profile/" + data.login}>
                                <div style={{width: "50px" , height: "50px"}}>
                                    <AvatarComponent login={data.login} img={data.defaultAvatar}/>
                                </div>
                                <div>
                                    {data.login}
                                </div>
                            </a>
                        </td>
                        <td>
                        {data.level}
                        </td>
                        <td>
                        { data.wins[0] + data.wins[1]+ data.losses[0] + data.losses[1]}
                        </td>
                        <td>
                            {data.wins[0] + data.wins[1]}
                        </td>
                        <td>
                            {data.losses[0] + data.losses[1]}
                        </td>

                </Rank>
                })
                }
            </tbody>
        
        </Table>
        </Body>
    </LeaderStyle>
  )
}

const LeaderStyle = styled.div`
    width: 100%;

height: auto;
padding: 20px 0;
margin-top: 100px;
display: flex;
align-items: center;
/* justify-content: space-around; */
border-radius: 5px;
flex-direction: column;
border: 2px solid  ${props => props.theme.colors.border};
color : ${props => props.theme.colors.primaryText};
background-color: ${props => props.theme.colors.primarybg};

`;
const Body = styled.div`
      width: 100%;
      flex: 1;
      overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 4px;
    }

    &::-webkit-scrollbar-track {
    background: transparent; 
    } 

    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primarybg};
    } 

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover { 
    background: ${props => props.theme.colors.primarybg};
    }
`;

const Header = styled.div`
margin-top: 50px;

gap: 50px;
width: 100%;
display: flex;
align-items: flex-end;
height: 200px;

border-radius: 5px;
justify-content: center;
border: 2px solid  ${props => props.theme.colors.border};
color : ${props => props.theme.colors.primaryText};
background-color: ${props => props.theme.colors.primarybg}; 
    >div{
        position: relative;
        >svg{
            top: -80px;
            left: 50%;
            transform :translateX(-50%);
            position : absolute
        }
    }
`;

const Table = styled.table`
    flex : 1;
    width: 95%;
    margin: 50px auto;
    height : 100px !important;
    >thead{

        >tr{
            color: #c8d0d974;
            border-bottom : 1px solid ${props => props.theme.colors.primaryText}; ;
            .name{
                width: 60%;
            }
            >th{
                text-transform: uppercase;
                padding: 10px;
                text-align: start;
                width: auto;
                /* width: 200px; */
            }
        }
    }
    
    `;
const Rank = styled.tr`
/* border-bottom : 1px solid ${props => props.theme.colors.primaryText}; ; */
    width: 100%;
    /* background-color: red; */
    font-family: 'Poppins', sans-serif;
        font-weight : 600;
    >td{
        color: ${props => props.theme.colors.primaryText};
        padding: 10px;
        text-align: start;
        
        >a{
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 20px;
        }
            /* width: 200px; */
        }
        .id{
            /* color: #c8d0d974; */
        color: ${props => props.theme.colors.purple};


        font-family: 'Michroma', sans-serif;

        }

`;