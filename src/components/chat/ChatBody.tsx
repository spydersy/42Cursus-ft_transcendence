
import React from 'react'
import styled  from "styled-components"

// interface chatType {
//     id: string,
//     msg: string,
//   }
interface chatType {
  name: string,
  message: string[],

}
interface ChatProps {
    setList: (e : any) => void,
    list: chatType[]
  }

  export default function ChatBody(props: ChatProps) {
    // useEffect(() => {
    //   const  = io('http://localhost:3030');
    //   socket.on('coco' , ()=>{
    //     console.log("coco")
    //   })
    // }, [])
    // console.log('allah' + props.list)
    // console.log(props.list.length);
    return (
      <ChatBodyStyle>
        {
          props.list.map((object: any , i : number)=>{
            if (object.id === "0")
              return <div key={i} >  <MsgNotStyle>
                <div className='name'>Dosker </div>
                {object.message}
              <span>
                7:20pm
              </span>
              </MsgNotStyle></div>
            else
              return <div key={i} > <MsgStyle>{object.message}
                <span>
                7:20pm
              </span>
                </MsgStyle></div>
          })
        }
      </ChatBodyStyle>
    )
  }
  
  const    ChatBodyStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height : 100%;
  max-height : 100%;
  overflow-y: scroll;
  >div{
   display: flex;
    width: 100%;
    margin: 5px 0;
    height: auto;
    align-items: flex-end;
    flex-direction: row; 
    color: ${props => props.theme.colors.primaryText};
  }
  
`;
  const    MsgStyle = styled.div`
  background-color: ${props => props.theme.colors.purple};
  border-radius: 10px;
  margin-left: auto;
  margin-right: 10px;
  text-align: start;
  padding : 10px 8px 20px 8px;
  max-width: 300px;
  min-width: 150px;
  display: flex;
  gap: 15px;
  position: relative;
  &:before {
    z-index: 1;
    content: '';
    display: block;
    position: absolute;
    right: -4px;
    top: 10px;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: inherit;
}
  >span{
    opacity: 0.5;
    font-size: 12px;
   position: absolute;
   right: 5px;
   bottom: 5px;
   
  }
  `;
  const    MsgNotStyle = styled.div`

  text-align: start;
  padding : 10px 8px 20px 8px;
  height: auto;
  align-self: flex-end;
  border-radius: 10px;

  background-color:  ${props => props.theme.colors.primarybg};
  max-width: 300px;
  min-width: 150px;
  /* min-height: 35px; */
  margin-right: auto;
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: flex-start;
 flex-direction: column;
 &:before {
                    z-index: 1;
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
 .name{
 color: ${props => props.theme.colors.purple};
 font-weight: 600;
 }
  >span{
    opacity: 0.5;
    font-size: 12px;
   position: absolute;
   right: 5px;
   bottom: 5px;
   
  }
  /* min-width: ; */
  
`;


