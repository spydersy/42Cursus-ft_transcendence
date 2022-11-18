import React , {useState} from 'react'
import { HeadComponent } from '../Pages/Home'
import styled from "styled-components"
import Modal from './Modal'
import GameModal from './modals/GameModal'
import  RandImg from "../assets/imgs/aokiji.svg"
import  AiImg from "../assets/imgs/coma.svg"
import { useSpringCarousel } from 'react-spring-carousel'

const modes : any = [
{
  title : "Computer mode",
  img : AiImg,
  desc : "Test your haki skills with an Ai made by dr vegaPunk the legend say his unbeatable .",
    background : 'linear-gradient(249.92deg, #31804A 0%, #000000 98.29%)'

}, 
{
  title : "Classic",
  img : RandImg,
  desc : "Start Your jorney at the new world,  win games , rank higher .",
    background : ' linear-gradient(249.44deg, #40196C 2.4%, #000000 99.44%)'

},
]

interface GameModesProps {
    
  settheme?: (e : any)=> void,
  // banner :string 
  
}

export default function GameModes(props : GameModesProps) {
  const [hideModel, sethideModel] = useState(false)

const [mode, setmode] = useState("")
  const toggleModal = (id : number)=>{
    // props.settheme()

    if (id  === 0)
    {
      setmode("AI")
    }
    
    if (id  === 1){

      setmode("classic")
    }


    sethideModel(!hideModel)
  }
  const { carouselFragment} = useSpringCarousel({

    // width : "350px",
    itemsPerSlide: 2,
    withLoop: true,

    items: modes.map((data : any, id:number) => ({
      id: id,
      renderItem: (
        <Card onClick={(e)=>toggleModal(id)} style={{background : data.background}} key={id}  >
    
        <div>
          <div className='title'>
          {data.title}
          </div>
          <div className='desc'>
          {data.desc}
          </div>
      </div>
      <img src={data.img} alt="img" />

    </Card>
      ),
    })),
  });

  return (
    <Game>
      <HeadComponent title="Game modes"/>
      <GameContainer>

      {carouselFragment}
      </GameContainer>
      {hideModel &&  <Modal
        isOpen={hideModel}
        onRequestClose={() => sethideModel(false)}
        hideModal={() => sethideModel(false)}
        
      >

        <GameModal mode={mode} setmode={(e)=>props.settheme(e)}/>
      </Modal>}
      {/* <Swipeicon onClick={slideToNextItem} /> */}
    </Game>
  )
}


const Card = styled.div`
width: 400px;
height: 250px;
/* background: ; */
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
position: relative;
display: flex;
align-items: flex-start;
cursor: pointer;

>div{
  color: ${props => props.theme.colors.primaryText};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 25px;
  margin: 10px 10px;
  .title{
    font-family: 'Michroma', sans-serif;
  }
  .desc{
  color: ${props => props.theme.colors.primaryText};

    margin-top: 50px;
    text-align: start;
    max-width: 225px;
  font-size: 15px;
    opacity: 0.9;
    font-family: 'Poppins', sans-serif;
    font-weight : 600;
  }
}
> img{
position: absolute;
right: 0;
bottom: 0;
}
@media  only screen and (max-width: 768px) {

    
}
`;

const GameContainer = styled.div`
  overflow: hidden  ;
  width: 90%;
  margin: 0 auto ;
  /* background-color: red; */
  display: flex;
flex-direction: row;
  align-items: center;
  margin-top: 25px;
 
`;
const Game = styled.div`
width: 100%;
padding: 20px 0;

height: auto;
margin-top: 20px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
background-color:  ${props => props.theme.colors.primarybg};
border-radius: 5px;
border: 2px solid  ${props => props.theme.colors.border};
position: relative;
  >svg{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    path {
      stroke:  ${props => props.theme.colors.purple};;
    }

    
  }
@media  only screen and (max-width: 768px) {

    
}
`;