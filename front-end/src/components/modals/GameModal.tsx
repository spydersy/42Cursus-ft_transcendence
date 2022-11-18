import React , {useState , useEffect} from 'react'
import styled from "styled-components"
// import Marin from "../../assets/imgs/marinford.png";
// import Punk from "../../assets/imgs/punkhazard.png";
// import Dress from "../../assets/imgs/dressRosa.jpg";
// import Wano from "../../assets/imgs/wano.jpg";
// import Fish from "../../assets/imgs/fishman.jpeg";
import { useNavigate } from "react-router-dom";

interface GmaemodelProps {
  setmode ?: (mode: any)=>void
  mode : any
}
interface GameProps {
  ballcolor : string,
  paddlecolor : string,
  mode : string
}
var defaultProp = {
  ballcolor : "#000000",
  paddlecolor : "#000000",
  mode : "string"
}
export default function GameModal(props: GmaemodelProps) {
  // const [selected, setselected] = useState(2)
  const [gameData, setgameData] = useState<GameProps>(defaultProp)

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("mode",props.mode)
    // eslint-disable-next-line
  }, [])

  const changemode = ()=>{
    // var theme = {mode : props.mode, theme : {map : mockedItems[selected] , rounds : 5 }}
    // props.setmode(theme)
    setgameData({...gameData, mode : props.mode })
    localStorage.setItem("gameData", JSON.stringify(gameData))
    // localStorage.setItem("mode", props.mode)
    navigate("/game")
  }

  useEffect(() => {
    var s : string | null = localStorage.getItem('gameData');
    if (s)
    {
      const data : GameProps =  JSON.parse(s || '{}');
      setgameData(data)

    }
    else
    {
      setgameData(defaultProp)
    }

  }, [])
  
  return (
    <GameModalStyle>
        <Title>
          <div>Mode :</div>
         <span id="span">{props.mode}</span>
        </Title>
        <Title>
          <div>How to Play :</div>
         <div id="span">Use you mouse to move the paddel up and down </div>
          
        </Title>
        <Title>
          <div>Rules :</div>
         <div id="span">Best Of Five</div>
          
        </Title>
        <Title>
          <div>Ball :</div>
          <input onChange={(e: any)=>{
            setgameData({...gameData , ballcolor : e.target.value})
          }} type="color" value={gameData.ballcolor} />
        </Title>
        <Title>
          <div>Paddel :</div>
          <input onChange={(e: any)=>{
            setgameData({...gameData , paddlecolor : e.target.value})


          }} type="color" value={gameData.paddlecolor}/>

        </Title>

        <Table className=' miniGame'> 
             <svg>
              <circle  id="ball"  cx="100" cy="10" r="8" fill={gameData.ballcolor} />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC"  />
              <rect  rx="5" x="235" y="0" width="10" height="50" fill={gameData.paddlecolor} />
              <rect  rx="5" x="5" y="10" width="10" height="50" fill={gameData.paddlecolor} />
            </svg>
        </Table>
         <PlayButton onClick={changemode}>
          Start
        </PlayButton>
      </GameModalStyle>
  )
}

const Table = styled.div`

background-size: contain;
width: 250px;
height: 150px;
position: relative;

    border: 1px solid ${props => props.theme.colors.purple};
  > svg{
    position:absolute;

    inset: 0 0 0 0;
    width: 100%;
    stroke: ${props => props.theme.colors.purple};

    height: 100%;
    >line{
      stroke: ${props => props.theme.colors.purple};
    }
  }
  >div{
    width: 100%;
    height: auto ;
  }
`;



const GameModalStyle = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .miniGame{
      margin: 15px auto;
    }
`;
const Title = styled.div`
width: 100%;
   font-family: 'Poppins' , sans-serif;
    font-size: 20px;
    color: ${props => props.theme.colors.primaryText};
    margin: 15px 0px;
    display: flex;
    align-items: center;
    >div{
      min-width: 100px;
    }
    > span{
      margin-left: 30px;
      text-transform: uppercase;
    color: ${props => props.theme.colors.purple};
   font-family: 'Poppins', sans-serif;
   .anime{
     animation-name: animeText;
     animation-duration: 1s;

   }
   @keyframes animeText {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

    }

    input[type=color]{
	/* width: 200px; */
  flex:  1;
	height: 40px;
	border: none;
	border-radius: 50px;
	background: none;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	/* border: solid 1px #000; change color of the swatch border here */
	border-radius: 50px;
  padding: 0;
}
`;

const PlayButton = styled.button`
  width:150px;
  height :40px;
  border: none;
  outline:none;
  margin: 0 auto;
  cursor:pointer;
  color: ${props => props.theme.colors.primaryText};;;
  background :  ${props => props.theme.colors.purple};
  border:1px solid ${props => props.theme.colors.border};;
  border-radius: 5px;
  font-family: 'Michroma', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

`;
