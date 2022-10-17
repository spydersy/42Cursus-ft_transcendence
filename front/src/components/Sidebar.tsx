import React , {useState , useRef, useEffect} from 'react'
import styled , {css} from "styled-components"
import {ReactComponent as DashIcon} from "../assets/imgs/home.svg";
import {ReactComponent as DMIcon} from "../assets/imgs/dm.svg";
import {ReactComponent as RoomIcon} from "../assets/imgs/rooms.svg";
import {ReactComponent as ArrowLeft} from "../assets/imgs/arrowLeft.svg";
import {ReactComponent as LogoutIcon} from "../assets/imgs/logout.svg";
import {ReactComponent as LeaderIcon} from "../assets/imgs/leader-icon.svg";
import {ReactComponent as SettingIcon} from "../assets/imgs/settings.svg";
import { Button } from '../Pages/SignIn';
import { Link ,   useNavigate} from 'react-router-dom';
import axios from 'axios';


export interface barProps { open: boolean   }

interface LeftStyleProps{ open : boolean    }

const sideBarItemsList = [
    {
        title: "Home",
        link: "/",
        icon: <DashIcon /> 
    },
    {
        title: "Chat",
        link: "/chat/0",
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
    const sideBaref : any= useRef<HTMLElement>(null);
    const [open, setopen] = useState(false)
    const navigate = useNavigate();


    const [focused, setfocused] = useState(0)
    const openClose=  ()=>
    {   if (sideBaRed.current)
        {

            if ( window.innerWidth < 800)
            {
                // sideBaRed.current.style.width = "100%" 
                // sideBaref.current.style.width = "100%" 
                return ;
            }
            if (open)
            {

                // sideBaRed.current.style.width = "76px"
                // sideBaref.current.style.width = "76px"
            }
            else
            {

                // sideBaRed.current.style.width = "300px"
                // sideBaref.current.style.width = "300px"
            }
            setopen(!open)
        }
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
        else if (pageName === "setting" ) pagenum = 4;
        changeFocus(pagenum)

    //     window.addEventListener("resize", (e : any)=>{

    //     if (window.innerWidth < 1200 )
    //         setopen(false)
    //     else
    //         setopen(true)
   
    // })
    
      return () => {
        
      }
    }, [open, setopen ])
    
  return (
    <Test className='test' ref={sideBaRed} open={open}>
       
        <SidebarWrraper ref={sideBaref}  >
            <Left open={open}   onClick={openClose} >
                <Button cursor="default" size={"small"}isIcon={true} icon={<ArrowLeft/>}/>
            </Left>

            <Items>
            {
                sideBarItemsList.map((item : any , id : number)=>{
                    return <Item  open={open}key={id} onClick={()=>setfocused(id)} active={id === focused ? true : false} to={item.link}>
                    {item.icon}
                    {
                        <div>{item.title}</div> 
                    //    : <ToolTip>{item.title}</ToolTip>  
                    }
                    
                </Item>;
                })
            }
            </Items> 

            <Devider></Devider>

            <Item open={open}  className='item' onClick={()=>setfocused(4)} active={4 === focused ? true : false} to={"/setting"}>
                <SettingIcon/>
                {
                    <div>Setting</div> 
                //    : <ToolTip>Setting</ToolTip>  
                }
                </Item>
            <Item open={open} onClick={()=>{
                axios.post("/back-end/profile/logout", {}, 
                {withCredentials: true} 
                ).then((res)=>{
                navigate('/signin')
                }).catch((err)=>{
                    console.log(err)
                    // history.pushState("/signin");
                })

            }} className='item'   active={false} to={""}>
                <LogoutIcon/>
                {
                    <div>LogOut</div> 
                //    : <ToolTip>LogOut</ToolTip>  
                }
                </Item>
        </SidebarWrraper>
   
    </Test>

  )
}

interface ItemProps {
 
    active : boolean
    open : boolean


  }
  
const SidebarWrraper = styled.div`
    z-index: 10;
    /* width: 300px; */

    height: 100%;
    align-items: flex-end;
    flex-direction: column;  
    position: fixed;
    top: 70px;
    transition: all 400ms ease-in-out;

    background-color: ${props => props.theme.colors.primarybg}; 
    /* background-color: aliceblue; */

    @media  only screen and (max-width: 768px) {
        > .item{ display: none; }
        top: calc(100% - 70px);
        display: flex;
        align-items: center;
        > svg{  display: none;  }
    }
`;
const Test = styled.div<barProps>`
    z-index: 10;
    /* width: 300px; */
    width: 1px;
    height: 100%;
    background-color: transparent;
    position: relative;
    background-color: ${props => props.theme.colors.primarybg}; 
    background-color: #f0f8ff13;

    align-items: flex-end;
    flex-direction: column;
   
    -webkit-transition: width 500ms ease-in-out;
    -moz-transition: width 500ms ease-in-out;
    -o-transition: width 500ms ease-in-out;
    transition: width 500ms ease-in-out;
    ${props => (props.open === false) && `
    transition: width 500ms ease-in-out;

        align-items: center ;
        width: 76px;
    `}
  @media  only screen and (max-width: 768px) {
      max-width: 100%;
      width :100%;
      height: 70px;
      position: fixed;
      top: calc(100% - 70px);
      display: flex;
      /* background-color: #000; */
    align-items: center;
    > svg{
        display: none;
    }
}

    
`;

const Left = styled.div<LeftStyleProps>`
  
        
        width: 99%;
        display: flex;
        align-items: flex-end; 
        flex-direction: row-reverse;
         margin-top: 10px; 
         margin-bottom: 70px; 
         path{
             /* fill: ${props => props.theme.colors.seconderyText};  */
        }
         &:hover{
     
                > button{
                   
                }
         }
         
         > button{
             margin-right: 13px;
             >svg{
                transition: all 500ms ease-in-out;

             }
             ${props => (props.open === false) && css`
            /* margin-right: 10px; */
         
                     >svg{

                          transform: rotate(180deg);
                 
                        }
                        `}
                    }
    
`;

const Devider = styled.div`
  
    width       :90%;
    height      : 1px;
    background  : rgba(93, 104, 121, 0.2);;
    color       : rgba(126, 133, 143, 0.2);;
    margin      : 0px auto;
    margin-bottom: 15px;
    /* padding     : 0px auto; */
    overflow    : hidden;

`;
const Items = styled.div`
   
    width: auto;
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
const Item = styled(Link)<ItemProps>`

    /* width: 100%; */
    height: 60px;
    color :${props => props.theme.colors.primaryText}; 
    font-size:  ${props => props.theme.fontSize.l};
    font-family: 'Poppins', sans-serif;
    font-weight : 500;
    display: flex;
    align-items: flex-start;
    justify-content:center;

    flex-direction: row;
    position: relative;

    >div{
        text-align: start;
        width: 170px;

        -webkit-transition: all 500ms ease-in-out;
    -moz-transition: all 500ms ease-in-out;
    -o-transition: all 500ms ease-in-out;
    transition: all 500ms ease-in-out;

    ${props => (props.open === false) && `
        width: 0px;
        opacity : 0;        
    `}
    }


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
    }
    
`;

