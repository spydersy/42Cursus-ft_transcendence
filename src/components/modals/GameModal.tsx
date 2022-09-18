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

              }} selected={id  == selected ? true : false} >
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
          <div>Rules :</div>
         <span id="span">{props.mode}</span>
        </Title>
        <Title>
          <div>Map :</div>
         <span id="span">{mockedItems[selected].title}</span>
        </Title>
        <CaroussalContainer>{carouselFragment}</CaroussalContainer>

        <Title>
        <div>Rounds :</div>

        <Input id="number" type="number" min='3' max='10' placeholder='Enter rounds ..' />
        </Title>
        <PlayButton onClick={changemode}>
          Start
        </PlayButton>
      </GameModalStyle>
  )
}
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
   font-family: 'Poppins' , sans-serif;
    font-size: 25px;
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
`;
const Input = styled.input`
   font-family: 'Poppins' , sans-serif;
    font-size: 15px;
    color: ${props => props.theme.colors.primaryText};
    margin: 15px 15px;
    width: 200px;
    background-color: ${props => props.theme.colors.bg};
    outline: none;
    border: 1px solid ${props => props.theme.colors.border};
    height: 30px;
    border-radius: 5px;

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
