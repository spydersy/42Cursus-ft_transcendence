import React, {useState , useEffect , useRef} from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from '../../Pages/Home';

// import Image from "../../assets/imgs/image.svg";
import Image from "../../assets/imgs/users.svg";
import {ReactComponent as Edit} from "../../assets/imgs/edit.svg";
import {ReactComponent as Add} from "../../assets/imgs/plus.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-icon.svg";
import Img from "../../assets/imgs/avatar/a1.png";
import Modal from '../Modal';
import AddFriendsModal from './AddFriendsModal';
import InputComponent from '../Input';
import { Button } from '../../Pages/SignIn';
import axios from 'axios';

export default function CreateGroup() {
    
   
    const [members, setmembers] = useState([
     
    ])
    const [data, setdata] = useState({
        name : "",
        icone : '',
        type : "",
        password : "",
        members :[]
    })
    const [check, setcheck] = useState("")
    const [hide, sethide] = useState(false)
    const [img, setimg] = useState("")
    const groupName = useRef(null)
    const passRef = useRef<HTMLInputElement>(null)
    // const first = useRef(second)
    const uploadFile = ()=>{
        var e = document.getElementById("fileInput")
        e?.click()
        
    }
    const handleRadioChange = (e : any)=>{
        if (e.target.id === "protected")
        {
            if (e.target.checked === true)
            {
                setcheck("protected")
                setdata({...data, type: "protected"})

            }
        }
        else if (e.target.id === "public")
        {
            if (e.target.checked === true)
            {
                setdata({...data, type: "public"})
                setcheck("public")
            }
        }
        else if (e.target.id === "private")
        {
            if (e.target.checked === true)
            {

                setdata({...data, type: "private"})
                setcheck("private")
            }
        }
        console.log(e.target)
    }
    const createGroup = ()=>{
        //check for valid input
        var  bodyFormData = new FormData();

        bodyFormData.append('icone',data.icone);
        bodyFormData.append('name',data.name);
        bodyFormData.append('members', JSON.stringify(members));
        bodyFormData.append('type',data.type);
        if (data.type === "protected" )
        {

            if (passRef.current != null)
            {
                var pass = passRef.current.value;
                if (pass != "")
                {
                    bodyFormData.append('password',pass);
                }
            }
        }
        console.log(bodyFormData.get("members"))
        axios.post("http://localhost:8000/chat/createRoom" , bodyFormData, 
        {withCredentials: true} 
      ).then((res)=>{
        console.log(res.data)
    
      }).catch((err)=>{
        console.log(err)
    
        })
        
    }

    useEffect(() => {
        var e = document.getElementById("fileInput")
        e?.addEventListener("change", (c :any)=>{
            console.log(c.target.files[0])
          
            setimg( URL.createObjectURL(c.target.files[0]))
            setdata({...data , icone: c.target.files[0]})
        })
       
    }, [data])
    // console.log("__MEMBERS__DBG__ : ", members);
  return (
    <CreateGroupStyle>
        <HeadComponent title={"New Group"}/>
        <Form>

        <Row >
            <div  onClick={uploadFile} className='groupImg' >
                <input id="fileInput" type="file" hidden />
                <img style={{width : img === Image  ? "" : "100%", height : img === Image  ? "" : "100%"  }} src={img}alt="" />
                <div >
                    <Edit/>
                </div>
            </div>
            {/* <input className='inputText' type="text"  placeholder='Enter group name ..'/> */}
            <div style={{flex : "1"}}>
            <InputComponent onChange={(e)=>{
             setdata({...data , name : e.target.value})
            }} type='text' placeholder='Enter Group name'/>

            </div>

        </Row>
        <Row2 >

            <input type="radio"   onChange={handleRadioChange} id="public" name="status" value="public"/>
            <label>Public</label>
            <input type="radio" onChange={handleRadioChange} id="private" name="status" value="private"/>
            <label>Private</label>
            <input type="radio" onChange={handleRadioChange} id="protected" name="status" value="protected"/>
            <label>Protected</label>
            <InputPassWord  defaultChecked={(check === "protected")}>
            <InputComponent refs={passRef} type='password' placeholder='Group Password'/>

            </InputPassWord>
        </Row2>
         <MembersCont>
            <div onClick={()=>{sethide(!hide)}} className='add'>
                <Add/>
                {hide && <Modal
                        isOpen={hide}
                        onRequestClose={() => sethide(false)}
                        hideModal={() => sethide(false)}
                        >
                            <AddFriendsModal members={members} setmembers={(e : any)=>{setmembers(e)}}/>
                        </Modal>}
            </div>
            {
                members.map((member : string , id : number)=>{
                    return <Member key={id} members={members} setmembers={(e)=>setmembers(e)} id={member}/>
                })
            }
        </MembersCont> 
        </Form>
        <Button type='primary' text='Create' onClick={createGroup} />
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
    border: 2px solid  ${props => props.theme.colors.purple};
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
            /* background-color: ; */
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
            /* outline: none; */
        /* ...existing styles */
     
        background-color: #fff;
        accent-color: ${props => props.theme.colors.purple};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: grid;
        place-content: center;

        &::before {
            content: "";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em ${props => props.theme.colors.purple};
        }
            &:checked {
                
            transform: scale(1);
                border: 0.15em solid  ${props => props.theme.colors.purple};
                outline-color: ${props => props.theme.colors.purple};
            }
        }

       

  
`
interface InpProps{
    defaultChecked: boolean
}
const InputPassWord= styled.div<InpProps>`
height: 100%;
  flex: 1;
  
    ${props => props.defaultChecked === false && css`
    width: 0;
    flex: 0;
    display : none;

    `
  }
`;

const MembersCont= styled.div`
margin-top: 15px;
  width: calc(100% - 10px);
  /* min-height: 50px; */
  max-height: 200px;
  display: flex;
  gap: 5px;
  padding: 10px 5px;
  /* align-items: center; */
  border: 1px solid ${props => props.theme.colors.primaryText};
  /* height: 40px; */
 border-radius: 10px;
  /* background-color: red;0 */
  

    .add{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        /* background-color:  ${props => props.theme.colors.bg}; */
        display: flex;
        align-items: center;
        justify-content: center;
        border : 1px dashed  ${props => props.theme.colors.primaryText}; 

        >svg{
            width: 30px;
            height: 30px;
            path{
                fill: transparent;
                stroke:  ${props => props.theme.colors.primaryText};;
            }
        }
    }
  
`;


interface  MemberProp{
    members : string[]
    setmembers: (e : any) => void,
    id: string
}


export  function Member(props:MemberProp ) {
    const deleteMember = ()=>{
        var list = props.members
        var index = list.indexOf(props.id)
        console.log(index)
        list = list.slice(index+ 1)
        props.setmembers([...list])
    }
  return (
    <MembersStyle>
        <div className='cont'>
            <img src={props.id} alt="" />
        </div>
        <div onClick={deleteMember} className='btn'>
        <CloseIcon/>
        </div>
    </MembersStyle>
  )
}

const MembersStyle= styled.div`
    margin: 0 4px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color:  ${props => props.theme.colors.bg};
    border: 1px solid  ${props => props.theme.colors.primaryText};
    position: relative;
    .cont{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        > img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .btn{
        position: absolute;
        cursor: pointer;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        top: 0;
        right: -5px;
        background-color:  ${props => props.theme.colors.purple};;
        display: flex;
        align-items: center;
        justify-content: center;
        >svg{
            path{
                stroke:   ${props => props.theme.colors.primaryText};;
            }
        }
    }
`;