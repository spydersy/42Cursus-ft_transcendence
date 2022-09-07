import React from 'react'
import { useSpringCarousel } from 'react-spring-carousel'
import styled  from "styled-components"
import Marin from "../../assets/imgs/marinford.png";
import Punk from "../../assets/imgs/punkhazard.png";


export default function GameModal() {
    interface ChatProps {
        
        title: string,
        banner :string 
      
      }
    const mockedItems : any = [{
        title: "MarinFord",
        banner :Marin 

    },
    {
      title: "Punk Hazard",
      banner :Punk 
    },
    {
      title: "map1",
      banner :Marin 
    }]
    const { carouselFragment } = useSpringCarousel({

        // width : "350px",
        itemsPerSlide: 1,
        withLoop: true,

        items: mockedItems.map((i : ChatProps, id:number) => ({
          id: id,
          renderItem: (
            <CaoussalItem >
            <img src={i.banner} alt="mapimage" />
              {i.title}
            </CaoussalItem>
          ),
        })),
      });
  
  return (
    <GameModalStyle>
        <Title>
        Maps :
        </Title>
        <CaroussalContainer>{carouselFragment}</CaroussalContainer>
        <Title>
        Rounds :
        <Input id="number" type="number"  max='10' placeholder='Enter rounds ..' />
        </Title>

    </GameModalStyle>
  )
}

const CaoussalItem = styled.div`
    width: 250px;
    height: 200px;
    border-radius: 5px;
    /* background-color: black; */
    background-color: transparent;
    position: relative;
    >img{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
`;

const CaroussalContainer = styled.div`
    width: 250px;
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

