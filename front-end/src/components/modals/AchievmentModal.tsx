import React from 'react'
import styled from "styled-components"


interface AchievementProps{
    achiev : {
        name : string,
        desc : string
        badge : string,
    }
}

export default function AchievmentModal(props : AchievementProps) {
  return (
    <AchivStyle>
        <img src={props.achiev.badge} alt="" />
        <div>

        {props.achiev.name}
        </div>
        {props.achiev.desc}
    </AchivStyle>
  )
}

const AchivStyle = styled.div`

    width: 100%;

    display: flex;
    align-items: center;
    /* background: #171A22; */
    flex-direction: column;
   
    /* border : 1px solid ${props => props.theme.colors.border};; */
`