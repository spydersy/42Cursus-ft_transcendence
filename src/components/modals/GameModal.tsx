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
    const { carouselFragment } = useSpringCarousel({

        // width : "350px",
        itemsPerSlide: 3,
        withLoop: true,

        items: mockedItems.map((i : GameModalProps, id:number) => ({
          id: id,
          renderItem: (
            <CaoussalItem onClick={()=>{
              setselected(id)
                document.getElementById("span")?.classList.toggle("anime")

              }} selected={id  === selected ? true : false} >
            <img src={i.banner} alt="mapimage" />
              {/* {i.title} */}
            </CaoussalItem>
          ),
        })),
      });
  
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

        <div className=' miniGame'>
            <svg>
              <circle ref={""} id="ball"  cx="20" cy="300" r="12" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCC"  />
    
              <rect ref={"="} rx="10" x="30" y="0" width="20" height="150" fill="#FFF" />
              <rect ref={""} rx="10 " y="0" width="20" height="150" fill="#FFF" />

            </svg>
        </div>
        <PlayButton onClick={changemode}>
          Start
        </PlayButton>
      </GameModalStyle>
  )
}

const Table = styled.div`
cursor: none;

background-size: contain;
/* background-repeat: no-repeat; */
width: 300px;
height: 200px;
position: relative;
background-color: ${props => props.theme.colors.bg};

    border: 1px solid ${props => props.theme.colors.purple};
  > svg{
    position:absolute;
    /* background:  ${props => props.theme.colors.bg}; */
    inset: 0 0 0 0;
    width: 100%;
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



interface CaroItemStyle {
        
  selected :boolean
  
  }
const CaoussalItem = styled.div<CaroItemStyle>`
    width: 150px;
    height: 100px;
    border-radius: 5px;
    /* background-color: black; */
    background-color: transparent;
    position: relative;
    overflow: hidden;
    >img{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    cursor: pointer;
    ${props => (props.selected === true) && css`
    /* box-shadow: 0px 1px 1px 1px ${props => props.theme.colors.primaryText}; */
    border: 3px solid ${props => props.theme.colors.primaryText};
    /* transform: scale(1.1); */
    `}
`;

const CaroussalContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

const GameModalStyle = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
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
