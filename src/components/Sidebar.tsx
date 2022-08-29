import React , {useState , useRef, useEffect} from 'react'
import styled , {css} from "styled-components"
import ExpandIcon from "../assets/imgs/dashboardIcon.svg"
import {ReactComponent as DashIcon} from "../assets/imgs/dashboardIcon.svg";
import {ReactComponent as DMIcon} from "../assets/imgs/dm.svg";
import {ReactComponent as RoomIcon} from "../assets/imgs/room.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as ArrowLeft} from "../assets/imgs/arrowLeft.svg";
import {ReactComponent as ArrowRight} from "../assets/imgs/arrowRight.svg";

export interface barProps {
    open: boolean
    }
    
export default function Sidebar() {
    const sideBaRed : any= useRef<HTMLElement>(null);
    const [open, setopen] = useState(true)
    useEffect(() => {
    // if (window.innerWidth < 1440  )
    //     setopen(false)


    window.addEventListener("resize", (e : any)=>{
        if ( e.currentTarget?.innerWidth >= 700)
        {
            if (e.currentTarget?.innerWidth< 1440 )
            {
                console.log(e.currentTarget?.innerWidth)
                openClose()
  
            }
        }
        else
        {
            openClose()
        }


    })
    
      return () => {
        
      }
    }, [setopen])
    
    const openClose=  ()=>
    {   
        if ( window.innerWidth < 800)
        {
            sideBaRed.current.style.width = "100%" 
            return ;
        }
        if (open)
            sideBaRed.current.style.width = "76px"
        else
            sideBaRed.current.style.width = "243px"
        setopen(!open)
    }
  return (
    <SidebarWrraper ref={sideBaRed} open={open}>
        {open ? <Left onClick={openClose}   />: <Right onClick={openClose} /> }

<Items>

        <Item href='/'>
            <DashIcon />
            {
                open ? <div>Dashboard</div> : ""  
            }
            
        </Item>
        <Item  href='/chat' >
            <DMIcon />
            {
                open ? <div>Direct messages</div> : ""  
            }
           
        </Item>
        <Item>
            <RoomIcon />
            {
                open ? <div>Rooms</div> : ""  
            }
            
        </Item>
        <Item>
            <UsersIcon />
            {
                open ? <div>All Users</div> : ""  
            }
            
        </Item>

</Items>
    </SidebarWrraper>
  )
}

const SidebarWrraper = styled.div<barProps>`
    width: 243px;
    max-width: 300px;
    height: calc(100%);
    background-color: rgb(172,203,222, 0.5); 
    
    
    
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    border-radius: 10px;
    transition-duration: 200ms;
    overflow: hidden;
    ${props => (props.open === false) && css`
    align-items: center ;
    width: 76px;
    `
  }
  @media  only screen and (max-width: 768px) {

  max-width: 100%;
  width :100%;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  > svg{
      display: none;
  }
}

    
`;
const Right = styled(ArrowRight)`
  
        align-items: center; 
         margin-top: 20px; 
         margin-bottom: 60px;
         path{
             fill: ${props => props.theme.colors.seconderyText}; 
        }
         &:hover{
             path{
             fill: ${props => props.theme.colors.primarybg}; 
                }
         }
         
    
`;
const Left = styled(ArrowLeft)`
  
        align-items: flex-end; 
         margin-top: 20px; 
         margin-bottom: 60px;
         margin-right: 10px;
         path{
             fill: ${props => props.theme.colors.seconderyText}; 
        }
         &:hover{
             path{
             fill: ${props => props.theme.colors.primarybg}; 
                }
         }
         
    
`;
const Items = styled.div`

    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media  only screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        >a{
            width: auto;
            >div{
                display: none;
            }
            >svg{

                margin: 0;
            }
            &:hover{
                
            }
            &::after{
                bottom: 0;
                width: 100%;
                height: 5px;
                display: none;
            }
        }
    }

    
    
`;
const Item = styled.a`

    width: 100%;
    height: 60px;
    color :${props => props.theme.colors.seconderyText}; 
    font-size:  ${props => props.theme.fontSize.l};
    font-family: 'Poppins', sans-serif;
    font-weight : 600;
    display: flex;
    align-items: center;
    /* justify-content:  */
    flex-direction: row;
    overflow: hidden;
    cursor: pointer;
    svg{
        margin: 0 19px;
        width: 30px;
        height: 30px;
        
        path{
            fill: ${props => props.theme.colors.seconderyText};
                stroke: ${props => props.theme.colors.seconderyText}; 
            }
    }
position: relative;
    &:hover{
        /* border-left: 8px solid ; */
        color :${props => props.theme.colors.primarybg}; 
        &::after{
            content: "";
            position: absolute;
            left: 0;
            height: 100%;
            width: 5px;
            background-color: ${props => props.theme.colors.primarybg};
            border-radius: 7px ;
        }
        svg{
            path{
                fill: ${props => props.theme.colors.primarybg};
                stroke: ${props => props.theme.colors.primarybg}; 
            }
        }
    }
    transition: all 20ms ease-in;
    
`;
