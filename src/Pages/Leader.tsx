import React from 'react'
import styled , {css} from "styled-components"
import { AvatarComponent } from '../components/PlayerProfile';
import { HeadComponent } from './Home';
import Img from "../assets/imgs/avatar/a1.png";


const list = [{
    name : "melkarmi",
    wins : 150,
    lost : 100,
    played : 250,
},
{
    name : "mamali",
    wins : 150,
    lost : 100,
    played : 250,
},
{
    name : "Elmehdi",
    wins : 150,
    lost : 100,
    played : 250,
},
{
    name : "keddib",
    wins : 150,
    lost : 100,
    played : 250,
}]
export default function Leader() {
  return (
    <LeaderStyle className='container' style={{marginTop : "100px"}}>
        <HeadComponent title='Leader Board' />
        <Header>
            <div style={{width: "100px" , height: "100px"}}>
                <AvatarComponent img={Img}/>
            </div>
            <div style={{width: "200px" , height: "200px"}}>
                <AvatarComponent img={Img}/>
            </div>
            <div style={{width: "100px" , height: "100px"}}>
                <AvatarComponent img={Img}/>
            </div>
        </Header>
        <Table>
        <tr>
            <th>rank</th>
            <th className='name'>name</th>
            <th>matches Played</th>
            <th>wins</th>
            <th>lost</th>
        </tr>
        {
        list.map((data : any , id : number)=>{
            return <Rank>
                <th> {id + 1}</th>
                <th>
                    <div>
                        <div style={{width: "40px" , height: "40px"}}>
                            <AvatarComponent img={Img}/>
                        </div>
                        <div>
                            {data.namr}
                        </div>
                    </div>
                </th>
                <th>
                   {data.played}
                </th>
                <th>
                    {data.wins}
                </th>
                <th>
                    {data.lost}
                </th>

        </Rank>
        })
        }
        
        </Table>
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

const Header = styled.div`
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
    
`;

const Table = styled.table`
    width: 95%;
    margin: 50px auto;
    /* background-color: red; */
    >tr{
        text-transform: uppercase;
        color: #c8d0d974;
        border-bottom : 1px solid ${props => props.theme.colors.primaryText}; ;
        .name{
            width: 60%;
        }
        >th{
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
    >th{
        color: ${props => props.theme.colors.seconderyText};
        
        >div{
            width: 100%;

            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 10px;
        }
            padding: 20px;
            text-align: start;
            /* width: 200px; */
         
    }

`;