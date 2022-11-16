import React, {useState , useEffect , useRef , useContext} from 'react'
import styled , {css} from "styled-components"
import { HeadComponent } from '../../Pages/Home';
import { ReactComponent as Image} from "../../assets/imgs/users.svg";
import {ReactComponent as Add} from "../../assets/imgs/plus.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/close-icon.svg";
import Modal from '../Modal';
import AddFriendsModal from './AddFriendsModal';
import InputComponent from '../Input';
import { Button } from '../../Pages/SignIn';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { UserProp } from '../game/types';
import { SocketContext } from '../../context/Socket';

interface usersType {
    defaultAvatar: string,
    login : string
    displayName : string,
    restriction: string,
    restrictionTime: string,
    duration: number,
}
interface convType {
nbMessages: number,
lastUpdate: string,
access : string,
channelId: number,
name: string;
password: string,
picture : string,
users: usersType[]
}
interface CloseProps {
list :convType[], closeModal : ()=>void , setlist: (e: any)=>void,setcurrentConv : (e: any)=>void
}
interface idsType{
login : string,
id : string
}

export default function CreateGroup(props :CloseProps) {
  const user = useContext(UserContext)
  const socket = useContext(SocketContext)
    
    const [memberss, setmemberss] = useState<idsType[]>([])
    const [data, setdata] = useState({
        name : "",
        icone : '',
        type : "",
        password : "passwordempty",
        members :[]
    })
    const [check, setcheck] = useState("public")
    const [hide, sethide] = useState(false)
    const [alertt, setalert] = useState(false)
    const [img, setimg] = useState("")
    // const groupName = useRef(null)
    const passRef = useRef<HTMLInputElement>(null)
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
    }
    const fetchData = async () => {
        await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
        {withCredentials: true} 
        ).then((res)=>{
          props.setlist([...res.data]);
        props.setcurrentConv(res.data[0])

         }).catch((err)=>{
         })
       }
    let joinChannels = async () => {
        let userLogin : string;
        await axios.get( process.env.REACT_APP_BACKEND_URL+ "/profile/me", 
        {withCredentials: true} 
        ).then((res)=>{
            userLogin = res.data.login
        }).catch((err)=>{
        })
        await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
        {withCredentials: true} 
        ).then((res)=>{
            var myChannels : Array<string> = [];
            for (let index = 0; index < res.data.length; index++) {
            myChannels.push(res.data[index].channelId);
            }
            myChannels.push(userLogin);
            // mychannels.pushback(userlogin)
            socket.emit('joinRoom', myChannels)
        }).catch((err)=>{
        })
    }
    const createGroup =  ()=>{
        //check for valid input
        var  bodyFormData = new FormData();
        var tmpmembers = []
        for (let i = 0; i < memberss.length; i++) {
            const element = memberss[i];
            tmpmembers.push(element.id)
            
        }
        bodyFormData.append('members', JSON.stringify(tmpmembers));
        bodyFormData.append('icone',data.icone);
        bodyFormData.append('name',data.name);
        
        bodyFormData.append('type',check);
        
        var pass = "passwordempty"
        if (check === "protected")
        {
            var passv = passRef.current.value
            if (passv != null)
            {
                pass = passRef.current.value;
            }
        }
        bodyFormData.append('password',pass);
        
        axios.post(process.env.REACT_APP_BACKEND_URL + "/chat/createRoom" , bodyFormData,

        {withCredentials: true} 
      ).then(async(res)=>{

        fetchData()
        await joinChannels()
        user.then(async (me : UserProp | "{}")=>{
            if (me !== "{}")
            {
                for (let i = 0; i < memberss.length; i++) {
                    const element = memberss[i];
                    socket.emit("addedMember", {owner: me, addedMember: element.login})
                 
                }
            }
          })
        props.closeModal()
      }).catch((err)=>{
        // if (data.name === "")
            setalert(true)
        })
        
    }
    useEffect(() => {
        var e = document.getElementById("fileInput")

        e?.addEventListener("change", (c :any)=>{
          
            setimg( URL.createObjectURL(c.target.files[0]))
            setdata({...data , icone: c.target.files[0]})
        })
    }, [data])
  return (
    <CreateGroupStyle>
        <HeadComponent title={"New Group"}/>
        <Form>
        <Row >
            <div  onClick={uploadFile} className='groupImg' >
                <input id="fileInput" type="file" hidden />
                {img === ""? < Image/> :  <img style={{width  : "100%", height : "100%"  }} src={img}alt="xx" />}
               <div className='hov'>
x
               </div>
            </div>
            <div className='con' >
            <InputComponent onFocus={()=>{
                setalert(false)
            }} onChange={(e)=>{
             setdata({...data , name : e.target.value})
            }} type='text' lable='Group name' alert={alertt} placeholder='Enter Group name'/>
            <Row2>
                <input type="radio" defaultChecked  onChange={handleRadioChange} id="public" name="status" value="public"/>
                <label>Public</label>
                <input type="radio" onChange={handleRadioChange} id="private" name="status" value="private"/>
                <label>Private</label>
                <input type="radio" onChange={handleRadioChange} id="protected" name="status" value="protected"/>
                <label>Protected</label>
            </Row2>
            </div>
        </Row>
            <InputPassWord  defaultChecked={(check === "protected")}>
            <InputComponent refs={passRef} type='password' placeholder='Group Password'/>

            </InputPassWord>
        {/* </Row2> */}
         <MembersCont>
            <div onClick={()=>{sethide(!hide)}} className='add'>
                <Add/>
                {hide && <Modal
                        isOpen={hide}
                        onRequestClose={() => sethide(false)}
                        hideModal={() => sethide(false)}
                        >
                            <AddFriendsModal closeModal={() => sethide(false)} members={memberss} setmembers={(e : any)=>{setmemberss(e)}}/>
                        </Modal>}
            </div>
            {
                memberss.map((member : idsType , id : number)=>{
                    return <Member key={id} members={memberss} setmembers={(e)=>setmemberss(e)} id={member.login}/>
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
.btp {
    /* background-color: aqua; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    top: 15%;
    left: 100px;
}
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
.con{
    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: space-between;

    flex-direction: column;
}
.groupImg{
    overflow: hidden;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 2px solid  ${props => props.theme.colors.seconderyText};
    display: flex;
    align-items: center;
justify-content: center;
margin-right: 20px;
position: relative;
cursor: pointer;

    /* >input{
        opacity: 0;
    } */
    >.hov{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff2f;
        top: 0;
        opacity: 0;
        transition: opacity 300ms ease-in-out;
    }
    &:hover{
        >.hov{
      
        opacity: 1;
    }
    }
    >img{
        object-fit: cover;
    }
  
        >svg{
             width: 50px;
             height: 50px;
            /* height: 10px; */
            path {
                stroke: ${props => props.theme.colors.seconderyText};;
            }
        }
    
}
>input{
    height: 40px;
    background-color:${props => props.theme.colors.bg}  ;
  border: none;
  outline: none;
  /* border: 2px solid ${props => props.theme.colors.border}; */
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
        margin-right: 10px;
        font-family: "Poppins" , sans-serif;
            font-weight: 600;
    }

    >input[type="radio"] {
        appearance: none;
        background-color: transparent;
        margin: 5px;
        font: inherit;
        color : blue;
        width: 1.5em;
        height: 1.5em;
        border: 0.15em solid ${props => props.theme.colors.purple};
        border-radius: 50%;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
        &::before {
        content: "";
        width: 0.9em;
        height: 0.9em;
        border-radius: 50%;
        background-color: ${props => props.theme.colors.purple};;
        transform: scale(0);
        transition: 250ms transform ease-in-out;
        box-shadow: inset 1em 1em ${props => props.theme.colors.purple};;
        }
}



        >input[type="radio"]:checked::before {
        transform: scale(1);
        }

       

  
`
interface InpProps{
    defaultChecked: boolean
}
const InputPassWord= styled.div<InpProps>`
height: 100%;
width: 100%;
  flex: 1;
  margin: 5px 0;
  
    ${props => props.defaultChecked === false && css`
    width: 0;
    flex: 0;
    display : none;

    `
  }
`;
const MembersCont= styled.div`
margin: 15px 0;
  width: calc(100% - 10px);
  /* min-height: 50px; */
  max-height: 200px;
  display: flex;
  gap: 5px;
  padding: 10px 5px;
  flex-wrap: wrap;
  /* align-items: center; */
  border: 1px solid ${props => props.theme.colors.purple};
  /* height: 40px; */
  transition: all 1000s ease-in;
 border-radius: 10px;
  /* background-color: red;0 */
  

    .add{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border : 1px dashed  ${props => props.theme.colors.purple}; 
        
        >svg{
            width: 30px;
            height: 30px;
            path{
                fill: transparent;
                stroke:  ${props => props.theme.colors.purple};
            }
        }
        &:hover{
            border : 1px solid  ${props => props.theme.colors.bg}; 
            background-color:  ${props => props.theme.colors.purple};

            path{
                fill: transparent;
                stroke:  ${props => props.theme.colors.primaryText};
                
        }
    }
    }
  
`;
interface  MemberProp{
    members : idsType[],
    setmembers : (e : any) => void,
    id: string,
}

export  function Member(props:MemberProp ) {
    const [img, setimg] = useState("")
    
    useEffect(() => {

          axios.get(process.env.REACT_APP_BACKEND_URL + "/users/" + props.id, 
          {withCredentials: true} 
        ).then((res)=>{
  

            setimg(res.data.defaultAvatar)
        }).catch((err)=>{
         
          })
        
    
    
    }  , [props.members, props.id])

    const deleteMember = ()=>{

        var list = props.members
        // var index = 0
        for (let i = 0; i < props.members.length; i++) {
            const element = props.members[i];
            if (element.login === props.id)
            {
                list.splice(i , 1)
                props.setmembers([...list])

            }
               
            }

    }
  return (
    <MembersStyle>
        <div className='cont'>
            <img src={img} alt="" />
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

interface  UpdateGroupProp{
    members : string[],
    setmembers : (e : any) => void,
    id: number,
    name: string,
    closeModal : () => void,
    banner : string,
    type: string,
}

export  function UpdateGroup(props : UpdateGroupProp) {
    
    const [data, setdata] = useState({
        name : "",
        icone : '',
        type : "PUBLIC",
        password : "password",
        members :[]
    })
    const [check, setcheck] = useState("public")
    const passRef = useRef<HTMLInputElement>(null)
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
    }

    const updateGroup = ()=>{

        let pass;
        (passRef.current?.value) ?  pass = passRef.current?.value.trim() :  pass = "defaultpasswrd";
        const obj = {
            channelId: props.id,
            newAccessType: data.type.toUpperCase(),
            password: pass,
        }

        axios.post(process.env.REACT_APP_BACKEND_URL + "/chat/UdpatedChannelAccess" , obj,   {withCredentials: true}).then((res)=>{
            props.closeModal()

            // window.location.reload()
        }).catch((err)=>{            
        })
    }
    
    useEffect(() => {
        document.getElementById(props.type.toLowerCase())?.toggleAttribute("checked")
    }, [props.type])

  return (
    <CreateGroupStyle>

        <HeadComponent title={"Update Group"}/>
      
        <Form>
            
            <Row >
                <div   className='groupImg' >
                    {props.banner === ""? < Image/> :  <img style={{width  : "100%", height : "100%"  }} src={props.banner}alt="xx" />}
                </div>

                <div className='con' >
                    <InputComponent  disabled={true} type='text' lable='Group name' placeholder={props.name}/>
                    <Row2>
                        <input type="radio"  onChange={handleRadioChange} id="public" name="status" value="public"/>
                        <label>Public</label>
                        <input type="radio" onChange={handleRadioChange} id="private" name="status" value="private"/>
                        <label>Private</label>
                        <input type="radio" onChange={handleRadioChange} id="protected" name="status" value="protected"/>
                        <label>Protected</label>
                    </Row2>
                </div>
            </Row>
            
            <InputPassWord  defaultChecked={(check === "protected")}>

            <InputComponent refs={passRef} type='password' placeholder='Group Password'/>

            </InputPassWord>

        </Form>

        <div className='btp'>
            <Button type='primary' text='Update' onClick={updateGroup} />
        </div>

    </CreateGroupStyle>
  )
}