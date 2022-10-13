import React , {useState} from 'react'
import { useSpringCarousel } from 'react-spring-carousel'
import styled , {css} from "styled-components"
import Marin from "../../assets/imgs/marinford.png";
import Punk from "../../assets/imgs/punkhazard.png";
import Dress from "../../assets/imgs/dressRosa.jpg";
import Wano from "../../assets/imgs/wano.jpg";
import Fish from "../../assets/imgs/fishman.jpeg";
import {

  useNavigate
} from "react-router-dom";
interface GmaemodelProps {
  setmode : (mode: any)=>void
  mode : any
}
export default function GameModal(props: GmaemodelProps) {
  const [selected, setselected] = useState(2)
  const navigate = useNavigate();
  
  interface GameModalProps {
    
    title: string,
    banner :string 
    
  }
  
  const mockedItems : any = [{
    title: "MarinFord",
    banner :Marin,
  },
  {
    title: "Punk Hazard",
    banner :Punk 
  },
  {
    title: "Dressrosa",
    banner :Dress 
  },
  {
    title: "Wano",
    banner :Wano 
  },
  {
    title: "Fishman Island",
    banner :Fish 
  }]
  const changemode = ()=>{
    var theme = {mode : props.mode, theme : {map : mockedItems[selected] , rounds : 5 }}
    props.setmode(theme)
    console.log(theme)
    navigate("/game")
  }

  
  return (
    <GameModalStyle>
        <Title>
          <div>Mode :</div>
         <span id="span">{props.mode}</span>
        </Title>
        <Title>
          <div>Ball :</div>
          <input type="color" />
        </Title>
        <Title>
          <div>Paddel :</div>
          <input type="color" />

        </Title>

        <Table className=' miniGame'> 
             <svg>
              <circle  id="ball"  cx="20" cy="300" r="12" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC"  />
    
              <rect  rx="5" x="30" y="0" width="15" height="50" fill="#FFF" />
              <rect  rx="5" y="0" width="15" height="50" fill="#FFF" />

            </svg>
        </Table>
         <PlayButton onClick={changemode}>
          Start
        </PlayButton>
      </GameModalStyle>
  )
}

const Table = styled.div`
cursor: none;

background-size: contain;
width: 300px;
height: 150px;
position: relative;

    border: 1px solid ${props => props.theme.colors.purple};
  > svg{
    position:absolute;

    inset: 0 0 0 0;
    width: 100%;
    stroke: ${props => props.theme.colors.purple};

    height: 100%;
    >circle{
      fill: ${props => props.theme.colors.purple};
    }
    >rect{
      fill: ${props => props.theme.colors.bg};
      stroke: ${props => props.theme.colors.purple};
    }
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
      margin: 0 auto;
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
	width: 200px;
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
