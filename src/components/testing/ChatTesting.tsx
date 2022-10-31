import { map } from 'jquery';
import React, { useEffect, useState , useRef} from 'react'
import { io } from 'socket.io-client'
import styled from "styled-components"
import { Button } from '../../Pages/SignIn';
import Navlinks from '../Navlinks';

interface type {
    inputalue: string
}

const data1 = {
    chatRoom: '',
    username: '',
    chatn: 0,
    text: 'reda',
    rooms: [
        {
            name: "default",
            messages: [""]
        }
    ]
};

export default function ChatTesting() {
    const inputref = useRef<HTMLInputElement>(null);
    const msgref = useRef<HTMLInputElement>(null);
    const socket = io("http://localhost:8001");
    const [data, setdata] = useState(data1)
    const [list1, setlist1] = useState<string[]>([])
    const [index, setindex] = useState(0)
    const sendMsg = () => {
        const msg = {
            chatRoom: "default",
            name: data.username,
            text: data.text
        }
        socket.emit("chatToServer", msg);
    }
    const existRoom = () => {
        for (let index = 0; index < data.chatn; index++) {
            if (data.rooms[index].name === data.chatRoom)
                return (1);
        }
        return (0);
    }

    const addRoom = () => {
        data.chatn++;
        var inputalue  = inputref.current;
        var datatmp = data.rooms;
        if (inputalue)
        {
            var name = inputalue.value;
            if (!existRoom())
            {
                const obj = { name: name, messages: [""] };
                datatmp.push(obj);
                setdata({...data , rooms : datatmp})
            }
        }
    }

    const recievedMessgae = (message: any) => {
        for (let index = 0; index < data.rooms.length; index++) {
            if (data.rooms[index].name === message.room){
                data.rooms[index].messages.push(message.text);
            }
        }
        // for (let index = 0; index < data.rooms.length; index++) {
        //     console.log(data.rooms[index].name)
        //     for (let i = 0; i < data.rooms[index].messages.length; i++) {
        //         console.log(data.rooms[index].messages[i])
        //     }
        // }
    }
    // useEffect(() => {
    //     socket.on('connect', () => {
    //         // alert('hellooooo');
    //     });
    //     socket.on('chatToClient', (message) => {
    //         console.log(message.chatRoom);
    //         recievedMessgae(message);
    //     });
    //     var list : string[] = [];
    //     data.rooms.map((data : any , id : number)=>{
    //             list.push(data.name)
                
    //         }
    //     ) 
    //     setlist1([...list])
    //     return () => {

    //     }
    // }, [data])

    return (
        <Cont style={{ marginTop: "200px" }} className='container'>
            Messages
            {/* {
                messages.map((msg: string, id: number) => {
                    return <div key={id}>
                        msg
                    </div>
                })
            } */}


            
            <input ref={inputref} placeholder='input' type="text" />
            <button onClick={addRoom}>
                Add Room
            </button>
            <input ref={msgref} placeholder='message' type="text" />
            <button onClick={sendMsg}>
                Send
            </button>
            <div>
            
                <Navlinks index={index} setindex={(e)=>setindex(e)} list={list1}/>
                {data.rooms.map((data , id : number)=>{
                   if (index === id )
                     return  <Chat key={id}>
                        {data.name}
                        {
                            data.messages.map((msg : any , id : number)=>{
                                return <Chat key={id} >
                                    {msg}
                                </Chat>
                            })
                        }
                            <Msg/>
                     </Chat>
                    else
                        return <></>
                })}

            </div>
        </Cont>
    )
}


const Cont = styled.div`
    color : #fff;
    display: flex;
    flex-direction: column;
    > button{
        background-color: #fff;
    }
`;
const Chat = styled.div`
    display: flex ;
    align-items: flex-start;
    flex-direction: column;
`;
const Msg = styled.div`
    display: flex ;
    align-items: flex-start;
    flex-direction: column;
`;