import React, {useState} from 'react'
import styled from "styled-components"
import { ReactComponent as Right} from "../assets/imgs/right-Arrow.svg"
import { ReactComponent as Left} from "../assets/imgs/left-Arrow.svg"


const list  = [0,0 , 1 , 2 , 1 , 0, 0]
export default function Slider() {
    const [main, setmain] = useState(2)
    const animatethis =()=>{
        setmain(main + 1)
    }
  return (
    <SliderStyle>
            <LeftStyle/>
            <SliderContainer>
            {
            list.map((data : any, id : number )=>{
                var classname : string = "";
                if (id === main)
                    classname = "main";
                else if (id === main - 1)
                    classname = "left";
                else if (id == main + 1)
                    classname = "right"
                else if (id > main + 1)
                    classname = "emptyright"
                else if (id <  main - 1)
                    classname = "emptyleft"
                return<Slide className={classname}key={id}  >
                    data
                </Slide>
            })
        }
                {/* <Slide className='main'>
                    main
                </Slide>
                <Slide className='right'>
                    right
                </Slide>
                <Slide className='left'>
                    left
                </Slide>
                <Slide className='emptyright'>
                    khawi
                </Slide>
                <Slide className='emptyleft'>
                    khawi
                </Slide> */}
                
            </SliderContainer>
            <RightStyle onClick={animatethis}/>
    </SliderStyle>
  )
}


const SliderStyle = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        

`;
const Slide = styled.div`
    position: absolute;
    transform: translate(50% , -50%);
    background-color: #000;
    color:white;
    border: 2px solid  ${props => props.theme.colors.border};
    border-radius: 5px;
    box-shadow: 0px 4px 10px 2px rgba(253, 6, 6, 0.22);
    /* box-shadow: 0px 2px 2px 2px ${props => props.theme.colors.purple} ; */
    transition-duration: 3000ms;
`;

const SliderContainer = styled.div`
    width: 900px;
    height: 400px;
    position: relative;
    overflow: hidden;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    .main{
        top: 50%;
        right: 50%;
        width: 300px;
        height:  250px;
        z-index: 3;
    }
    .right{
        top: 50%;
        right: calc(20%   );
        width: 300px;
        height:200px;
        z-index: 2;
    }
    .left{
        top: 50%;
        left: calc(20% - 300px );
        width: 300px;
        height: 200px;
        z-index: 2;
    }
    .emptyright{
        top: 50%;
        right: 0;
        width: 200px;
        height:150px;
        z-index: 1;
    }
    .emptyleft{
        top: 50%;
        left: -200px;
        width: 200px;
        height: 150px;
        z-index: 1;
    }
`;
const LeftStyle = styled(Left)`
    width: 60px;
    height: 60px;
    path {
        stroke:  ${props => props.theme.colors.purple};;
    }
`;
const RightStyle = styled(Right)`
    width: 60px;
    height: 60px;
    path {
        stroke:  ${props => props.theme.colors.purple};;
    }
`;