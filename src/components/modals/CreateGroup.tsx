import React, {useState , useEffect} from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from '../../Pages/Home';
import { AvatarComponent } from '../Upperbar';
// import Image from "../../assets/imgs/image.svg";
import Image from "../../assets/imgs/users.svg";
import {ReactComponent as Edit} from "../../assets/imgs/edit.svg";

export default function CreateGroup() {
    
    interface GroupType{
        name : string,
        avatar : File | string,

    }

    const [data, setdata] = useState({
        name : "",
        avatar : Image, 

    })
    const [check, setcheck] = useState(false)
    const uploadFile = ()=>{
        var e = document.getElementById("fileInput")
        e?.click()
        
    }
    const handleRadioChange = (e : any)=>{
                    console.log(e)
        var radio = document.getElementById("Protected")
        console.log(e.target.id)
        if (e.target.id === "Protected")
        {
            if (e.target.checked === true)
                setcheck(true)
        }
        else
            setcheck(false)

        
    }
    useEffect(() => {
        var e = document.getElementById("fileInput")
        e?.addEventListener("change", (c :any)=>{
            console.log(c.target.files[0])
            setdata({...data , avatar: URL.createObjectURL(c.target.files[0])})
        })
       
    }, [])
    
  return (
    <CreateGroupStyle>
        <HeadComponent title={"New Group"}/>
        <Form>

        <Row >
            <div  onClick={uploadFile}className='groupImg' >
                <input id="fileInput" type="file" hidden />
                
                <img style={{width : data.avatar === Image  ? "" : "100%", height : data.avatar === Image  ? "" : "100%"  }} src={data.avatar}alt="" />
                <div >
                    <Edit/>
                </div>
            </div>
            <input className='inputText' type="text"  placeholder='Enter group name ..'/>

        </Row>
        <Row2 >

            <input type="radio"   onChange={handleRadioChange} id="Public" name="status" value="Public"/>
            <label>Public</label>
            <input type="radio" onChange={handleRadioChange} id="Private" name="status" value="Private"/>
            <label>Private</label>
            <input type="radio" onChange={handleRadioChange} id="Protected" name="status" value="Protected"/>
            <label>Protected</label>
            <InputPassWord defaultChecked={check} type="password" name="password" placeholder='Enter Password ..' />
        </Row2>

        </Form>
    </CreateGroupStyle>
  )
}

const CreateGroupStyle = styled.div`
display:flex;
align-items: flex-start;
flex-direction: column;
`;
const Form = styled.form`
margin-top: 15px;
display:flex;
align-items: flex-start;
flex-direction: column;
width: 100%;
`;
const Row = styled.div`
width: 100%;
display:flex;
align-items: flex-start;
flex-direction: row;
.groupImg{
    overflow: hidden;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid  ${props => props.theme.colors.primaryText};
    display: flex;
    align-items: center;
justify-content: center;
margin-right: 20px;
position: relative;
cursor: pointer;
    /* >input{
        opacity: 0;
    } */
    >img{
        object-fit: contain;
    }
    >div{
        width: 15px;
        height: 15px;
        
        position: absolute;
        bottom: -5px;
        right: -5px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center ;
            background-color: ${props => props.theme.colors.bg}; ;
        >svg{
            width: 10px;
            height: 10px;
      
            /* height: ; */
            path {
                stroke: ${props => props.theme.colors.primaryText};;
            }
        }
    }
}
>input{
    height: 40px;
    background-color:${props => props.theme.colors.bg}  ;
  border: none;
  outline: none;
  border: 2px solid ${props => props.theme.colors.border};
  padding-left: 10px;
  flex: 1;

  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color :${props => props.theme.colors.seconderyText}; 
font-size:  ${props => props.theme.fontSize.l};
font-family: 'Poppins', sans-serif;
font-weight : 400;
}
`;
const Row2= styled.div`
margin-top: 15px;
font-family: 'Poppins', sans-serif;
width: 100%;
display:flex;
align-items: center;
height: 40px;
flex-direction: row;

    > label{
        margin-right: 5px;
    }
        > input[type="radio"] {
            outline: none;
        /* ...existing styles */
        width: 20px;
        height: 20px;
        display: grid;
        place-content: center;
        &::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            border-radius: 50%;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em ${props => props.theme.colors.purple};
        }
            &:checked::before {
                
            transform: scale(10);
            }
        }

       

  
`
interface InpProps{
    defaultChecked: boolean
}
const InputPassWord= styled.input<InpProps>`
height: 100%;
    background-color:${props => props.theme.colors.bg}  ;
    border: none;
    outline: none;
    border: 2px solid ${props => props.theme.colors.border};
    padding-left: 10px;
    flex: 1;

    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color :${props => props.theme.colors.seconderyText}; 
    font-size:  ${props => props.theme.fontSize.l};
    font-family: 'Poppins', sans-serif;
    font-weight : 400;
    transition: all 200ms ease-in-out;
    ${props => props.defaultChecked === false && css`
    width: 0;
    flex: 0;
    padding: 0;
    border :none; 

    `
  }
`;