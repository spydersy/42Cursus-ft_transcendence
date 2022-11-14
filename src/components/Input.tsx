import React, {  useEffect } from 'react'
import styled from "styled-components";
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
  useEffect(() => {
  }, [props.alert])
  
  return (
    <InputStyle alert={props.alert} disabled={props.disabled}  >
    <label>
        {props.lable}
    </label>
    <div>
        <input onFocus={props.onFocus} ref={props.refs}  onChange={props.onChange}  disabled={props.disabled} value={props?.value}  type={props.type} placeholder={props.placeholder} />
        
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
    onFocus? : (e : any)=>void,
    alert? : boolean,
    disabled? : boolean
    refs? : any,
 }
interface InputPropsStyle{
  disabled ? : boolean,
  alert ? :boolean

}

const InputStyle = styled.div<InputPropsStyle>`
font-family: "Poppins", sans-serif;
  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  cursor: pointer;
  @keyframes skew-x-shakeng{
 0% { transform: skewX(-15deg); }
 5% { transform: skewX(15deg); }
 10% { transform: skewX(-15deg); }
 15% { transform: skewX(15deg); }
 20% { transform: skewX(0deg); }
 100% { transform: skewX(0deg); }
}

  > label{
      margin-left: 20px;
      color:  ${props => props.theme.colors.purple};;
      font-weight: 600;
      
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
          
          ${props => (props.disabled === true) && `
          cursor: no-drop;
    `}
       
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
     
     ${props => (props.alert === true) && `
     >label{
      color:  #F13950;
      
     }
     >div{
        width: 100%;
        /* height: 100%; */
        animation-name: skew-x-shakeng;
 animation-duration: 1s;
        border-radius: 10px;

        > input{
          
          border: 2px solid #F13950;
          &::placeholder{
               color:  #F13950;
              opacity: 0.6;
           }
         }
        }
   
`}
    @media  only screen and (max-width: 768px) {
      width: 150px;
  max-width: 200px;
    }
`