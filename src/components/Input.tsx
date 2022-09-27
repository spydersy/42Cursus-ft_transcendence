import React from 'react'
import styled ,{css}from "styled-components";
// ussage <Input type='text' lable='Username' placeholder='Enter Username' />
 
interface Togglabel{
 label: string;
}

export function ToggleSwitch(props: Togglabel)
{
  return (
    <ToggleSwitchStyle>
        
        {props.label}{" "}
       
        <div className="toggle-switch">
        
          <input type="checkbox" className="checkbox" 
                name={props.label} id={props.label} />
          <label className="label" htmlFor={props.label}>
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>

    </ToggleSwitchStyle>

  );
}

const ToggleSwitchStyle = styled.div`
  background-color: #ffffff;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

`;

export default function InputComponent(props: InputProps) {
  return (
    <InputStyle>
    <label>
        {props.lable}
    </label>
    <div>
        <input onChange={props.onChange}  disabled={props.disabled} value={props?.value}  type={props.type} placeholder={props.placeholder} />
        
    </div>
    </InputStyle>
  )
}
interface InputProps{
    type : "text" | "password",
    value? : string
    lable?:string,
    placeholder? : string,
    onChange? : (e : any)=>void,
    alert? : boolean,
    disabled? : boolean
 }
interface InputPropsStyle{

}
const InputStyle = styled.div<InputPropsStyle>`
font-family: "Poppins", sans-serif
;


  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  > label{
      
      color:  ${props => props.theme.colors.primaryText};;
      
    }
    >svg{
        path{
            stroke:  ${props => props.theme.colors.seconderyText};;
            
        }
    }
    /* object-fit : contain; */
    position: relative;
    /* padding: ; */
    >div{
        width: 100%;
        /* height: 100%; */
        
        border-radius: 10px;
        > input{
        border-radius: 10px;

            height: 42px;
            background:  ${props => props.theme.colors.bg};
            border: 2px solid ${props => props.theme.colors.purple};;
            width: calc(100% - 20px);
           /* border: none; */
           margin: 0;
           padding: 0px 10px;

           outline: none;
           color:  ${props => props.theme.colors.primaryText};;
         font-size:  ${props => props.theme.fontSize.l}; 
           &::placeholder{
               color:  ${props => props.theme.colors.seconderyText};;
               font-size: ${props => props.theme.fontSize.l};
             /* opacity: 0.6; */
           }
       }
     }
    @media  only screen and (max-width: 768px) {
      width: 150px;
  max-width: 200px;
    }
`