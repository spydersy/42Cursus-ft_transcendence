import React, {useState} from 'react'
import styled from "styled-components"
import { ReactComponent as Right} from "../assets/imgs/right-Arrow.svg"
import { ReactComponent as Left} from "../assets/imgs/left-Arrow.svg"
import { ReactComponent as BattleIcon} from "../assets/imgs/battle-icon.svg"


const list  = [0,0 , 1 , 2 , 1 , 0, 0]
export default function Slider() {
    const [main, setmain] = useState(2)
    const animatethis =(slideId: number)=>{
        if (slideId < 0 )
            return ;
        if (slideId > list.length - 1 )
            return ;
        setmain(slideId)
    }
  return (
    <SliderStyle>
            <LeftStyle onClick={()=>animatethis(main -1)}/>
            <SliderContainer>
            {
            list.map((data : any, id : number )=>{
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
                return<Slide onClick={()=>animatethis(id)} className={classname}key={id}  >
                    <div className='center'>
x
                    </div>
                    <div className='bottom'>
                        <div>
                        Yaiba

                        </div>
                        <div>

                        7
                        <BattleIcon/>
                        0
                        </div>
                        <div>
                        mehdi

                        </div>
                        
                         
                    </div>
                    {/* {data} */}
                </Slide>
            })
        }

                
            </SliderContainer>
            <RightStyle onClick={()=>animatethis(main + 1)}/>
    </SliderStyle>
  )
}


const SliderStyle = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        

`;
const Slide = styled.div`
overflow: hidden;
    position: absolute;
    transform: translate(50% , -50%);
    background-color: #000;
    color:white;
    border: 2px solid  ${props => props.theme.colors.border};
    border-radius: 10px;
    box-shadow: 0px 4px 10px 2px ${props => props.theme.colors.border};
    /* box-shadow: 0px 2px 2px 2px ${props => props.theme.colors.purple} ; */
    cursor: pointer;
    transition-duration: 500ms;
    display: flex;
    align-items: center;
    flex-direction: column;
    .center{
        width: 100%;
        flex: 1;

    }
    .bottom{
        font-family: 'Michroma', sans-serif;
        color  :${props => props.theme.colors.primaryText};;
        width: 100%;
        height: 60px;
        background-color: ${props => props.theme.colors.purple};
        display: flex;
        align-items: center;
        justify-content: space-between;
       
        >div{
            margin: 0 15px;
            display: flex;
            align-items: center;
            >svg{
            path{
                stroke: ${props => props.theme.colors.primaryText};
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