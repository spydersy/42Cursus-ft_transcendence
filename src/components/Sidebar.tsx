import React , {useState , useRef, useEffect} from 'react'
import styled , {css} from "styled-components"
import {ReactComponent as DashIcon} from "../assets/imgs/home.svg";
import {ReactComponent as DMIcon} from "../assets/imgs/dm.svg";
import {ReactComponent as RoomIcon} from "../assets/imgs/rooms.svg";
import {ReactComponent as UsersIcon} from "../assets/imgs/users.svg";
import {ReactComponent as ArrowLeft} from "../assets/imgs/arrowLeft.svg";
import {ReactComponent as ArrowRight} from "../assets/imgs/arrowRight.svg";
import {ReactComponent as LogoutIcon} from "../assets/imgs/logout.svg";
import {ReactComponent as LeaderIcon} from "../assets/imgs/leader-icon.svg";
import {ReactComponent as SettingIcon} from "../assets/imgs/settings.svg";

export interface barProps {
    open: boolean
    }
    const sideBarItemsList = [
        {
            title: "Home",
            link: "/",
            icon: <DashIcon /> 
        },
        {
            title: "Chat",
            link: "/chat",
            icon : <DMIcon />
        },
        {
            title: "Rooms",
            link: "/rooms",
            icon : <RoomIcon />
        },
        {
            title: "Leaderboard",
            link: "/leaderboard",
            icon : <LeaderIcon />
        }
    ]
export default function Sidebar() {
    const sideBaRed : any= useRef<HTMLElement>(null);
    const [open, setopen] = useState(false)


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
        <Left open={open} onClick={openClose}   />

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
       <Devider>c</Devider>
       <Item  active={false} href={"/"}>
                <SettingIcon/>
                {
                    open ? <div>Setting</div> : <ToolTip>LogOut</ToolTip>  
                }
                
            </Item>
       <Item  active={false} href={"/"}>
                <LogoutIcon/>
                {
                    open ? <div>LogOut</div> : <ToolTip>LogOut</ToolTip>  
                }
                
            </Item>
    </SidebarWrraper>
    </Test>

  )
}


interface ItemProps {
 
    active : boolean


  }
  
const SidebarWrraper = styled.div<barProps>`
border: 1px solid rgba(44, 104, 193, 0.2);
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
    transition: all 400ms ease-in-out;
    ${props => (props.open === false) && css`
    // align-items: center ;
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
    transition: all 400ms ease-in-out;

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
             /* fill: ${props => props.theme.colors.seconderyText};  */
        }
         &:hover{
             path{
             /* fill: ${props => props.theme.colors.primarybg};  */
                }
         }
         
    
`;
interface LeftStyleProps{
    open : boolean
}
const Left = styled(ArrowLeft)<LeftStyleProps>`
  

        align-items: flex-end; 
         margin-top: 20px; 
         margin-bottom: 60px;
         margin-right: 10px;
         margin-left: 0;
         path{
             /* fill: ${props => props.theme.colors.seconderyText};  */
        }
         &:hover{
             path{
             /* fill: ${props => props.theme.colors.primarybg};  */
                }
         }
         transition: all 400ms ease-in-out;

         
         ${props => (props.open === false) && css`
            transform: rotate(180deg);
            // margin : 0 auto;
            margin-left: auto;
            margin-right: auto;
         `}
    
`;

const Devider = styled.div`
  
    width:90%;
    height: 1px;
    background: rgba(44, 104, 193, 0.2);;
    color: rgba(44, 104, 193, 0.2);;
    margin : 0 auto;
    overflow : hidden;

`;
const Items = styled.div`
   
    width: 100%;
    /* flex: auto; */
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow : hidden;
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
    color :${props => props.theme.colors.primaryText}; 
    font-size:  ${props => props.theme.fontSize.l};
    font-family: 'Poppins', sans-serif;
    font-weight : 500;
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
                stroke: ${props => props.theme.colors.primaryText}; 
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
        }
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
    // transition: all 20ms ease-in;
    
`;

