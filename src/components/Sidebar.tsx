import React , {useState , useRef, useEffect} from 'react'
import styled , {css} from "styled-components"
import {ReactComponent as DashIcon} from "../assets/imgs/dashboardIcon.svg";
import {ReactComponent as DMIcon} from "../assets/imgs/dm.svg";
import {ReactComponent as RoomIcon} from "../assets/imgs/room.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as ArrowLeft} from "../assets/imgs/arrowLeft.svg";
import {ReactComponent as ArrowRight} from "../assets/imgs/arrowRight.svg";
import {ReactComponent as LogoutIcon} from "../assets/imgs/logout-icon.svg";
import {ReactComponent as LeaderIcon} from "../assets/imgs/leader-icon.svg";

export interface barProps {
    open: boolean
    }
    const sideBarItemsList = [
        {
            title: "Dachboard",
            link: "/",
            icon: <DashIcon /> 
        },
        {
            title: "Direct messages",
            link: "/chat",
            icon : <DMIcon />
        },
        {
            title: "Rooms",
            link: "/rooms",
            icon : <RoomIcon />
        },
        {
            title: "Leader Board",
            link: "/leaderboard",
            icon : <LeaderIcon />
        }
    ]
export default function Sidebar() {
    const sideBaRed : any= useRef<HTMLElement>(null);
    const [open, setopen] = useState(true)


    const [focused, setfocused] = useState(0)
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
            sideBaRed.current.style.width = "300px"
        setopen(!open)
    }
    const changeFocus=  (page : number)=>
    {   
       
        setfocused(page)
    }
    useEffect(() => {
        const pageName = window.location.pathname.split("/")[1];
        var pagenum = 0;
    
        if (pageName === "" ) pagenum = 0;
        else if (pageName === "chat" ) pagenum = 1;
        else if (pageName === "rooms" ) pagenum = 2;
        else if (pageName === "leaderboard" ) pagenum = 3;
        changeFocus(pagenum)

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
    }, [setopen, setfocused ])
    
  return (
    <Test  open={open}>
    <SidebarWrraper ref={sideBaRed} open={open}>
        {open ? <Left onClick={openClose}   />: <Right onClick={openClose} /> }

<Items>
        {
            sideBarItemsList.map((item : any , id : number)=>{
                return <Item key={id} onClick={()=>setfocused(id)} active={id === focused ? true : false} href={item.link}>
                {item.icon}
                {
                    open ? <div>{item.title}</div> : <ToolTip>{item.title}</ToolTip>  
                }
                
            </Item>;
            })
        }
       </Items> 
       <Item  active={false} href={"/"}>
                <LogoutIcon/>
                {
                    open ? <div>LogOut</div> : <ToolTip>LogOut</ToolTip>  
                }
                
            </Item>;
    </SidebarWrraper>
    </Test>

  )
}


interface ItemProps {
 
    active : boolean


  }
  
const SidebarWrraper = styled.div<barProps>`
    width: 300px;
    max-width: 300px;
    height: calc(100% - 70px);
    top: 70px;
    background-color: ${props => props.theme.colors.primarybg}; 
    position: fixed;
    left: 0;
    
    
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    /* border-radius: 0px 10px 0 0 ; */
    transition-duration: 200ms;
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
const Test = styled.div<barProps>`
    width: 300px;
    max-width: 300px;
    height: calc(100% - 70px);
    top: 70px;
    background-color: ${props => props.theme.colors.primarybg}; 

    
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    /* border-radius: 0px 10px 0 0 ; */
    transition-duration: 200ms;
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

    width: 100%;
    flex: auto;
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
const ToolTip = styled.span`
                display: inline-block;
				position: absolute;
				background-color:  ${props => props.theme.colors.seconderybg}; 
				padding: 8px 12px;
				border-radius: 3px;
				/* margin-top: -26px; */
				left: calc(100% + 11px);
				opacity: 1;
				visibility: hidden;
				font-size: 10px;
				letter-spacing: .5px;
				/* border: 1px solid ${props => props.theme.colors.border}; */
                z-index: 3;
				&:before {
                    z-index: 13;
                    content: '';
                    /* border: 1px solid ${props => props.theme.colors.border}; */
					display: block;
					position: absolute;
					left: -4px;
					top: 10px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
					background-color: inherit;
				}
`;
const Item = styled.a<ItemProps>`

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
    /* overflow: hidden; */
    position: relative;
    cursor: pointer;
    svg{
        margin: 0 19px;
        width: 30px;
        height: 30px;
        
        path{
            /* fill: ${props => props.theme.colors.seconderyText}; */
                stroke: ${props => props.theme.colors.seconderyText}; 
            }
    }
    ${props => (props.active === true) && css`
        color : ${props => props.theme.colors.purple}; 
        &::after{
            content: "";
            position: absolute;
            left: 0;
            height: 100%;
            width: 5px;
            background-color: ${props => props.theme.colors.purple};
            border-radius: 7px ;
        }
        /* &::before{ ToDO
            content: "ddd";
            position: absolute;
            left: 0;
            height: 100%;
            width: 5px;
            background-color: ${props => props.theme.colors.border};
            border-radius: 7px ;
        } */
       svg{ 
            path{
                stroke: ${props => props.theme.colors.purple}; 
            }
        } 
    `}
    &:hover{
        > span{
            visibility: visible;
					opacity: 1;
        }
        color : ${props => props.theme.colors.purple}; 

        svg{ 
            path{
                stroke: ${props => props.theme.colors.purple}; 
            }
        } 
        /* &::before{ ToDO
            content: "ddd";
            position: absolute;
            left: 0;
            height: 100%;
            width: 5px;
            background-color: ${props => props.theme.colors.border};
            border-radius: 7px ;
        } */
       
    }
    transition: all 20ms ease-in;
    
`;

