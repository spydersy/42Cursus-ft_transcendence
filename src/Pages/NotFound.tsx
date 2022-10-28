import React from "react";
import styled from 'styled-components';

export default function NotFound() {
    return <StyledTwoFa>
     

                {/* <body> */}

                <div className="video">
                    
                    <video autoPlay loop muted width="80%" height="100%">
                        <source src="https://i.gifer.com/PgbQ.mp4" type="video/mp4" />
                    </video>
                    
                </div>
              


            </StyledTwoFa>
    }

const StyledTwoFa = styled.div`
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

    background-color: ${props => props.theme.colors.primarybg}; 

    .video {
        border: 25px solid #822222;
    }

`;