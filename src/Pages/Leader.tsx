import React , {useEffect , useState} from 'react'
import styled , {css} from "styled-components"
import { AvatarComponent } from '../components/PlayerProfile';
import { HeadComponent } from './Home';
import { ReactComponent as Hat} from "../assets/imgs/hat.svg"

import Melkarmi from "../assets/imgs/avatar/melkarmi.jpeg";
import Mamali from "../assets/imgs/avatar/mamali.jpeg";
import Hfadyl from "../assets/imgs/avatar/hfadyl.jpeg";
import Fadi from "../assets/imgs/avatar/ael-fadi.jpeg";
import axios from 'axios';


const list = [
    {
        name : "Docker",
        wins : 150,
        lost : 100,
        played : 250,
        img : Hfadyl
    
    },
    {
    name : "melkarmi",
    wins : 150,
    lost : 100,
    played : 250,
    img : Melkarmi
},
{
    name : "mamali",
    wins : 150,
    lost : 100,
    played : 250,
    img : Mamali

},
{
    name : "Achraf",
    wins : 150,
    lost : 100,
    played : 250,
    img : Fadi

}, {
    name : "Docker",
    wins : 150,
    lost : 100,
    played : 250,
    img : Hfadyl

},
{
name : "melkarmi",
wins : 150,
lost : 100,
played : 250,
img : Melkarmi
},
{
name : "mamali",
wins : 150,
lost : 100,
played : 250,
img : Mamali

},
{
name : "Achraf",
wins : 150,
lost : 100,
played : 250,
img : Fadi

}]

export default function Leader() {

    const [users, setusers] = useState([])
    useEffect(() => {
         axios.get("http://localhost:8000/users", 
    {withCredentials: true} 
  ).then((res)=>{
    // console.log(res.data)
    setusers(res.data)

  }).catch((err)=>{

        // history.pushState("/signin");
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
                <AvatarComponent img={list[0].img}/>
            <Hat/>

            </div>
            {/* <div style={{width: "100px" , height: "100px"}}>
                <AvatarComponent img={list[3].img}/>
            </div> */}
        </Header>
        <Body>

        <Table>
        <tr>
            <th>rank</th>
            <th className='name'>name</th>
            <th>Xp</th>
            <th>Played</th>
            <th>wins</th>
            <th>lost</th>
        </tr>
        {
        users?.map((data : any , id : number)=>{
            return <Rank>
                <td className='id'> {id + 1}</td>
                <td>
                    <a href={"/profile/" + data.login}>
                        <div style={{width: "40px" , height: "40px"}}>
                            <AvatarComponent img={data.defaultAvatar}/>
                        </div>
                        <div>
                            {data.login}
                        </div>
                    </a>
                </td>
                <td>
                   10000
                </td>
                <td>
                   {data.played}
                </td>
                <td>
                    {data.wins}
                </td>
                <td>
                    {data.lost}
                </td>

        </Rank>
        })
        }
        
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
    
    `;
const Rank = styled.tr`
/* border-bottom : 1px solid ${props => props.theme.colors.primaryText}; ; */
    width: 100%;
    /* background-color: red; */
    font-family: 'Poppins', sans-serif;
        font-weight : 600;
    >td{
        color: ${props => props.theme.colors.seconderyText};
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