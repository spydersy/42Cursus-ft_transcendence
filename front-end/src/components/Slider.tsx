import React, {useState , useContext , useEffect} from 'react'
import styled from "styled-components"
import { ReactComponent as Right} from "../assets/imgs/right-Arrow.svg"
import { ReactComponent as Left} from "../assets/imgs/left-Arrow.svg"
import { ReactComponent as BattleIcon} from "../assets/imgs/battle-icon.svg"
import EmptyComponent from './PlayerrEmptyComp'
import { SocketGameContext } from '../context/Socket';
import axios from 'axios'

import { Link } from 'react-router-dom'
interface LiveGameProps {
    players : string[],
    score : {score1 : number , score2 : number}
    name : string,
}
export default function Slider() {
    const [main, setmain] = useState(2)
    const [list, setlist] = useState<LiveGameProps[]>([])
  const socket = useContext(SocketGameContext)
    socket.off("change").on("change" , (data : LiveGameProps[])=>{
        setlist([...data])
        var ma  : number= data.length / 2 > 1 ? data.length / 2  : 0 
        setmain(Math.floor(ma))
    })
    socket.on("changeScoreLive" , (data : any)=>{
       var l = list;
       for (let i = 0; i < l.length; i++) {
        const element = l[i];
        if (element.name === data.name)
            l[i].score = data.score
        
       }
       setlist([...l])
        // setmain(data.length / 2 > 1 ? data.length / 2  : 0 )
    })
    const animatethis =(slideId: number)=>{
        if (slideId < 0 )
            return ;
        if (slideId > list.length - 1)
            return ;
        setmain(slideId)
    }
    useEffect(() => {
        socket.emit("getLiveGames")
     // eslint-disable-next-line
    }, [])
    useEffect(() => {
    }, [list])
    
  return (
    <SliderStyle>
            <LeftStyle onClick={()=>animatethis(main -1)}/>
            {
                list.length === 0 ? 
                <EmptyComponent text='No Live Games'/>
                :
            <SliderContainer>
            {
                

            list.map((data : LiveGameProps, id : number )=>{
                var classname : string = "";
                
                if (id === main)
                    classname = "main";
                else if (id === main - 1)
                    classname = "left";
                else if (id === main + 1)
                    classname = "right"
                else if (id > main + 1)
                    classname = "emptyright"
                else if (id <  main - 1)
                    classname = "emptyleft"
                return<Slide to={"/watch/" + data.name  }
                //  onClick={()=>animatethis(id)} 
                 className={classname}key={id}  >
                    <div className='center'>
              <UserAvatar login={data.players[0]}/>
              <UserAvatar login={data.players[1]}/>
                    </div>
                    <div className='bottom'>
                        <div className='name'>
                        {data.players[0]}

                        </div>
                        <div className='score'>

                        {data.score.score1}
                        
                        <BattleIcon/>
                        {data.score.score2}
                        
                        </div>
                        <div className='name'>
                        {data.players[1]}
                        

                        </div>
                        
                         
                    </div>
                    {/* {data} */}
                </Slide>
            })
        }

                
            </SliderContainer>

            }
            <RightStyle onClick={()=>animatethis(main + 1)}/>
    </SliderStyle>
  )
}

interface UserProp {
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number
    losses : number
  }
  


export  function UserAvatar(props : {login : string}) {
    const [data, setdata] = useState<UserProp>()
    useEffect(() => {
        axios.get( process.env.REACT_APP_BACKEND_URL + "/users/" + props.login  ,  {withCredentials: true}
        ).then((res)=>{
              // check for the user is bloked 
              setdata(res.data)

            }).catch((error)=>{ 
             
              } 
   )
   // eslint-disable-next-line
}, [])


  return (
    <div>
        
       {data && <img src={data?.defaultAvatar} alt="sd"/>}
    </div>
  )
}

const SliderStyle = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        

`;
const Slide = styled(Link)`
overflow: hidden;
    position: absolute;
    transform: translate(50% , -50%);
    background-color: #000;
    color:white;
    /* border: 4px solid  ${props => props.theme.colors.purple}; */
    border-radius: 10px;
    /* box-shadow: 0px 4px 10px 2px ${props => props.theme.colors.border}; */
    /* box-shadow: 0px 2px 2px 2px ${props => props.theme.colors.purple} ; */
    cursor: pointer;
    transition-duration: 500ms;
    display: flex;
    align-items: center;
    flex-direction: column;
    .center{
        width: 100%;
        flex: 1;
        display: flex;

        flex-direction: row;
        align-items: center;
        >div{
            width: 50%;
overflow: hidden;
            height: 100%;
            > img{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
    }
    .bottom{
        font-family: 'Poppins', sans-serif;
        color  :${props => props.theme.colors.primaryText};;
        width: 100%;
        height: 60px;
        background-color: ${props => props.theme.colors.bg};
        display: flex;
        align-items: center;
        
        justify-content: center;
    border: 4px solid  ${props => props.theme.colors.purple};
       
        >.name{
            /* margin: 0 15px; */
            flex :1;
            align-items: center;
            >svg{
            path{
                stroke: ${props => props.theme.colors.primaryText};
            }
        }
        }
        >.score{
            /* margin: 0 15px; */
            display: flex;
            align-items: center;
            font-size: 20px;
            >svg{
                margin: 0 10px;
            path{
                stroke: ${props => props.theme.colors.purple};
            }
        }
        }
    }
`;

const SliderContainer = styled.div`
    /* width: 100%; */
    flex: 1;
    height: 300px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    .main{
        top: 50%;
        right: 50%;
        /* left :50%; */
        width: 300px;
        height:  250px;
        z-index: 3;
        /* background-color: white; */
    }
    .right{
        top: 50%;
        /* left :0; */
        right: calc(140px );
        width: 250px;
        height:200px;
        z-index: 2;
    }
    .left{
        top: 50%;
        /* right: 40%; */
        right: calc(100% - 140px);
        width: 250px;
        height: 200px;
        z-index: 2;
    }
    .emptyright{
        top: 50%;
        right: -200px;
        width: 200px;
        height:150px;
        z-index: 1;
    }
    .emptyleft{
        top: 50%;
        right:  calc(100%  + 200px);
        width: 200px;
        height: 150px;
        z-index: 1;
    }
`;
const LeftStyle = styled(Left)`
    margin: 0 15px;
    width: 40px;
    height: 40px;
    path {
        stroke:  ${props => props.theme.colors.purple};;
    }
`;
const RightStyle = styled(Right)`
    margin: 0 15px;

    width: 40px;
    height: 40px;
    path {
        stroke:  ${props => props.theme.colors.purple};;
    }
`;